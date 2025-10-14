import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function PartVideo() {
  const [activeTab, setActiveTab] = useState("video");
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "video") fetchVideos();
  }, [activeTab]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/video`);
      setVideos(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil video:", err);
    }
  };

  const handleDetail = (id) => {
    navigate(`/actuating/video/${id}`);
  };

  return (
    <section className="min-h-screen bg-white py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* === Judul Section === */}
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3">
          Actuating
        </h2>
        <div className="h-1 w-16 bg-blue-500 mx-auto mb-8 rounded-full"></div>

        {/* === Toggle Tabs === */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 rounded-full p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab("video")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "video"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Video
            </button>
            <button
              onClick={() => setActiveTab("foto")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "foto"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Foto
            </button>
          </div>
        </div>

        {/* === Konten === */}
        {activeTab === "video" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {videos.length > 0 ? (
              videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => handleDetail(vid.id)}
                  className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
                    {vid.thumbnail ? (
                      <img
                        src={`${API_BASE}/uploads/video/thumb/${vid.thumbnail}`}
                        alt={vid.judul}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">Tidak ada thumbnail</div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
                      Lihat Detail
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 text-left">
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">
                      {vid.judul}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {vid.keterangan || "-"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada video yang diunggah.</p>
            )}
          </div>
        ) : (
          <div className="text-gray-500">Halaman foto akan datang...</div>
        )}
      </div>
    </section>
  );
}
