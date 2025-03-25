from fastapi import APIRouter

from internal.common.schemas.student import ListStudentResponse, StudentResponse
from internal.handler.student import StudentHandler


class StudentRoute:
    router: APIRouter
    handler: StudentHandler

    def __init__(self, handler: StudentHandler):
        self.router = APIRouter()
        self.handler = handler

        self.router.add_api_route(
            path="",
            endpoint=self.handler.create_student,
            methods=["POST"],
            response_model=StudentResponse,
            summary="Create student",
            description="Create student",
        )

        self.router.add_api_route(
            path="/{student_id}",
            endpoint=self.handler.get_student_by_id,
            methods=["GET"],
            response_model=StudentResponse,
            summary="Get student by ID",
            description="Get student by ID",
        )

        self.router.add_api_route(
            path="/{student_id}",
            endpoint=self.handler.update_student,
            methods=["PUT"],
            response_model=StudentResponse,
            summary="Update student",
            description="Update student",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.get_list_student,
            methods=["GET"],
            response_model=ListStudentResponse,
            summary="Get list student",
            description="Get list student",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.delete_student,
            methods=["DELETE"],
            summary="Delete student",
            description="Delete student"
        )
