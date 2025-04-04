from fastapi import Depends
from internal.common.schemas.common import DeleteRequest
from internal.common.schemas.training_session import (
    CreateTrainingSessionRequest,
    ListTrainingSessionRequest,
    UpdateTrainingSessionRequest
)
from internal.common.types import ID
from internal.controller.training_session import TrainingSessionController

from tools.uts_exception import exception_handler


class TrainingSessionHandler:
    controller: TrainingSessionController

    def __init__(self, controller: TrainingSessionController):
        self.controller = controller

    @exception_handler
    async def create_training_session(self, create_req: CreateTrainingSessionRequest):
        return await self.controller.create_training_session(create_req)

    @exception_handler
    async def get_training_session_by_id(self, training_session_id: ID):
        return await self.controller.get_training_session_by_id(training_session_id)

    @exception_handler
    async def update_training_session(
        self,
        training_session_id: ID,
        update_req: UpdateTrainingSessionRequest
    ):
        return await self.controller.update_training_session(training_session_id, update_req)

    @exception_handler
    async def get_list_training_session(self, list_req: ListTrainingSessionRequest = Depends()):
        return await self.controller.get_list_training_session(list_req)

    @exception_handler
    async def delete_training_session(self, delete_req: DeleteRequest = Depends()):
        return await self.controller.delete_training_session(delete_req.ids)
