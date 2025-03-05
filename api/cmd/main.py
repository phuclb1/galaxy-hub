from typing import Callable

from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
import uvicorn

from core.database.postgres import create_pg_engine
from core.settings import settings
from tools.uts_scheduler import scheduler
from internal.handler.auth import AuthHandler
from internal.handler.user import UserHandler
from internal.controller.auth import AuthController
from internal.controller.user import UserController
from internal.gateway.redis_cl import RedisClient
from internal.middleware.auth import AuthMiddleware
from internal.repository.registry import Registry
from internal.routes.auth import AuthRoute
from internal.routes.user import UserRoute


class App:
    application: FastAPI

    def on_init_app(self) -> Callable:
        async def start_app() -> None:  # pylint: disable=too-many-locals
            pg_engine = create_pg_engine()
            redis_client = RedisClient()
            registry = Registry(pg_engine, redis_client)

            user_controller = UserController(registry)
            auth_controller = AuthController(registry)

            AuthMiddleware().init(auth_controller)

            auth_handler = AuthHandler(auth_controller)
            user_handler = UserHandler(user_controller)

            auth_router = AuthRoute(auth_handler)
            user_router = UserRoute(user_handler)

            prefix = "/api/v1"
            self.application.include_router(
                user_router.router, prefix=prefix + "/users", tags=["Users"]
            )
            self.application.include_router(
                auth_router.router, prefix=prefix + "/auth", tags=["Auth"]
            )

            scheduler.start()

        return start_app

    def on_terminate_app(self) -> Callable:
        @logger.catch
        async def stop_app() -> None:
            pass

        return stop_app

    def __init__(self):
        self.application = FastAPI(**settings.fastapi_kwargs)
        self.application.add_middleware(
            CORSMiddleware,
            allow_origins=settings.allowed_hosts,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        self.application.add_event_handler("startup", self.on_init_app())
        self.application.add_event_handler("shutdown", self.on_terminate_app())


app = App().application

if __name__ == "__main__":
    uvicorn.run("cmd.main:app", host="0.0.0.0", port=8080, reload=True)
