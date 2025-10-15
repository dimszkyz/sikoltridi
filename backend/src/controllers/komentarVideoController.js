const db = require('../config/database');

const getCommentsByVideoId = async (req, res) => {
  try {
    const { id_video } = req.params;
    const sql = `
      SELECT k.*, u.username, u.level 
      FROM komentar_video k 
      JOIN user u ON k.id_user = u.id_user
      WHERE k.id_video = ?
      ORDER BY k.tanggal DESC
    `;

    const [comments] = await db.query(sql, [id_video]);

    res.status(200).json(comments);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Gagal mengambil data komentar' });
  }
};

// --- TAMBAHKAN FUNGSI BARU INI ---
const addComment = async (req, res) => {
  try {
    const { id_video, id_user, isi_komentar } = req.body;

    // Validasi input
    if (!id_video || !id_user || !isi_komentar) {
      return res.status(400).json({ message: 'Data komentar tidak lengkap' });
    }

    const sql = 'INSERT INTO komentar_video (id_video, id_user, isi_komentar) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [id_video, id_user, isi_komentar]);

    // Ambil kembali data komentar yang baru saja dibuat beserta info user
    const [newComment] = await db.query(
      `SELECT k.*, u.username, u.level 
       FROM komentar_video k 
       JOIN user u ON k.id_user = u.id_user 
       WHERE k.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newComment[0]);
  } catch (err) {
    console.error('Gagal menambahkan komentar:', err);
    res.status(500).json({ message: 'Gagal menambahkan komentar' });
  }
};

module.exports = {
  getCommentsByVideoId,
  addComment, // <-- Ekspor fungsi baru
};