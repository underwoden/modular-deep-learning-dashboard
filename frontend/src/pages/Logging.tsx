// ./frontend/src/pages/Logging.tsx
import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Logging() {
  const [formData, setFormData] = useState({
    log_interval: 100,
    log_dir: "logs/",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/logging", formData);
      alert("Logging config submitted!");
    } catch (error) {
      alert("Error submitting logging config");
      console.error(error);
    }
  };

  return (
    <PageWrapper title="Logging Configuration">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium">Log Interval</label>
          <input type="number" name="log_interval" value={formData.log_interval} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Log Directory</label>
          <input type="text" name="log_dir" value={formData.log_dir} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </PageWrapper>
  );
}
