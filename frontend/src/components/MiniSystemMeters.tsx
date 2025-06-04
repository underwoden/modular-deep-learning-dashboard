import { useEffect, useState } from "react";

export default function MiniSystemMeters() {
  const [metrics, setMetrics] = useState({
    cpu_percent: 0,
    memory_percent: 0,
    used_memory: 0,
    total_memory: 0,
  });

  const [overload, setOverload] = useState(false);
  const [override, setOverride] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("http://localhost:8000/system/status");
        const data = await res.json();
        setMetrics(data.metrics);
        setOverload(data.overload);
        setOverride(data.override);
      } catch (error) {
        console.error("Failed to fetch system metrics:", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleOverload = async () => {
    try {
      const newEnabled = !override;
      await fetch(`http://localhost:8000/training/simulate/overload?enabled=${newEnabled}`, {
        method: "POST",
      });
      setOverride(newEnabled);
    } catch (error) {
      console.error("Failed to toggle overload simulation:", error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow px-4 py-2 text-sm border-b border-gray-200">
      <div className="flex flex-wrap gap-x-6 text-gray-800">
        <span>🧠 CPU: {Math.round(metrics.cpu_percent)}%</span>
        <span>💾 Mem: {Math.round(metrics.memory_percent)}%</span>
        <span>📦 Used: {Math.round(metrics.used_memory / 1e6)} MB</span>
        <span>📦 Total: {Math.round(metrics.total_memory / 1e6)} MB</span>
        {overload && (
          <span className="text-red-600 font-semibold mr-4">
            ⚠️ Overload — training disabled unless forced
          </span>
        )}
      </div>
<button
  onClick={toggleOverload}
  className="text-xs text-black hover:text-blue-600 transition duration-150 px-2 py-1 rounded bg-transparent border border-gray-300"
  style={{ width: "fit-content", minWidth: "auto" }}
>
  {override ? "Disable Overload" : "Simulate Overload"}
</button>

    </div>
  );
}
