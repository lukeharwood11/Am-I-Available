from pydantic import BaseModel, Field


class UserData(BaseModel):
    """User data model"""

    id: str = Field(description="User UUID")
    email: str = Field(description="User email")
    full_name: str = Field(description="User full name")
