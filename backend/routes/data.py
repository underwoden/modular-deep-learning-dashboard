from fastapi import APIRouter
from schemas.data import DataConfig

router = APIRouter()

@router.get("/data", response_model=DataConfig)
def get_data_config():
    return DataConfig(dataset_path="/data", input_format="csv", output_format="json")

@router.post("/data")
def update_data_config(config: DataConfig):
    return {"message": "Data config updated"}
