from enum import Enum


class TrainingSessionType(str, Enum):
    TRAINING = "Training"
    MATCH = "Match"
    EVALUATION = "Evaluation"
