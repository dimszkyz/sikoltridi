// frontend/src/pages/admin.jsx

import React from 'react';
import SidebarAdmin from '../../components/sidebarAdmin'; // <-- 1. Impor komponen sidebar
import { FaSearch, FaEdit, FaTrash, FaUsers, FaFileAlt } from 'react-icons/fa';

const Admin = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User' },
    { id: 4, name: 'Samuel Green', email: 'sam.green@example.com', role: 'User' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      <SidebarAdmin /> {/* <-- 2. Gunakan komponen di sini */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                 <FaSearch />
              </span>
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/40" alt="Admin" className="w-10 h-10 rounded-full" />
              <span className="ml-3 font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total User</p>
                <p className="text-2xl font-bold">1,257</p>
                 <a href="#" className="text-blue-500 hover:underline text-sm">View Details</a>
              </div>
               <FaUsers className="text-blue-500 w-12 h-12" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total File</p>
                <p className="text-2xl font-bold">48</p>
                 <a href="#" className="text-blue-500 hover:underline text-sm">View Details</a>
              </div>
              <FaFileAlt className="text-blue-500 w-12 h-12" />
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Data User</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">
                           <FaEdit className="inline-block" />
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                           <FaTrash className="inline-block" />
                        </a>
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

export default Admin;