import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideoAndComments = async () => {
      try {
        setLoading(true);
        
        const videoResponse = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(videoResponse.data);

        const commentsResponse = await axios.get(`http://localhost:5000/api/komentar/${id}`);
        setComments(commentsResponse.data);

      } catch (err) {
        console.error("Error fetching details:", err);
        setError('Gagal memuat detail video atau komentar.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoAndComments();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Memuat video dan komentar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Video tidak ditemukan.</p>
      </div>
    );
  }
  
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
            poster={video.thumbnail}
            key={video.id}
          >
            <source src={video.media} type="video/mp4" />
            Browser Anda tidak mendukung tag video.
          </video>
        </div>

        {/* Kontainer Detail Informasi */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {video.judul}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>Diupload pada {formattedDate}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">{video.keterangan}</p>
        </div>
        
        {/* Kontainer Daftar Komentar */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Komentar ({comments.length})
          </h2>
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                  {/* Perbarui baris ini untuk menampilkan level */}
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {comment.username} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({comment.level})</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {new Date(comment.tanggal).toLocaleString('id-ID')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 break-words">{comment.isi_komentar}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Belum ada komentar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVideo;