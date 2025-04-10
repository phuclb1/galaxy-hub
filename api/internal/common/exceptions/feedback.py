from internal.common.exceptions.common import XBaseException, ExceptionObjectDeleted
from internal.common.types import ID


class ExceptionFeedbackNotFound(XBaseException):
    def __init__(self, feedback_id: ID):
        super().__init__(status_code=400,
                         message=f"Feedback {feedback_id} not found")


class ExceptionFeedbackDeleted(ExceptionObjectDeleted):
    def __init__(self, feedback_id: ID):
        super().__init__(object_name=f"Feedback {feedback_id}")
