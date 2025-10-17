// backend/src/routes/actuatingFotoRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllActuatingFoto,
  getActuatingFotoById,
  createActuatingFoto, // <-- Impor fungsi baru
  deleteActuatingFoto, // <-- Impor fungsi baru
} = require('../controllers/actuatingFotoController');

// Impor middleware upload
const upload = require('../middlewares/uploadFotoMiddleware');

// Rute untuk mengambil semua data
// GET /api/foto
router.get('/foto', getAllActuatingFoto);

// Rute untuk mengambil data berdasarkan ID
// GET /api/foto/:id
router.get('/foto/:id', getActuatingFotoById);

// Rute untuk menambah data baru
// POST /api/foto
router.post('/foto', upload.single('foto'), createActuatingFoto);
// 'foto' harus cocok dengan nama field di FormData frontend: fd.append("foto", foto);

// Rute untuk menghapus data
// DELETE /api/foto/:id
router.delete('/foto/:id', deleteActuatingFoto);

module.exports = router;