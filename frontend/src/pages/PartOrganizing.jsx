// src/pages/PartOrganizing.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry"; // wajib agar pdf.js bisa render

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const PartOrganizing = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const canvasRefs = useRef({}); // simpan ref canvas per file

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/organizing`);
        setFiles(response.data.data || []);
      } catch (err) {
        setError("Gagal memuat data organizing. Pastikan server backend berjalan.");
        console.error("Error fetching organizing:", err);
      }
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    // Render halaman pertama setiap PDF ke canvas sebagai thumbnail
    const renderThumbnails = async () => {
      for (const file of files) {
        const canvas = canvasRefs.current[file.id];
        if (!canvas) continue;
        try {
          const url = `${API_BASE}/uploads/organizing/${file.pdf_file}`;
          const pdf = await pdfjsLib.getDocument(url).promise;
          const page = await pdf.getPage(1);

          // skala default; bisa disesuaikan
          const viewport = page.getViewport({ scale: 0.5 });
          const ctx = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: ctx, viewport }).promise;
        } catch (err) {
          console.error(`Gagal render thumbnail untuk ${file.title}:`, err);
        }
      }
    };
    if (files.length > 0) renderThumbnails();
  }, [files]);

  const handleOpenPDF = (pdfFile) => {
    window.open(`${API_BASE}/uploads/organizing/${pdfFile}`, "_blank");
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Organizing</h2>
          <div className="w-16 h-[2px] bg-blue-500 mx-auto my-2"></div>
          <p className="text-gray-600">Struktur Kepanitiaan</p>
        </div>

        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file.id}
                className="relative overflow-hidden rounded-md shadow-md group cursor-pointer w-[300px]"
                onClick={() => handleOpenPDF(file.pdf_file)}
              >
                {/* Thumbnail canvas */}
                <div className="bg-gray-200 flex items-center justify-center w-full h-[400px] rounded-md overflow-hidden">
                  <canvas
                    ref={(el) => (canvasRefs.current[file.id] = el)}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Judul muncul saat hover */}
                <div className="absolute left-1/2 bottom-[15px] transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-black/70 px-3 py-[5px] rounded-full">
                    <h3 className="text-white text-sm font-semibold text-center whitespace-nowrap">
                      {file.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !error && (
              <p className="text-gray-500 text-center col-span-full">
                Tidak ada dokumen organizing yang tersedia.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PartOrganizing;
