const path = require('path');
const fs = require('fs');
const db = require('../config/database');
const ffmpeg = require('fluent-ffmpeg');

// --- Perbaikan Dimulai di Sini ---
// Mengimpor package ffmpeg-installer dan mengatur path-nya
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// --- Perbaikan Selesai ---


/**
 * Mengambil semua data video dari database.
 */
exports.getAllVideos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM video ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('getAllVideos error:', err);
    res.status(500).json({ message: 'Gagal mengambil data video' });
  }
};


/**
 * Menambahkan video baru, dengan pembuatan thumbnail otomatis jika tidak diunggah.
 */
exports.addVideo = async (req, res) => {
  try {
    const { judul, keterangan } = req.body;
    const mediaFile = req.files?.media?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    // Validasi input dasar
    if (!judul || !mediaFile) {
      return res.status(400).json({ message: 'Judul dan file video wajib diisi' });
    }

    let thumbnailFilename;

    // Cek jika pengguna mengunggah thumbnail
    if (thumbnailFile) {
      // Gunakan thumbnail yang diunggah
      thumbnailFilename = thumbnailFile.filename;
    } else {
      // Jika tidak, buat thumbnail secara otomatis dari video
      thumbnailFilename = `thumb-generated-${Date.now()}.png`;
      const outputPath = path.join(process.cwd(), 'uploads/video/thumb');

      // Pastikan folder tujuan ada, jika tidak maka buat folder tersebut
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // Proses pembuatan thumbnail menggunakan ffmpeg
      await new Promise((resolve, reject) => {
        ffmpeg(mediaFile.path)
          .on('end', () => resolve())
          .on('error', (err) => reject(new Error(`Gagal membuat thumbnail: ${err.message}`)))
          .screenshots({
            timestamps: ['00:00:01.000'], // Ambil frame pada detik pertama
            filename: thumbnailFilename,
            folder: outputPath,
            size: '320x240', // Ukuran thumbnail (bisa disesuaikan)
          });
      });
    }

    // Simpan informasi ke database
    const tanggal = new Date().toISOString().split('T')[0];
    await db.query(
      'INSERT INTO video (judul, keterangan, media, thumbnail, tanggal) VALUES (?, ?, ?, ?, ?)',
      [judul, keterangan || '', mediaFile.filename, thumbnailFilename, tanggal]
    );

    res.status(201).json({ message: 'Video berhasil diunggah' });
  } catch (err) {
    console.error('addVideo error:', err);
    // Kirim pesan error yang lebih spesifik ke klien
    res.status(500).json({ message: 'Gagal menyimpan video: ' + err.message });
  }
};


/**
 * Menghapus video dan file terkait (media & thumbnail).
 */
exports.deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    // Ambil data video dari DB untuk mendapatkan nama file
    const [rows] = await db.query('SELECT * FROM video WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Video tidak ditemukan' });
    }

    const video = rows[0];

    // Hapus file video
    if (video.media) {
      const mediaPath = path.join(process.cwd(), 'uploads/video', video.media);
      if (fs.existsSync(mediaPath)) {
        fs.unlinkSync(mediaPath);
      }
    }

    // Hapus file thumbnail jika ada
    if (video.thumbnail) {
      const thumbPath = path.join(process.cwd(), 'uploads/video/thumb', video.thumbnail);
      if (fs.existsSync(thumbPath)) {
        fs.unlinkSync(thumbPath);
      }
    }

    // Hapus data dari database
    await db.query('DELETE FROM video WHERE id = ?', [id]);
    res.json({ message: 'Video berhasil dihapus' });
  } catch (err) {
    console.error('deleteVideo error:', err);
    res.status(500).json({ message: 'Gagal menghapus video' });
  }
};