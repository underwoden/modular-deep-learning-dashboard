/* ./frontend/src/App.tsx */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes"; // Centralized route mapping
import MiniSystemMeters from "./components/MiniSystemMeters";
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-6">
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
