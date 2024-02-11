import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Write from "./pages/Write";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main/main.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
