import { useState } from "react";
import axios from "axios";

export default function Training() {
  const [formData, setFormData] = useState({
    epochs: 10,
    batch_size: 32,
    learning_rate: 0.001,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/training", formData);
      alert("Training config submitted!");
    } catch (error) {
      alert("Error submitting training config");
      console.error(error);
    }
  };

  return (
    <div className="ml-64 p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Training Config</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="epochs">Epochs</label>
          <input type="number" name="epochs" value={formData.epochs} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="batch_size">Batch Size</label>
          <input type="number" name="batch_size" value={formData.batch_size} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="learning_rate">Learning Rate</label>
          <input type="number" step="0.0001" name="learning_rate" value={formData.learning_rate} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
