# ./backend/utils/analysis.py
from utils.storage import OUTPUT_DIR, load_output_metrics
from schemas.output import OutputMetrics
import os
from typing import Optional

def find_best_run(metric: str = "loss") -> Optional[OutputMetrics]:
    """
    Scan all saved output metrics and return the best run based on the selected metric.
    Metric can be "loss" (lowest final_loss) or "accuracy" (highest final_accuracy).
    """
    best_run = None

    for file in os.listdir(OUTPUT_DIR):
        if not file.endswith(".json"):
            continue
        try:
            run_id = file[:-5]  # strip .json
            metrics = load_output_metrics(run_id)

            if not best_run:
                best_run = metrics
            else:
                if metric == "loss" and metrics.final_loss < best_run.final_loss:
                    best_run = metrics
                elif metric == "accuracy" and metrics.final_accuracy > best_run.final_accuracy:
                    best_run = metrics
        except Exception as e:
            print(f"Skipping file {file} due to error: {e}")
            continue

    return best_run

def should_retrain(metrics: OutputMetrics, accuracy_threshold: float = 0.8) -> bool:
    return metrics.final_accuracy < accuracy_threshold

def suggest_next_hyperparameters():
    """
    Stub for Bayesian optimization logic.
    Returns a suggested hyperparameter configuration based on past runs.
    """
    print("[suggest_next_hyperparameters] Stub called.")

    # In a full implementation, this would use bayes_opt, optuna, or scikit-optimize.
    # For now, return a dummy configuration that could be tuned.
    return {
        "lr": 0.001,
        "epochs": 10,
        "batch_size": 32,
        "model": "resnet18"
    }
