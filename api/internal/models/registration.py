from datetime import datetime
from typing import Optional
from sqlalchemy import BigInteger, DateTime, ForeignKey, String
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy_filterset import FilterSet, OrderingField, OrderingFilter, SearchFilter

from core.database.postgres import Base
from internal.common.enums.registration import RegistrationStatus
from internal.common.schemas.registration import RegistrationResponse
from internal.common.types import ID
from internal.models.student import Students
from internal.models.training_session import TrainingSessions


class Registrations(Base):
    __tablename__ = "registrations"
    id: Mapped[ID] = mapped_column(BigInteger(), primary_key=True)
    student_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("students.id", ondelete="CASCADE"), nullable=True)
    session_id: Mapped[Optional[ID]] = mapped_column(BigInteger, ForeignKey(
        "training_sessions.id", ondelete="CASCADE"), nullable=True)
    status: Mapped[Optional[RegistrationStatus]
                   ] = mapped_column(String(255), nullable=False)
    student: Mapped[Optional["Students"]] = relationship(
        "Students", backref="registration", lazy="selectin")
    session: Mapped[Optional["TrainingSessions"]] = relationship(
        "TrainingSessions", backref="registration", lazy="selectin")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)

    def view(self) -> RegistrationResponse:
        return RegistrationResponse(
            id=self.id,
            student_id=self.student_id,
            session_id=self.session_id,
            status=self.status,
            student=self.student.view() if self.student is not None else None,
            session=self.session.view() if self.session is not None else None,
            created_at=int(self.created_at.timestamp() * 1000),
            updated_at=int(self.updated_at.timestamp() * 1000),
        )


class RegistrationFilterSet(FilterSet):
    query = SearchFilter(Registrations.id)
    status = SearchFilter(Registrations.status)
    ordering = OrderingFilter(
        created_at=OrderingField(Registrations.created_at),
        updated_at=OrderingField(Registrations.updated_at),
    )
