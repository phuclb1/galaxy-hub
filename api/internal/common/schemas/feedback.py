from typing import List, Optional
from pydantic import BaseModel, Field

from internal.common.schemas.common import ListResponse, PagingRequest
from internal.common.schemas.training_session import TrainingSessionResponse
from internal.common.schemas.user import UserInfo
from internal.common.types import ID


class FeedbackInfo(BaseModel):
    user_id: Optional[ID] = Field(None, description="User ID")
    session_id: Optional[ID] = Field(None, description="Session ID")
    context: Optional[str] = Field(None, description="Feedback context")


class CreateFeedbackRequest(FeedbackInfo):
    ...


class UpdateFeedbackRequest(FeedbackInfo):
    ...


class FeedbackResponse(FeedbackInfo):
    id: ID = Field(..., description="ID")
    user: Optional[UserInfo] = Field(None, description="User info")
    session: Optional[TrainingSessionResponse] = Field(
        None, description="Training Session info")
    created_at: int = Field(..., description="Team created at")
    updated_at: int = Field(..., description="Team updated at")


class ListFeedbackRequest(PagingRequest):
    ...


class ListFeedbackResponse(ListResponse):
    feedbacks: List[FeedbackResponse] = Field(..., description="List feedback")
