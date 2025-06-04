# ./backend/routes/validation.py
from utils.storage import save_config, load_config
from fastapi import APIRouter, HTTPException
from schemas.validation import ValidationConfig

router = APIRouter(tags=["Validation"])

validation_store = {}

@router.post("/")
def update_validation_config(config: ValidationConfig):
    try:
        save_config(config.model_dump(), "validation_config")
        return {"message": "Validation config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=ValidationConfig)
def get_validation_config():
    try:
        data = load_config("validation_config")
        return ValidationConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Validation config not found")
