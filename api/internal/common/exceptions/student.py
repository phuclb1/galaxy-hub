from internal.common.exceptions.common import XBaseException, ExceptionObjectDeleted
from internal.common.types import ID


class ExceptionStudentNotFound(XBaseException):
    def __init__(self, student_id: ID):
        super().__init__(status_code=400,
                         message=f"Student {student_id} not found")


class ExceptionStudentDeleted(ExceptionObjectDeleted):
    def __init__(self, student_id: ID):
        super().__init__(object_name=f"Student {student_id}")


class ExceptionStudentAlreadyExists(XBaseException):
    def __init__(self, name: str):
        super().__init__(status_code=400,
                         message=f"Student with name {name} already exists")


class ExceptionTeamNotFound(XBaseException):
    def __init__(self, team_id: ID):
        super().__init__(status_code=400,
                         message=f"Team {team_id} not found")


class ExceptionParentNotFound(XBaseException):
    def __init__(self, parent_id: ID):
        super().__init__(status_code=400,
                         message=f"Parent {parent_id} not found")
