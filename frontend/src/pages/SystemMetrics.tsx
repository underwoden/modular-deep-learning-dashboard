// ./frontend/src/pages/SystemMetrics.tsx
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import SystemMeters from '../components/SystemMeters';

export default function SystemMetrics() {
  const [metrics, setMetrics] = useState({ cpu_percent: 0, memory_percent: 0 });
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/system/metrics")
        .then((res) => res.json())
        .then((data) => {
          setMetrics(data);
          setHistory((prev) => [...prev.slice(-29), { ...data, time: new Date().toLocaleTimeString() }]);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">System Monitor</h2>

      <div className="space-y-2">
        <div>
          <label>CPU Usage: {metrics.cpu_percent}%</label>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className="bg-blue-600 h-4 rounded"
              style={{ width: `${metrics.cpu_percent}%` }}
            />
          </div>
        </div>

        <div>
          <label>Memory Usage: {metrics.memory_percent}%</label>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className="bg-green-600 h-4 rounded"
              style={{ width: `${metrics.memory_percent}%` }}
            />
          </div>
        </div>
      </div>
    <SystemMeters />
      <LineChart
        width={600}
        height={300}
        data={history}
        margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="cpu_percent" stroke="#8884d8" name="CPU (%)" />
        <Line type="monotone" dataKey="memory_percent" stroke="#82ca9d" name="Memory (%)" />
      </LineChart>
    </div>
  );
}
