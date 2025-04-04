from typing import List, Optional
from fastapi import Query
from pydantic import BaseModel, Field

from internal.common.enums.training_session import TrainingSessionType
from internal.common.schemas.common import ListResponse, PagingRequest
from internal.common.schemas.teams import TeamResponse
from internal.common.schemas.user import UserInfo
from internal.common.types import ID


class TrainingSessionInfo(BaseModel):
    name: str = Field(..., description="Training session name")
    coach_id: Optional[ID] = Field(None, description="Coach ID")
    team_id: Optional[ID] = Field(None, description="Team ID")
    start_date: Optional[int] = Field(..., description="Start date")
    session_type: Optional[TrainingSessionType] = Field(
        ..., description="Training Session Type")


class CreateTrainingSessionRequest(TrainingSessionInfo):
    ...


class UpdateTrainingSessionRequest(TrainingSessionInfo):
    ...


class TrainingSessionResponse(TrainingSessionInfo):
    id: ID = Field(..., description="ID")
    coach: Optional[UserInfo] = Field(None, description="Coach info")
    team: Optional[TeamResponse] = Field(None, description="Team info")
    created_at: int = Field(..., description="Team created at")
    updated_at: int = Field(..., description="Team updated at")


class ListTrainingSessionRequest(PagingRequest):
    type: Optional[TrainingSessionType] = Field(
        Query(None, description="training session type"))


class ListTrainingSessionResponse(ListResponse):
    training_sessions: List[TrainingSessionResponse] = Field(
        ..., description="List training sessions")
