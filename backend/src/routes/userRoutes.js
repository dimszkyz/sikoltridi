const express = require('express');
const router = express.Router();
const { getAllUsers, ajukanAkun, rejectAkun, approveAkun, getPengajuanAkunList } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/pengajuan-akun', getPengajuanAkunList); 
router.post('/pengajuan-akun', ajukanAkun);

router.post('/approve/:id', approveAkun);
router.delete('/reject/:id', rejectAkun);

module.exports = router;
