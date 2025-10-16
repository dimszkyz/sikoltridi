const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/videoAdminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumbnail') {
      cb(null, path.join('uploads/video/thumb'));
    } else {
      cb(null, path.join('uploads/video'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'media', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  controller.addVideo
);

router.get('/', controller.getAllVideos);
router.delete('/:id', controller.deleteVideo);

module.exports = router;
