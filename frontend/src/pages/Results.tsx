// ./frontend/src/pages/Results.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import OutputMetricsComponent from "../components/OutputMetrics";
import PageWrapper from "../components/PageWrapper";
import BestRunSummary from "../components/BestRunSummary";


const ResultsPage: React.FC = () => {
  const [runIds, setRunIds] = useState<string[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8000/outputs")
      .then(response => setRunIds(response.data))
      .catch(error => {
        console.error("Error fetching run IDs:", error);
        setError("Failed to load training results.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper title="Training Results" subtitle="View output metrics from past training runs.">
      <BestRunSummary />
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : runIds.length === 0 ? (
        <div className="text-gray-500">No training runs found.</div>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {runIds.map(runId => (
              <li key={runId}>
                <button
                  onClick={() => setSelectedRunId(runId)}
                  className={`text-left w-full px-4 py-2 rounded-md border ${
                    runId === selectedRunId ? "bg-blue-600 text-white" : "bg-white text-gray-800"
                  } hover:bg-blue-100 transition`}
                >
                  {runId}
                </button>
              </li>
            ))}
          </ul>
          {selectedRunId && (
            <div className="mt-6">
              <OutputMetricsComponent runId={selectedRunId} />
            </div>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default ResultsPage;
