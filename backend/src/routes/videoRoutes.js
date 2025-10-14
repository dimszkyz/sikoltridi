const express = require('express');
const { getAllVideos, getVideoById } = require('../controllers/videoController');

const router = express.Router();

// Ini akan membuat endpoint menjadi /api/videos/
router.get('/', getAllVideos);
router.get('/:id', getVideoById);

// PASTIKAN ANDA MENGEKSPOR 'router', BUKAN '{ router }'
module.exports = router;