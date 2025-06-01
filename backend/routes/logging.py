from fastapi import APIRouter
from schemas.logging import LoggingConfig

router = APIRouter()

@router.get("/logging", response_model=LoggingConfig)
def get_logging_config():
    return LoggingConfig(log_dir="./logs", checkpoint_freq=5)

@router.post("/logging")
def update_logging_config(config: LoggingConfig):
    return {"message": "Logging config updated"}