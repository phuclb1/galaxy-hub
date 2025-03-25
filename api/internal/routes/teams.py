from fastapi import APIRouter

from internal.common.schemas.teams import ListTeamResponse, TeamResponse
from internal.handler.teams import TeamHandler


class TeamRoute:
    router: APIRouter
    handler: TeamHandler

    def __init__(self, handler: TeamHandler):
        self.router = APIRouter()
        self.handler = handler

        self.router.add_api_route(
            path="",
            endpoint=self.handler.create_team,
            methods=["POST"],
            response_model=TeamResponse,
            summary="Create team",
            description="Create team",
        )

        self.router.add_api_route(
            path="/{team_id}",
            endpoint=self.handler.get_team_by_id,
            methods=["GET"],
            response_model=TeamResponse,
            summary="Get team by ID",
            description="Get team by ID",
        )

        self.router.add_api_route(
            path="/{team_id}",
            endpoint=self.handler.update_team,
            methods=["PUT"],
            response_model=TeamResponse,
            summary="Update team",
            description="Update team",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.get_list_team,
            methods=["GET"],
            response_model=ListTeamResponse,
            summary="Get list team",
            description="Get list team",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.delete_team,
            methods=["DELETE"],
            summary="Delete teams",
            description="Delete teams"
        )
