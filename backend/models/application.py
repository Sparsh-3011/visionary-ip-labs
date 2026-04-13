from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid


class ApplicationBase(BaseModel):
    fullName: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    collegeName: str = Field(..., min_length=1, max_length=300)
    course: str = Field(..., min_length=1, max_length=200)
    year: str
    areaOfInterest: str
    motivation: str = Field(..., min_length=10)


class ApplicationCreate(ApplicationBase):
    pass


class Application(ApplicationBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

    class Config:
        from_attributes = True
