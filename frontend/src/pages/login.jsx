import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Nanti disesuaikan endpoint login API-mu
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      if (res.data.success) {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        alert(`Selamat datang, ${user.username}!`);
        navigate("/");
      } else {
        alert("Username atau password salah!");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Tombol Daftar Akun */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Belum punya akun?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Daftar Akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
