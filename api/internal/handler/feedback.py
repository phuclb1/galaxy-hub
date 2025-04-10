from fastapi import Depends
from internal.common.schemas.common import DeleteRequest
from internal.common.schemas.feedback import (
    CreateFeedbackRequest,
    ListFeedbackRequest,
    UpdateFeedbackRequest
)
from internal.common.types import ID
from internal.controller.feedback import FeedbackController

from tools.uts_exception import exception_handler


class FeedbackHandler:
    controller: FeedbackController

    def __init__(self, controller: FeedbackController):
        self.controller = controller

    @exception_handler
    async def create_feedback(self, create_req: CreateFeedbackRequest):
        return await self.controller.create_feedback(create_req)

    @exception_handler
    async def get_feedback_by_id(self, feedback_id: ID):
        return await self.controller.get_feedback_by_id(feedback_id)

    @exception_handler
    async def update_feedback(
        self,
        feedback_id: ID,
        update_req: UpdateFeedbackRequest
    ):
        return await self.controller.update_feedback(feedback_id, update_req)

    @exception_handler
    async def get_list_feedback(self, list_req: ListFeedbackRequest = Depends()):
        return await self.controller.get_list_feedback(list_req)

    @exception_handler
    async def delete_feedback(self, delete_req: DeleteRequest = Depends()):
        return await self.controller.delete_feedback(delete_req.ids)
