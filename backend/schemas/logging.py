# ./backend/schemas/logging.py
from pydantic import BaseModel

class LoggingConfig(BaseModel):
    log_interval: int
    log_dir: str