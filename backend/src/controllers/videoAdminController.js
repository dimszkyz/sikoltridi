const path = require('path');
const fs = require('fs');
const db = require('../config/database');

exports.getAllVideos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM video ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('getAllVideos error:', err);
    res.status(500).json({ message: 'Gagal mengambil data video' });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { judul, keterangan } = req.body;
    const media = req.files?.media?.[0]?.filename;
    const thumbnail = req.files?.thumbnail?.[0]?.filename;

    if (!judul || !media) {
      return res.status(400).json({ message: 'Judul dan video wajib diisi' });
    }

    const tanggal = new Date().toISOString().split('T')[0];
    await db.query(
      'INSERT INTO video (judul, media, thumbnail, tanggal) VALUES (?, ?, ?, ?)',
      [judul, media, thumbnail || null, tanggal]
    );

    res.status(201).json({ message: 'Video berhasil diunggah' });
  } catch (err) {
    console.error('addVideo error:', err);
    res.status(500).json({ message: 'Gagal menyimpan video ke database' });
  }
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM video WHERE id = ?', [id]);
    if (!rows.length)
      return res.status(404).json({ message: 'Video tidak ditemukan' });

    const video = rows[0];
    const mediaPath = path.join(process.cwd(), 'uploads/video/', video.media || '');
    const thumbPath = path.join(process.cwd(), 'uploads/video/thumb/', video.thumbnail || '');

    if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
    if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);

    await db.query('DELETE FROM video WHERE id = ?', [id]);
    res.json({ message: 'Video berhasil dihapus' });
  } catch (err) {
    console.error('deleteVideo error:', err);
    res.status(500).json({ message: 'Gagal menghapus video' });
  }
};
