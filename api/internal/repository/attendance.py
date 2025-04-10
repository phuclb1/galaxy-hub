from datetime import datetime
from snowflake import SnowflakeGenerator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.attendance import ExceptionAttendanceNotFound
from internal.common.schemas.attendance import (
    CreateAttendanceRequest,
    ListAttendanceRequest,
    UpdateAttendanceRequest
)
from internal.common.types import ID
from internal.gateway.redis_cl import RedisClient
from internal.models.attendance import AttendanceFilterSet, Attendances


class AttendanceRepository:
    generator: SnowflakeGenerator
    redis_client: RedisClient

    def __init__(self, redis_client: RedisClient):
        self.generator = SnowflakeGenerator(42)
        self.redis_client = redis_client

    async def create_attendance(
        self,
        session: AsyncSession,
        create_req: CreateAttendanceRequest
    ) -> Attendances:
        attendance = Attendances(
            id=round(next(self.generator)),
            user_id=create_req.user_id,
            session_id=create_req.session_id,
            status=create_req.status,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(attendance)
        await session.flush()
        return attendance

    async def get_attendance_by_id(
        self,
        session: AsyncSession,
        attendance_id: ID
    ) -> Attendances:
        stmt = (
            select(Attendances)
            .where(Attendances.id == attendance_id)
        )
        res = (await session.scalars(stmt)).first()
        if res is None:
            raise ExceptionAttendanceNotFound(
                attendance_id=attendance_id)
        return res

    async def get_list_attendance_by_training_session_id(
        self,
        session: AsyncSession,
        filter_req: ListAttendanceRequest,
        session_id: ID
    ) -> tuple[int, list[Attendances]]:
        stmt = (
            select(Attendances)
            .where(Attendances.session_id == session_id)
        )
        filter_set = AttendanceFilterSet(session, stmt)
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

    async def get_list_attendance(
        self,
        session: AsyncSession,
        filter_req: ListAttendanceRequest
    ) -> tuple[int, list[Attendances]]:
        stmt = select(Attendances)
        filter_set = AttendanceFilterSet(session, stmt)
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

    async def update_attendance(
        self,
        session: AsyncSession,
        attendance_id: ID,
        update_req: UpdateAttendanceRequest
    ) -> Attendances:
        attendance = await self.get_attendance_by_id(session, attendance_id)

        model_attrs = list(UpdateAttendanceRequest.model_fields.keys())
        for attr in vars(update_req):
            value = getattr(update_req, attr)
            if attr in model_attrs and value is not None:
                setattr(attendance, attr, value)
        return attendance

    async def delete_attendance(self, session: AsyncSession, attendance_ids: list[ID]):
        stmt = (
            select(Attendances)
            .where(Attendances.id.in_(attendance_ids))
        )
        res = (await session.scalars(stmt)).all()
        for team in res:
            await session.delete(team)
