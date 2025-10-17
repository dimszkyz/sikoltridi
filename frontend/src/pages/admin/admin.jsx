// frontend/src/pages/admin/admin.jsx
import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/sidebarAdmin";
import { FaSearch, FaTrash, FaUsers, FaFileAlt, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const FILE_ENDPOINT = `${API_BASE}/api/files`;
const USER_ENDPOINT = `${API_BASE}/api/users/list-user`;
const PLANNING_ENDPOINT = `${API_BASE}/api/planning`; // endpoint planning
const ORGANIZING_ENDPOINT = `${API_BASE}/api/organizing`;

const Admin = () => {
  const [files, setFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [planningRows, setPlanningRows] = useState([]);
  const [totalPlanning, setTotalPlanning] = useState(0);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalOrganizing, setTotalOrganizing] = useState(0);
  const [organizingRows, setOrganizingRows] = useState([]);

  // Ambil data file dari backend
  const fetchOrganizing = async () => {
    try {
      const res = await axios.get(ORGANIZING_ENDPOINT, { withCredentials: true });
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setOrganizingRows(data);
      setTotalOrganizing(data.length);
      return data;
    } catch (err) {
      console.error("Gagal memuat data organizing:", err);
      return [];
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(FILE_ENDPOINT);
      const data = res.data?.data || [];
      setFiles(data);
      setTotalFiles(data.length);
      return data;
    } catch (err) {
      console.error("Gagal memuat data file:", err);
      return [];
    }
  };

  // Ambil data planning dari backend
  const fetchPlanning = async () => {
    try {
      const res = await axios.get(PLANNING_ENDPOINT, { withCredentials: true });
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPlanningRows(data);
      setTotalPlanning(data.length);
      return data;
    } catch (err) {
      console.error("Gagal memuat data planning:", err);
      return [];
    }
  };

  // Ambil data user
  const fetchUsers = async () => {
    try {
      const res = await axios.get(USER_ENDPOINT);
      const data = res.data?.data || [];
      setUsers(data);
      setTotalUsers(data.length);
    } catch (err) {
      console.error("Gagal memuat data user:", err);
    }
  };

  // Gabungkan dan buat chart untuk files + planning berdasarkan tanggal
  const buildCombinedChart = (filesData = [], planningData = [], organizingData = []) => {
  // Fungsi bantu: dapatkan key tanggal (ISO yyyy-mm-dd)
  const getDateKey = (d) => {
    if (!d) return null;
    const dt = new Date(d);
    if (isNaN(dt)) return null;
    return dt.toISOString().slice(0, 10); // yyyy-mm-dd
  };

  // Format label tanggal agar tampil bagus
  const formatLabel = (isoKey) => {
    const dt = new Date(isoKey);
    return dt.toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });
  };

  // Hitung jumlah File per tanggal
  const filesCount = {};
  filesData.forEach((f) => {
    const key = getDateKey(f.uploaded_at);
    if (!key) return;
    filesCount[key] = (filesCount[key] || 0) + 1;
  });

  // Hitung jumlah Planning per tanggal
  const planningCount = {};
  planningData.forEach((p) => {
    const key = getDateKey(p.uploaded_at);
    if (!key) return;
    planningCount[key] = (planningCount[key] || 0) + 1;
  });

  // Hitung jumlah Organizing per tanggal
  const organizingCount = {};
  organizingData.forEach((o) => {
    const key = getDateKey(o.uploaded_at);
    if (!key) return;
    organizingCount[key] = (organizingCount[key] || 0) + 1;
  });

  // Gabungkan semua tanggal dari File, Planning, Organizing
  const allKeys = Array.from(
    new Set([
      ...Object.keys(filesCount),
      ...Object.keys(planningCount),
      ...Object.keys(organizingCount),
    ])
  ).sort(); // Sort agar timeline urut

  // Convert ke data grafik
  const labels = allKeys.map(formatLabel);
  const fileValues = allKeys.map((k) => filesCount[k] || 0);
  const planningValues = allKeys.map((k) => planningCount[k] || 0);
  const organizingValues = allKeys.map((k) => organizingCount[k] || 0);

  // Jika kosong, jangan render chart
  if (labels.length === 0) {
    setChartData(null);
    return;
  }

  setChartData({
    labels,
    datasets: [
      {
        label: "Upload File",
        data: fileValues,
        backgroundColor: "rgba(59,130,246,0.75)", // biru
        borderRadius: 6,
      },
      {
        label: "Upload Planning",
        data: planningValues,
        backgroundColor: "rgba(16,185,129,0.75)", // hijau
        borderRadius: 6,
      },
      {
        label: "Upload Organizing",
        data: organizingValues,
        backgroundColor: "rgba(234,179,8,0.75)", // kuning Tailwind amber-500
        borderRadius: 6,
      },
    ],
  });
};

  // Hapus user
  const deleteUser = async (id, username) => {
    if (window.confirm(`Hapus user ${username}?`)) {
      try {
        await axios.delete(`${API_BASE}/api/users/delete-user/${id}`);
        alert(`🗑️ User ${username} dihapus`);
        fetchUsers();
      } catch (err) {
        console.error("Gagal menghapus user:", err);
      }
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [filesData, planningData, organizingData] = await Promise.all([
          fetchFiles(),
          fetchPlanning(),
          fetchOrganizing()
        ]);
        buildCombinedChart(filesData, planningData, organizingData); await fetchUsers();
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 space-y-8">
          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total User</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <FaUsers className="text-blue-500 w-12 h-12" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total File</p>
                <p className="text-2xl font-bold">{totalFiles}</p>
              </div>
              <FaFileAlt className="text-blue-500 w-12 h-12" />
            </div>

            {/* Total Planning di sebelah Total File */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Planning</p>
                <p className="text-2xl font-bold">{totalPlanning}</p>
              </div>
              <FaCalendarAlt className="text-green-500 w-12 h-12" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Organizing</p>
                <p className="text-2xl font-bold">{totalOrganizing}</p>
              </div>
              <FaCalendarAlt className="text-yellow-500 w-12 h-12" />
            </div>

            {/* placeholder card (kosong) agar layout tetap rapi, bisa diisi fitur lain */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">—</p>
                <p className="text-2xl font-bold">—</p>
              </div>
            </div>
          </div>

          {/* Grafik Upload File & Planning */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Grafik Upload per Tanggal</h2>
            {loading ? (
              <p className="text-gray-500">Memuat data grafik...</p>
            ) : !chartData || chartData.labels.length === 0 ? (
              <p className="text-gray-500">Belum ada data upload.</p>
            ) : (
              <div style={{ width: "100%", height: 350 }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: "top" },
                      title: { display: false },
                    },
                    scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true, ticks: { precision: 0 } },
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Data User */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Daftar User</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.level}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => deleteUser(user.id, user.username)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-2"
                        >
                          <FaTrash /> Hapus
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

export default Admin;
