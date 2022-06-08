import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Post from "./components/Post";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main/main.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
}
