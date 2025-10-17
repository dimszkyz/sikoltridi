// backend/src/middlewares/uploadFotoMiddleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tentukan folder penyimpanan
const storagePath = path.join(__dirname, '../../../uploads/foto');

// Pastikan direktori ada, jika tidak, buatkan
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    // Buat nama file yang unik untuk menghindari duplikasi
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file JPG dan PNG yang diizinkan!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Batas ukuran file 5 MB
  },
});

module.exports = upload;