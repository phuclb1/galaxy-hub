from datetime import datetime
from typing import Optional
from sqlalchemy import BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy_filterset import FilterSet, OrderingField, OrderingFilter, SearchFilter


from core.database.postgres import Base
from internal.common.schemas.student import StudentResponse
from internal.common.types import ID
from internal.models.teams import Teams
from internal.models.user import User


class Students(Base):
    __tablename__ = "students"
    id: Mapped[ID] = mapped_column(BigInteger(), primary_key=True)
    user_id: Mapped[ID] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    team_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("teams.id", ondelete="SET NULL"), nullable=True)
    parent_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    user: Mapped["User"] = relationship(
        "User", backref="student", lazy="selectin", foreign_keys=[user_id])
    team: Mapped[Optional["Teams"]] = relationship(
        "Teams", backref="student", lazy="selectin", foreign_keys=[team_id])
    parent: Mapped[Optional["User"]] = relationship(
        "User", backref="parent", lazy="selectin", foreign_keys=[parent_id])
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)

    def view(self) -> StudentResponse:
        return StudentResponse(
            id=self.id,
            user_id=self.user_id,
            team_id=self.team_id,
            parent_id=self.parent_id,
            user=self.user.view() if self.user is not None else None,
            team=self.team.view() if self.team is not None else None,
            parent=self.parent.view() if self.parent is not None else None,
            created_at=int(self.created_at.timestamp() * 1000),
            updated_at=int(self.updated_at.timestamp() * 1000),
        )


class StudentFilterSet(FilterSet):
    query = SearchFilter(Students.id)
    ordering = OrderingFilter(
        created_at=OrderingField(Students.created_at),
        updated_at=OrderingField(Students.updated_at),
    )
