from typing import Optional
from datetime import datetime
from uuid import uuid4

import pytz
from loguru import logger
from fastapi import UploadFile

from internal.common.exceptions.common import XBaseException
from internal.common.exceptions.upload_file import (
    ExceptionFileTooLarge,
    ExceptionFileTypeNotAccepted,
    ExceptionMaxUploadFilesExceeded,
)
from internal.common.schemas.upload_file import (
    UploadResponse,
    UploadStatus,
    DeleteBlobsResponse,
)
from internal.gateway.azure_blob_storage_cl import ContainerClient

TIME_ZONE = "Asia/Ho_Chi_Minh"


class BlobUtils:
    def __init__(self, container_client: ContainerClient):
        self.container_client = container_client

    async def _read_file(self, file: UploadFile, max_size: int):
        file_content = bytearray()
        file_size = 0
        while content := await file.read(1024):
            file_size += len(content)
            if file_size > max_size:
                raise ExceptionFileTooLarge(max_size)
            file_content.extend(content)

        return bytes(file_content)

    async def _upload_single_file(
        self,
        file: UploadFile,
        max_file_size: int,
        allowed_content_types: Optional[list[str]],
    ) -> UploadResponse:
        try:
            file_content = await self._read_file(file, max_file_size)
            await file.seek(0)

            if allowed_content_types and file.content_type not in allowed_content_types:
                raise ExceptionFileTypeNotAccepted(file.content_type)
            uploaded_day = (
                datetime
                .now(pytz.timezone(TIME_ZONE))
                .strftime("%Y%m%d")
            )
            filename = f"{uploaded_day}/{uuid4()}___{file.filename}"
            url = self.container_client.upload(filename, file_content)
            return UploadResponse(
                filename=file.filename,
                url=url,
                message="Upload file successfully",
                status=UploadStatus.UPLOADED,
                file_size=len(file_content),
            )
        except XBaseException as e:
            logger.exception(e)
            return UploadResponse(
                filename=file.filename,
                message=e,
                status=UploadStatus.FAILED,
            )
        except Exception as e:  # pylint: disable=broad-except
            logger.exception(e)
            return UploadResponse(
                filename=file.filename,
                message="Internal server error",
                status=UploadStatus.FAILED,
            )

    async def upload_file(
        self,
        file: UploadFile,
        max_file_size: int,
        allowed_content_types: Optional[list[str]] = None,
    ) -> UploadResponse:
        return await self._upload_single_file(
            file, max_file_size, allowed_content_types
        )

    async def upload_files(
        self,
        files: list[UploadFile],
        max_file_size: int,
        max_files: int,
        allowed_content_types: Optional[list[str]] = None,
    ) -> list[UploadResponse]:
        if len(files) > max_files:
            raise ExceptionMaxUploadFilesExceeded(max_files)

        response: list[UploadResponse] = []
        for file in files:
            response.append(
                await self._upload_single_file(
                    file, max_file_size, allowed_content_types
                )
            )
        return response

    async def get_download_url(self, blob_name: str) -> str:
        return self.container_client.get_download_url(blob_name)

    async def download_blob(self, blob_name: str) -> bytes:
        return self.container_client.download_blob(blob_name)

    async def delete_files(self, file_urls: list[str]) -> DeleteBlobsResponse:
        success_deleted_urls: list[str] = []
        for url in file_urls:
            try:
                logger.info(f"Delete blob: {url}")
                self.container_client.delete(url)
                success_deleted_urls.append(url)
            except Exception as e:  # pylint: disable=broad-except
                logger.error(f"Error when deleting blob: {url}.\nError: {e}")
        return DeleteBlobsResponse(
            success_deleted_urls=success_deleted_urls,
            failed_deleted_urls=list(
                set(file_urls) - set(success_deleted_urls)),
            all_deleted=(len(success_deleted_urls) == len(file_urls)),
        )
