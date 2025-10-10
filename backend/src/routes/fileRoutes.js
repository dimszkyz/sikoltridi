// src/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Rute untuk GET /api/files/
router.get('/', fileController.getAllFiles);

module.exports = router;