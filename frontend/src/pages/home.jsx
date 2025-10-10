// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Bagian Kiri: Teks dan Tombol */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            SIKOLTRIDI
          </h2>
          <p className="text-3xl md:text-4xl font-semibold text-blue-600 mb-6">
            "Sistem Informasi Kolaborasi Tripusat Pendidikan"
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Mulai
          </button>
        </div>

        {/* Bagian Kanan: Lingkaran Hitam Placeholder */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="w-80 h-80 md:w-96 md:h-96 bg-black rounded-full flex items-center justify-center">
            {/* Teks di dalam lingkaran jika diperlukan, atau biarkan kosong */}
            <span className="text-white text-lg font-bold">Logo Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;