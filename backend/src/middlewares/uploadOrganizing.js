// backend/src/middlewares/uploadOrganizing.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "organizing");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

function safeName(original) {
  const ext = path.extname(original || "").toLowerCase();
  const base =
    path
      .basename(original || "", ext)
      .normalize("NFKD")
      .replace(/[^\w\-]+/g, "_")
      .slice(0, 50) || "file";
  const rand = crypto.randomBytes(5).toString("hex");
  return `${base}__${rand}_${Date.now()}${ext}`;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
});

function fileFilter(_req, file, cb) {
  if (file.mimetype === "application/pdf") return cb(null, true);
  return cb(new Error("Tipe file tidak valid (harus PDF)."));
}

const uploadOrganizing = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}).single("pdf_file"); // harus cocok dengan field dari frontend

module.exports = { uploadOrganizing };
