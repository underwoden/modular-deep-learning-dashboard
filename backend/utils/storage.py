import os
import json
from typing import Any

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
