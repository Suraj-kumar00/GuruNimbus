
// "use client";
// import Image from "next/image";
// import { Vortex } from "@/components/ui/vortex";
// import React, { useState } from "react";
// export function LandingPage() {
//   return (
//     <div className="w-[calc(100%-4rem)] mx-auto rounded-sm  h-screen overflow-hidden">
//       <Vortex
//         backgroundColor="black"
//         rangeY={800}
//         particleCount={500}
//         baseHue={120}
//         className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
//       >
//         <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
//           Guru_Nimbus
//         </h2>
//         <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
//           An advanced AI-powered RAG chatbot that intelligently guides you in rating and discovering the best professors.
//         </p>
//         <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
//           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
//             Get Started
//           </button>
//           <button className="px-4 py-2  text-white ">Watch trailer</button>
//         </div>
//       </Vortex>
//     </div>
//   );
// }
// export default LandingPage;
//=========================================================================================================================

import React from 'react'
import { HeroSection } from '@/components/HeroSection';

type Props = {}

export default function Home({}: Props) {
  return (
    <HeroSection/>
  )
}

