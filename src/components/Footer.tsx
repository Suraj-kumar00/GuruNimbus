
"use client"; 
import React from "react";
import Link from "next/link"; 
import { FaFacebook, FaTwitter, FaEnvelope, FaYoutube, FaGithub } from "react-icons/fa"; 

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0"> {/* Space between items reduced for a compact layout */}
          {/* Logo or Site Name */}
          <div className="text-sm md:text-base"> 
            <h2 className="font-bold">GuruNimbus</h2>
            <p className="text-gray-400">Your gateway to quality education</p>
          </div>

          {/* Navigation Links and Social Media Icons combined in a single row */}
          <div className="flex flex-wrap items-center justify-center space-x-3"> 
            <Link href="/about" className="text-gray-400 hover:text-white text-xs md:text-sm"> {/* Reduced font size */}
              About Us
            </Link>
            <Link href="/professors" className="text-gray-400 hover:text-white text-xs md:text-sm"> {/* Reduced font size */}
              Professors
            </Link>
            <Link href="/blog" className="text-gray-400 hover:text-white text-xs md:text-sm"> {/* Reduced font size */}
              Blog
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-xs md:text-sm"> {/* Reduced font size */}
              Contact
            </Link>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook className="h-4 w-4 md:h-5 md:w-5" /> {/* Further reduced icon size */}
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter className="h-4 w-4 md:h-5 md:w-5" /> {/* Further reduced icon size */}
            </a>
            <a href="mailto:example@gmail.com" className="text-gray-400 hover:text-white">
              <FaEnvelope className="h-4 w-4 md:h-5 md:w-5" /> {/* Further reduced icon size */}
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaYoutube className="h-4 w-4 md:h-5 md:w-5" /> {/* Further reduced icon size */}
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaGithub className="h-4 w-4 md:h-5 md:w-5" /> {/* Further reduced icon size */}
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-xs"> {/* Reduced font size */}
            <p>&copy; {new Date().getFullYear()} GuruNimbus. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
