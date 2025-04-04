from internal.common.exceptions.common import XBaseException, ExceptionObjectDeleted
from internal.common.types import ID


class ExceptionTrainingSessionNotFound(XBaseException):
    def __init__(self, training_session_id: ID):
        super().__init__(status_code=400,
                         message=f"Training session {training_session_id} not found")


class ExceptionTrainingSessionDeleted(ExceptionObjectDeleted):
    def __init__(self, training_session_id: ID):
        super().__init__(object_name=f"Training session {training_session_id}")


class ExceptionTrainingSessionAlreadyExists(XBaseException):
    def __init__(self, name: str):
        super().__init__(status_code=400,
                         message=f"Training session with name {name} already exists")


class ExceptionCoachNotFound(XBaseException):
    def __init__(self, coach_id: ID):
        super().__init__(status_code=400,
                         message=f"Coach {coach_id} not found")


class ExceptionTeamNotFound(XBaseException):
    def __init__(self, team_id: ID):
        super().__init__(status_code=400,
                         message=f"Team {team_id} not found")
