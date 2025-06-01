import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes"; // ← using centralized routes
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '1.5rem' }}>
        <AppRoutes />
        </div>
      </div>

    </Router>
  );
};

export default App;
