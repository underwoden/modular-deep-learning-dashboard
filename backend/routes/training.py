from utils.storage import save_config, load_config
from fastapi import APIRouter, HTTPException
from schemas.training import TrainingConfig

router = APIRouter(tags=["Training"])

training_store = {}

@router.post("/training")
def update_training_config(config: TrainingConfig):
    try:
        save_config(config.model_dump(), "training_config")
        return {"message": "Training config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/training", response_model=TrainingConfig)
def get_training_config():
    try:
        data = load_config("training_config")
        return TrainingConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Training config not found")
