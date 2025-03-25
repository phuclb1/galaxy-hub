from internal.common.exceptions.common import XBaseException, ExceptionObjectDeleted
from internal.common.types import ID


class ExceptionTeamNotFound(XBaseException):
    def __init__(self, team_id: ID):
        super().__init__(status_code=400,
                         message=f"Team {team_id} not found")


class ExceptionTeamDeleted(ExceptionObjectDeleted):
    def __init__(self, team_id: ID):
        super().__init__(object_name=f"Team {team_id}")


class ExceptionTeamAlreadyExists(XBaseException):
    def __init__(self, name: str):
        super().__init__(status_code=400,
                         message=f"Team with name {name} already exists")


class ExceptionCoachNotFound(XBaseException):
    def __init__(self, coach_id: ID):
        super().__init__(status_code=400,
                         message=f"Coach {coach_id} not found")


class ExceptionCenterNotFound(XBaseException):
    def __init__(self, center_id: ID):
        super().__init__(status_code=400,
                         message=f"Center {center_id} not found")
