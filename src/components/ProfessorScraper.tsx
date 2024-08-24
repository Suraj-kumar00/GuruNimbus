'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; // Note: Import from next/navigation in the App Router
import { CircularProgress } from '@mui/material';

export default function Professor() {
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!userInput) {
      return;
    }
  
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: userInput }), // Convert object to JSON string
      });
      
      const result = await response.json(); // Parse the response JSON
      
      if (response.ok) {
        // Send data to temporary storage
        await fetch('/api/store-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        });
        router.push('/scrape/result');
      } else {
        console.error('Error:', result.error); // Handle error response
      }
    } catch (error) {
      console.error('Error fetching scrape data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 lg:py-10 px-4 mx-auto max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h1 className="text-3xl font-bold text-gray-700">
          Enter rate my professor link
        </h1>
        <div>
          <label htmlFor="url" className="block text-lg font-medium text-gray-600">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={userInput}
            onChange={handleUserInput}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
