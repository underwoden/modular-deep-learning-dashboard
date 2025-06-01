from pydantic import BaseModel

class ModelConfig(BaseModel):
    architecture: str
    layers: int
    activation: str