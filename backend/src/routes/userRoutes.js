// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Definisikan rute untuk GET /api/users/
router.get('/', userController.getAllUsers);

module.exports = router;