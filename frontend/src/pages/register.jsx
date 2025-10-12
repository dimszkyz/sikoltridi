import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Daftar Akun</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Ajukan Akun"}
          </button>
        </form>

        {/* Kembali ke login */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Sudah punya akun?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
