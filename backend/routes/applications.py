from fastapi import APIRouter, HTTPException, Depends, Query
from fastapi.responses import RedirectResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.application import Application, ApplicationCreate
from services.google_sheets import GoogleSheetsService
from datetime import datetime
import logging
import warnings
import os
from google_auth_oauthlib.flow import Flow

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/applications", tags=["applications"])

# Google OAuth configuration
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', '')
REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI', '')

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]


def get_db():
    from server import db
    return db


@router.post("/submit")
async def submit_application(
    application_data: ApplicationCreate,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Submit a new internship application"""
    try:
        # Create application object
        application = Application(**application_data.dict())
        
        # Save to MongoDB
        result = await db.applications.insert_one(application.dict())
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save application")

        logger.info(f"Application saved to MongoDB: {application.id}")

        # Try to sync to Google Sheets (non-blocking - won't fail if sheets not configured)
        try:
            sheets_service = GoogleSheetsService(db)
            await sheets_service.append_to_sheet(application.dict())
            logger.info(f"Application synced to Google Sheets: {application.id}")
        except Exception as e:
            logger.warning(f"Failed to sync to Google Sheets (continuing anyway): {e}")
            # Don't fail the request if sheets sync fails

        return {
            "success": True,
            "message": "Application submitted successfully",
            "applicationId": application.id
        }

    except Exception as e:
        logger.error(f"Error submitting application: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list")
async def list_applications(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get list of all applications (admin endpoint)"""
    try:
        applications = await db.applications.find().sort("createdAt", -1).skip(skip).limit(limit).to_list(limit)
        total = await db.applications.count_documents({})
        
        return {
            "success": True,
            "total": total,
            "applications": applications
        }
    except Exception as e:
        logger.error(f"Error fetching applications: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_application_stats(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Get application statistics"""
    try:
        total = await db.applications.count_documents({})
        
        # Count by area of interest
        pipeline = [
            {
                "$group": {
                    "_id": "$areaOfInterest",
                    "count": {"$sum": 1}
                }
            }
        ]
        interest_stats = await db.applications.aggregate(pipeline).to_list(None)
        
        return {
            "success": True,
            "totalApplications": total,
            "byInterest": interest_stats
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Google Sheets OAuth endpoints
@router.get("/oauth/sheets/login")
async def sheets_oauth_login():
    """Initiate Google Sheets OAuth flow"""
    try:
        if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
            raise HTTPException(
                status_code=500,
                detail="Google OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET"
            )

        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": GOOGLE_CLIENT_ID,
                    "client_secret": GOOGLE_CLIENT_SECRET,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token"
                }
            },
            scopes=SCOPES,
            redirect_uri=REDIRECT_URI
        )

        authorization_url, state = flow.authorization_url(
            access_type='offline',
            prompt='consent'
        )

        # Store state in database for verification
        from server import db
        await db.oauth_states.insert_one({
            "state": state,
            "user_id": "admin",
            "created_at": datetime.utcnow()
        })

        return RedirectResponse(url=authorization_url)

    except Exception as e:
        logger.error(f"Error initiating OAuth: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/oauth/sheets/callback")
async def sheets_oauth_callback(code: str, state: str):
    """Handle Google Sheets OAuth callback"""
    try:
        from server import db
        
        # Verify state
        state_doc = await db.oauth_states.find_one({"state": state})
        if not state_doc:
            raise HTTPException(status_code=400, detail="Invalid state parameter")

        user_id = state_doc["user_id"]

        # Exchange code for credentials
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": GOOGLE_CLIENT_ID,
                    "client_secret": GOOGLE_CLIENT_SECRET,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token"
                }
            },
            scopes=SCOPES,
            redirect_uri=REDIRECT_URI,
            state=state
        )

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            flow.fetch_token(code=code)

        creds = flow.credentials

        # Verify required scopes
        required_scopes = {"https://www.googleapis.com/auth/spreadsheets"}
        granted_scopes = set(creds.scopes or [])
        if not required_scopes.issubset(granted_scopes):
            missing = required_scopes - granted_scopes
            logger.error(f"Missing required sheets scopes: {missing}")
            raise HTTPException(
                status_code=400,
                detail=f"Missing required sheets scopes: {', '.join(missing)}"
            )

        # Save credentials
        sheets_service = GoogleSheetsService(db)
        await sheets_service.save_token(user_id, creds)

        # Initialize sheet headers
        await sheets_service.initialize_sheet_headers()

        # Clean up state
        await db.oauth_states.delete_one({"state": state})

        return {
            "success": True,
            "message": "Google Sheets connected successfully! You can now close this window."
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in OAuth callback: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/oauth/sheets/status")
async def check_sheets_connection(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Check if Google Sheets is connected"""
    try:
        sheets_service = GoogleSheetsService(db)
        creds = await sheets_service.get_credentials()
        
        return {
            "connected": creds is not None,
            "spreadsheet_id": os.environ.get('GOOGLE_SPREADSHEET_ID', '')
        }
    except Exception as e:
        logger.error(f"Error checking sheets status: {e}")
        return {"connected": False, "error": str(e)}
