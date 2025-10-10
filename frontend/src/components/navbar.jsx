// src/components/navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    // Modifikasi utama ada di sini
    <header className="absolute top-0 left-0 right-0 z-50 p-4">
      <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 flex justify-between items-center">
        {/* Bagian Kiri: Logo/Judul */}
        <div className="text-xl font-extrabold text-gray-800">
          <Link to="/" className="hover:text-blue-600 transition duration-300">
            SIKOLTRIDI
          </Link>
        </div>

        {/* Bagian Tengah: Menu Navigasi */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition duration-300 ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/tentang"
            className={({ isActive }) =>
              `font-medium transition duration-300 ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`
            }
          >
            Tentang
          </NavLink>
        </div>

        {/* Bagian Kanan: Tombol Login */}
        <div>
          <Link to="/login">
            <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-sm">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;