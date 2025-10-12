const pool = require('../config/database');
 // pastikan file db.js berisi koneksi mysql2/promise

exports.createKuesioner = async (req, res) => {
  try {
    const p = req.body;

    const fields = [
      "nama_responden","jabatan","lembaga",
      "a1","a2","a3","a4","a5","a6","a7","a8","a9","a10",
      "b1","b2","b3","b4","b5",
      "c1","c2","c3","c4","c5",
      "d1","d2","d3","d4"
    ];

    const placeholders = fields.map(() => "?").join(",");
    const sql = `INSERT INTO kuesioner (${fields.join(",")}) VALUES (${placeholders})`;
    const values = fields.map(f => p[f] || null);

    const [result] = await pool.query(sql, values);

    res.status(201).json({ success: true, id: result.insertId, message: "Kuesioner berhasil disimpan" });
  } catch (err) {
    console.error("createKuesioner error:", err);
    res.status(500).json({ success: false, message: "Gagal menyimpan kuesioner" });
  }
};
exports.getAllKuesioner = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM kuesioner ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error("getAllKuesioner error:", err);
    res.status(500).json({ success: false, message: "Gagal mengambil data kuesioner" });
  }
};

