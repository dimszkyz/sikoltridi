// src/components/navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { to: "#home", label: "Home" },
    { to: "#partfile", label: "File" },
    { to: "#PartPlanning", label: "Planning" },
    { to: "#PartOrganizing", label: "Organizing" },
    { to: "#actuating", label: "Actuating" },
    // Khusus Controlling → pindah halaman
    { to: "/controlling", label: "Controlling", isRoute: true },
  ];

  // Ambil user dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout → hapus data user
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Smooth scroll untuk anchor di halaman yang sama
  const smoothScrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    setOpen(false);

    if (item.isRoute) {
      // pindah halaman
      navigate(item.to);
      return;
    }
    // scroll ke section
    smoothScrollTo(item.to);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex justify-center py-3">
      <nav className="w-[92%] max-w-7xl bg-white/90 backdrop-blur-md rounded-full shadow-lg px-5 md:px-8 py-2.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#home");
          }}
          className="text-[22px] md:text-2xl font-semibold text-slate-800 select-none cursor-pointer"
        >
          Sikoltridi
        </a>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-8 text-slate-700">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.to}
                onClick={(e) => handleClick(e, item)}
                className="font-medium transition hover:text-blue-600 cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Tombol kanan (Login / Profil) */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user"
                  className="w-6 h-6 mr-2"
                />
                <span className="text-sm font-medium text-slate-800">
                  {user.username} ({user.level})
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="/login" className="order-1">
              <button className="px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition shadow">
                Login
              </button>
            </a>
          )}

          {/* Hamburger menu (mobile) */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
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

      {/* Menu dropdown mobile */}
      <div
        className={`md:hidden fixed left-1/2 -translate-x-1/2 top-[64px] w-[92%] max-w-7xl transition-all ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => handleClick(e, item)}
              className="block px-3 py-2 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
