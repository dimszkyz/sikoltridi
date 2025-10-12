// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin/admin";
import DaftarFile from "./pages/admin/DaftarFile";
import AddFile from "./pages/admin/AddFile"; // <-- 1. Impor komponen baru
import DaftarPengajuanAkun from "./pages/admin/DaftarPengajuanAkun";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/files" element={<DaftarFile />} />
        <Route path="/admin/files/add" element={<AddFile />} /> {/* <-- 2. Tambahkan route baru */}
        <Route path="/admin/pengajuan-akun" element={<DaftarPengajuanAkun />} />
      </Routes>
    </Router>
  );
}

export default App;