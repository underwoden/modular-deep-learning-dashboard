# ./backend/utils/system_monitor.py
import psutil

def get_system_metrics():
    memory = psutil.virtual_memory()
    return {
        "cpu_percent": psutil.cpu_percent(interval=0.2),
        "memory_percent": memory.percent,
        "total_memory": memory.total,
        "used_memory": memory.used,
    }

def check_system_status(threshold=90):
    """
    Checks if the system is under high load based on CPU or memory usage.
    Returns a dict with overload status and current metrics.
    """
    metrics = get_system_metrics()
    overload = (
        metrics["cpu_percent"] > threshold or
        metrics["memory_percent"] > threshold
    )
    return {
        "overload": overload,
        "metrics": metrics
    }

_simulate_overload = False  # module-level toggle flag

def set_overload_simulation(enabled: bool):
    global _simulate_overload
    _simulate_overload = enabled

def get_simulation_flag():
    return _simulate_overload

def get_system_metrics():
    if _simulate_overload:
        return {
            "cpu_percent": 95.0,
            "memory_percent": 95.0,
            "total_memory": 3000000000,
            "used_memory": 2800000000,
        }

    memory = psutil.virtual_memory()
    return {
        "cpu_percent": psutil.cpu_percent(interval=0.2),
        "memory_percent": memory.percent,
        "total_memory": memory.total,
        "used_memory": memory.used,
    }

def check_system_status(threshold=90):
    metrics = get_system_metrics()
    overload = (
        metrics["cpu_percent"] > threshold or
        metrics["memory_percent"] > threshold
    )
    return {
        "overload": overload,
        "metrics": metrics
    }

