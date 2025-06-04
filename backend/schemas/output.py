# ./backend/schemas/output.py
from pydantic import BaseModel
from typing import List
from datetime import datetime
from enum import Enum

class OutputMetrics(BaseModel):
    run_id: str
    timestamp: datetime
    loss_curve: List[float]
    accuracy_curve: List[float]
    final_loss: float
    final_accuracy: float

class RetrainSuggestion(BaseModel):
    retrain: bool
    reason: str

class Metric(str, Enum):
    loss = "loss"
    accuracy = "accuracy"
