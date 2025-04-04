from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.teams import ExceptionCenterNotFound, ExceptionCoachNotFound
from internal.common.schemas.teams import (
    CreateTeamRequest,
    ListTeamRequest,
    ListTeamResponse,
    TeamResponse,
    UpdateTeamRequest
)
from internal.common.types import ID
from internal.repository.registry import Registry


class TeamController:
    repo: Registry

    def __init__(self, repo: Registry):
        self.repo = repo

    async def create_team(self, create_req: CreateTeamRequest) -> TeamResponse:
        async def _create_team(session: AsyncSession):
            coach = await self.repo.user_repo().get_user_by_id(session, create_req.coach_id)
            if coach is None:
                raise ExceptionCoachNotFound(coach_id=create_req.coach_id)
            center = await self.repo.center_repo().get_center_by_id(session, create_req.center_id)
            if center is None:
                raise ExceptionCenterNotFound(center_id=create_req.center_id)
            team = await self.repo.team_repo().create_team(session, create_req)
            return team.view()
        return await self.repo.do_tx(_create_team)

    async def get_team_by_id(self, team_id: ID) -> TeamResponse:
        async def _get_team_by_id(session: AsyncSession):
            team = await self.repo.team_repo().get_team_by_id(session, team_id)
            return team.view()
        return await self.repo.do_tx(_get_team_by_id)

    async def update_team(self, team_id: ID, update_req: UpdateTeamRequest) -> TeamResponse:
        async def _update_team(session: AsyncSession):
            if update_req.coach_id is not None:
                coach = await self.repo.user_repo().get_user_by_id(session, update_req.coach_id)
                if coach is None:
                    raise ExceptionCoachNotFound(coach_id=update_req.coach_id)
            if update_req.center_id is not None:
                center = await self.repo.center_repo().get_center_by_id(
                    session, update_req.center_id)
                if center is None:
                    raise ExceptionCenterNotFound(
                        center_id=update_req.center_id)
            team = await self.repo.team_repo().update_team(session, team_id, update_req)
            return team.view()
        return await self.repo.do_tx(_update_team)

    async def get_list_team(self, list_req: ListTeamRequest) -> ListTeamResponse:
        async def _get_list_team(session: AsyncSession):
            total, teams = await self.repo.team_repo().get_list_team(session, list_req)

            return ListTeamResponse(
                total=total,
                teams=[team.view() for team in teams],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_team)

    async def delete_team(self, team_ids: list[ID]):
        async def _delete_team(session: AsyncSession):
            await self.repo.team_repo().delete_team(session, team_ids)
        return await self.repo.do_tx(_delete_team)
