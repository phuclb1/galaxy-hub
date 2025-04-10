from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.training_session import ExceptionTrainingSessionNotFound
from internal.common.exceptions.user import ExceptionUserNotFound
from internal.common.schemas.attendance import (
    AttendanceResponse,
    CreateAttendanceRequest,
    ListAttendanceRequest,
    ListAttendanceResponse,
    UpdateAttendanceRequest
)

from internal.common.types import ID
from internal.repository.registry import Registry


class AttendanceController:
    repo: Registry

    def __init__(self, repo: Registry):
        self.repo = repo

    async def create_attendance(
        self,
        create_req: CreateAttendanceRequest
    ) -> AttendanceResponse:
        async def _create_attendance(session: AsyncSession):
            user = await self.repo.user_repo().get_user_by_id(session, create_req.user_id)
            if user is None:
                raise ExceptionUserNotFound(user_id=create_req.user_id)
            training_session = await self.repo.training_session_repo().get_training_session_by_id(
                session, create_req.session_id)
            if training_session is None:
                raise ExceptionTrainingSessionNotFound(
                    training_session_id=create_req.session_id)
            attendance = await self.repo.attendance_repo().create_attendance(
                session, create_req
            )
            return attendance.view()
        return await self.repo.do_tx(_create_attendance)

    async def create_multiple_attendance(
        self,
        create_reqs: list[CreateAttendanceRequest]
    ) -> list[AttendanceResponse]:
        async def _create_multiple_attendance(session: AsyncSession):
            responses = []
            for create_req in create_reqs:
                # Kiểm tra user và training session giống như trong create_attendance
                user = await self.repo.user_repo().get_user_by_id(session, create_req.user_id)
                if user is None:
                    raise ExceptionUserNotFound(user_id=create_req.user_id)
                tr_session = await self.repo.training_session_repo().get_training_session_by_id(
                    session, create_req.session_id)
                if tr_session is None:
                    raise ExceptionTrainingSessionNotFound(
                        training_session_id=create_req.session_id)

                # Tạo attendance
                attendance = await self.repo.attendance_repo().create_attendance(
                    session, create_req
                )
                responses.append(attendance.view())
            return responses

        return await self.repo.do_tx(_create_multiple_attendance)

    async def get_attendance_by_id(self, attendance_id: ID) -> AttendanceResponse:
        async def _get_attendance_by_id(session: AsyncSession):
            attendance = await self.repo.attendance_repo().get_attendance_by_id(
                session, attendance_id
            )
            return attendance.view()
        return await self.repo.do_tx(_get_attendance_by_id)

    async def update_attendance(
        self,
        attendance_id: ID,
        update_req: UpdateAttendanceRequest
    ) -> AttendanceResponse:
        async def _update_attendance(session: AsyncSession):
            if update_req.user_id is not None:
                user = await self.repo.user_repo().get_user_by_id(
                    session, update_req.user_id)
                if user is None:
                    raise ExceptionUserNotFound(user_id=update_req.user_id)
            if update_req.session_id is not None:
                tr_session = await self.repo.training_session_repo().get_training_session_by_id(
                    session, update_req.session_id)
                if tr_session is None:
                    raise ExceptionTrainingSessionNotFound(
                        training_session_id=update_req.session_id)
            attendance = await self.repo.attendance_repo().update_attendance(
                session, attendance_id, update_req
            )
            return attendance.view()
        return await self.repo.do_tx(_update_attendance)

    async def get_list_attendance(
        self,
        list_req: ListAttendanceRequest
    ) -> ListAttendanceResponse:
        async def _get_list_attendance(session: AsyncSession):
            total, attendances = await self.repo.attendance_repo().get_list_attendance(
                session, list_req
            )

            return ListAttendanceResponse(
                total=total,
                attendances=[attendance.view()
                             for attendance in attendances],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_attendance)

    async def get_list_attendance_by_training_session_id(
        self,
        list_req: ListAttendanceRequest,
        session_id: ID
    ) -> ListAttendanceResponse:
        async def _get_list_attendance_by_training_session_id(session: AsyncSession):
            attendance_repo = self.repo.attendance_repo()
            total, attendances = await attendance_repo.get_list_attendance_by_training_session_id(
                session, list_req, session_id
            )

            return ListAttendanceResponse(
                total=total,
                attendances=[attendance.view()
                             for attendance in attendances],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_attendance_by_training_session_id)

    async def delete_attendance(self, attendance_ids: list[ID]):
        async def _delete_attendance(session: AsyncSession):
            await self.repo.attendance_repo().delete_attendance(
                session, attendance_ids
            )
        return await self.repo.do_tx(_delete_attendance)
