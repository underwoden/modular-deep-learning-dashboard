from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from datetime import datetime, timezone
import uuid
from schemas.training import TrainingConfig
from schemas.output import OutputMetrics
from utils.system_monitor import check_system_status, set_overload_simulation
from utils.training_runner import perform_training, queue_retraining_job
from utils.storage import save_config, load_config, save_output_metrics

router = APIRouter(tags=["Training"])
training_store = {}

simulation_mode = False  # Global toggle for simulation

# --- Schema for Retrain Queue ---
class RetrainRequest(BaseModel):
    reason: str

class RetrainResponse(BaseModel):
    status: str
    message: str

def generate_simulated_training():
    run_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc)

    loss_curve = [1.0, 0.8, 0.6, 0.4, 0.3]
    accuracy_curve = [0.5, 0.6, 0.7, 0.85, 0.9]
    final_loss = loss_curve[-1]
    final_accuracy = accuracy_curve[-1]

    return {
        "status": "started",
        "run_id": run_id,
        "timestamp": timestamp.isoformat(),
        "loss_curve": loss_curve,
        "accuracy_curve": accuracy_curve,
        "final_loss": final_loss,
        "final_accuracy": final_accuracy,
        "message": "Simulated training started successfully"
    }

@router.post("/start")
def start_training(config: TrainingConfig, force: bool = False):
    global simulation_mode
    if simulation_mode:
        # Return simulated training result immediately
        return generate_simulated_training()

    # Real training path
    status = check_system_status()
    if status["overload"] and not force:
        return {
            "status": "rejected",
            "reason": "System under load",
            "metrics": status["metrics"]
        }

    save_config(config.model_dump(), "training_config")
    loss_curve, accuracy_curve = perform_training(config)
    final_loss = loss_curve[-1]
    final_accuracy = accuracy_curve[-1]
    run_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc)
    output_metrics = OutputMetrics(
        run_id=run_id,
        timestamp=timestamp,
        loss_curve=loss_curve,
        accuracy_curve=accuracy_curve,
        final_loss=final_loss,
        final_accuracy=final_accuracy
    )
    save_output_metrics(run_id, output_metrics.model_dump())

    training_store["active"] = True
    training_store["config"] = config.model_dump()

    return {
        "status": "started",
        "config": config.model_dump(),
        "metrics": status["metrics"],
        "run_id": run_id
    }

@router.post("/simulate/toggle")
def toggle_simulation_mode(enable: bool = Query(...)):
    global simulation_mode
    simulation_mode = enable
    return {
        "simulation_mode": simulation_mode,
        "message": f"Simulation mode {'enabled' if simulation_mode else 'disabled'}."
    }

@router.post("/simulate/overload")
def toggle_overload_simulation(enabled: bool = Query(True)):
    set_overload_simulation(enabled)
    return {
        "override_enabled": enabled,
        "message": "Overload simulation " + ("enabled" if enabled else "disabled")
    }

@router.post("/")
def update_training_config(config: TrainingConfig):
    try:
        save_config(config.model_dump(), "training_config")
        return {"message": "Training config saved", "data": config.model_dump()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=TrainingConfig)
def get_training_config():
    try:
        data = load_config("training_config")
        return TrainingConfig(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Training config not found")

@router.post("/queue-retrain", response_model=RetrainResponse)
def queue_retrain(request: RetrainRequest):
    queue_retraining_job(request.reason)
    return RetrainResponse(
        status="queued",
        message=f"Retraining job has been queued. Reason: {request.reason}"
    )

@router.post("/queue")
def trigger_retraining():
    dummy_config = {
        "model": "stub-model",
        "epochs": 10,
        "lr": 0.001,
    }
    queue_retraining_job(dummy_config)
    return {"status": "queued"}
