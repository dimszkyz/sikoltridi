const express = require('express');
const { getCommentsByVideoId, addComment } = require('../controllers/komentarVideoController');

const router = express.Router();

router.get('/:id_video', getCommentsByVideoId);
router.post('/', addComment); // <-- TAMBAHKAN RUTE BARU INI

module.exports = router;