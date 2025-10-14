const db = require('../config/database');

// Mengubah fungsi menjadi async
const getAllVideos = async (req, res) => {
  try {
    const sql = 'SELECT * FROM video';
    
    // Menggunakan await untuk menunggu hasil query
    const [videos] = await db.query(sql);

    // Ubah hasil untuk menyertakan URL lengkap
    const results = videos.map(video => {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const mediaUrl = `${baseUrl}/uploads/mediavideo/${video.media}`;
      const thumbnailUrl = `${baseUrl}/uploads/images/${video.thumbnail}`;
      
      return {
        ...video,
        media: mediaUrl,
        thumbnail: thumbnailUrl,
      };
    });

    res.status(200).json(results);
  } catch (err) {
    // Menangkap error jika query gagal
    console.error('Database query error:', err);
    res.status(500).json({
      message: 'Gagal mengambil data video',
      error: err,
    });
  }
};

// Mengubah fungsi menjadi async
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM video WHERE id = ?';

    // Menggunakan await dan mengirim ID sebagai parameter
    const [videos] = await db.query(sql, [id]);

    if (videos.length === 0) {
      return res.status(404).json({ message: 'Video tidak ditemukan' });
    }

    const video = videos[0];
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    // Buat URL lengkap
    video.media = `${baseUrl}/uploads/mediavideo/${video.media}`;
    video.thumbnail = `${baseUrl}/uploads/images/${video.thumbnail}`;

    res.status(200).json(video);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Gagal mengambil data video' });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
};