# ./backend/routes/outputs.py
from fastapi import APIRouter, HTTPException, Query
from utils.storage import load_output_metrics
from utils.analysis import should_retrain, find_best_run, suggest_next_hyperparameters
from schemas.output import OutputMetrics, RetrainSuggestion, Metric

router = APIRouter()

@router.get("/outputs/{run_id}/suggest_retrain", response_model=RetrainSuggestion)
def suggest_retrain(run_id: str, threshold: float = Query(0.8, ge=0.0, le=1.0)):
    """
    Check whether a specific run should trigger retraining based on threshold.
    """
    try:
        metrics = load_output_metrics(run_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Run not found")

    retrain = should_retrain(metrics, accuracy_threshold=threshold)
    reason = f"Accuracy {metrics.final_accuracy:.2f} below threshold {threshold:.2f}" if retrain else "Accuracy meets threshold"
    return RetrainSuggestion(retrain=retrain, reason=reason)

@router.get("/outputs/best", response_model=OutputMetrics)
def get_best_run(metric: Metric = Metric.loss):
    """
    Get the best performing training run based on chosen metric.
    """
    best = find_best_run(metric)
    if not best:
        raise HTTPException(status_code=404, detail="No valid runs found.")
    return best

@router.get("/outputs/retrain-suggested", response_model=RetrainSuggestion)
def retrain_suggested(threshold: float = Query(0.8, ge=0.0, le=1.0)):
    """
    Suggest whether a new training run is needed based on current best accuracy.
    """
    best_run = find_best_run(metric="accuracy")
    if not best_run:
        return RetrainSuggestion(retrain=True, reason="No runs found")

    retrain = should_retrain(best_run, accuracy_threshold=threshold)
    reason = f"Best accuracy {best_run.final_accuracy:.2f} below threshold {threshold:.2f}" if retrain else "Current model is sufficient"

    return RetrainSuggestion(retrain=retrain, reason=reason)

@router.get("/outputs/suggest-hyperparams")
def get_suggested_hyperparameters():
    """
    Return a suggested hyperparameter config using stub Bayesian optimization logic.
    """
    suggestion = suggest_next_hyperparameters()
    return {"suggested_config": suggestion}

