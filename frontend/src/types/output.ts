// ./frontend/src/types/output.ts
export interface OutputMetrics {
  run_id: string;
  timestamp: string;
  loss_curve: number[];
  accuracy_curve: number[];
  final_loss: number;
  final_accuracy: number;
}
