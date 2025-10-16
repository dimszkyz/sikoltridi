// backend/src/routes/komentarFotoRoutes.js
const express = require('express');
const { getCommentsByFotoId, addCommentFoto } = require('../controllers/komentarFotoController');
const router = express.Router();

// Ambil semua komentar berdasarkan id foto
router.get('/:id_foto', getCommentsByFotoId);

// Tambahkan komentar baru
router.post('/', addCommentFoto);

module.exports = router;
