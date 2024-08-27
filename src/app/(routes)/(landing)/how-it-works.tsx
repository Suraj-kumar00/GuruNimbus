"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { FaPlayCircle } from "react-icons/fa";

export function Bttn() {
  return (
    <div className="py-40  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="relative px-4 py-2 backdrop-blur-sm bg-gradient-to-r  from-blue-500/70 to-blue-400/50 text-white text-center rounded-full flex flex-row justify-center items-center gap-2 group/modal-btn">
          <span className="flex flex-row gap-2">
            <FaPlayCircle className="h-6 w-6 text-white/80" /> How it works{" "}
          </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <div className="relative flex justify-center items-center">

             

              <div className="relative p-2 bg-black rounded-xl">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/XctooiH0moI?si=prOhlPi84hF-aSbu"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
