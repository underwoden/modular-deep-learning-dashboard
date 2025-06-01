import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Training() {
  const [formData, setFormData] = useState({
    epochs: 10,
    batch_size: 32,
    learning_rate: 0.001,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/training/", formData);
      alert("Training configuration submitted!");
    } catch (error) {
      alert("Submission failed. See console for details.");
      console.error(error);
    }
  };

  return (
    <PageWrapper
      title="Training Configuration"
      subtitle="Define your training hyperparameters."
    >
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
