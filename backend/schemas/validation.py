# ./backend/schemas/validation.py
from pydantic import BaseModel

class ValidationConfig(BaseModel):
    model_name: str
    dataset: str
    batch_size: int
    validation_split: float
    shuffle: bool
    run_id: str
    metrics: list[str]