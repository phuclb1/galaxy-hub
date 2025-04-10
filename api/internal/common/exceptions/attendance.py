from internal.common.exceptions.common import XBaseException, ExceptionObjectDeleted
from internal.common.types import ID


class ExceptionAttendanceNotFound(XBaseException):
    def __init__(self, attendance_id: ID):
        super().__init__(status_code=400,
                         message=f"Attendance {attendance_id} not found")


class ExceptionAttendanceDeleted(ExceptionObjectDeleted):
    def __init__(self, attendance_id: ID):
        super().__init__(object_name=f"Attendance {attendance_id}")
