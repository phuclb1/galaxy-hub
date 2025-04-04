from typing import List, Optional
from fastapi import Query
from pydantic import BaseModel, Field

from internal.common.enums.registration import RegistrationStatus
from internal.common.schemas.common import ListResponse, PagingRequest
from internal.common.schemas.student import StudentResponse
from internal.common.schemas.training_session import TrainingSessionResponse
from internal.common.types import ID


class RegistrationInfo(BaseModel):
    student_id: Optional[ID] = Field(None, description="Student ID")
    session_id: Optional[ID] = Field(None, description="Session ID")
    status: Optional[RegistrationStatus] = Field(
        None, description="Registration status")


class CreateRegistrationRequest(RegistrationInfo):
    ...


class UpdateRegistrationRequest(RegistrationInfo):
    ...


class RegistrationResponse(RegistrationInfo):
    id: ID = Field(..., description="ID")
    student: Optional[StudentResponse] = Field(None, description="User info")
    session: Optional[TrainingSessionResponse] = Field(
        None, description="Training session info")
    created_at: int = Field(..., description="Team created at")
    updated_at: int = Field(..., description="Team updated at")


class ListRegistrationRequest(PagingRequest):
    status: Optional[RegistrationStatus] = Field(
        Query(None, description="Registration status"))


class ListRegistrationResponse(ListResponse):
    registrations: List[RegistrationResponse] = Field(
        ..., description="List registration")
