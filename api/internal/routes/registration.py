from fastapi import APIRouter

from internal.common.schemas.registration import ListRegistrationResponse, RegistrationResponse
from internal.handler.registration import RegistrationHandler


class RegistrationRoute:
    router: APIRouter
    handler: RegistrationHandler

    def __init__(self, handler: RegistrationHandler):
        self.router = APIRouter()
        self.handler = handler

        self.router.add_api_route(
            path="",
            endpoint=self.handler.create_registration,
            methods=["POST"],
            response_model=RegistrationResponse,
            summary="Create registration",
            description="Create registration",
        )

        self.router.add_api_route(
            path="/{registration_id}",
            endpoint=self.handler.get_registration_by_id,
            methods=["GET"],
            response_model=RegistrationResponse,
            summary="Get registration by ID",
            description="Get registration by ID",
        )

        self.router.add_api_route(
            path="/{registration_id}",
            endpoint=self.handler.update_registration,
            methods=["PUT"],
            response_model=RegistrationResponse,
            summary="Update registration",
            description="Update registration",
        )

        self.router.add_api_route(
            path="/session/{session_id}",
            endpoint=self.handler.get_list_registration_by_session_id,
            methods=["GET"],
            response_model=ListRegistrationResponse,
            summary="Get list registration by session id",
            description="Get list registration by session id",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.get_list_registration,
            methods=["GET"],
            response_model=ListRegistrationResponse,
            summary="Get list registration",
            description="Get list registration",
        )

        self.router.add_api_route(
            path="",
            endpoint=self.handler.delete_registration,
            methods=["DELETE"],
            summary="Delete registrations",
            description="Delete registrations"
        )
