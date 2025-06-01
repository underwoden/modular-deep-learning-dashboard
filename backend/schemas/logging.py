from pydantic import BaseModel

class LoggingConfig(BaseModel):
    log_dir: str
    checkpoint_freq: int