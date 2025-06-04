# ./backend/schemas/project.py
from pydantic import BaseModel

class ProjectConfig(BaseModel):
    name: str
    description: str
    run_id: str
