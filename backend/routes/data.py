from utils.storage import save_config, load_config
from fastapi import APIRouter, HTTPException
from schemas.data import DataConfig

router = APIRouter(tags=["Data"])

data_store = {}

@router.post("/data")
def update_data_config(config: DataConfig):
    try:
        save_config(config.model_dump(), "data_config")
        return {"message": "Data config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/data", response_model=DataConfig)
def get_data_config():
    try:
        data = load_config("data_config")
        return DataConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Data config not found")
