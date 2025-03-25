from fastapi import Depends
from internal.common.schemas.common import DeleteRequest
from internal.common.schemas.teams import CreateTeamRequest, ListTeamRequest, UpdateTeamRequest
from internal.common.types import ID
from internal.controller.teams import TeamController

from tools.uts_exception import exception_handler


class TeamHandler:
    controller: TeamController

    def __init__(self, controller: TeamController):
        self.controller = controller

    @exception_handler
    async def create_team(self, create_req: CreateTeamRequest):
        return await self.controller.create_team(create_req)

    @exception_handler
    async def get_team_by_id(self, team_id: ID):
        return await self.controller.get_team_by_id(team_id)

    @exception_handler
    async def update_team(self, team_id: ID, update_req: UpdateTeamRequest):
        return await self.controller.update_team(team_id, update_req)

    @exception_handler
    async def get_list_team(self, list_req: ListTeamRequest = Depends()):
        return await self.controller.get_list_team(list_req)

    @exception_handler
    async def delete_team(self, delete_req: DeleteRequest = Depends()):
        return await self.controller.delete_team(delete_req.ids)
