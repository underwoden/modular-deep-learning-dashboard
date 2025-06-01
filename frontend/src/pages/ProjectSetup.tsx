import { useState } from "react";
import axios from "axios";

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
    <div className="ml-64 p-8 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Project Setup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="project_name">
            Project Name
          </label>
          <input
            name="name"
            id="name"
            placeholder="Enter project name"
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border bg-gray-100 text-gray-700 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
