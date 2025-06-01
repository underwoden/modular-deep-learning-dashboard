from fastapi import APIRouter
from schemas.hardware import HardwareConfig

router = APIRouter()

@router.get("/hardware", response_model=HardwareConfig)
def get_hardware_config():
    return HardwareConfig(device="cpu", use_gpu=False)

@router.post("/hardware")
def update_hardware_config(config: HardwareConfig):
    return {"message": "Hardware config updated"}
