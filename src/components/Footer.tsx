"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaEnvelope, FaYoutube, FaGithub } from "react-icons/fa";
import { People } from "@/components/ui/people";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-blue-900 to-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Logo or Site Name */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 space-y-2">
            <h2 className="font-extrabold text-2xl tracking-wider">GuruNimbus</h2>
            <p className="text-gray-400">Your gateway to quality education</p>
            <p className="text-sm text-gray-500">Empowering learners everywhere</p>
          </div>

          {/* Contributors Section */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="text-xl font-semibold mb-4">Contributors</h3>
            <People />
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-end md:w-1/3 space-y-4">
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="mailto:example@gmail.com" className="hover:text-blue-500">
                <FaEnvelope className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaYoutube className="h-6 w-6" />
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm text-center">
              Follow us on social media for updates!
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} GuruNimbus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
