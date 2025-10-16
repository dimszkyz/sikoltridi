// backend/src/routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Simpan file berdasarkan jenisnya
        if (file.fieldname === 'pdf_file') {
            cb(null, 'uploads/files/');
        } else if (file.fieldname === 'image_file') {
            cb(null, 'uploads/images/');
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');
        const originalName = path.parse(file.originalname).name.replace(/\s+/g, '_');
        cb(null, `${originalName}_${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

router.get('/', fileController.getAllFiles);
router.delete('/:id', fileController.deleteFile);

// Rute BARU: Terima 2 file sekaligus (pdf dan image)
router.post('/', upload.fields([
    { name: 'pdf_file', maxCount: 1 },
    { name: 'image_file', maxCount: 1 }
]), fileController.createFile);

module.exports = router;