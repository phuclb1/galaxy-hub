from internal.common.exceptions.common import XBaseException, ExceptionObjectDeleted
from internal.common.types import ID


class ExceptionRegistraionNotFound(XBaseException):
    def __init__(self, registration_id: ID):
        super().__init__(status_code=400,
                         message=f"Registration {registration_id} not found")


class ExceptionRegistrationDeleted(ExceptionObjectDeleted):
    def __init__(self, registration_id: ID):
        super().__init__(object_name=f"Registration {registration_id}")
