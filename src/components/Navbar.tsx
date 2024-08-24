
"use client";
import React from "react";
import { FaHome, FaComments, FaGithub, FaSignOutAlt } from "react-icons/fa"; 

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: "Chat",
      link: "/",
      icon: <FaComments className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: "Github",
      link: "https://github.com/Suraj-kumar00/GuruNimbus",
      icon: <FaGithub className="h-4 w-4 text-white dark:text-white" />,
    },
    
    {
      name: "Logout",
      action: handleLogout,
      icon: <FaSignOutAlt className="h-4 w-4 text-white dark:text-white" />,
    },
  ];

  // Define the logout function
  function handleLogout() {
    // Handle your logout logic here (e.g., Firebase auth, sign out from API)
    console.log("User logged out");
  }

  return (
    <div className="sticky top-0 bg-gray-900 z-50 w-full shadow-md">
      <nav className="flex justify-around items-center py-4 px-6">
        {navItems.map((item, index) => (
          item.link ? (
            <a
              key={index}
              href={item.link}
              className="flex items-center text-white hover:text-gray-300 space-x-2"
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ) : (
            <button
              key={index}
              onClick={item.action}
              className="flex items-center text-white hover:text-gray-300 space-x-2"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          )
        ))}
      </nav>
    </div>
  );
}
