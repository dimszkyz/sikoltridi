// frontend/src/components/sidebarAdmin.jsx

import React from 'react';
import { FaTachometerAlt, FaUsers, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const SidebarAdmin = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-xl font-bold p-4 border-b border-gray-700">
        Sikoltriedi
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <a href="/admin" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <FaUsers className="mr-3" />
          Manajemen User
        </a>
        {/* Ubah href di baris berikut */}
        <a href="/admin/files" className="flex items-center px-4 py-2 text-gray-100 bg-gray-900 rounded-md">
          <FaFileAlt className="mr-3" />
          Manajemen File
        </a>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <a href="/login" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <FaSignOutAlt className="mr-3" />
          Logout
        </a>
      </div>
    </aside>
  );
};

export default SidebarAdmin;