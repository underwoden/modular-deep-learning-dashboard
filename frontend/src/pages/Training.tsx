import { useState, useEffect } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Training() {
  const [formData, setFormData] = useState({
    epochs: 10,
    batch_size: 32,
    learning_rate: 0.001,
  });

  const [overloaded, setOverloaded] = useState(false);
  const [forceTraining, setForceTraining] = useState(false);
  const [loading, setLoading] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);
  const [trainingResult, setTrainingResult] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/system/status")
      .then((res) => res.json())
      .then((data) => setOverloaded(data.overload))
      .catch((err) => {
        console.error("Failed to fetch system status:", err);
        setOverloaded(false);
      });
  }, []);

  // Fetch simulation mode status (optional: could be an endpoint)
  // Here we just rely on local toggle for simplicity

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "learning_rate"
          ? parseFloat(value)
          : parseInt(value, 10) || 0,
    }));
  };

  const toggleSimulation = async () => {
    try {
      const enable = !simulationMode;
      await axios.post(
        `http://localhost:8000/training/simulate/toggle?enable=${enable}`
      );
      setSimulationMode(enable);
      alert(`Simulation mode ${enable ? "enabled" : "disabled"}`);
    } catch (error) {
      alert("Failed to toggle simulation mode");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTrainingResult(null);
    try {
      const response = await axios.post(
        `http://localhost:8000/training/start?force=${forceTraining}`,
        formData
      );

      if (response.data.status === "rejected") {
        alert(`Training rejected: ${response.data.reason}`);
      } else {
        alert("Training started successfully!");
        setTrainingResult(response.data);
      }
    } catch (error) {
      alert("Training submission failed. See console for details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data if available
  const epochsLabels = trainingResult
    ? trainingResult.loss_curve.map((_, i: number) => `Epoch ${i + 1}`)
    : [];

  const lossData = {
    labels: epochsLabels,
    datasets: [
      {
        label: "Loss",
        data: trainingResult ? trainingResult.loss_curve : [],
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.3,
      },
    ],
  };

  const accuracyData = {
    labels: epochsLabels,
    datasets: [
      {
        label: "Accuracy",
        data: trainingResult ? trainingResult.accuracy_curve : [],
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <PageWrapper
      title="Training Configuration"
      subtitle="Define your training hyperparameters."
    >
      <button
        onClick={toggleSimulation}
        className={`mb-4 px-4 py-2 rounded ${
          simulationMode ? "bg-green-600" : "bg-gray-600"
        } text-white`}
      >
        {simulationMode ? "Disable" : "Enable"} Simulation Mode
      </button>

      {overloaded && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          ⚠️ System resources are currently overused. Training may be rejected or
          slow.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium" htmlFor="epochs">
            Epochs
          </label>
          <input
            type="number"
            name="epochs"
            id="epochs"
            value={formData.epochs}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            min={1}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="batch_size">
            Batch Size
          </label>
          <input
            type="number"
            name="batch_size"
            id="batch_size"
            value={formData.batch_size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            min={1}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="learning_rate">
            Learning Rate
          </label>
          <input
            type="number"
            step="0.0001"
            name="learning_rate"
            id="learning_rate"
            value={formData.learning_rate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            min={0}
          />
        </div>

        {overloaded && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="forceTraining"
              checked={forceTraining}
              onChange={(e) => setForceTraining(e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="forceTraining" className="text-sm text-gray-700">
              Force training despite system load
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 rounded-xl bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {trainingResult && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Training Results</h3>
          <p>
            <strong>Run ID:</strong> {trainingResult.run_id}
          </p>
          <p>
            <strong>Final Loss:</strong>{" "}
            {trainingResult.final_loss.toFixed(4)}
          </p>
          <p>
            <strong>Final Accuracy:</strong>{" "}
            {trainingResult.final_accuracy.toFixed(4)}
          </p>

          <div className="mt-4">
            <h4 className="font-medium mb-1">Loss Curve</h4>
            <Line data={lossData} />
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-1">Accuracy Curve</h4>
            <Line data={accuracyData} />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
