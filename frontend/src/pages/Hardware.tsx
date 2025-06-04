// ./frontend/src/pages/Hardware.tsx
import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Hardware() {
  const [formData, setFormData] = useState({
    device: "cpu",
    num_workers: 2,
    memory_limit_gb: 4,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "num_workers" || name === "memory_limit_gb" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/hardware", formData);
      alert("Hardware configuration submitted!");
    } catch (error) {
      alert("Error submitting hardware config");
      console.error(error);
    }
  };

  return (
    <PageWrapper
      title="Hardware Configuration"
      subtitle="Specify the execution device, worker threads, and memory budget."
    >
      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        <div>
          <label className="block mb-1 font-medium" htmlFor="device">
            Device
          </label>
          <select
            name="device"
            value={formData.device}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="cpu">CPU</option>
            <option value="cuda">CUDA (GPU)</option>
            <option value="mps">MPS (Apple)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="num_workers">
            Number of DataLoader Workers
          </label>
          <input
            type="number"
            name="num_workers"
            min={0}
            max={16}
            value={formData.num_workers}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="memory_limit_gb">
            Memory Limit (GB)
          </label>
          <input
            type="number"
            step="0.5"
            min={0}
            name="memory_limit_gb"
            value={formData.memory_limit_gb}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded-xl bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </PageWrapper>
  );
}
