from datetime import date, datetime
from typing import List, Optional
from fastapi import Query
from pydantic import BaseModel, Field, computed_field

from internal.common.enums.attendance import AttendanceStatus
from internal.common.schemas.common import ListResponse, PagingRequest
from internal.common.schemas.training_session import TrainingSessionResponse
from internal.common.schemas.user import UserInfo
from internal.common.types import ID


class AttendanceInfo(BaseModel):
    user_id: Optional[ID] = Field(None, description="User ID")
    session_id: Optional[ID] = Field(None, description="Session ID")
    status: Optional[AttendanceStatus] = Field(
        None, description="Attendance context")


class CreateAttendanceRequest(AttendanceInfo):
    ...


class UpdateAttendanceRequest(AttendanceInfo):
    ...


class AttendanceResponse(AttendanceInfo):
    id: ID = Field(..., description="ID")
    user: Optional[UserInfo] = Field(None, description="User info")
    session: Optional[TrainingSessionResponse] = Field(
        None, description="Training Session info")
    created_at: int = Field(..., description="Team created at")
    updated_at: int = Field(..., description="Team updated at")


class ListAttendanceRequest(PagingRequest):
    status: Optional[AttendanceStatus] = Field(
        Query(None, description="Attendance status"))
    filter_date: Optional[date] = Field(
        Query(None, description="filter date", example="2025-01-01"))

    @computed_field
    def filter_date_at(self) -> tuple[Optional[datetime], Optional[datetime]]:
        min_time = None
        max_time = None

        if self.filter_date is not None:
            min_time = datetime.combine(self.filter_date, datetime.min.time())
            max_time = datetime.combine(self.filter_date, datetime.max.time())
        return min_time, max_time


class ListAttendanceResponse(ListResponse):
    attendances: List[AttendanceResponse] = Field(
        ..., description="List Attendance")
