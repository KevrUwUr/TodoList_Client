import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/layout";
import IndexPage from "./pages";
import { LogIn } from "./pages/login";
import { ProjectInfo } from "./pages/projectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        {/* Rutas sin Layout */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/projects/:id" element={<ProjectInfo/>} />

        {/* Rutas con Layout */}
        <Route
          path="/index"
          element={
            <Layout>
              <IndexPage />
            </Layout>
          }
        />

        {/* Añade más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
