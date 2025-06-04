# ./backend/schemas/hardware.py
from pydantic import BaseModel

class HardwareConfig(BaseModel):
    device: str
    num_workers: int
    memory_limit_gb: int