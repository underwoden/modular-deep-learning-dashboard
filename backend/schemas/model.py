# ./backend/schemas/model.py
from pydantic import BaseModel

class ModelConfig(BaseModel):
    architecture: str
    layers: int
    dropout_rate: float
