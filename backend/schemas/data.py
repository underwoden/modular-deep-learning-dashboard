# ./backend/schemas/data.py
from pydantic import BaseModel

class DataConfig(BaseModel):
    dataset_name: str
    train_split: float
    shuffle: bool
    preprocessing: str