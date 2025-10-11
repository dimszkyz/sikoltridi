// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Admin from "./pages/admin/admin";
import DaftarFile from "./pages/admin/DaftarFile";
import AddFile from "./pages/admin/AddFile"; // <-- 1. Impor komponen baru

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/files" element={<DaftarFile />} />
        <Route path="/admin/files/add" element={<AddFile />} /> {/* <-- 2. Tambahkan route baru */}
      </Routes>
    </Router>
  );
}

export default App;