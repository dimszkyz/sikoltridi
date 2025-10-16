const express = require('express');
const router = express.Router();
const { getAllUsers, ajukanAkun, rejectAkun, approveAkun, getPengajuanAkunList, loginUser,getAllUsersDB,deleteUser} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.get('/pengajuan-akun', getPengajuanAkunList); 
router.post('/pengajuan-akun', ajukanAkun);

router.post('/approve/:id', approveAkun);
router.delete('/reject/:id', rejectAkun);

router.get('/list-user', getAllUsersDB);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
