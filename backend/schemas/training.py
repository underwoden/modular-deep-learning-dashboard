# ./backend/schemas/training.py
from pydantic import BaseModel

class TrainingConfig(BaseModel):
    epochs: int
    batch_size: int
    learning_rate: float