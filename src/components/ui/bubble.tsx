import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface BubbleEffectProps extends React.HTMLProps<HTMLDivElement> {
  show: boolean;
}

const BubbleEffect = ({ show, ...props }: BubbleEffectProps) => {
  const spans = Array.from({ length: 80 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.random() * 200 - 100, // Spreading bubbles horizontally
    directionY: Math.random() * 200 - 100, // Spreading bubbles vertically
  }));

  return (
    <AnimatePresence>
      {show && (
        <div {...props} className={cn("absolute z-50 h-full w-full", props.className)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm"
          ></motion.div>
          {spans.map((span) => (
            <motion.span
              key={span.id}
              initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
              animate={{
                x: span.directionX,
                y: span.directionY,
                opacity: 0,
              }}
              transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
              className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-blue-300 to-blue-500"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default BubbleEffect;
