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
from internal.common.schemas.feedback import FeedbackResponse
from internal.common.types import ID
from internal.models.training_session import TrainingSessions
from internal.models.user import User


class Feedbacks(Base):
    __tablename__ = "feedback"
    id: Mapped[ID] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[Optional[ID]] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    session_id: Mapped[Optional[ID]] = mapped_column(BigInteger, ForeignKey(
        "training_sessions.id", ondelete="CASCADE"), nullable=True)
    context: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    user: Mapped[Optional["User"]] = relationship(
        "User", backref="feedback", lazy="selectin")
    session: Mapped[Optional["TrainingSessions"]] = relationship(
        "TrainingSessions", backref="feedback", lazy="selectin")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), default=datetime.now(), nullable=False)

    def view(self) -> FeedbackResponse:
        return FeedbackResponse(
            id=self.id,
            user_id=self.user_id,
            session_id=self.session_id,
            context=self.context,
            user=self.user.view() if self.user is not None else None,
            session=self.session.view() if self.session is not None else None,
            created_at=int(self.created_at.timestamp() * 1000),
            updated_at=int(self.updated_at.timestamp() * 1000),
        )


class FeedbackFilterSet(FilterSet):
    query = SearchFilter(Feedbacks.context)
    ordering = OrderingFilter(
        created_at=OrderingField(Feedbacks.created_at),
        updated_at=OrderingField(Feedbacks.updated_at),
    )
