// Validation.tsx
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
    if (e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};



  const handleMetricsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: string[] = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="dropout_rate">
            Model Name
          </label>
          <input
            type="text"
            name="model_name"
            value={formData.model_name}
            onChange={handleChange}
            placeholder="Enter model name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="dropout_rate">
            Dataset
          </label>
          <input
              type="text"
            name="dataset"
            value={formData.dataset}
            onChange={handleChange}
            placeholder="Dataset"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="dropout_rate">
            Batch Size
          </label>
          <input
            type="number"
            name="batch_size"
            value={formData.batch_size ?? ''}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="dropout_rate">
            Validation Split
          </label>
          <input
            type="number"
            step="0.01"
            name="validation_split"
            value={formData.validation_split ?? ''}
            onChange={handleChange}
            placeholder="(e.g., 0.2)"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="dropout_rate">
            Run ID
          </label>
          <input
            type="text"
            name="run_id"
            value={formData.run_id}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>
          {/* <label>
            Shuffle:
            <input
              type="checkbox"
              name="shuffle"
              checked={formData.shuffle}
              onChange={handleChange}
            />
        </label>
        <label>
          Metrics:
          <select multiple value={formData.metrics} onChange={handleMetricsChange}>
            {metricsOptions.map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
        </label> */}
        <button type="submit">Submit</button>
      </form>
    </PageWrapper>
  );
};

export default ValidationPage;
