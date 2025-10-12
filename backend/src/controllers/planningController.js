// backend/src/controllers/planningController.js
const path = require('path');
const fs = require('fs');
const pool = require('../config/database'); // path kamu

function unlinkIfExists(filepath) {
  try { if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath); } catch {}
}

exports.listPlanning = async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, image_file, pdf_file, uploaded_at FROM planning ORDER BY uploaded_at DESC'
    );
    res.json({ data: rows });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Gagal mengambil data planning.' });
  }
};

exports.createPlanning = async (req, res) => {
  try {
    const { title } = req.body;

    // ambil pdf dari single() atau fields() (fallback)
    const pdf_file =
      req.file?.filename ||
      req.files?.pdf_file?.[0]?.filename ||
      null;

    if (!title || !pdf_file) {
      return res.status(400).json({ message: 'title dan pdf_file wajib diisi.' });
    }

    await pool.execute(
      'INSERT INTO planning (title, image_file, pdf_file) VALUES (?, ?, ?)',
      [title, null, pdf_file] // image_file NULL
    );

    res.status(201).json({ message: 'Berhasil menambah planning.' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Gagal menambah planning.' });
  }
};

exports.deletePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const [[row]] = await pool.query('SELECT * FROM planning WHERE id = ?', [id]);
    if (!row) return res.status(404).json({ message: 'Data tidak ditemukan.' });

    await pool.execute('DELETE FROM planning WHERE id = ?', [id]);

    const uploadsDir = path.join(process.cwd(), 'uploads', 'planning');
    unlinkIfExists(path.join(uploadsDir, row.image_file || '')); // mungkin NULL
    unlinkIfExists(path.join(uploadsDir, row.pdf_file || ''));

    res.json({ message: 'Berhasil menghapus planning.' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Gagal menghapus planning.' });
  }
};
