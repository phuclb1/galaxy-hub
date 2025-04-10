from fastapi import APIRouter

from internal.common.schemas.attendance import AttendanceResponse, ListAttendanceResponse
from internal.handler.attendance import AttendanceHandler


class AttendanceRoute:
    router: APIRouter
    handler: AttendanceHandler

    def __init__(self, handler: AttendanceHandler):
        self.router = APIRouter()
        self.handler = handler

        self.router.add_api_route(
            path="",
            endpoint=self.handler.create_attendance,
            methods=["POST"],
            response_model=AttendanceResponse,
            summary="Create attendance",
            description="Create attendance",
        )

        self.router.add_api_route(
            path="/multiple",
            endpoint=self.handler.create_multiple_attendance,
            methods=["POST"],
            response_model=list[AttendanceResponse],
            summary="Create multiple attendance",
            description="Create multiple attendance",
        )

        self.router.add_api_route(
            path="/{attendance_id}",
            endpoint=self.handler.get_attendance_by_id,
            methods=["GET"],
            response_model=AttendanceResponse,
            summary="Get attendance by ID",
            description="Get attendance by ID",
        )

        self.router.add_api_route(
            path="/{attendance_id}",
            endpoint=self.handler.update_attendance,
            methods=["PUT"],
            response_model=AttendanceResponse,
            summary="Update attendance",
            description="Update attendance",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.get_list_attendance,
            methods=["GET"],
            response_model=ListAttendanceResponse,
            summary="Get list attendance",
            description="Get list attendance",
        )

        self.router.add_api_route(
            path="/{session_id}/session",
            endpoint=self.handler.get_list_attendance_by_training_session_id,
            methods=["GET"],
            response_model=ListAttendanceResponse,
            summary="Get list attendance by training session id",
            description="Get list attendance by training session id",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.delete_attendance,
            methods=["DELETE"],
            summary="Delete attendances",
            description="Delete attendances"
        )
