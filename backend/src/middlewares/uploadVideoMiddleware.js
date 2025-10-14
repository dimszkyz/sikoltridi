const multer = require("multer");
const path = require("path");
const fs = require("fs");

// === Konfigurasi penyimpanan ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder =
      file.fieldname === "media"
        ? "uploads/video/"
        : "uploads/video/thumb/";
    const dir = path.join(process.cwd(), folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + unique + path.extname(file.originalname));
  },
});

// === Tambahkan limit ukuran file ===
const uploadVideo = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // ✅ maksimal 200 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "media") {
      // Hanya izinkan video
      if (!file.mimetype.startsWith("video/")) {
        return cb(new Error("Hanya file video yang diperbolehkan!"));
      }
    }
    if (file.fieldname === "thumbnail") {
      // Hanya izinkan gambar
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Hanya file gambar yang diperbolehkan!"));
      }
    }
    cb(null, true);
  },
}).fields([
  { name: "media", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

module.exports = { uploadVideo };
