// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Selamat Datang di API SIKOLTRIDI!');
});

// === ROUTE MODULAR ===
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes'); // <-- 1. Impor rute file

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes); // <-- 2. Gunakan rute file

module.exports = app;