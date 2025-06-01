import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Optional: create styles for the sidebar or use Tailwind

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-gray-900 text-white h-screen w-60 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">AI Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/project-setup" className="hover:text-blue-400">Project Setup</Link>
        <Link to="/data" className="hover:text-blue-400">Data</Link>
        <Link to="/model" className="hover:text-blue-400">Model</Link>
        <Link to="/training" className="hover:text-blue-400">Training</Link>
        <Link to="/validation" className="hover:text-blue-400">Validation</Link>
        <Link to="/logging" className="hover:text-blue-400">Logging</Link>
        <Link to="/hardware" className="hover:text-blue-400">Hardware</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
