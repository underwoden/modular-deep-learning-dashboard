# ./backend/routes/hardware.py
from utils.storage import save_config, load_config
from fastapi import APIRouter, HTTPException
from schemas.hardware import HardwareConfig

router = APIRouter(tags=["Hardware"])

hardware_store = {}

@router.post("/")
def update_hardware_config(config: HardwareConfig):
    try:
        save_config(config.model_dump(), "hardware_config")
        return {"message": "Hardware config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=HardwareConfig)
def get_hardware_config():
    try:
        data = load_config("hardware_config")
        return HardwareConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Hardware config not found")
