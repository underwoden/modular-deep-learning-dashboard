// ./frontend/src/components/SystemStats.tsx
import React, { useEffect, useState } from "react";

export default function SystemStats() {
  const [metrics, setMetrics] = useState({ cpu_percent: 0, memory_percent: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/metrics/system")
        .then(res => res.json())
        .then(data => setMetrics(data));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-xl mb-2">System Stats</h2>
      <div className="mb-2">
        <label>CPU Usage</label>
        <div className="w-full bg-gray-600 h-4 rounded">
          <div
            className="bg-green-400 h-4 rounded"
            style={{ width: `${metrics.cpu_percent}%` }}
          />
        </div>
        <p>{metrics.cpu_percent}%</p>
      </div>
      <div>
        <label>RAM Usage</label>
        <div className="w-full bg-gray-600 h-4 rounded">
          <div
            className="bg-blue-400 h-4 rounded"
            style={{ width: `${metrics.memory_percent}%` }}
          />
        </div>
        <p>{metrics.memory_percent}%</p>
      </div>
    </div>
  );
}
