from typing import List, Optional
from pydantic import BaseModel, Field

from internal.common.schemas.common import ListResponse, PagingRequest
from internal.common.schemas.teams import TeamResponse
from internal.common.schemas.user import UserInfo
from internal.common.types import ID


class StudentInfo(BaseModel):
    user_id: ID = Field(..., description="User ID")
    team_id: Optional[ID] = Field(None, description="Team ID")
    parent_id: Optional[ID] = Field(None, description="Parent ID")


class CreateStudentRequest(StudentInfo):
    ...


class UpdateStudentRequest(StudentInfo):
    ...


class StudentResponse(StudentInfo):
    id: ID = Field(..., description="ID")
    user: UserInfo = Field(..., description="User info")
    team: Optional[TeamResponse] = Field(None, description="Team info")
    parent: Optional[UserInfo] = Field(None, description="Parent info")
    created_at: int = Field(..., description="Student created at")
    updated_at: int = Field(..., description="Student updated at")


class ListStudentRequest(PagingRequest):
    ...


class ListStudentResponse(ListResponse):
    students: List[StudentResponse] = Field(..., description="List students")
