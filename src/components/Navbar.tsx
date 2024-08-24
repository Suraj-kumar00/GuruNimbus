
"use client";
import React from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { FaHome, FaComments, FaGithub, FaBlog } from "react-icons/fa"; // Import Font Awesome icons

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="h-4 w-4  text-white dark:text-white" />,
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
      name: "Blog",
      link: "/",
      icon: <FaBlog className="h-4 w-4  text-white dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
