// ./frontend/src/pages/Model.tsx
import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Model() {
  const [formData, setFormData] = useState({
    architecture: "ResNet",
    layers: 50,
    dropout_rate: 0.5,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "layers" || name === "dropout_rate" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/model", formData);
      alert("Model configuration submitted!");
    } catch (error) {
      alert("Error submitting model config");
      console.error(error);
    }
  };

  return (
    <PageWrapper title="Model Configuration">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium" htmlFor="architecture">
            Architecture
          </label>
          <select
            name="architecture"
            value={formData.architecture}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="ResNet">ResNet</option>
            <option value="Transformer">Transformer</option>
            <option value="CNN">CNN</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="layers">
            Layers
          </label>
          <input
            type="number"
            name="layers"
            value={formData.layers}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="dropout_rate">
            Dropout Rate
          </label>
          <input
            type="number"
            step="0.1"
            name="dropout_rate"
            value={formData.dropout_rate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </PageWrapper>
  );
}
