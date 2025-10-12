// backend/src/controllers/organizingController.js
const path = require("path");
const fs = require("fs");
const pool = require("../config/database"); // pastikan path ini benar

function unlinkIfExists(filepath) {
  try {
    if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);
  } catch {}
}

exports.listOrganizing = async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, image_file, pdf_file, uploaded_at FROM organizing ORDER BY uploaded_at DESC"
    );
    res.json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data organizing." });
  }
};

exports.createOrganizing = async (req, res) => {
  try {
    const { title } = req.body;

    // ambil pdf dari single() atau fields() (fallback)
    const pdf_file =
      req.file?.filename ||
      req.files?.pdf_file?.[0]?.filename ||
      null;

    if (!title || !pdf_file) {
      return res.status(400).json({ message: "title dan pdf_file wajib diisi." });
    }

    await pool.execute(
      "INSERT INTO organizing (title, image_file, pdf_file) VALUES (?, ?, ?)",
      [title, null, pdf_file] // image_file NULL (kita render thumbnail PDF di frontend)
    );

    res.status(201).json({ message: "Berhasil menambah organizing." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambah organizing." });
  }
};

exports.deleteOrganizing = async (req, res) => {
  try {
    const { id } = req.params;
    const [[row]] = await pool.query("SELECT * FROM organizing WHERE id = ?", [id]);
    if (!row) return res.status(404).json({ message: "Data tidak ditemukan." });

    await pool.execute("DELETE FROM organizing WHERE id = ?", [id]);

    const uploadsDir = path.join(process.cwd(), "uploads", "organizing");
    // image_file kemungkinan NULL, pdf wajib ada
    if (row.image_file) unlinkIfExists(path.join(uploadsDir, row.image_file));
    if (row.pdf_file) unlinkIfExists(path.join(uploadsDir, row.pdf_file));

    res.json({ message: "Berhasil menghapus organizing." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus organizing." });
  }
};
