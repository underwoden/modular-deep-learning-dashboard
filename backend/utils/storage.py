# ./backend/utils/storage.py
import os
import json
from typing import Any
from pathlib import Path
from schemas.output import OutputMetrics

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

# Save to user's home directory to avoid user-specific paths
BASE_DIR = os.path.expanduser("~/.modular_dl_dashboard/configs")
os.makedirs(BASE_DIR, exist_ok=True)

def save_config(config: dict, name: str) -> None:
    file_path = os.path.join(BASE_DIR, f"{name}.json")
    with open(file_path, "w") as f:
        json.dump(config, f, indent=2)

def load_config(name: str) -> dict:
    file_path = os.path.join(BASE_DIR, f"{name}.json")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"No config found for '{name}'")
    with open(file_path, "r") as f:
        return json.load(f)

def list_configs() -> list:
    return [f[:-5] for f in os.listdir(BASE_DIR) if f.endswith(".json")]
            
def save_output_metrics(run_id: str, metrics: dict):
    path = OUTPUT_DIR / f"{run_id}.json"
    with open(path, "w") as f:
        json.dump(metrics, f, indent=2)

def load_output_metrics(run_id: str) -> OutputMetrics:
    file_path = OUTPUT_DIR / f"{run_id}.json"
    with open(file_path, "r") as f:
        data = json.load(f)
    return OutputMetrics(**data)

