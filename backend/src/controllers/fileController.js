// src/controllers/fileController.js
const db = require('../config/database'); // Impor koneksi database

// Fungsi untuk mengambil semua data dari tabel 'file'
const getAllFiles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM file');
    res.status(200).json({
      message: 'Data file berhasil diambil',
      data: rows,
    });
  } catch (error) {
    console.error('Error saat mengambil data file:', error);
    res.status(500).json({
      message: 'Gagal mengambil data dari server',
      error: error.message,
    });
  }
};

module.exports = {
  getAllFiles,
};