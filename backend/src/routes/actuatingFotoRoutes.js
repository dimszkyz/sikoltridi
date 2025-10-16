// backend/src/routes/actuatingFotoRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllActuatingFoto,
  getActuatingFotoById,
} = require('../controllers/actuatingFotoController');

// Rute untuk mengambil semua data
router.get('/actuating-foto', getAllActuatingFoto);

// Rute untuk mengambil data berdasarkan ID
router.get('/actuating-foto/:id', getActuatingFotoById);

module.exports = router;