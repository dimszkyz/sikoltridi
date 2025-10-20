// backend/src/controllers/userController.js
const db = require("../config/database"); // pastikan kamu punya file koneksi db
// Atau sesuaikan dengan lokasi file koneksi database kamu

const getAllUsers = (req, res) => {
  const users = [
    { id: 1, name: "Ammaar" },
    { id: 2, name: "Pengguna Dua" },
  ];
  res.json({
    message: "Data user berhasil diambil",
    data: users,
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, msg: "Username dan password wajib diisi" });

  try {
    const [rows] = await db.query(
      "SELECT id_user AS id, username, level FROM user WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0)
      return res
        .status(401)
        .json({ success: false, msg: "Username atau password salah" });

    const user = rows[0];

    // Simpan data login sederhana (tanpa JWT dulu)
    res.json({
      success: true,
      msg: "Login berhasil",
      user, // kirim data user agar bisa ditampilkan di frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Terjadi kesalahan server" });
  }
};

const ajukanAkun = async (req, res) => {
  console.log("🔥 Menerima request pengajuan akun:", req.body);

  const { username, password } = req.body;
  const level = "user";

  if (!username || !password) {
    return res
      .status(400)
      .json({ msg: "Username dan password tidak boleh kosong" });
  }

  try {
    console.log("➡ Menjalankan INSERT ke database...");
    const insertSql =
      "INSERT INTO pengajuan_akun (username, password, level) VALUES (?, ?, ?)";
    const [result] = await db.query(insertSql, [username, password, level]); // ✅ PAKAI AWAIT

    console.log("✅ Data berhasil masuk:", result);
    return res.status(201).json({ msg: "Pengajuan akun berhasil disimpan!" });
  } catch (err) {
    console.error("❌ Gagal insert:", err);
    return res.status(500).json({ msg: "Gagal mengajukan akun", error: err });
  }
};

// GET semua pengajuan akun
const getPengajuanAkunList = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pengajuan_akun");
    res.status(200).json({ data: rows });
  } catch (err) {
    res.status(500).json({ msg: "Gagal mengambil data", error: err });
  }
};

// APPROVE akun → pindahkan data ke tabel `users` lalu hapus dari `pengajuan_akun`
const approveAkun = async (req, res) => {
  const id = req.params.id;
  const { role } = req.body; // TERIMA ROLE DARI FRONTEND

  try {
    const [rows] = await db.query("SELECT * FROM pengajuan_akun WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { username, password } = rows[0];

    // Insert ke user pakai role terpilih
    await db.query(
      "INSERT INTO user (username, password, level) VALUES (?, ?, ?)",
      [username, password, role]
    );

    await db.query("DELETE FROM pengajuan_akun WHERE id = ?", [id]);

    res.status(200).json({ msg: `Akun berhasil disetujui sebagai ${role}!` });
  } catch (err) {
    res.status(500).json({ msg: "Gagal approve akun", error: err });
  }
};

// REJECT akun → langsung hapus dari pengajuan_akun
const rejectAkun = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM pengajuan_akun WHERE id = ?", [id]);
    res.status(200).json({ msg: "Akun ditolak dan dihapus!" });
  } catch (err) {
    res.status(500).json({ msg: "Gagal menghapus data", error: err });
  }
};

const getAllUsersDB = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id_user AS id, username, level FROM user");
    res.status(200).json({ data: rows });
  } catch (err) {
    res.status(500).json({ msg: "Gagal mengambil data user", error: err });
  }
};

// Hapus user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    // Hapus data terkait di tabel-tabel lain
    await db.query("DELETE FROM komentar_video WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM komentar_foto WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM files WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM video WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM foto WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM planning WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM organizing WHERE id_user = ?", [id]).catch(() => {});
    await db.query("DELETE FROM actuating_foto WHERE upload_by = ?", [id]).catch(() => {});
    // Terakhir hapus user
    const [result] = await db.query("DELETE FROM user WHERE id_user = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.status(200).json({ msg: "User dan semua data terkait berhasil dihapus" });
  } catch (err) {
    console.error("❌ Gagal hapus user:", err);
    res.status(500).json({ msg: "Gagal menghapus user", error: err });
  }
};

module.exports = {
  getAllUsers,
  ajukanAkun,
  rejectAkun,
  approveAkun,
  getPengajuanAkunList,
  loginUser,
  getAllUsersDB,
  deleteUser,  
};
