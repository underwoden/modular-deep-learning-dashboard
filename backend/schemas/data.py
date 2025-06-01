from pydantic import BaseModel

class DataConfig(BaseModel):
    dataset_path: str
    input_format: str
    output_format: str