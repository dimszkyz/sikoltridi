const express = require('express');
const { getAllVideos, addVideo, deleteVideo } = require('../controllers/videoAdminController');
const { uploadVideo } = require('../middlewares/uploadVideoMiddleware');

const router = express.Router();

router.get('/', getAllVideos);
router.post('/', uploadVideo, addVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
