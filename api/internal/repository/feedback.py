from datetime import datetime
from snowflake import SnowflakeGenerator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.feedback import ExceptionFeedbackNotFound
from internal.common.schemas.feedback import (
    CreateFeedbackRequest,
    ListFeedbackRequest,
    UpdateFeedbackRequest
)
from internal.common.types import ID
from internal.gateway.redis_cl import RedisClient
from internal.models.feedback import FeedbackFilterSet, Feedbacks


class FeedbackRepository:
    generator: SnowflakeGenerator
    redis_client: RedisClient

    def __init__(self, redis_client: RedisClient):
        self.generator = SnowflakeGenerator(42)
        self.redis_client = redis_client

    async def create_feedback(
        self,
        session: AsyncSession,
        create_req: CreateFeedbackRequest
    ) -> Feedbacks:
        feedback = Feedbacks(
            id=round(next(self.generator)),
            user_id=create_req.user_id,
            session_id=create_req.session_id,
            context=create_req.context,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(feedback)
        await session.flush()
        return feedback

    async def get_feedback_by_id(
        self,
        session: AsyncSession,
        feedback_id: ID
    ) -> Feedbacks:
        stmt = (
            select(Feedbacks)
            .where(Feedbacks.id == feedback_id)
        )
        res = (await session.scalars(stmt)).first()
        if res is None:
            raise ExceptionFeedbackNotFound(
                feedback_id=feedback_id)
        return res

    async def get_list_feedback(
        self,
        session: AsyncSession,
        filter_req: ListFeedbackRequest
    ) -> tuple[int, list[Feedbacks]]:
        stmt = select(Feedbacks)
        filter_set = FeedbackFilterSet(session, stmt)
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

    async def update_feedback(
        self,
        session: AsyncSession,
        feedback_id: ID,
        update_req: UpdateFeedbackRequest
    ) -> Feedbacks:
        feedback = await self.get_feedback_by_id(session, feedback_id)

        model_attrs = list(UpdateFeedbackRequest.model_fields.keys())
        for attr in vars(update_req):
            value = getattr(update_req, attr)
            if attr in model_attrs and value is not None:
                setattr(feedback, attr, value)
        return feedback

    async def delete_feedback(self, session: AsyncSession, feedback_ids: list[ID]):
        stmt = (
            select(Feedbacks)
            .where(Feedbacks.id.in_(feedback_ids))
        )
        res = (await session.scalars(stmt)).all()
        for team in res:
            await session.delete(team)
