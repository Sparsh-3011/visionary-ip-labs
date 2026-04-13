import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request as GoogleRequest
from datetime import datetime, timezone
import logging
from typing import Optional

logger = logging.getLogger(__name__)

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', '')
REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI', '')
SPREADSHEET_ID = os.environ.get('GOOGLE_SPREADSHEET_ID', '')

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]


class GoogleSheetsService:
    def __init__(self, db):
        self.db = db

    async def get_credentials(self, admin_id: str = "admin") -> Optional[Credentials]:
        """Get stored credentials for the admin user"""
        try:
            token_doc = await self.db.google_tokens.find_one({"user_id": admin_id})
            if not token_doc:
                logger.warning(f"No Google credentials found for {admin_id}")
                return None

            creds = Credentials(
                token=token_doc["access_token"],
                refresh_token=token_doc.get("refresh_token"),
                token_uri=token_doc["token_uri"],
                client_id=token_doc["client_id"],
                client_secret=token_doc["client_secret"],
                scopes=SCOPES
            )

            # Check if credentials are expired and refresh if needed
            expires_at = token_doc["expires_at"]
            if expires_at.tzinfo is None:
                expires_at = expires_at.replace(tzinfo=timezone.utc)

            if datetime.now(timezone.utc) >= expires_at:
                logger.info("Refreshing expired Google credentials")
                creds.refresh(GoogleRequest())
                await self.update_token(admin_id, creds)

            return creds
        except Exception as e:
            logger.error(f"Error getting credentials: {e}")
            return None

    async def update_token(self, user_id: str, creds: Credentials):
        """Update stored token after refresh"""
        try:
            await self.db.google_tokens.update_one(
                {"user_id": user_id},
                {
                    "$set": {
                        "access_token": creds.token,
                        "expires_at": datetime.now(timezone.utc).timestamp() + 3600,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
        except Exception as e:
            logger.error(f"Error updating token: {e}")

    async def save_token(self, user_id: str, creds: Credentials):
        """Save new OAuth token"""
        try:
            token_data = {
                "user_id": user_id,
                "access_token": creds.token,
                "refresh_token": creds.refresh_token,
                "token_uri": creds.token_uri,
                "client_id": creds.client_id,
                "client_secret": creds.client_secret,
                "expires_at": datetime.now(timezone.utc).timestamp() + 3600,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            await self.db.google_tokens.replace_one(
                {"user_id": user_id},
                token_data,
                upsert=True
            )
            logger.info(f"Token saved successfully for {user_id}")
        except Exception as e:
            logger.error(f"Error saving token: {e}")
            raise

    async def append_to_sheet(self, application_data: dict) -> bool:
        """Append application data to Google Sheet"""
        try:
            if not SPREADSHEET_ID:
                logger.warning("Google Spreadsheet ID not configured")
                return False

            creds = await self.get_credentials()
            if not creds:
                logger.warning("No valid Google credentials available")
                return False

            service = build('sheets', 'v4', credentials=creds)

            # Prepare the row data
            values = [[
                application_data.get('fullName', ''),
                application_data.get('email', ''),
                application_data.get('phone', ''),
                application_data.get('collegeName', ''),
                application_data.get('course', ''),
                application_data.get('year', ''),
                application_data.get('areaOfInterest', ''),
                application_data.get('motivation', ''),
                application_data.get('createdAt', datetime.utcnow().isoformat())
            ]]

            body = {'values': values}

            # Append to the sheet
            result = service.spreadsheets().values().append(
                spreadsheetId=SPREADSHEET_ID,
                range='Sheet1!A:I',  # Adjust range as needed
                valueInputOption='RAW',
                insertDataOption='INSERT_ROWS',
                body=body
            ).execute()

            logger.info(f"Successfully appended to Google Sheet: {result.get('updates')}")
            return True

        except Exception as e:
            logger.error(f"Error appending to Google Sheet: {e}")
            return False

    async def initialize_sheet_headers(self) -> bool:
        """Initialize sheet with headers if empty"""
        try:
            if not SPREADSHEET_ID:
                return False

            creds = await self.get_credentials()
            if not creds:
                return False

            service = build('sheets', 'v4', credentials=creds)

            # Check if sheet has headers
            result = service.spreadsheets().values().get(
                spreadsheetId=SPREADSHEET_ID,
                range='Sheet1!A1:I1'
            ).execute()

            values = result.get('values', [])
            if not values:
                # Add headers
                headers = [[
                    'Full Name',
                    'Email',
                    'Phone',
                    'College Name',
                    'Course',
                    'Year',
                    'Area of Interest',
                    'Motivation',
                    'Submitted At'
                ]]

                body = {'values': headers}
                service.spreadsheets().values().update(
                    spreadsheetId=SPREADSHEET_ID,
                    range='Sheet1!A1:I1',
                    valueInputOption='RAW',
                    body=body
                ).execute()

                logger.info("Sheet headers initialized")

            return True

        except Exception as e:
            logger.error(f"Error initializing sheet headers: {e}")
            return False
