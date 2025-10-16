// backend/src/controllers/komentarFotoController.js
const db = require('../config/database');

// === Ambil komentar berdasarkan id_foto ===
const getCommentsByFotoId = async (req, res) => {
  try {
    const { id_foto } = req.params;
    const sql = `
      SELECT k.*, u.username, u.level 
      FROM komentar_foto k
      JOIN user u ON k.id_user = u.id_user
      WHERE k.id_foto = ?
      ORDER BY k.tanggal DESC
    `;
    const [comments] = await db.query(sql, [id_foto]);
    res.status(200).json({
      success: true,
      message: 'Data komentar berhasil diambil',
      data: comments
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Gagal mengambil data komentar' });
  }
};

// === Tambah komentar baru ===
const addCommentFoto = async (req, res) => {
  try {
    const { id_foto, id_user, isi_komentar } = req.body;

    if (!id_foto || !id_user || !isi_komentar) {
      return res.status(400).json({ message: 'Data komentar tidak lengkap' });
    }

    // Simpan ke database
    const sqlInsert = `
      INSERT INTO komentar_foto (id_foto, id_user, isi_komentar)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sqlInsert, [id_foto, id_user, isi_komentar]);

    // Ambil kembali data yang baru disimpan beserta username dan level user
    const [newComment] = await db.query(
      `SELECT k.*, u.username, u.level
       FROM komentar_foto k
       JOIN user u ON k.id_user = u.id_user
       WHERE k.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Komentar berhasil ditambahkan',
      data: newComment[0]
    });
  } catch (err) {
    console.error('Gagal menambahkan komentar:', err);
    res.status(500).json({ message: 'Gagal menambahkan komentar' });
  }
};

module.exports = {
  getCommentsByFotoId,
  addCommentFoto
};
