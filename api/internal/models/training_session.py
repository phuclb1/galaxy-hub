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
from internal.common.enums.training_session import TrainingSessionType
from internal.common.schemas.training_session import TrainingSessionResponse
from internal.common.types import ID
from internal.models.teams import Teams
from internal.models.user import User


class TrainingSessions(Base):
    __tablename__ = "training_sessions"
    id: Mapped[ID] = mapped_column(BigInteger(), primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    coach_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    team_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("teams.id", ondelete="CASCADE"), nullable=True)
    start_date: Mapped[datetime] = mapped_column(
        DateTime(), nullable=False)
    session_type: Mapped[Optional[TrainingSessionType]] = mapped_column(
        String(255), nullable=False)
    coach: Mapped[Optional["User"]] = relationship(
        "User", backref="trainingsession", lazy="selectin")
    team: Mapped[Optional["Teams"]] = relationship(
        "Teams", backref="trainingsession", lazy="selectin")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)

    def view(self) -> TrainingSessionResponse:
        return TrainingSessionResponse(
            id=self.id,
            name=self.name,
            coach_id=self.coach_id,
            team_id=self.team_id,
            start_date=int(self.start_date.timestamp() * 1000),
            session_type=self.session_type,
            coach=self.coach.view() if self.coach is not None else None,
            team=self.team.view() if self.team is not None else None,
            created_at=int(self.created_at.timestamp() * 1000),
            updated_at=int(self.updated_at.timestamp() * 1000),
        )


class TrainingSessionFilterSet(FilterSet):
    query = SearchFilter(TrainingSessions.id)
    type = SearchFilter(TrainingSessions.session_type)
    ordering = OrderingFilter(
        created_at=OrderingField(TrainingSessions.created_at),
        updated_at=OrderingField(TrainingSessions.updated_at),
    )
