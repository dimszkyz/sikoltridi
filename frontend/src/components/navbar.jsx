import React, { useState, useEffect } from "react";

// Navbar cantik + responsif (TailwindCSS)
// Fitur:
// - Sticky di atas, glass + blur, shadow lembut
// - Indikator aktif (pill + garis bawah animasi)
// - Mobile drawer rapi
// - Dark mode siap (menggunakan class `dark:` jika proyekmu pakai dark mode)

const LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Kontak", href: "/kontak" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Foto", href: "/foto" },
  { label: "Video", href: "/video" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname || "/");
    }
  }, []);

  const isActive = (href) => path === href;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Garis gradien atas yang halus */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

      <nav className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/60 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <a href="/" className="group flex items-center gap-3 select-none">
              <span className="inline-grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-sm ring-1 ring-black/5 dark:from-neutral-100 dark:to-neutral-300" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/70 group-hover:bg-white transition-colors" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Brand</span>
            </a>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={
                    "relative rounded-xl px-3 py-2 text-sm font-medium transition-[color,background,transform] duration-200 " +
                    (isActive(link.href)
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-800 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-neutral-800")
                  }
                >
                  {link.label}
                  {/* underline animasi */}
                  <span
                    className={
                      "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 transition-transform duration-200 " +
                      (isActive(link.href) ? "scale-x-100" : "group-hover:scale-x-100")
                    }
                  />
                </a>
              ))}
            </div>

            {/* Tombol burger */}
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-neutral-800 dark:focus:ring-neutral-700"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-900 dark:text-white">
                {open ? (
                  <path fillRule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Panel mobile */}
        <div
          className={
            "md:hidden border-t dark:border-neutral-800 transition-[max-height,opacity] duration-300 overflow-hidden " +
            (open ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
          }
        >
          <div className="space-y-1 px-4 py-3 bg-white/70 backdrop-blur dark:bg-neutral-900/60">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={
                  "block rounded-xl px-3 py-2 text-base font-medium transition-colors " +
                  (isActive(link.href)
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-neutral-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-neutral-800")
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      {/* Bayangan lembut di bawah navbar */}
      <div className="h-3 w-full bg-gradient-to-b from-black/5 to-transparent dark:from-white/10" />
    </header>
  );
}
