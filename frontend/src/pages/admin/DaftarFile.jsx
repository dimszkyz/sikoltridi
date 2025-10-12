import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/sidebarAdmin";
import { FaPlus, FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import PdfThumb from "../../components/PdfThumb";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const LIST_ENDPOINT = `${API_BASE}/api/files`;
const PDF_URL = (filename) => `${API_BASE}/uploads/files/${filename}`;

const DaftarFile = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(LIST_ENDPOINT);
      setFiles(response.data?.data || []);
    } catch (err) {
      setError("Gagal mengambil data file. Pastikan server backend berjalan.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const tableRows = useMemo(
    () =>
      files.map((file, index) => {
        const pdfHref = file.pdf_file ? PDF_URL(file.pdf_file) : null;
        return (
          <tr key={file.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.title}</td>

            {/* Thumbnail otomatis dari halaman pertama PDF */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {pdfHref ? (
                <div
                  className="inline-block rounded border overflow-hidden cursor-pointer"
                  title="Klik untuk membuka PDF"
                  onClick={() => window.open(pdfHref, "_blank")}
                >
                  <PdfThumb url={pdfHref} width={90} className="block" />
                </div>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </td>

            {/* Link PDF */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {pdfHref ? (
                <a
                  href={pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline inline-flex items-center"
                  aria-label={`Buka PDF ${file.title}`}
                >
                  <FaFilePdf className="mr-2" />
                  {file.pdf_file}
                </a>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {formatDate(file.uploaded_at)}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-indigo-600 hover:text-indigo-900 mr-4" title="Edit">
                <FaEdit size={18} />
              </button>
              <button className="text-red-600 hover:text-red-900" title="Hapus">
                <FaTrash size={18} />
              </button>
            </td>
          </tr>
        );
      }),
    [files]
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Manajemen File</h1>
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-3 font-semibold">Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Daftar File</h2>
              <Link
                to="/admin/files/add"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
              >
                <FaPlus className="mr-2" />
                Tambah Data
              </Link>
            </div>

            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Image File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      PDF File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Uploaded At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">{tableRows}</tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DaftarFile;
