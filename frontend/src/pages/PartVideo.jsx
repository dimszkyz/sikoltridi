import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Komponen untuk fallback jika thumbnail error
const FallbackThumbnail = () => (
  <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-t-lg">
    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55a2 2 0 01.45 2.42l-2.42 4.84A2 2 0 0115.58 18H8.42a2 2 0 01-1.9-2.74l2.42-4.84A2 2 0 0110.45 8H13a2 2 0 012 2v0z"></path>
    </svg>
  </div>
);

const PartVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data);
      } catch (err) {
        console.error("Gagal mengambil data video:", err);
        setError('Tidak dapat memuat video. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Memuat video...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2">
        Galeri Video
      </h1>
      {videos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Belum ada video yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link 
              to={`/video/${video.id}`} 
              key={video.id} 
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail untuk ${video.judul}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                 {/* Fallback jika gambar gagal dimuat */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={video.thumbnail} alt={`Thumbnail untuk ${video.judul}`} className="w-full h-48 object-cover" style={{ display: 'none' }} onError={(e) => e.currentTarget.parentElement.insertAdjacentHTML('afterbegin', '<div class="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-t-lg"><svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.55a2 2 0 01.45 2.42l-2.42 4.84A2 2 0 0115.58 18H8.42a2 2 0 01-1.9-2.74l2.42-4.84A2 2 0 0110.45 8H13a2 2 0 012 2v0z"></path></svg></div>')} />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div className="p-4 flex-grow">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white truncate" title={video.judul}>
                  {video.judul}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartVideo;