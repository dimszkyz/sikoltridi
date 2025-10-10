// backend/src/controllers/userController.js

// Fungsi ini akan dipanggil saat ada permintaan ke GET /api/users/
const getAllUsers = (req, res) => {
  // Logika untuk mengambil data user dari database akan ada di sini
  // Untuk sekarang, kita kirim data dummy
  const users = [
    { id: 1, name: 'Ammaar' },
    { id: 2, name: 'Pengguna Dua' },
  ];
  res.json({
    message: 'Data user berhasil diambil',
    data: users,
  });
};

module.exports = {
  getAllUsers,
};