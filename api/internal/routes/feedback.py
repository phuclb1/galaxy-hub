from fastapi import APIRouter

from internal.common.schemas.feedback import FeedbackResponse, ListFeedbackResponse
from internal.handler.feedback import FeedbackHandler


class FeedbackRoute:
    router: APIRouter
    handler: FeedbackHandler

    def __init__(self, handler: FeedbackHandler):
        self.router = APIRouter()
        self.handler = handler

        self.router.add_api_route(
            path="",
            endpoint=self.handler.create_feedback,
            methods=["POST"],
            response_model=FeedbackResponse,
            summary="Create feedback",
            description="Create feedback",
        )

        self.router.add_api_route(
            path="/{feedback_id}",
            endpoint=self.handler.get_feedback_by_id,
            methods=["GET"],
            response_model=FeedbackResponse,
            summary="Get feedback by ID",
            description="Get feedback by ID",
        )

        self.router.add_api_route(
            path="/{feedback_id}",
            endpoint=self.handler.update_feedback,
            methods=["PUT"],
            response_model=FeedbackResponse,
            summary="Update feedback",
            description="Update feedback",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.get_list_feedback,
            methods=["GET"],
            response_model=ListFeedbackResponse,
            summary="Get list feedback",
            description="Get list feedback",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.delete_feedback,
            methods=["DELETE"],
            summary="Delete feedbacks",
            description="Delete feedbacks"
        )
