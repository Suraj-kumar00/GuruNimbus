'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfessorData {
  name: string;
  school: string;
  rating: string;
  totalRatings: string;
  difficulty: string;
  tags: string[];
  // reviews?: string[]; // Made reviews optional
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<ProfessorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed to fetch data');

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700">Rate My Professor Scraper</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <input
            type="url"
            placeholder="Enter Rate My Professor URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Professor is coming...' : 'Fetch Data'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-lg">{error}</p>}

      {data && (
        <motion.div
          className="bg-white p-8 mt-8 rounded-lg shadow-lg w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            <span className="text-blue-700">{data.name}</span> - Professor at <span className="text-blue-700">{data.school}</span>
          </h2>
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700 mb-2"><span className="font-normal text-gray-500">Overall Rating:</span> {data.rating}</p>
            <p className="text-lg font-semibold text-gray-700 mb-2"><span className="font-normal text-gray-500">Total Ratings:</span> {data.totalRatings}</p>
            {/* <p className="text-lg font-semibold text-gray-700 mb-2"><span className="font-normal text-gray-500">Difficulty Rating:</span> {data.difficulty}</p> */}
            <p className="text-lg font-semibold text-gray-700 mb-4"><span className="font-normal text-gray-500">Tags:</span> {data.tags.join(', ')}</p>
          </div>
          {/* <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Reviews:</h3>
            {data.reviews && data.reviews.length > 0 ? (
              <ul className="list-disc list-inside pl-5">
                {data.reviews.map((review, index) => (
                  <li key={index} className="mb-2 text-gray-700">{review}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No reviews available.</p>
            )}
          </div> */}
        </motion.div>
      )}
    </div>
  );
}