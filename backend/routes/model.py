from fastapi import APIRouter
from schemas.model import ModelConfig

router = APIRouter()

@router.get("/model", response_model=ModelConfig)
def get_model_config():
    return ModelConfig(architecture="CNN", layers=5, activation="relu")

@router.post("/model")
def update_model_config(config: ModelConfig):
    return {"message": "Model config updated"}
