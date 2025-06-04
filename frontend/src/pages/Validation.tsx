// ./frontend/src/pages/Validation.tsx
import React, { useState } from 'react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

type ValidationFormData = {
  model_name: string;
  dataset: string;
  batch_size?: number;
  validation_split?: number;
  shuffle: boolean;
  run_id?: string;
  metrics: string[];
};

const ValidationPage = () => {
  const [formData, setFormData] = useState<ValidationFormData>({
    model_name: '',
    dataset: '',
    batch_size: undefined,
    validation_split: undefined,
    shuffle: false,
    run_id: '',
    metrics: [],
  });

  const metricsOptions = ['accuracy', 'loss', 'precision', 'recall', 'f1'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMetricsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: string[] = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, metrics: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/validate', formData);
      console.log('Validation submitted:', response.data);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <PageWrapper title="Validation Configuration">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Model Name</label>
          <input
            type="text"
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            placeholder="Enter model name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Dataset</label>
          <input
            type="text"
            name="dataset"
            value={formData.dataset}
            onChange={handleChange}
            placeholder="Dataset name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Batch Size (optional)</label>
          <input
            type="number"
            name="batch_size"
            value={formData.batch_size ?? ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Validation Split (0.0 - 1.0)</label>
          <input
            type="number"
            step="0.01"
            name="validation_split"
            value={formData.validation_split ?? ''}
            onChange={handleChange}
            placeholder="e.g., 0.2"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Run ID (optional)</label>
          <input
            type="text"
            name="run_id"
            value={formData.run_id}
            onChange={handleChange}
            placeholder="Leave blank for auto"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="shuffle"
            checked={formData.shuffle}
            onChange={handleChange}
            id="shuffle"
          />
          <label htmlFor="shuffle" className="font-medium">Shuffle dataset</label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Metrics</label>
          <select
            multiple
            value={formData.metrics}
            onChange={handleMetricsChange}
            className="w-full p-2 border border-gray-300 rounded-md h-32"
          >
            {metricsOptions.map(metric => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
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
};

export default ValidationPage;
