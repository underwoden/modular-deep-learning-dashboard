from fastapi import APIRouter
from schemas.training import TrainingConfig

router = APIRouter()

@router.get("/training", response_model=TrainingConfig)
def get_training_config():
    return TrainingConfig(epochs=10, batch_size=32, learning_rate=0.001)

@router.post("/training")
def update_training_config(config: TrainingConfig):
    return {"message": "Training config updated"}