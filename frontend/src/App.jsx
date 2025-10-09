// src/App.jsx
import React from "react";
import Navbar from "./components/navbar"; // pastikan path-nya sesuai

function App() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Selamat Datang di Website Kami</h1>
        <p className="mt-2 text-gray-600">
          Ini adalah halaman beranda dengan navbar di atas.
        </p>
      </main>
    </>
  );
}

export default App;
