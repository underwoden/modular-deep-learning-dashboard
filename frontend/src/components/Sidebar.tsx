// ./frontend/src/components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Optional: style `.active-link` here if not using Tailwind

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { to: "/project-setup", label: "Project Setup" },
    { to: "/data", label: "Data" },
    { to: "/model", label: "Model" },
    { to: "/training", label: "Training" },
    { to: "/validation", label: "Validation" },
    { to: "/logging", label: "Logging" },
    { to: "/hardware", label: "Hardware" },
    { to: "/system", label: "System Monitor" },
    { to: "/results", label: "Results" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-4 leading-tight">
          <div>Deep Learning</div>
          <div>Dashboard</div>
        </div>

        <nav className="flex flex-col space-y-2 p-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-blue-400 ${
                currentPath === to
                  ? "font-bold underline text-blue-400 active-link"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
        Pretrain Your Brain!
      </div>
    </div>
  );
};

export default Sidebar;
