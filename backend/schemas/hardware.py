from pydantic import BaseModel

class HardwareConfig(BaseModel):
    device: str
    use_gpu: bool