from pydantic import BaseModel

class ValidationConfig(BaseModel):
    strategy: str
    metric: str