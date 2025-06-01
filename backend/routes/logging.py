from utils.storage import save_config, load_config
from fastapi import APIRouter, HTTPException
from schemas.logging import LoggingConfig

router = APIRouter(tags=["Logging"])

logging_store = {}

@router.post("/logging")
def update_logging_config(config: LoggingConfig):
    try:
        save_config(config.model_dump(), "logging_config")
        return {"message": "Logging config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/logging", response_model=LoggingConfig)
def get_logging_config():
    try:
        data = load_config("logging_config")
        return LoggingConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Logging config not found")
