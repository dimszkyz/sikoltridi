// backend/src/middlewares/uploadPlanning.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'planning');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

function safeName(original) {
  const ext = path.extname(original || '').toLowerCase();
  const base = path
    .basename(original || '', ext)
    .normalize('NFKD')
    .replace(/[^\w\-]+/g, '_')
    .slice(0, 50) || 'file';
  const rand = crypto.randomBytes(5).toString('hex');
  return `${base}__${rand}_${Date.now()}${ext}`;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, safeName(file.originalname))
});

function fileFilter(_req, file, cb) {
  const type = (file.mimetype || '').toLowerCase();
  const ext = path.extname(file.originalname || '').toLowerCase();

  const isPdfMime =
    type === 'application/pdf' ||
    type === 'application/x-pdf' ||
    type === 'application/acrobat' ||
    type === 'applications/vnd.pdf' ||
    type === 'text/pdf' ||
    type === 'text/x-pdf';

  if (isPdfMime || ext === '.pdf') return cb(null, true);
  return cb(new Error('Tipe file tidak valid (harus PDF).'));
}

const uploadPlanning = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}).single('pdf_file'); // harus sama dengan field dari frontend

module.exports = { uploadPlanning };
