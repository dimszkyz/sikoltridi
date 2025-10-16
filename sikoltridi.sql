-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Okt 2025 pada 14.46
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

--
-- Dumping data untuk tabel `actuating_foto`
--

INSERT INTO `actuating_foto` (`id`, `title`, `image_file`, `deskripsi_image`, `upload_by`, `uploaded_at`) VALUES
(1, 'dimas anjai mabarrrrrrr', 'coba.jpg', 'gsufgwyufguybfwjhhbfuigvuegfjkebvjksdgfuiwgfuibfjkwebfiwdgfui3wbjk', 6, '2025-10-16 11:09:56');

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
(3, 'MODUL SIKADI', 'MODUL_SIKADI_6881a119108a0.jpg', 'MODUL_SIKADI_6881a11910f80.pdf', '2025-07-24 09:57:29'),
(5, 'b', 'PANDUAN_SIKADI_A5_686b0efc382ba_d94beffd013055e8.png', 'PANDUAN_SIKADI_A5_686b0efc382ba_d9c393fb99897f03.pdf', '2025-10-11 17:23:03'),
(6, 'po', 'PANDUAN_SIKADI_A5_686b0efc382ba_1295877971b0aa21.png', 'PANDUAN_SIKADI_A5_686b0efc382ba_7822018c90df3c1a.pdf', '2025-10-11 17:39:53'),
(7, 'p', 'MODUL_SIKADI_6881a11910f80_3e7c902024a6fd88.png', 'MODUL_SIKADI_6881a11910f80_c92ebf7fe41b3e24.pdf', '2025-10-12 13:08:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar_foto`
--

CREATE TABLE `komentar_foto` (
  `id` int(11) NOT NULL,
  `id_foto` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `isi_komentar` text NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `komentar_foto`
--

INSERT INTO `komentar_foto` (`id`, `id_foto`, `id_user`, `isi_komentar`, `tanggal`) VALUES
(1, 1, 4, 'gafsyuwydfvahsvdywfeydfavdhgsvdytwfydfdgsahgdfaysfdtfytfeyfdgfyefydtfayfdghfytefydfatyfdjcdhfihihajkhgeyufgsugfjhwgyufgy7gyugsfuhgsugfyeguywguygdsgygfyugfjhsvcnbxcvbs hcvuhvbjshbcjsbchgyugjhbsnc  s c scibvhujs cnsbhcbwugucn cbuiwisbnj  nvbivbsuh jh', '2025-10-16 11:25:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar_video`
--

CREATE TABLE `komentar_video` (
  `id` int(11) NOT NULL,
  `id_video` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `isi_komentar` text DEFAULT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `komentar_video`
--

INSERT INTO `komentar_video` (`id`, `id_video`, `id_user`, `isi_komentar`, `tanggal`) VALUES
(1, 4, 7, 'hjkgdugadgasudgaudguagdugayudgayudgqyugdyuagdjyagcjhavcjhsgcyuwgfyusvcjhsvcyucyugwuhcgweuhfgfwYUCGUACGYUWGCYUGUHVSCUGWYUCGSJHBCNVBCUHWVCUWVCJHVBCJHVSSCYVWCBNCBJHBSCVUHGCUYGSCJHSVSHGVYUEVFUSGJBSJHWEYUEFGYUWGFJBCJHSBCHJWHUSHJCBNJSBCNCBWHUFEGYUWUGFNZBCJHWCYUWEGFYUWBFNJSCBUHWGFCYUWGJHBCJHVWADCUHGEFYUVSVCUHWGFYGJNBJHGEUHGUVGUVGUDVJKASFUIGWFCBBFUGUDBBBUGSHDBXGHJGDFHBXNBSNGHDJHCBHSJHDBBCHVSJBBCNBHJASHBJANC BJBJKBAJKSBJKABDSJKABDMNABCJHXAGCUIWBKBJABCUWGUHABCNABCUHGWHUGAHJDBAJHDGQHUDGUADGJHADBJHQGUDGUADGJQHGDUIGEUIQHUIQHJKABCJHACBHWFGUWH', '2025-10-15 02:37:26'),
(2, 4, 2, 'uasdgyuwefyugfjhgwufygwuyfgwueegfbjhfuwgefyuguwyefvjhwvcuwfy7fufvwjhfvhegdfuyg3wfguhfgeyugfgfjhebfjheyufgf8hfoiqwofhq9y29yr9hhwjkfh2uyr82yriu2hkrjhij298ry9hjkshfjgfyuegfyugwfy38yhfjkoifg38ui3bfjksghfig3huf3ihjkfhui3gt7y3tuihjkfh398ry987r82yruiwhrug2h8ry873yirwyerjhfjkwghfuiy38r4yiwehfksfkbjhbvkhvo3fhiwhjkjkehf982yriowuknjkfuiy', '2025-10-15 03:38:39'),
(3, 4, 7, 'p', '2025-10-16 02:16:46');

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
(5, 'Himmah Taulany', 'Dosen', 'Universitas', 'Sangat Baik', 'Baik', 'Baik', 'Baik', 'Sangat Baik', 'Baik', 'Cukup', 'Cukup', 'Baik', 'Baik', 'Baik', 'Baik', 'Sangat Baik', 'Baik', 'Cukup', 'Baik', 'Baik', 'Baik', 'Baik', 'Baik', 'Kurang', 'Sangat Kurang', 'Baik', 'Baik', '2025-07-07 07:22:19'),
(6, 'dimas', 'CEO', 'Lembaga amal jariyah', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', '2025-10-12 18:35:12');

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

--
-- Dumping data untuk tabel `organizing`
--

INSERT INTO `organizing` (`id`, `title`, `image_file`, `pdf_file`, `uploaded_at`) VALUES
(1, 'coba', NULL, 'PANDUAN_SIKADI_A5_686b0efc382ba_d9c393fb99897f03__63a05b1e58_1760268715891.pdf', '2025-10-12 18:31:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengajuan_akun`
--

CREATE TABLE `pengajuan_akun` (
  `id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `level` varchar(20) NOT NULL DEFAULT 'user',
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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

--
-- Dumping data untuk tabel `planning`
--

INSERT INTO `planning` (`id`, `title`, `image_file`, `pdf_file`, `uploaded_at`) VALUES
(1, 'coba', NULL, 'PANDUAN_SIKADI_A5_686b0efc382ba_7822018c90df3c1a__afc9da3c55_1760268694564.pdf', '2025-10-12 18:31:34');

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
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `level`) VALUES
(1, 'tester01', 'Passw0rd!', 'user'),
(2, 'tester01', 'Passw0rd!', 'user'),
(3, 'tester01', 'Passw0rd!', 'user'),
(4, 'tester01', 'Passw0rd!', 'user'),
(6, 'kumar', 'kumar123', 'admin'),
(7, 'sadmin', 'sadmin123', 'superadmin'),
(8, 'kumar', 'kumar123', 'admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `media` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `keterangan` varchar(900) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `video`
--

INSERT INTO `video` (`id`, `media`, `thumbnail`, `tanggal`, `judul`, `keterangan`) VALUES
(4, 'media_1760452578389_850431279.mp4', 'thumbnail_1760452578417_808930265.jpg', '2025-10-14', 'vgdtdtdt', 'buhgfuywgfyuwgfjhwegfyuwgu'),
(6, 'media-1760588862412-849157805.mp4', 'thumbnail-1760588862723-393054288.png', '2025-10-16', 'nmnmmnmn', 'nnbnbnb');

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
-- Indeks untuk tabel `komentar_foto`
--
ALTER TABLE `komentar_foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_foto` (`id_foto`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `komentar_video`
--
ALTER TABLE `komentar_video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_video` (`id_video`),
  ADD KEY `id_user` (`id_user`);

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
-- Indeks untuk tabel `pengajuan_akun`
--
ALTER TABLE `pengajuan_akun`
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
-- Indeks untuk tabel `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `actuating_foto`
--
ALTER TABLE `actuating_foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `komentar_foto`
--
ALTER TABLE `komentar_foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `komentar_video`
--
ALTER TABLE `komentar_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kuesioner`
--
ALTER TABLE `kuesioner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `organizing`
--
ALTER TABLE `organizing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pengajuan_akun`
--
ALTER TABLE `pengajuan_akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `actuating_foto`
--
ALTER TABLE `actuating_foto`
  ADD CONSTRAINT `actuating_foto_ibfk_1` FOREIGN KEY (`upload_by`) REFERENCES `user` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `komentar_foto`
--
ALTER TABLE `komentar_foto`
  ADD CONSTRAINT `komentar_foto_ibfk_1` FOREIGN KEY (`id_foto`) REFERENCES `actuating_foto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_foto_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `komentar_video`
--
ALTER TABLE `komentar_video`
  ADD CONSTRAINT `komentar_video_ibfk_1` FOREIGN KEY (`id_video`) REFERENCES `video` (`id`),
  ADD CONSTRAINT `komentar_video_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
