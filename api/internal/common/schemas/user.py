from datetime import datetime
from typing import Optional, List

from fastapi import Query
from pydantic import BaseModel, Field

from internal.common.enums.user import UserRole
from internal.common.schemas.common import PagingRequest, ListResponse
from internal.common.types import ID

USER_NAME = "User name"
USER_ROLE = "User role"
USER_PASSWORD = "User password"


class UserBase(BaseModel):
    name: str = Field("", description=USER_NAME)
    email: str = Field("", description="User email")
    picture: Optional[str] = Field(None, description="User picture")
    role: Optional[UserRole] = Field(
        description=USER_ROLE)


class CreateUserRequest(UserBase):
    password: Optional[str] = Field(None, description=USER_PASSWORD)


class UpdateUserRequest(BaseModel):
    name: Optional[str] = Field(None, description=USER_NAME)
    role: Optional[UserRole] = Field(None, description=USER_ROLE)
    raw_password: Optional[str] = Field(None, description=USER_PASSWORD)


class UserInfo(UserBase):
    id: ID = Field(None, description="User ID")
    hashed_token: Optional[str] = Field(None, description="User hashed token")
    created_at: datetime = Field(None, description="User created at")
    updated_at: datetime = Field(None, description="User updated at")


class ListUserRequest(PagingRequest):
    status: Optional[List[UserRole]] = Field(
        Query(None, description=USER_ROLE))


class ListUserResponse(ListResponse):
    users: List[UserInfo] = Field(..., description="List of users")


class UserLoginRequest(BaseModel):
    email: str = Field("", description="User email")
    password: str = Field("", description=USER_PASSWORD)


class LoginResponse(BaseModel):
    user: UserInfo
    access_token: str
