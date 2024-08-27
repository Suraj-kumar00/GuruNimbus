"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserButton, useUser } from '@clerk/nextjs';


export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { isSignedIn } = useUser();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true); // Start as visible

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Always show when at the top
      } else {
        // Show or hide based on scroll direction
        let direction = current - (previous || 0);

        if (direction < 0) {
          setVisible(true); // Scrolling down
        } else {
          setVisible(false); // Scrolling up
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex justify-center max-w-[75vw] fixed top-10 inset-x-0 mx-auto bg-transparent  z-[5000] pr-2  py-2  space-x-36",
          className
        )}
      >
         <Link href="/" passHref>
      <div className="flex flex-row items-center gap-3 cursor-pointer">
        <img
          src="/gurunimbus.png"
          alt="GuruNimbus Logo"
          className="h-8 w-8"
        />
        <h1 className="text-lg text-white">Guru Nimbus</h1>
      </div>
    </Link>
       <div  className="flex flex-row justify-center items-center space-x-8">
       {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50  flex space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
       </div>
  
    <div className="flex gap-3">
    {isSignedIn ? (
            <>
              
              <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                  width: '2.5rem',
                  height: '2.5rem',
                  },
                },
              }}
              />
       
            </>
          ): ( <><Link href="/sign-in">
              <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full">
                <span>sign-in</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
              </button></Link><Link href="/sign-up">
                <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full">
                  <span>sign-up</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </button></Link></>)}
    </div>
      </motion.div>
    </AnimatePresence>
  );
};
