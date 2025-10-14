-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2025 at 02:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `actuating_foto`
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
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `title`, `image_file`, `pdf_file`, `uploaded_at`) VALUES
(2, 'PANDUAN SIKADI', 'PANDUAN_SIKADI_A5_686b0efc38095.jpg', 'PANDUAN_SIKADI_A5_686b0efc382ba.pdf', '2025-07-07 07:04:12'),
(3, 'MODUL SIKADI', 'MODUL_SIKADI_6881a119108a0.jpg', 'MODUL_SIKADI_6881a11910f80.pdf', '2025-07-24 09:57:29'),
(4, 'coba', 'PANDUAN_SIKADI_A5_686b0efc382ba_2e0a3ba09b811e5a.png', 'PANDUAN_SIKADI_A5_686b0efc382ba_0b9ebac47885340e.pdf', '2025-10-11 17:11:02'),
(5, 'b', 'PANDUAN_SIKADI_A5_686b0efc382ba_d94beffd013055e8.png', 'PANDUAN_SIKADI_A5_686b0efc382ba_d9c393fb99897f03.pdf', '2025-10-11 17:23:03'),
(6, 'po', 'PANDUAN_SIKADI_A5_686b0efc382ba_1295877971b0aa21.png', 'PANDUAN_SIKADI_A5_686b0efc382ba_7822018c90df3c1a.pdf', '2025-10-11 17:39:53'),
(7, 'p', 'MODUL_SIKADI_6881a11910f80_3e7c902024a6fd88.png', 'MODUL_SIKADI_6881a11910f80_c92ebf7fe41b3e24.pdf', '2025-10-12 13:08:17');

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

CREATE TABLE `komentar` (
  `id` int(11) NOT NULL,
  `id_video` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `isi_komentar` text DEFAULT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kuesioner`
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
-- Dumping data for table `kuesioner`
--

INSERT INTO `kuesioner` (`id`, `nama_responden`, `jabatan`, `lembaga`, `a1`, `a2`, `a3`, `a4`, `a5`, `a6`, `a7`, `a8`, `a9`, `a10`, `b1`, `b2`, `b3`, `b4`, `b5`, `c1`, `c2`, `c3`, `c4`, `c5`, `d1`, `d2`, `d3`, `d4`, `submitted_at`) VALUES
(5, 'Himmah Taulany', 'Dosen', 'Universitas', 'Sangat Baik', 'Baik', 'Baik', 'Baik', 'Sangat Baik', 'Baik', 'Cukup', 'Cukup', 'Baik', 'Baik', 'Baik', 'Baik', 'Sangat Baik', 'Baik', 'Cukup', 'Baik', 'Baik', 'Baik', 'Baik', 'Baik', 'Kurang', 'Sangat Kurang', 'Baik', 'Baik', '2025-07-07 07:22:19'),
(6, 'dimas', 'CEO', 'Lembaga amal jariyah', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', 'Sangat Baik', '2025-10-12 18:35:12');

-- --------------------------------------------------------

--
-- Table structure for table `organizing`
--

CREATE TABLE `organizing` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizing`
--

INSERT INTO `organizing` (`id`, `title`, `image_file`, `pdf_file`, `uploaded_at`) VALUES
(1, 'coba', NULL, 'PANDUAN_SIKADI_A5_686b0efc382ba_d9c393fb99897f03__63a05b1e58_1760268715891.pdf', '2025-10-12 18:31:55');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_akun`
--

CREATE TABLE `pengajuan_akun` (
  `id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `level` varchar(20) NOT NULL DEFAULT 'user',
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajuan_akun`
--

INSERT INTO `pengajuan_akun` (`id`, `username`, `password`, `level`, `status`, `created_at`) VALUES
(8, 'kumar', 'kumar123', 'user', 'pending', '2025-10-12 11:40:07');

-- --------------------------------------------------------

--
-- Table structure for table `planning`
--

CREATE TABLE `planning` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `planning`
--

INSERT INTO `planning` (`id`, `title`, `image_file`, `pdf_file`, `uploaded_at`) VALUES
(1, 'coba', NULL, 'PANDUAN_SIKADI_A5_686b0efc382ba_7822018c90df3c1a__afc9da3c55_1760268694564.pdf', '2025-10-12 18:31:34');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `level`) VALUES
(1, 'tester01', 'Passw0rd!', 'user'),
(2, 'tester01', 'Passw0rd!', 'user'),
(3, 'tester01', 'Passw0rd!', 'user'),
(4, 'tester01', 'Passw0rd!', 'user'),
(5, 'kumar', 'kumar123', 'user'),
(6, 'kumar', 'kumar123', 'admin'),
(7, 'sadmin', 'sadmin123', 'superadmin');

-- --------------------------------------------------------

--
-- Table structure for table `video`
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
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `media`, `thumbnail`, `tanggal`, `judul`, `keterangan`) VALUES
(2, 'media_1760429849847_350622447.mp4', 'thumbnail_1760429850012_366957950.jpg', '2025-10-14', 'aaa', ''),
(3, 'media_1760430904499_17473933.mp4', 'thumbnail_1760430907149_931536459.png', '2025-10-14', 'weq', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actuating_foto`
--
ALTER TABLE `actuating_foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `upload_by` (`upload_by`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_video` (`id_video`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `kuesioner`
--
ALTER TABLE `kuesioner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizing`
--
ALTER TABLE `organizing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengajuan_akun`
--
ALTER TABLE `pengajuan_akun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actuating_foto`
--
ALTER TABLE `actuating_foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `komentar`
--
ALTER TABLE `komentar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kuesioner`
--
ALTER TABLE `kuesioner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `organizing`
--
ALTER TABLE `organizing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pengajuan_akun`
--
ALTER TABLE `pengajuan_akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actuating_foto`
--
ALTER TABLE `actuating_foto`
  ADD CONSTRAINT `actuating_foto_ibfk_1` FOREIGN KEY (`upload_by`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`id_video`) REFERENCES `video` (`id`),
  ADD CONSTRAINT `komentar_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
