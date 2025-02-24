from datetime import datetime, timedelta
from abc import ABC

from azure.storage.blob import (
    BlobServiceClient,
    BlobClient,
    generate_blob_sas,
    BlobSasPermissions,
)
from azure.storage.blob._container_client import ContainerClient as AzureContainerClient

from core.settings import settings
from core.singleton import SingletonMeta


class AzureBlobStorage:
    def __init__(self):
        self.service = BlobServiceClient.from_connection_string(
            conn_str=settings.azure_connection_string
        )

    def get_container_client(self, container_name: str):
        return self.service.get_container_client(container=container_name)

    def get_blob_url(self, blob_client: BlobClient):
        return f"{blob_client.container_name}/{blob_client.blob_name}"

    def get_blob_name(self, blob_url: str):
        return blob_url.split("/", 1)[-1]


class ContainerClient(ABC, metaclass=SingletonMeta):
    def __init__(self):
        self.client = AzureBlobStorage()

    @property
    def container(self) -> AzureContainerClient: ...

    def upload(self, filename: str, file_content: bytes):
        blob_client = self.container.get_blob_client(blob=filename)
        blob_client.upload_blob(file_content)
        return self.client.get_blob_url(blob_client)

    def delete(self, blob_url: str):
        blob_name = self.client.get_blob_name(blob_url)
        blob_client = self.container.get_blob_client(blob=blob_name)
        blob_client.delete_blob()

    def get_download_url(self, blob_name: str):
        account_name = self.container.account_name
        account_key = self.container.credential.account_key
        container_name = self.container.container_name
        expired_date = datetime.now() + timedelta(seconds=30)
        sas_token = generate_blob_sas(
            account_name=account_name,
            container_name=container_name,
            blob_name=blob_name,
            account_key=account_key,
            permission=BlobSasPermissions(read=True),  # Grant read permissions
            expiry=expired_date,
        )
        blob_url_with_sas = (
            f"https://{account_name}.blob.core.windows.net/{container_name}/"
            f"{blob_name}?{sas_token}"
        )
        return blob_url_with_sas

    def download_blob(self, blob_name: str):
        blob_client = self.container.get_blob_client(blob=blob_name)
        return blob_client.download_blob().chunks()


class CVPoolContainerClient(ContainerClient):
    @property
    def container(self):
        return self.client.get_container_client(settings.azure_cvpool_container)


class PictureContainerClient(ContainerClient):
    @property
    def container(self):
        return self.client.get_container_client(settings.azure_picture_container)
