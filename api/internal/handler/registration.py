from fastapi import Depends
from internal.common.schemas.common import DeleteRequest
from internal.common.schemas.registration import (
    CreateRegistrationRequest,
    ListRegistrationRequest,
    UpdateRegistrationRequest
)
from internal.common.types import ID
from internal.controller.registration import RegistrationController

from tools.uts_exception import exception_handler


class RegistrationHandler:
    controller: RegistrationController

    def __init__(self, controller: RegistrationController):
        self.controller = controller

    @exception_handler
    async def create_registration(self, create_req: CreateRegistrationRequest):
        return await self.controller.create_registration(create_req)

    @exception_handler
    async def get_registration_by_id(self, registration_id: ID):
        return await self.controller.get_registration_by_id(registration_id)

    @exception_handler
    async def update_registration(
        self,
        registration_id: ID,
        update_req: UpdateRegistrationRequest
    ):
        return await self.controller.update_registration(registration_id, update_req)

    @exception_handler
    async def get_list_registration(self, list_req: ListRegistrationRequest = Depends()):
        return await self.controller.get_list_registration(list_req)

    @exception_handler
    async def get_list_registration_by_session_id(
        self,
        session_id: ID,
        list_req: ListRegistrationRequest = Depends()
    ):
        return await self.controller.get_list_registration_by_session_id(session_id, list_req)

    @exception_handler
    async def delete_registration(self, delete_req: DeleteRequest = Depends()):
        return await self.controller.delete_registration(delete_req.ids)
