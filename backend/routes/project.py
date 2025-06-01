from fastapi import APIRouter
from schemas.project import ProjectConfig  # Use correct schema

router = APIRouter(tags=["Project"])  # Customize prefix/tags

# Store submitted projects temporarily (in-memory list)
project_store = []

@router.post("/")
def create_project(config: ProjectConfig):
    project_store.append(config)
    return {"message": "Project created", "data": config}

@router.get("/")
def get_projects():
    return project_store  # Return all stored projects