from sqlalchemy.ext.asyncio import AsyncSession

from internal.common.exceptions.training_session import ExceptionTrainingSessionNotFound
from internal.common.exceptions.user import ExceptionUserNotFound
from internal.common.schemas.feedback import (
    CreateFeedbackRequest,
    FeedbackResponse,
    ListFeedbackRequest,
    ListFeedbackResponse,
    UpdateFeedbackRequest
)
from internal.common.types import ID
from internal.repository.registry import Registry


class FeedbackController:
    repo: Registry

    def __init__(self, repo: Registry):
        self.repo = repo

    async def create_feedback(
        self,
        create_req: CreateFeedbackRequest
    ) -> FeedbackResponse:
        async def _create_feedback(session: AsyncSession):
            user = await self.repo.user_repo().get_user_by_id(session, create_req.user_id)
            if user is None:
                raise ExceptionUserNotFound(user_id=create_req.user_id)
            training_session = await self.repo.training_session_repo().get_training_session_by_id(
                session, create_req.session_id)
            if training_session is None:
                raise ExceptionTrainingSessionNotFound(
                    training_session_id=create_req.session_id)
            feedback = await self.repo.feedback_repo().create_feedback(
                session, create_req
            )
            return feedback.view()
        return await self.repo.do_tx(_create_feedback)

    async def get_feedback_by_id(self, feedback_id: ID) -> FeedbackResponse:
        async def _get_feedback_by_id(session: AsyncSession):
            feedback = await self.repo.feedback_repo().get_feedback_by_id(
                session, feedback_id
            )
            return feedback.view()
        return await self.repo.do_tx(_get_feedback_by_id)

    async def update_feedback(
        self,
        feedback_id: ID,
        update_req: UpdateFeedbackRequest
    ) -> FeedbackResponse:
        async def _update_feedback(session: AsyncSession):
            if update_req.user_id is not None:
                user = await self.repo.user_repo().get_user_by_id(
                    session, update_req.user_id)
                if user is None:
                    raise ExceptionUserNotFound(user_id=update_req.user_id)
            if update_req.session_id is not None:
                tr_session = await self.repo.training_session_repo().get_training_session_by_id(
                    session, update_req.session_id)
                if tr_session is None:
                    raise ExceptionTrainingSessionNotFound(
                        training_session_id=update_req.session_id)
            feedback = await self.repo.feedback_repo().update_feedback(
                session, feedback_id, update_req
            )
            return feedback.view()
        return await self.repo.do_tx(_update_feedback)

    async def get_list_feedback(
        self,
        list_req: ListFeedbackRequest
    ) -> ListFeedbackResponse:
        async def _get_list_feedback(session: AsyncSession):
            total, feedbacks = await self.repo.feedback_repo().get_list_feedback(
                session, list_req
            )

            return ListFeedbackResponse(
                total=total,
                feedbacks=[feedback.view()
                           for feedback in feedbacks],
                current_page=list_req.page,
                has_next=total > list_req.skip + list_req.limit
            )
        return await self.repo.do_tx(_get_list_feedback)

    async def delete_feedback(self, feedback_ids: list[ID]):
        async def _delete_feedback(session: AsyncSession):
            await self.repo.feedback_repo().delete_feedback(
                session, feedback_ids
            )
        return await self.repo.do_tx(_delete_feedback)
