from fastapi import Request
from loguru import logger

from internal.common.exceptions.common import (
    ExceptionUnauthorized,
    ExceptionForbidden
)
from internal.common.schemas.user import UserInfo, UserRole
from internal.controller.auth import AuthController


class AuthMiddleware:
    auth_controller: AuthController

    @classmethod
    def init(cls, auth_controller: AuthController):
        cls.auth_controller = auth_controller

    @classmethod
    async def get_current_user_from_token(cls, hashed_token: str) -> UserInfo:
        if not hashed_token:
            raise ExceptionUnauthorized
        try:
            user = await cls.auth_controller.resolve_token(hashed_token)
            user.hashed_token = hashed_token
            return user
        except Exception as e:
            logger.exception(e)
            raise ExceptionUnauthorized from e

    @classmethod
    async def get_current_user(cls, request: Request) -> UserInfo:
        hashed_token = None
        if "authorization" in request.headers.keys():
            hashed_token = request.headers["authorization"].split(" ")[-1]
        user = await cls.get_current_user_from_token(hashed_token)
        user.hashed_token = hashed_token
        return user

    @classmethod
    async def is_admin_user(cls, request: Request):
        user = await cls.get_current_user(request)
        if user.role != UserRole.ADMIN:
            raise ExceptionForbidden
