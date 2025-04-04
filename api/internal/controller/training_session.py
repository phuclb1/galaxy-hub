from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.training_session import (
    ExceptionCoachNotFound,
    ExceptionTeamNotFound
)
from internal.common.schemas.training_session import (
    CreateTrainingSessionRequest,
    ListTrainingSessionRequest,
    ListTrainingSessionResponse,
    TrainingSessionResponse,
    UpdateTrainingSessionRequest
)
from internal.common.types import ID
from internal.repository.registry import Registry


class TrainingSessionController:
    repo: Registry

    def __init__(self, repo: Registry):
        self.repo = repo

    async def create_training_session(
        self,
        create_req: CreateTrainingSessionRequest
    ) -> TrainingSessionResponse:
        async def _create_training_session(session: AsyncSession):
            coach = await self.repo.user_repo().get_user_by_id(session, create_req.coach_id)
            if coach is None:
                raise ExceptionCoachNotFound(coach_id=create_req.coach_id)
            team = await self.repo.team_repo().get_team_by_id(session, create_req.team_id)
            if team is None:
                raise ExceptionTeamNotFound(team_id=create_req.team_id)
            training_session = await self.repo.training_session_repo().create_training_session(
                session, create_req
            )
            return training_session.view()
        return await self.repo.do_tx(_create_training_session)

    async def get_training_session_by_id(self, training_session_id: ID) -> TrainingSessionResponse:
        async def _get_training_session_by_id(session: AsyncSession):
            training_session = await self.repo.training_session_repo().get_training_session_by_id(
                session, training_session_id
            )
            return training_session.view()
        return await self.repo.do_tx(_get_training_session_by_id)

    async def update_training_session(
        self,
        training_session_id: ID,
        update_req: UpdateTrainingSessionRequest
    ) -> TrainingSessionResponse:
        async def _update_training_session(session: AsyncSession):
            if update_req.coach_id is not None:
                coach = await self.repo.user_repo().get_user_by_id(session, update_req.coach_id)
                if coach is None:
                    raise ExceptionCoachNotFound(coach_id=update_req.coach_id)
            if update_req.team_id is not None:
                team = await self.repo.team_repo().get_team_by_id(session, update_req.team_id)
                if team is None:
                    raise ExceptionTeamNotFound(team_id=update_req.team_id)
            training_session = await self.repo.training_session_repo().update_training_session(
                session, training_session_id, update_req
            )
            return training_session.view()
        return await self.repo.do_tx(_update_training_session)

    async def get_list_training_session(
        self,
        list_req: ListTrainingSessionRequest
    ) -> ListTrainingSessionResponse:
        async def _get_list_training_session(session: AsyncSession):
            (
                total,
                training_sessions
            ) = await self.repo.training_session_repo().get_list_training_session(
                session, list_req
            )

            return ListTrainingSessionResponse(
                total=total,
                training_sessions=[tr_session.view()
                                   for tr_session in training_sessions],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_training_session)

    async def delete_training_session(self, training_session_ids: list[ID]):
        async def _delete_training_session(session: AsyncSession):
            await self.repo.training_session_repo().delete_training_session(
                session, training_session_ids
            )
        return await self.repo.do_tx(_delete_training_session)
