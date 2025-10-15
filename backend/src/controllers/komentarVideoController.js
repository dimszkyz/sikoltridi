const db = require('../config/database');

const getCommentsByVideoId = async (req, res) => {
  try {
    const { id_video } = req.params;
    
    // Tambahkan "u.level" di dalam SELECT
    const sql = `
      SELECT k.*, u.username, u.level 
      FROM komentar_video k 
      JOIN user u ON k.id_user = u.id_user
      WHERE k.id_video = ?
    `;

    const [comments] = await db.query(sql, [id_video]);

    res.status(200).json(comments);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Gagal mengambil data komentar' });
  }
};

module.exports = {
  getCommentsByVideoId,
};