// backend/src/routes/planning.routes.js
const express = require('express');
const router = express.Router();
const { listPlanning, createPlanning, deletePlanning } = require('../controllers/planningController');
const { uploadPlanning } = require('../middlewares/uploadPlanning');

router.get('/', listPlanning);

// upload PDF saja
router.post('/', (req, res, next) => {
  uploadPlanning(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, createPlanning);

router.delete('/:id', deletePlanning);

module.exports = router;
