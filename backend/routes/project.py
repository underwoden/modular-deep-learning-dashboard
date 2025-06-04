# ./backend/routes/project.py
from fastapi import APIRouter, HTTPException
from schemas.project import ProjectConfig
from utils.storage import save_config, load_config, list_configs

router = APIRouter(tags=["Project"])

@router.post("/")
def create_project(config: ProjectConfig):
    try:
        save_config(config.model_dump(), config.run_id)
        return {"message": "Project config saved", "data": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_projects():
    return list_configs()

@router.get("/{run_id}")
def get_project(run_id: str):
    try:
        return load_config(run_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Config not found")
