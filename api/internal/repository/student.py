from datetime import datetime
from snowflake import SnowflakeGenerator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.student import ExceptionStudentNotFound
from internal.common.schemas.student import (
    CreateStudentRequest,
    ListStudentRequest,
    UpdateStudentRequest
)
from internal.common.types import ID
from internal.gateway.redis_cl import RedisClient
from internal.models.student import StudentFilterSet, Students


class StudentRepository:
    generator: SnowflakeGenerator
    redis_client: RedisClient

    def __init__(self, redis_client: RedisClient):
        self.generator = SnowflakeGenerator(42)
        self.redis_client = redis_client

    async def create_student(
        self,
        session: AsyncSession,
        create_req: CreateStudentRequest
    ) -> Students:
        student = Students(
            id=round(next(self.generator)),
            user_id=create_req.user_id,
            team_id=create_req.team_id,
            parent_id=create_req.parent_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(student)
        await session.flush()
        return student

    async def get_student_by_id(self, session: AsyncSession, student_id: ID) -> Students:
        stmt = (
            select(Students)
            .where(Students.id == student_id)
        )
        res = (await session.scalars(stmt)).first()
        if res is None:
            raise ExceptionStudentNotFound(student_id=student_id)
        return res

    async def get_list_student(
        self,
        session: AsyncSession,
        filter_req: ListStudentRequest
    ) -> tuple[int, list[Students]]:
        stmt = select(Students)
        filter_set = StudentFilterSet(session, stmt)
        stmt = filter_set.filter_query(
            filter_req.model_dump(exclude_none=True))
        pagination_stmt = stmt
        if filter_req.skip > 0 or filter_req.limit > 0:
            pagination_stmt = stmt.offset(
                filter_req.skip).limit(filter_req.limit)

        total_res = (await session.scalars(stmt)).all()
        res = (await session.scalars(pagination_stmt)).all()

        return len(total_res), res

    async def update_student(
        self,
        session: AsyncSession,
        student_id: ID,
        update_req: UpdateStudentRequest
    ) -> Students:
        student = await self.get_student_by_id(session, student_id)

        model_attrs = list(UpdateStudentRequest.model_fields.keys())
        for attr in vars(update_req):
            value = getattr(update_req, attr)
            if attr in model_attrs and value is not None:
                setattr(student, attr, value)
        return student

    async def delete_student(self, session: AsyncSession, student_ids: list[ID]):
        stmt = (
            select(Students)
            .where(Students.id.in_(student_ids))
        )
        res = (await session.scalars(stmt)).all()
        for student in res:
            await session.delete(student)
