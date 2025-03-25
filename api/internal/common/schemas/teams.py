from typing import List, Optional
from pydantic import BaseModel, Field

from internal.common.schemas.common import ListResponse, PagingRequest
from internal.common.schemas.training_center import CenterResponse
from internal.common.schemas.user import UserInfo
from internal.common.types import ID


class TeamInfo(BaseModel):
    coach_id: Optional[ID] = Field(None, description="Coach ID")
    center_id: Optional[ID] = Field(None, description="Training center ID")
    name: str = Field("", description="Team's name")


class CreateTeamRequest(TeamInfo):
    ...


class UpdateTeamRequest(TeamInfo):
    ...


class TeamResponse(TeamInfo):
    id: ID = Field(..., description="ID")
    coach: Optional[UserInfo] = Field(None, description="Coach info")
    center: Optional[CenterResponse] = Field(None, description="Center info")
    created_at: int = Field(..., description="Team created at")
    updated_at: int = Field(..., description="Team updated at")


class ListTeamRequest(PagingRequest):
    ...


class ListTeamResponse(ListResponse):
    teams: List[TeamResponse] = Field(..., description="List teams")
