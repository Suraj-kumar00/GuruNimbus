"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tool";
import Image from 'next/image';
const people = [
  {
    id: 1,
    name: "Mohit Joping",
    designation: "Software Engineer",
    image:
      "/img.png",
  },
    {
    id: 3,
    name: "Kumari Anjali",
    designation: "Software Engineer",
    image:
      "/anjali.jpeg",
  },

  {
    id: 2,
    name: "Suraj Kumar",
    designation: "devops Engineer",
    image:
      "/suraj.jpeg",
  },


];

export function People() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
