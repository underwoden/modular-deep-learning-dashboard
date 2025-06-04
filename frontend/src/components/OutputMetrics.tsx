// ./frontend/src/components/OutputMetrics.tsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface OutputMetrics {
  run_id: string;
  timestamp: string;
  loss_curve: number[];
  accuracy_curve: number[];
  final_loss: number;
  final_accuracy: number;
}

const OutputMetricsComponent: React.FC<{ runId: string }> = ({ runId }) => {
  const [metrics, setMetrics] = useState<OutputMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  axios.get(`http://localhost:8000/outputs/${runId}`)
  .then(response => {
    const data = response.data;
    if (!data || Object.keys(data).length === 0) {
      setError("No data available for this run.");
      setMetrics(null);
    } else {
      setMetrics(data);
      setError(null);
    }
  })
  .catch(err => {
    console.error("Error fetching output metrics:", err);
    setError("Failed to load metrics.");
  });

  }, [runId]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!metrics) return <div className="p-4 text-gray-500">Loading...</div>;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: false },
    },
    scales: {
      x: { title: { display: true, text: "Epoch" } },
      y: { title: { display: true, text: "Value" } },
    },
  };

  const lossData = {
    labels: metrics.loss_curve.map((_, i) => i + 1),
    datasets: [
      {
        label: "Loss",
        data: metrics.loss_curve,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const accuracyData = {
    labels: metrics.accuracy_curve.map((_, i) => i + 1),
    datasets: [
      {
        label: "Accuracy",
        data: metrics.accuracy_curve,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded-lg">
      <div className="text-gray-700">
        <h2 className="text-xl font-semibold mb-1">Run ID:</h2>
        <p className="mb-2 text-sm">{metrics.run_id}</p>
        <p className="text-sm text-gray-500">
          Timestamp: {new Date(metrics.timestamp).toLocaleString()}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Loss Curve</h3>
        <Line data={lossData} options={chartOptions} />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Accuracy Curve</h3>
        <Line data={accuracyData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OutputMetricsComponent;
