from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.student import (
    ExceptionParentNotFound,
    ExceptionStudentNotFound,
    ExceptionTeamNotFound
)
from internal.common.schemas.student import (
    CreateStudentRequest,
    ListStudentRequest,
    ListStudentResponse,
    StudentResponse,
    UpdateStudentRequest
)
from internal.common.types import ID
from internal.repository.registry import Registry


class StudentController:
    repo: Registry

    def __init__(self, repo: Registry):
        self.repo = repo

    async def create_student(self, create_req: CreateStudentRequest) -> StudentResponse:
        async def _create_student(session: AsyncSession):
            user = await self.repo.user_repo().get_user_by_id(session, create_req.user_id)
            if user is None:
                raise ExceptionStudentNotFound(student_id=create_req.user_id)
            team = await self.repo.team_repo().get_team_by_id(session, create_req.team_id)
            if team is None:
                raise ExceptionTeamNotFound(team_id=create_req.team_id)
            parent = await self.repo.user_repo().get_user_by_id(session, create_req.parent_id)
            if parent is None:
                raise ExceptionParentNotFound(parent_id=create_req.parent_id)
            student = await self.repo.student_repo().create_student(session, create_req)
            return student.view()
        return await self.repo.do_tx(_create_student)

    async def get_student_by_id(self, student_id: ID) -> StudentResponse:
        async def _get_student_by_id(session: AsyncSession):
            student = await self.repo.student_repo().get_student_by_id(session, student_id)
            return student.view()
        return await self.repo.do_tx(_get_student_by_id)

    async def update_student(
        self,
        student_id: ID,
        update_req: UpdateStudentRequest
    ) -> StudentResponse:
        async def _update_student(session: AsyncSession):
            user = await self.repo.user_repo().get_user_by_id(session, update_req.user_id)
            if user is None:
                raise ExceptionStudentNotFound(student_id=update_req.user_id)
            team = await self.repo.team_repo().get_team_by_id(session, update_req.team_id)
            if team is None:
                raise ExceptionTeamNotFound(team_id=update_req.team_id)
            parent = await self.repo.user_repo().get_user_by_id(session, update_req.parent_id)
            if parent is None:
                raise ExceptionParentNotFound(parent_id=update_req.parent_id)
            student = await self.repo.student_repo().update_student(session, student_id, update_req)
            return student.view()
        return await self.repo.do_tx(_update_student)

    async def get_list_student(self, list_req: ListStudentRequest) -> ListStudentResponse:
        async def _get_list_student(session: AsyncSession):
            total, students = await self.repo.student_repo().get_list_student(session, list_req)

            return ListStudentResponse(
                total=total,
                students=[student.view() for student in students],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_student)

    async def delete_student(self, student_ids: list[ID]):
        async def _delete_student(session: AsyncSession):
            await self.repo.student_repo().delete_student(session, student_ids)
        return await self.repo.do_tx(_delete_student)
