const express = require('express');
// Pastikan nama controller yang dipanggil sudah benar
const { getCommentsByVideoId } = require('../controllers/komentarVideoController');

const router = express.Router();

router.get('/:id_video', getCommentsByVideoId);

module.exports = router;