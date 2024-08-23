"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

export function HeroSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
     <div className="w-[calc(100%-4rem)] mx-auto rounded-sm  h-screen overflow-hidden">
      <Vortex
      backgroundColor="black"
      rangeY={800}
      particleCount={500}
      baseHue={120}
      className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
    >
      <h2 className="md:text-4xl text-4xl lg:text-8xl font-bold text-center text-white relative z-20">
        GuruNimbus
        </h2>
      {/* <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        An advanced AI-powered RAG chatbot that intelligently guides you in rating and discovering the best professors.
      </p> */}
      <p className="text-neutral-200 max-w-lg mx-auto my-4 text-md text-center">
            Building GuruNimbus, an advanced AI-powered RAG chatbot that intelligently guides you in rating and discovering the best professors.
          </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
          Get Started
        </button>
        <button className="px-4 py-2  text-white ">Watch trailer</button>
      </div>
    </Vortex>
  </div>
  );
}

