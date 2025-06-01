from fastapi import APIRouter
from schemas.validation import ValidationConfig

router = APIRouter()

@router.get("/validation", response_model=ValidationConfig)
def get_validation_config():
    return ValidationConfig(strategy="k-fold", metric="accuracy")

@router.post("/validation")
def update_validation_config(config: ValidationConfig):
    return {"message": "Validation config updated"}