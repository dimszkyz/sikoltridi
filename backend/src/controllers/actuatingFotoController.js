const db = require('../config/database');
const fs = require('fs');
const path = require('path');

// [DIPERBAIKI] Mengambil semua data dengan alias agar cocok dengan frontend
const getAllActuatingFoto = async (req, res) => {
  try {
    // Kita gunakan AS untuk mengubah nama kolom agar sesuai dengan yang diharapkan frontend (item.judul, item.foto, dll.)
    const [rows] = await db.query(
      'SELECT id, title AS judul, image_file AS foto, deskripsi_image AS deskripsi, uploaded_at AS tanggal FROM actuating_foto ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Mengambil data berdasarkan ID (tidak perlu diubah, tapi disertakan untuk kelengkapan)
const getActuatingFotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM actuating_foto WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// [DIPERBAIKI] Menambah data baru dengan nama kolom yang benar
const createActuatingFoto = async (req, res) => {
  const { judul, deskripsi } = req.body; // Nama ini datang dari form frontend

  if (!judul) {
    return res.status(400).json({ message: 'Judul wajib diisi' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'File foto wajib diunggah' });
  }

  const image_file = req.file.filename; // Nama file dari multer

  try {
    // Sesuaikan query INSERT dengan nama kolom di database Anda
    await db.query(
      'INSERT INTO actuating_foto (title, deskripsi_image, image_file, uploaded_at) VALUES (?, ?, ?, NOW())',
      [judul, deskripsi, image_file]
    );
    res.status(201).json({ message: 'Foto berhasil diunggah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// [DIPERBAIKI] Menghapus data dengan nama kolom yang benar
// backend/src/controllers/actuatingFotoController.js

const deleteActuatingFoto = async (req, res) => {
  const { id } = req.params;
  
  // -- LOG UNTUK DEBUGGING --
  console.log(`Mencoba menghapus foto dengan ID: ${id}`);

  try {
    const [rows] = await db.query('SELECT image_file FROM actuating_foto WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    
    const filename = rows[0].image_file;
    console.log(`Nama file yang akan dihapus dari server: ${filename}`);

    if (filename) {
      const filePath = path.join(__dirname, '../../public/uploads/foto', filename);
      console.log(`Path lengkap file yang akan dihapus: ${filePath}`);

      fs.unlink(filePath, (err) => {
        if (err) {
          // Log ini akan muncul jika ada masalah saat menghapus file
          console.error(` GAGAL MENGHAPUS FILE FISIK: ${filePath}`, err);
        } else {
          console.log(`BERHASIL MENGHAPUS FILE FISIK: ${filePath}`);
        }
      });
    }

    await db.query('DELETE FROM actuating_foto WHERE id = ?', [id]);
    console.log(`BERHASIL MENGHAPUS data dari database untuk ID: ${id}`);
    
    res.json({ message: 'Foto berhasil dihapus' });
  } catch (error) {
    // Error ini akan muncul jika ada masalah dengan query database
    console.error(`💥 GAGAL PADA OPERASI DATABASE:`, error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllActuatingFoto,
  getActuatingFotoById,
  createActuatingFoto,
  deleteActuatingFoto,
};