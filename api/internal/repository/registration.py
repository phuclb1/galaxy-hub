from datetime import datetime
from snowflake import SnowflakeGenerator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.enums.registration import RegistrationStatus
from internal.common.exceptions.registration import ExceptionRegistraionNotFound
from internal.common.schemas.registration import (
    CreateRegistrationRequest,
    ListRegistrationRequest,
    UpdateRegistrationRequest
)
from internal.common.types import ID
from internal.gateway.redis_cl import RedisClient
from internal.models.registration import RegistrationFilterSet, Registrations


class RegistrationRepository:
    generator: SnowflakeGenerator
    redis_client: RedisClient

    def __init__(self, redis_client: RedisClient):
        self.generator = SnowflakeGenerator(42)
        self.redis_client = redis_client

    async def create_registration(
        self,
        session: AsyncSession,
        create_req: CreateRegistrationRequest
    ) -> Registrations:
        registration = Registrations(
            id=round(next(self.generator)),
            student_id=create_req.student_id,
            session_id=create_req.session_id,
            status=RegistrationStatus.PENDING,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(registration)
        await session.flush()
        return registration

    async def get_registration_by_id(
        self,
        session: AsyncSession,
        registration_id: ID
    ) -> Registrations:
        stmt = (
            select(Registrations)
            .where(Registrations.id == registration_id)
        )
        res = (await session.scalars(stmt)).first()
        if res is None:
            raise ExceptionRegistraionNotFound(
                registration_id=registration_id)
        return res

    async def get_list_registration_by_session_id(
        self,
        session: AsyncSession,
        session_id: ID,
        filter_req: ListRegistrationRequest
    ) -> tuple[int, list[Registrations]]:
        stmt = (
            select(Registrations)
            .where(Registrations.session_id == session_id)
        )
        filter_set = RegistrationFilterSet(session, stmt)
        stmt = filter_set.filter_query(
            filter_req.model_dump(exclude_none=True))
        pagination_stmt = stmt
        if filter_req.skip > 0 or filter_req.limit > 0:
            pagination_stmt = stmt.offset(
                filter_req.skip).limit(filter_req.limit)

        total_res = (await session.scalars(stmt)).all()
        res = (await session.scalars(pagination_stmt)).all()
        return len(total_res), res

    async def get_list_registration(
        self,
        session: AsyncSession,
        filter_req: ListRegistrationRequest
    ) -> tuple[int, list[Registrations]]:
        stmt = select(Registrations)
        filter_set = RegistrationFilterSet(session, stmt)
        stmt = filter_set.filter_query(
            filter_req.model_dump(exclude_none=True))
        pagination_stmt = stmt
        if filter_req.skip > 0 or filter_req.limit > 0:
            pagination_stmt = stmt.offset(
                filter_req.skip).limit(filter_req.limit)

        total_res = (await session.scalars(stmt)).all()
        res = (await session.scalars(pagination_stmt)).all()
        return len(total_res), res

    async def update_registration(
        self,
        session: AsyncSession,
        registration_id: ID,
        update_req: UpdateRegistrationRequest
    ) -> Registrations:
        registration = await self.get_registration_by_id(session, registration_id)

        model_attrs = list(UpdateRegistrationRequest.model_fields.keys())
        for attr in vars(update_req):
            value = getattr(update_req, attr)
            if attr in model_attrs and value is not None:
                setattr(registration, attr, value)
        return registration

    async def delete_registration(self, session: AsyncSession, registration_ids: list[ID]):
        stmt = (
            select(Registrations)
            .where(Registrations.id.in_(registration_ids))
        )
        res = (await session.scalars(stmt)).all()
        for team in res:
            await session.delete(team)
