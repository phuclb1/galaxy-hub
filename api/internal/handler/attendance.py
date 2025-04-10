from fastapi import Depends
from internal.common.schemas.attendance import (
    CreateAttendanceRequest,
    ListAttendanceRequest,
    UpdateAttendanceRequest
)
from internal.common.schemas.common import DeleteRequest
from internal.common.types import ID
from internal.controller.attendance import AttendanceController

from tools.uts_exception import exception_handler


class AttendanceHandler:
    controller: AttendanceController

    def __init__(self, controller: AttendanceController):
        self.controller = controller

    @exception_handler
    async def create_attendance(self, create_req: CreateAttendanceRequest):
        return await self.controller.create_attendance(create_req)

    @exception_handler
    async def create_multiple_attendance(self, create_req: list[CreateAttendanceRequest]):
        return await self.controller.create_multiple_attendance(create_req)

    @exception_handler
    async def get_attendance_by_id(self, attendance_id: ID):
        return await self.controller.get_attendance_by_id(attendance_id)

    @exception_handler
    async def update_attendance(
        self,
        attendance_id: ID,
        update_req: UpdateAttendanceRequest
    ):
        return await self.controller.update_attendance(attendance_id, update_req)

    @exception_handler
    async def get_list_attendance(self, list_req: ListAttendanceRequest = Depends()):
        return await self.controller.get_list_attendance(list_req)

    @exception_handler
    async def get_list_attendance_by_training_session_id(
        self,
        session_id: ID,
        list_req: ListAttendanceRequest = Depends()
    ):
        return await self.controller.get_list_attendance_by_training_session_id(
            list_req, session_id
        )

    @exception_handler
    async def delete_attendance(self, delete_req: DeleteRequest = Depends()):
        return await self.controller.delete_attendance(delete_req.ids)
