// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/file", label: "File" },
    { to: "/planning", label: "Planning" },
    { to: "/organizing", label: "Organizing" },
    { to: "/actuating", label: "Actuating" },
    { to: "/controlling", label: "Controlling" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex justify-center py-3">
      {/* Shell */}
      <nav className="w-[92%] max-w-7xl bg-white/90 backdrop-blur-md rounded-full shadow-lg px-5 md:px-8 py-2.5 flex items-center justify-between">
        {/* Kiri: Brand */}
        <Link
          to="/"
          className="text-[22px] md:text-2xl font-semibold text-slate-800 select-none"
        >
          Sikoltridi
        </Link>

        {/* Tengah/Kanan: Desktop menu */}
        <ul className="hidden md:flex items-center gap-8 text-slate-700">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive ? "text-blue-600" : "hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Kanan: tombol Login + hamburger (mobile) */}
<div className="flex items-center gap-2">
  {/* Login selalu terlihat */}
  <Link to="/login" className="order-1">
    <button className="px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition shadow">
      Login
    </button>
  </Link>

  {/* Hamburger: hanya mobile. PAKAI SVG supaya pasti jadi 'garis 3' */}
  <button
    aria-label="Open menu"
    onClick={() => setOpen(v => !v)}
    className="order-2 md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition"
  >
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-slate-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  </button>
</div>

      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden fixed left-1/2 -translate-x-1/2 top-[64px] w-[92%] max-w-7xl transition-all ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl font-medium ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
