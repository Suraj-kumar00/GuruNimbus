import React from "react";
import Ribon from "./ribon1";
import { People } from "../../../components/ui/people";
import FAQ from "@/components/ui/faq";

type Props = {};

export default function FAT({}: Props) {
  return (
    <>
      <section className="bg-black h-[70vh] flex flex-col justify-center items-center space-y-12 px-4">
        <h1 className="text-5xl font-bold text-blue-500 tracking-wider drop-shadow-lg">FAQ</h1>
        
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 bg-gradient-to-r from-blue-900 to-black p-8 rounded-lg shadow-xl">
          <FAQ />
        </div>
      </section>
    </>
  );
}

                {/* <div className="relative w-full">
                <Ribon />
                </div> */}

    {/* <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Contributors
              </h3>
              <People />
            </div> */}