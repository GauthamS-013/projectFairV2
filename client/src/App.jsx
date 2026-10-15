import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Developer from "./pages/Developer";
import { useContext } from "react";
import { authContext } from "./context/ContextApi";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  const { auth } = useContext(authContext);
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/maindev" element={<Developer />} />
        <Route path="/dash" element={auth ? <Dashboard /> : <Landing />} />
        <Route path="/projects" element={auth ? <Projects /> : <Landing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
