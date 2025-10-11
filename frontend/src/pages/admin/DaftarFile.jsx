// frontend/src/pages/admin/DaftarFile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/sidebarAdmin';
import { FaPlus, FaEdit, FaTrash, FaFilePdf, FaImage } from 'react-icons/fa';

const DaftarFile = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Ganti URL jika backend Anda berjalan di port yang berbeda
        const response = await axios.get('http://localhost:5000/api/files');
        setFiles(response.data.data);
      } catch (err) {
        setError('Gagal mengambil data file. Pastikan server backend berjalan.');
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };


  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Manajemen File</h1>
          <div className="flex items-center">
            <img src="https://via.placeholder.com/40" alt="Admin" className="w-10 h-10 rounded-full" />
            <span className="ml-3 font-semibold">Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Daftar File</h2>
               <Link to="/admin/files/add" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                <FaPlus className="mr-2" />
                Tambah Data
            </Link>
            </div>
            
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image File</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF File</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {files.map((file, index) => (
                    <tr key={file.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <a href={`http://localhost:5000/uploads/images/${file.image_file}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                           <FaImage className="mr-2" /> {file.image_file}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                         <a href={`http://localhost:5000/uploads/files/${file.pdf_file}`} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline flex items-center">
                           <FaFilePdf className="mr-2" /> {file.pdf_file}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(file.uploaded_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                           <FaEdit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                           <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DaftarFile;