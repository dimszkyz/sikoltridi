// backend/src/controllers/actuatingFotoController.js

const db = require('../config/database');

// Mengambil semua data
const getAllActuatingFoto = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM actuating_foto');
    res.json({
      success: true,
      message: 'Data berhasil diambil',
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
    });
  }
};

// Mengambil data berdasarkan ID
const getActuatingFotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM actuating_foto WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
      });
    }
    res.json({
      success: true,
      message: 'Data berhasil diambil',
      data: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
    });
  }
};

module.exports = {
  getAllActuatingFoto,
  getActuatingFotoById,
};