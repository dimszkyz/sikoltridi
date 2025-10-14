import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailVideo = () => {
  const { id } = useParams(); // Mengambil 'id' dari URL, contoh: /video/1
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        // Sesuaikan URL jika port atau host berbeda
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(response.data);
      } catch (err) {
        console.error("Error fetching video details:", err);
        setError('Gagal memuat detail video. Mungkin video tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]); // Jalankan effect ini setiap kali 'id' di URL berubah

  // Tampilan saat loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Memuat video...</p>
      </div>
    );
  }

  // Tampilan jika ada error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  // Tampilan jika video tidak ditemukan
  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Video tidak ditemukan.</p>
      </div>
    );
  }
  
  // Fungsi untuk memformat tanggal menjadi lebih mudah dibaca
  const formattedDate = new Date(video.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Kontainer Video Player */}
        <div className="bg-black rounded-lg shadow-2xl overflow-hidden mb-6">
          <video
            className="w-full aspect-video"
            controls
            poster={video.thumbnail} // Menampilkan thumbnail sebelum video diputar
            key={video.id} // Key untuk me-remount komponen jika video berubah
          >
            <source src={video.media} type="video/mp4" />
            Browser Anda tidak mendukung tag video.
          </video>
        </div>

        {/* Kontainer Detail Informasi */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {video.judul}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            {/* Ikon Kalender (SVG dari Heroicons) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>Diupload pada {formattedDate}</span>
          </div>
        </div>
        
        {/* Anda bisa menambahkan bagian lain di sini, seperti deskripsi atau kolom komentar */}
      </div>
    </div>
  );
};

export default DetailVideo;