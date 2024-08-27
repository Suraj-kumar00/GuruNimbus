'use client';
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "./ui/background-beam";
import BubbleEffect from "./ui/bubble";
import { Bttn } from "@/app/(routes)/(landing)/how-it-works";

export function HeroSection() {
  const [showBubbles, setShowBubbles] = useState(false);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center ">
      <BackgroundBeamsWithCollision>
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center px-4 md:px-8">
          <h2
            className="text-4xl md:text-5xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-[#006dff]/10 to-[#006dff] bg-clip-text drop-shadow-lg rounded-lg"
            style={{ WebkitTextStroke: "1px #006dff" }}
          >
            GuruNimbus
          </h2>

          <p className="text-gray-300 max-w-lg my-2 text-sm md:text-base">
            Building GuruNimbus, an advanced AI-powered RAG chatbot that
            intelligently guides you in rating and discovering the best
            professors.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-16 h-10 ">
            <Link href={"/chat"}>
              <button
                onMouseEnter={() => setShowBubbles(true)}
                onMouseLeave={() => setShowBubbles(false)}
                className="relative px-6 py-3 backdrop-blur-sm border bg-[#006dff]/10 border-[#006dff]/20 text-white text-center rounded-full flex flex-row justify-center items-center gap-2"
              >
                <span>Try Guru Nimbus </span>
                <svg
                  width="0.625rem"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L9 1M9 1H2.5M9 1V7.22222"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#006dff] to-transparent" />
                <BubbleEffect
                  show={showBubbles}
                  style={{ top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </button>
            </Link>
           
            <Bttn />
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
