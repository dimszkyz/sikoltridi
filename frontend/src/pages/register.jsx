import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// 1. Impor ikon
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // 2. Tambahkan state untuk visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/pengajuan-akun", {
        username,
        password,
      });

      alert(res.data.msg || "Pengajuan akun berhasil, tunggu persetujuan admin!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Terjadi kesalahan saat mengajukan akun");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Menggunakan layout flex column agar footer menempel di bawah
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Konten utama dibuat 'flex-grow' untuk mengisi ruang */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">Daftar Akun</h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  // 3. Tipe input dinamis
                  type={showPassword ? 'text' : 'password'}
                  // 4. Tambah padding kanan untuk ikon
                  className="w-full px-3 py-2 pr-10 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* 5. Ikon Show/Hide */}
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Ajukan Akun"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      </main>
      
      {/* Footer ditambahkan di sini */}
      <footer className="bg-white text-black text-center py-4 border-t border-gray-200">
        <p className="text-sm tracking-wide">
          © Copyright <span className="font-bold">GAZEBO TECH 2025</span> All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Register;