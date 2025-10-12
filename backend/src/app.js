// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express(); // ✅ Inisialisasi HARUS sebelum app.use()

// ✅ Middleware
app.use(express.json()); // ✅ WAJIB agar req.body terbaca
// === Middleware global ===
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// === Static File Serving ===
app.use('/uploads/files', express.static(path.join(__dirname, '../uploads/files')));
app.use('/uploads/images', express.static(path.join(__dirname, '../uploads/images')));
app.use('/uploads/planning', express.static(path.join(__dirname, '../uploads/planning')));
app.use('/uploads/organizing', express.static(path.join(__dirname, '../uploads/organizing')));

// === IMPORT ROUTES (require dulu!) ===
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const planningRoutes = require('./routes/planning.routes');
const organizingRoutes = require('./routes/organizing.routes');
const kuesionerRoutes = require('./routes/kuesioner.routes');

// === Default Welcome Route ===
app.get('/', (_req, res) => {
  res.send('Selamat Datang di API SIKOLTRIDI!');
});

// === ROUTE MODULAR ===
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/uploads/files', express.static('uploads/files'));
app.use('/uploads/images', express.static('uploads/images'));

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// === Register semua modular route ===
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/organizing', organizingRoutes);
app.use('/api/kuesioner', kuesionerRoutes); // <- dipanggil setelah require

// === Error Handling ===
app.use((err, _req, res, _next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
});

module.exports = app;
