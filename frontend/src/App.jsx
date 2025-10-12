// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin/admin";
import DaftarFile from "./pages/admin/DaftarFile";
import DaftarPengajuanAkun from "./pages/admin/DaftarPengajuanAkun";
import AddFile from "./pages/admin/AddFile";
import AddPlanning from "./pages/admin/AddPlanning";
import Planning from "./pages/admin/Planning";
import Organizing from "./pages/admin/Organizing";
import AddOrganizing from "./pages/admin/AddOrganizing";
import PartControlling from "./pages/PartControlling"; // <-- 1. Impor komponen baru


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin/pengajuan-akun" element={<DaftarPengajuanAkun />} />
        <Route path="/admin/admin" element={<Admin />} />
        <Route path="/admin/files" element={<DaftarFile />} />
        <Route path="/admin/files/add" element={<AddFile />} />
        <Route path="/admin/planning/add" element={<AddPlanning />} />
        <Route path="/admin/planning" element={<Planning />} /> 
        <Route path="/admin/organizing" element={<Organizing />} />
        <Route path="/admin/organizing/add" element={<AddOrganizing />} />
        <Route path="/controlling" element={<PartControlling />} /> {/* <-- 2. Tambahkan route baru */}
      </Routes>
    </Router>
  );
}

export default App;