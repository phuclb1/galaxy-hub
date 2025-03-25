from fastapi import Depends
from internal.common.schemas.common import DeleteRequest
from internal.common.schemas.student import (
    CreateStudentRequest,
    ListStudentRequest,
    UpdateStudentRequest
)
from internal.common.types import ID
from internal.controller.student import StudentController

from tools.uts_exception import exception_handler


class StudentHandler:
    controller: StudentController

    def __init__(self, controller: StudentController):
        self.controller = controller

    @exception_handler
    async def create_student(self, create_req: CreateStudentRequest):
        return await self.controller.create_student(create_req)

    @exception_handler
    async def get_student_by_id(self, student_id: ID):
        return await self.controller.get_student_by_id(student_id)

    @exception_handler
    async def update_student(self, student_id: ID, update_req: UpdateStudentRequest):
        return await self.controller.update_student(student_id, update_req)

    @exception_handler
    async def get_list_student(self, list_req: ListStudentRequest = Depends()):
        return await self.controller.get_list_student(list_req)

    @exception_handler
    async def delete_student(self, delete_req: DeleteRequest = Depends()):
        return await self.controller.delete_student(delete_req.ids)
