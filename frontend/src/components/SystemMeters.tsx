// ./frontend/src/components/SystemMetrics.tsx
import React, { useEffect, useState } from 'react';

type Metrics = {
  cpu_percent: number;
  memory_percent: number;
  total_memory: number;
  used_memory: number;
};

const SystemMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:8000/system/metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch system metrics:", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000); // every 3 seconds
    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <div className="text-gray-500">Loading system metrics...</div>;
  }

  return (
    <div className="p-4 rounded-xl shadow-lg bg-white w-full max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">System Metrics</h2>

      {/* CPU Usage */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">CPU Usage</span>
          <span className="text-sm font-medium text-gray-700">{metrics.cpu_percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${metrics.cpu_percent}%` }}
          />
        </div>
      </div>

      {/* Memory Usage */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Memory Usage</span>
          <span className="text-sm font-medium text-gray-700">{metrics.memory_percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${metrics.memory_percent}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-500 mt-1">
          {Math.round(metrics.used_memory / 1e6)} MB / {Math.round(metrics.total_memory / 1e6)} MB
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;
