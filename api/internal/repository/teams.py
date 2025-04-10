from datetime import datetime
from snowflake import SnowflakeGenerator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.teams import ExceptionTeamNotFound
from internal.common.schemas.teams import CreateTeamRequest, ListTeamRequest, UpdateTeamRequest
from internal.gateway.redis_cl import RedisClient
from internal.models.teams import TeamFilterSet, Teams
from internal.common.types import ID


class TeamRepository:
    generator: SnowflakeGenerator
    redis_client: RedisClient

    def __init__(self, redis_client: RedisClient):
        self.generator = SnowflakeGenerator(42)
        self.redis_client = redis_client

    async def create_team(
        self,
        session: AsyncSession,
        create_req: CreateTeamRequest
    ) -> Teams:
        team = Teams(
            id=round(next(self.generator)),
            coach_id=create_req.coach_id,
            center_id=create_req.center_id,
            name=create_req.name,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(team)
        await session.flush()
        return team

    async def get_team_by_id(self, session: AsyncSession, team_id: ID) -> Teams:
        stmt = (
            select(Teams)
            .where(Teams.id == team_id)
        )
        res = (await session.scalars(stmt)).first()
        if res is None:
            raise ExceptionTeamNotFound(team_id=team_id)
        return res

    async def get_list_team(
        self,
        session: AsyncSession,
        filter_req: ListTeamRequest
    ) -> tuple[int, list[Teams]]:
        stmt = select(Teams)
        filter_set = TeamFilterSet(session, stmt)
        stmt = filter_set.filter_query(
            filter_req.model_dump(exclude_none=True))
        pagination_stmt = stmt
        if filter_req.skip > 0 or filter_req.limit > 0:
            pagination_stmt = stmt.offset(
                filter_req.skip).limit(filter_req.limit)

        total_res = (await session.scalars(stmt)).all()
        res = (await session.scalars(pagination_stmt)).all()
        if not res:
            res = []
        return len(total_res), res

    async def update_team(
        self,
        session: AsyncSession,
        team_id: ID,
        update_req: UpdateTeamRequest
    ) -> Teams:
        team = await self.get_team_by_id(session, team_id)

        model_attrs = list(UpdateTeamRequest.model_fields.keys())
        for attr in vars(update_req):
            value = getattr(update_req, attr)
            if attr in model_attrs and value is not None:
                setattr(team, attr, value)
        return team

    async def delete_team(self, session: AsyncSession, team_ids: list[ID]):
        stmt = (
            select(Teams)
            .where(Teams.id.in_(team_ids))
        )
        res = (await session.scalars(stmt)).all()
        for team in res:
            await session.delete(team)
