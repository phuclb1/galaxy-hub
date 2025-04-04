from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.training_session import ExceptionTrainingSessionNotFound
from internal.common.exceptions.user import ExceptionUserNotFound
from internal.common.schemas.registration import (
    CreateRegistrationRequest,
    ListRegistrationRequest,
    ListRegistrationResponse,
    RegistrationResponse,
    UpdateRegistrationRequest
)
from internal.common.types import ID
from internal.repository.registry import Registry


class RegistrationController:
    repo: Registry

    def __init__(self, repo: Registry):
        self.repo = repo

    async def create_registration(
        self,
        create_req: CreateRegistrationRequest
    ) -> RegistrationResponse:
        async def _create_registration(session: AsyncSession):
            user = await self.repo.student_repo().get_student_by_id(session, create_req.student_id)
            if user is None:
                raise ExceptionUserNotFound(user_id=create_req.student_id)
            training_session = await self.repo.training_session_repo().get_training_session_by_id(
                session, create_req.session_id)
            if training_session is None:
                raise ExceptionTrainingSessionNotFound(
                    training_session_id=create_req.session_id)
            registration = await self.repo.registration_repo().create_registration(
                session, create_req
            )
            return registration.view()
        return await self.repo.do_tx(_create_registration)

    async def get_registration_by_id(self, registration_id: ID) -> RegistrationResponse:
        async def _get_registration_by_id(session: AsyncSession):
            registration = await self.repo.registration_repo().get_registration_by_id(
                session, registration_id
            )
            return registration.view()
        return await self.repo.do_tx(_get_registration_by_id)

    async def get_list_registration_by_session_id(
        self,
        session_id: ID,
        list_req: ListRegistrationRequest,
    ) -> ListRegistrationResponse:
        async def _get_list_registration(session: AsyncSession):
            (
                total,
                registrations
            ) = await self.repo.registration_repo().get_list_registration_by_session_id(
                session, session_id, list_req
            )

            return ListRegistrationResponse(
                total=total,
                registrations=[registration.view()
                               for registration in registrations],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_registration)

    async def update_registration(
        self,
        registration_id: ID,
        update_req: UpdateRegistrationRequest
    ) -> RegistrationResponse:
        async def _update_registration(session: AsyncSession):
            if update_req.student_id is not None:
                user = await self.repo.student_repo().get_student_by_id(
                    session, update_req.student_id)
                if user is None:
                    raise ExceptionUserNotFound(user_id=update_req.student_id)
            if update_req.session_id is not None:
                tr_session = await self.repo.training_session_repo().get_training_session_by_id(
                    session, update_req.session_id)
                if tr_session is None:
                    raise ExceptionTrainingSessionNotFound(
                        training_session_id=update_req.session_id)
            registration = await self.repo.registration_repo().update_registration(
                session, registration_id, update_req
            )
            return registration.view()
        return await self.repo.do_tx(_update_registration)

    async def get_list_registration(
        self,
        list_req: ListRegistrationRequest
    ) -> ListRegistrationResponse:
        async def _get_list_registration(session: AsyncSession):
            total, registrations = await self.repo.registration_repo().get_list_registration(
                session, list_req
            )

            return ListRegistrationResponse(
                total=total,
                registrations=[registration.view()
                               for registration in registrations],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_registration)

    async def delete_registration(self, registration_ids: list[ID]):
        async def _delete_registration(session: AsyncSession):
            await self.repo.registration_repo().delete_registration(
                session, registration_ids
            )
        return await self.repo.do_tx(_delete_registration)
