from fastapi import APIRouter

from internal.common.schemas.training_session import (
    ListTrainingSessionResponse,
    TrainingSessionResponse
)
from internal.handler.training_session import TrainingSessionHandler


class TrainingSessionRoute:
    router: APIRouter
    handler: TrainingSessionHandler

    def __init__(self, handler: TrainingSessionHandler):
        self.router = APIRouter()
        self.handler = handler

        self.router.add_api_route(
            path="",
            endpoint=self.handler.create_training_session,
            methods=["POST"],
            response_model=TrainingSessionResponse,
            summary="Create training session",
            description="Create training session",
        )

        self.router.add_api_route(
            path="/{training_session_id}",
            endpoint=self.handler.get_training_session_by_id,
            methods=["GET"],
            response_model=TrainingSessionResponse,
            summary="Get training by ID",
            description="Get training by ID",
        )

        self.router.add_api_route(
            path="/{training_session_id}",
            endpoint=self.handler.update_training_session,
            methods=["PUT"],
            response_model=TrainingSessionResponse,
            summary="Update training session",
            description="Update training session",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.get_list_training_session,
            methods=["GET"],
            response_model=ListTrainingSessionResponse,
            summary="Get list training session",
            description="Get list training session",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.delete_training_session,
            methods=["DELETE"],
            summary="Delete training sessions",
            description="Delete training sessions"
        )
