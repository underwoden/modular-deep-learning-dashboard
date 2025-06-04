// ./frontend/src/pages/ProjectSetup.tsx
import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function ProjectSetup() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    run_id: "auto-generated-" + Math.floor(Math.random() * 10000),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/project-setup/", formData);
      alert("Project configuration submitted!");
    } catch (error) {
      alert("Submission failed. See console for details.");
      console.error(error);
    }
  };

  return (
    <PageWrapper
      title="Project Setup"
      subtitle="Configure and submit metadata for your deep learning run."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Project Name
          </label>
          <input
            name="name"
            id="name"
            placeholder="Enter project name"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter project description"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="run_id">
            Run ID (auto-generated)
          </label>
          <input
            name="run_id"
            id="run_id"
            value={formData.run_id}
            disabled
            className="w-full p-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-md"
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
