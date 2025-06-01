// Data.tsx
import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Data() {
  const [formData, setFormData] = useState({
    dataset_name: "MNIST",
    train_split: 0.8,
    shuffle: true,
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: checked,
    });
  } else {
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/data", formData);
      alert("Data configuration submitted!");
    } catch (error) {
      alert("Error submitting data config");
      console.error(error);
    }
  };

  return (
    <PageWrapper title="Data Configuration">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium" htmlFor="dataset_name">Dataset</label>
          <select
            name="dataset_name"
            value={formData.dataset_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="MNIST">MNIST</option>
            <option value="CIFAR-10">CIFAR-10</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="train_split">Train Split</label>
          <input
            type="number"
            step="0.1"
            name="train_split"
            value={formData.train_split}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="shuffle"
            checked={formData.shuffle}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="shuffle">Shuffle Dataset</label>
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

