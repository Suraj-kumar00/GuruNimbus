
"use client";
import React from "react";
import { useState } from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { FaHome, FaComments, FaGithub, FaBlog } from "react-icons/fa"; // Import Font Awesome icons
import Link from "next/link";
import { link } from "fs";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="h-4 w-4  text-white dark:text-white" />,
    },
    {
      name: "Chat",
      link: "/chat",
      icon: <FaComments className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: "Github",
      link: "https://github.com/Suraj-kumar00/GuruNimbus",
      icon: <FaGithub className="h-4 w-4 text-white dark:text-white" />,
    },

  ];

  return (
    <div className=" w-full bg-black flex">
        <div className='hidden md:flex bg-transparent flex-row gap-4'>
      <FloatingNav navItems={navItems} />
      </div>
      <div className='md:hidden bg-transparent'>
            <input id="checkbox" type="checkbox" className="hidden" onClick={() => setIsOpen(!isOpen)} />
            <label className="toggle relative w-10 h-10 cursor-pointer flex flex-col items-center justify-center gap-2.5 transition duration-300" htmlFor="checkbox">
              <div id="bar1" className="bars w-full h-1 bg-gray-700 rounded transition duration-300 origin-left" style={isOpen ? { transform: 'translateY(28px) rotate(-60deg)' } : {}}></div>
              <div id="bar2" className="bars w-full h-1 bg-gray-700 rounded transition duration-300 origin-right" style={isOpen ? { transform: 'translateY(14px) rotate(60deg)' } : {}}></div>
              <div id="bar3" className="bars w-full h-1 bg-gray-700 rounded transition duration-300"></div>
            </label>
          </div>
          {isOpen && (
            <FloatingNav navItems={navItems} className="max-w-fit space-x-2" />
          )}
     </div>
  );
}
