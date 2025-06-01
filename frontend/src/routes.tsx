import { Routes, Route, Navigate } from "react-router-dom";
import ProjectSetup from "./pages/ProjectSetup";
import Data from "./pages/Data";
import Model from "./pages/Model";
import Training from "./pages/Training";
import Validation from "./pages/Validation";
import Logging from "./pages/Logging";
import Hardware from "./pages/Hardware";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/project-setup" replace />} />
      <Route path="/project-setup" element={<ProjectSetup />} />
      <Route path="/data" element={<Data />} />
      <Route path="/model" element={<Model />} />
      <Route path="/training" element={<Training />} />
      <Route path="/validation" element={<Validation />} />
      <Route path="/logging" element={<Logging />} />
      <Route path="/hardware" element={<Hardware />} />
    </Routes>
  );
};


export default AppRoutes;
