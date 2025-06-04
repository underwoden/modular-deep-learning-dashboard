// ./frontend/src/components/BestRunSummary.tsx
import React, { useEffect, useState } from "react";
import { OutputMetrics } from "../types/output";

const BestRunSummary: React.FC = () => {
  const [best, setBest] = useState<OutputMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/outputs/best?metric=loss")
      .then(res => {
        if (!res.ok) throw new Error("No best run found");
        return res.json();
      })
      .then(data => setBest(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!best) return <div>Loading best run...</div>;

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">📈 Best Run Summary</h2>
      <p><strong>Run ID:</strong> {best.run_id}</p>
      <p><strong>Timestamp:</strong> {new Date(best.timestamp).toLocaleString()}</p>
      <p><strong>Final Loss:</strong> {best.final_loss.toFixed(4)}</p>
      <p><strong>Final Accuracy:</strong> {best.final_accuracy.toFixed(4)}</p>
    </div>
  );
};

export default BestRunSummary;
