import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Optional: create styles for the sidebar or use Tailwind

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-4 leading-tight">
          <div>Deep Learning</div>
          <div>Dashboard</div>
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          <Link to="/project-setup" className="hover:text-blue-400">Project Setup</Link>
          <Link to="/data" className="hover:text-blue-400">Data</Link>
          <Link to="/model" className="hover:text-blue-400">Model</Link>
          <Link to="/training" className="hover:text-blue-400">Training</Link>
          <Link to="/validation" className="hover:text-blue-400">Validation</Link>
          <Link to="/logging" className="hover:text-blue-400">Logging</Link>
          <Link to="/hardware" className="hover:text-blue-400">Hardware</Link>
        </nav>
      </div>

      <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
        Pretrain Your Brain!
      </div>
    </div>
  );
};

export default Sidebar;

