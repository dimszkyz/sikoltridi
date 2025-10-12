// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express(); // ✅ Inisialisasi HARUS sebelum app.use()

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ WAJIB agar req.body terbaca
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Selamat Datang di API SIKOLTRIDI!');
});

// === ROUTE MODULAR ===
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/uploads/files', express.static('uploads/files'));
app.use('/uploads/images', express.static('uploads/images'));

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

module.exports = app;
