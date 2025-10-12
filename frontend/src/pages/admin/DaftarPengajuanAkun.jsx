import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../../components/sidebarAdmin";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DaftarPengajuanAkun = () => {
    const [pengajuan, setPengajuan] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get("http://localhost:5000/api/users/pengajuan-akun");
        setPengajuan(res.data.data);
    };

    const approve = async (id, role) => {
        const selectedUser = pengajuan.find((item) => item.id === id);
        const username = selectedUser?.username || "Pengguna";

        await axios.post(`http://localhost:5000/api/users/approve/${id}`, { role });
        alert(`✅ Akun ${username} disetujui sebagai ${role}!`);
        fetchData();
    };

    const reject = async (id) => {
        const selectedUser = pengajuan.find((item) => item.id === id);
        const username = selectedUser?.username || "Pengguna";

        await axios.delete(`http://localhost:5000/api/users/reject/${id}`);
        alert(`❌ Akun ${username} ditolak & dihapus!`);
        fetchData();
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarAdmin />

            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Daftar Pengajuan Akun</h1>

                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="p-3 text-center border border-gray-300 font-semibold">No</th>
                            <th className="p-3 text-center border border-gray-300 font-semibold">Username</th>
                            <th className="p-3 text-center border border-gray-300 font-semibold">Role</th>
                            <th className="p-3 text-center border border-gray-300 font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pengajuan.map((item, index) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-100 transition border border-gray-300"
                            >
                                <td className="p-3 text-center border border-gray-300">{index + 1}</td>
                                <td className="p-3 text-center border border-gray-300">{item.username}</td>
                                <td className="p-3 text-center border border-gray-300">
                                    <select
                                        value={item.role || "user"} // Default 'user'
                                        onChange={(e) => {
                                            const updated = pengajuan.map((row) =>
                                                row.id === item.id ? { ...row, role: e.target.value } : row
                                            );
                                            setPengajuan(updated);
                                        }}
                                        className="border px-2 py-1 rounded"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </td>
                                <td className="p-3 flex flex-col items-center gap-2 border border-gray-300">
                                    <button
                                        className="flex items-center gap-2 bg-green-600 px-3 py-1 text-white rounded hover:bg-green-700"
                                        onClick={() => approve(item.id, item.role || "user")}
                                    >
                                        <FaCheckCircle /> Accept
                                    </button>
                                    <button
                                        className="flex items-center gap-2 bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
                                        onClick={() => reject(item.id)}
                                    >
                                        <FaTimesCircle /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default DaftarPengajuanAkun;
