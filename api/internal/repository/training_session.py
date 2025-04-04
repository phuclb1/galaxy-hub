from datetime import datetime
from snowflake import SnowflakeGenerator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.training_session import ExceptionTrainingSessionNotFound
from internal.common.schemas.training_session import (
    CreateTrainingSessionRequest,
    ListTrainingSessionRequest,
    UpdateTrainingSessionRequest
)
from internal.common.types import ID
from internal.gateway.redis_cl import RedisClient
from internal.models.training_session import TrainingSessionFilterSet, TrainingSessions


class TrainingSessionRepository:
    generator: SnowflakeGenerator
    redis_client: RedisClient

    def __init__(self, redis_client: RedisClient):
        self.generator = SnowflakeGenerator(42)
        self.redis_client = redis_client

    async def create_training_session(
        self,
        session: AsyncSession,
        create_req: CreateTrainingSessionRequest
    ) -> TrainingSessions:
        timestamp = create_req.start_date / 1000
        start_date = datetime.fromtimestamp(timestamp)

        training_session = TrainingSessions(
            id=round(next(self.generator)),
            name=create_req.name,
            coach_id=create_req.coach_id,
            team_id=create_req.team_id,
            start_date=start_date,
            session_type=create_req.session_type,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(training_session)
        await session.flush()
        return training_session

    async def get_training_session_by_id(
        self,
        session: AsyncSession,
        training_session_id: ID
    ) -> TrainingSessions:
        stmt = (
            select(TrainingSessions)
            .where(TrainingSessions.id == training_session_id)
        )
        res = (await session.scalars(stmt)).first()
        if res is None:
            raise ExceptionTrainingSessionNotFound(
                training_session_id=training_session_id)
        return res

    async def get_list_training_session(
        self,
        session: AsyncSession,
        filter_req: ListTrainingSessionRequest
    ) -> tuple[int, list[TrainingSessions]]:
        stmt = select(TrainingSessions)
        filter_set = TrainingSessionFilterSet(session, stmt)
        stmt = filter_set.filter_query(
            filter_req.model_dump(exclude_none=True))
        pagination_stmt = stmt
        if filter_req.skip > 0 or filter_req.limit > 0:
            pagination_stmt = stmt.offset(
                filter_req.skip).limit(filter_req.limit)

        total_res = (await session.scalars(stmt)).all()
        res = (await session.scalars(pagination_stmt)).all()
        return len(total_res), res

    async def update_training_session(
        self,
        session: AsyncSession,
        training_session_id: ID,
        update_req: UpdateTrainingSessionRequest
    ) -> TrainingSessions:
        training_session = await self.get_training_session_by_id(session, training_session_id)

        model_attrs = list(UpdateTrainingSessionRequest.model_fields.keys())
        for attr in vars(update_req):
            value = getattr(update_req, attr)
            if attr in model_attrs and value is not None:
                if attr == "start_date" and isinstance(value, int):
                    value = datetime.fromtimestamp(value / 1000)
                setattr(training_session, attr, value)
        return training_session

    async def delete_training_session(self, session: AsyncSession, training_session_ids: list[ID]):
        stmt = (
            select(TrainingSessions)
            .where(TrainingSessions.id.in_(training_session_ids))
        )
        res = (await session.scalars(stmt)).all()
        for team in res:
            await session.delete(team)
