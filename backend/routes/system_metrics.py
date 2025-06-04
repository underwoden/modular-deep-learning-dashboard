# ./backend/routes/system_metrics.py
from fastapi import APIRouter
from utils.system_monitor import get_system_metrics

router = APIRouter()

@router.get("/metrics")
def system_metrics():
    return get_system_metrics()

@router.get("/status")
def system_status():
    metrics = get_system_metrics()
    thresholds = {"cpu_percent": 90, "memory_percent": 90}
    overload = (
        metrics["cpu_percent"] > thresholds["cpu_percent"]
        or metrics["memory_percent"] > thresholds["memory_percent"]
    )
    return {"overload": overload, "metrics": metrics}
