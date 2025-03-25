from datetime import datetime
from typing import Optional
from sqlalchemy import String, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy_filterset import FilterSet, OrderingField, OrderingFilter, SearchFilter

from core.database.postgres import Base
from internal.common.schemas.teams import TeamResponse
from internal.common.types import ID
from internal.models.training_center import TrainingCenter
from internal.models.user import User


class Teams(Base):
    __tablename__ = "teams"
    id: Mapped[ID] = mapped_column(BigInteger(), primary_key=True)
    coach_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("users.id"), nullable=True)
    center_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("training_centers.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    coach: Mapped[Optional["User"]] = relationship(
        "User", backref="team", lazy="selectin")
    center: Mapped[Optional["TrainingCenter"]] = relationship(
        "TrainingCenter", backref="team", lazy="selectin")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)

    def view(self) -> TeamResponse:
        return TeamResponse(
            id=self.id,
            coach_id=self.coach_id,
            center_id=self.center_id,
            name=self.name,
            coach=self.coach.view() if self.coach is not None else None,
            center=self.center.view() if self.center is not None else None,
            created_at=int(self.created_at.timestamp() * 1000),
            updated_at=int(self.updated_at.timestamp() * 1000),
        )


class TeamFilterSet(FilterSet):
    query = SearchFilter(Teams.name)
    ordering = OrderingFilter(
        name=OrderingField(Teams.name),
        created_at=OrderingField(Teams.created_at),
        updated_at=OrderingField(Teams.updated_at),
    )
