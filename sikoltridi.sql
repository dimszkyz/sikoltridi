-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Okt 2025 pada 06.22
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sikoltridi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `actuating_foto`
--

CREATE TABLE `actuating_foto` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `deskripsi_image` varchar(1000) DEFAULT NULL,
  `upload_by` int(11) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `file`
--

INSERT INTO `file` (`id`, `title`, `image_file`, `pdf_file`, `uploaded_at`) VALUES
(2, 'PANDUAN SIKADI', 'PANDUAN_SIKADI_A5_686b0efc38095.jpg', 'PANDUAN_SIKADI_A5_686b0efc382ba.pdf', '2025-07-07 07:04:12'),
(3, 'MODUL SIKADI', 'MODUL_SIKADI_6881a119108a0.jpg', 'MODUL_SIKADI_6881a11910f80.pdf', '2025-07-24 09:57:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kuesioner`
--

CREATE TABLE `kuesioner` (
  `id` int(11) NOT NULL,
  `nama_responden` varchar(255) DEFAULT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `lembaga` varchar(255) DEFAULT NULL,
  `a1` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a2` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a3` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a4` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a5` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a6` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a7` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a8` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a9` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `a10` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `b1` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `b2` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `b3` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `b4` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `b5` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `c1` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `c2` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `c3` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `c4` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `c5` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `d1` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `d2` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `d3` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `d4` enum('Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang') NOT NULL,
  `submitted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kuesioner`
--

INSERT INTO `kuesioner` (`id`, `nama_responden`, `jabatan`, `lembaga`, `a1`, `a2`, `a3`, `a4`, `a5`, `a6`, `a7`, `a8`, `a9`, `a10`, `b1`, `b2`, `b3`, `b4`, `b5`, `c1`, `c2`, `c3`, `c4`, `c5`, `d1`, `d2`, `d3`, `d4`, `submitted_at`) VALUES
(5, 'Himmah Taulany', 'Dosen', 'Universitas', 'Sangat Baik', 'Baik', 'Baik', 'Baik', 'Sangat Baik', 'Baik', 'Cukup', 'Cukup', 'Baik', 'Baik', 'Baik', 'Baik', 'Sangat Baik', 'Baik', 'Cukup', 'Baik', 'Baik', 'Baik', 'Baik', 'Baik', 'Kurang', 'Sangat Kurang', 'Baik', 'Baik', '2025-07-07 07:22:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `organizing`
--

CREATE TABLE `organizing` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `planning`
--

CREATE TABLE `planning` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `actuating_foto`
--
ALTER TABLE `actuating_foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `upload_by` (`upload_by`);

--
-- Indeks untuk tabel `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kuesioner`
--
ALTER TABLE `kuesioner`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `organizing`
--
ALTER TABLE `organizing`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `actuating_foto`
--
ALTER TABLE `actuating_foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kuesioner`
--
ALTER TABLE `kuesioner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `organizing`
--
ALTER TABLE `organizing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `actuating_foto`
--
ALTER TABLE `actuating_foto`
  ADD CONSTRAINT `actuating_foto_ibfk_1` FOREIGN KEY (`upload_by`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
