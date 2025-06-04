# ./backend/routes/model.py
from utils.storage import save_config, load_config
from fastapi import APIRouter, HTTPException
from schemas.model import ModelConfig

router = APIRouter(tags=["Model"])

model_store = {}

@router.post("/")
def update_model_config(config: ModelConfig):
    try:
        save_config(config.model_dump(), "model_config")
        return {"message": "Model config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=ModelConfig)
def get_model_config():
    try:
        data = load_config("model_config")
        return ModelConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Model config not found")
