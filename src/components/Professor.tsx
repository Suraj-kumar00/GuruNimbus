
"use client"; // Enable Client-side rendering

import React from "react";
import { FaSearch } from "react-icons/fa";

export function Professor() {
  // Dummy data for professors
  const professors = [
    {
      name: "Professor1",
      rating: 4.8,
      img: "https://via.placeholder.com/150", 
    },
    {
      name: "Professor2",
      rating: 4.5,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Professor3",
      rating: 4.7,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Professor4",
      rating: 4.6,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Professor5",
      rating: 4.9,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Professor6",
      rating: 4.4,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Professor7",
      rating: 4.8,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Professor8",
      rating: 4.7,
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-10">
      {/* Search Bar */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Professors"
            className="rounded-full p-3 text-black w-80 shadow-lg"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg">
            <FaSearch className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Professors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {professors.map((prof, index) => (
          <div
            key={index}
            className="bg-white text-center p-6 rounded-lg shadow-2xl transform transition-all hover:scale-105"
          >
            <img
              src={prof.img}
              alt={prof.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">{prof.name}</h3>
            <p className="text-yellow-500 text-lg">
              {Array.from({ length: Math.floor(prof.rating) }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </p>
            <p className="text-sm text-gray-600">Rating: {prof.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Professor;

