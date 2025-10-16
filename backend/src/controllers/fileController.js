// backend/src/controllers/fileController.js

const db = require('../config/database');

/**
 * Mengambil semua data file dari database.
 * Diurutkan berdasarkan tanggal unggah terbaru.
 */
exports.getAllFiles = async (req, res) => {
    try {
        const query = 'SELECT * FROM file ORDER BY uploaded_at DESC';
        const [results] = await db.query(query); 
        
        res.json({
            message: 'Data file berhasil diambil',
            data: results
        });
    } catch (err) {
        console.error('Error fetching files:', err);
        res.status(500).json({ 
            message: 'Gagal mengambil data file dari server', 
            error: err.message 
        });
    }
};

/**
 * Membuat entri file baru di database.
 * Menangani unggahan dua file: file PDF utama dan file gambar hasil preview.
 */
exports.createFile = async (req, res) => {
  try {
    // Validasi input: pastikan judul dan file PDF ada
    if (!req.files || !req.files.pdf_file) {
      return res.status(400).json({ message: "File PDF wajib diunggah" });
    }
    if (!req.body.title) {
      return res.status(400).json({ message: "Judul tidak boleh kosong" });
    }

    // Ambil data dari request body dan files
    const { title } = req.body;
    const pdfFile = req.files.pdf_file[0].filename;
    
    // File gambar bersifat opsional, jika tidak ada, simpan sebagai NULL
    const imageFile = req.files.image_file ? req.files.image_file[0].filename : null;

    // Query untuk memasukkan data ke dalam tabel 'file'
    const query = "INSERT INTO file (title, image_file, pdf_file) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [title, imageFile, pdfFile]);

    // Kirim respons sukses ke klien
    res.status(201).json({
      message: "File berhasil diunggah dan disimpan",
      data: { 
          id: result.insertId, 
          title, 
          pdf_file: pdfFile, 
          image_file: imageFile 
      },
    });
  } catch (err) {
    console.error("Error creating file:", err);
    res.status(500).json({ 
        message: "Gagal menyimpan data ke database", 
        error: err.message 
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah data ada
    const [rows] = await db.query('SELECT * FROM file WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'File tidak ditemukan' });
    }

    // Hapus dari database
    await db.query('DELETE FROM file WHERE id = ?', [id]);

    res.json({ message: 'File berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting file:', err);
    res.status(500).json({
      message: 'Gagal menghapus file dari database',
      error: err.message
    });
  }
};