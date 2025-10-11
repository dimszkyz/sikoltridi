// frontend/src/pages/admin/AddFile.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SidebarAdmin from "../../components/sidebarAdmin";
import { FaUpload, FaArrowLeft } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

const AddFile = () => {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("File yang dipilih harus berformat PDF.");
        setPdfFile(null);
        setPreviewUrl("");
        return;
      }

      setError("");
      // 1. Simpan file asli dari input. Objek ini HANYA akan digunakan untuk upload.
      setPdfFile(selectedFile);

      // 2. Gunakan FileReader untuk membuat salinan file di memori (ArrayBuffer) khusus untuk preview,
      //    ini mencegah file asli menjadi rusak.
      const reader = new FileReader();
      reader.onload = async function (event) {
        try {
          const pdfData = new Uint8Array(event.target.result);
          // 3. Gunakan data salinan ini untuk pdfjs, bukan URL dari file asli.
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          const page = await pdf.getPage(1);
          const scale = 1.0; // Sesuaikan skala jika perlu
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;

          // 4. Ubah canvas menjadi gambar dan tampilkan sebagai preview.
          const imageData = canvas.toDataURL("image/png");
          setPreviewUrl(imageData);
        } catch (err) {
          console.error("Gagal membuat preview PDF:", err);
          setError("Gagal membuat preview PDF.");
          setPreviewUrl("");
        }
      };

      // Jalankan FileReader
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !pdfFile) {
      setError("Judul dan File PDF wajib diisi.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", title);
    // 'pdfFile' di sini adalah objek file asli yang tidak terganggu oleh proses preview
    formData.append("pdf_file", pdfFile);

    // Konversi preview (base64) ke blob agar bisa dikirim sebagai file gambar
    if (previewUrl.startsWith("data:image")) {
      const blob = await (await fetch(previewUrl)).blob();
      const imageFile = new File([blob], `${pdfFile.name.replace(/\.pdf$/, ".png")}`, { type: "image/png" });
      formData.append("image_file", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/files", formData);
      setSuccess("File berhasil diunggah!");
      setTimeout(() => navigate("/admin/files"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat mengunggah file.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Tambah File Baru</h1>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <Link to="/admin/files" className="text-blue-500 hover:underline mb-6 flex items-center">
              <FaArrowLeft className="mr-2" /> Kembali ke Daftar File
            </Link>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Judul File
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload File PDF
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Pilih file</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {previewUrl && (
                <div className="mb-6 text-center">
                  <h3 className="text-gray-700 text-sm font-bold mb-2">Preview Halaman 1</h3>
                  <img
                    src={previewUrl}
                    alt="Preview halaman pertama PDF"
                    className="border rounded-md mx-auto shadow-sm"
                    style={{ width: "200px", height: "auto" }}
                  />
                  <p className="text-xs text-gray-600 mt-1">File: {pdfFile?.name}</p>
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none disabled:bg-gray-400"
                >
                  {isLoading ? "Mengunggah..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddFile;