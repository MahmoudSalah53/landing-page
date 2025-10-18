"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroImageReveal() {
  const [revealPercent, setRevealPercent] = useState(50);

  const x = useMotionValue(50);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  // تعديل هنا: عكس اتجاه الكشف
  // الآن عندما تكون val قريبة من 0، يتم كشف الصورة اليمنى بالكامل
  // وعندما تكون val قريبة من 100، يتم إخفاء الصورة اليمنى بالكامل
  const clip = useTransform(smoothX, (val) => `inset(0 0 0 ${100 - val}%)`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    x.set(mouseX);
    setRevealPercent(mouseX);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    x.set(value);
    setRevealPercent(value);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full h-full cursor-ew-resize"
      >
        {/* Before */}
        <div className="absolute inset-0 w-full h-full">
          <Image src="/image1.png" alt="Before" fill priority className="object-cover" />
        </div>

        {/* After */}
        <motion.div 
          className="absolute inset-0 w-full h-full" 
          style={{ 
            clipPath: clip,
            transition: "clip-path 0.3s ease-out"
          }}
        >
          <Image src="/image2.png" alt="After" fill priority className="object-cover" />
        </motion.div>

        {/* Labels */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/60 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-lg z-10">
          <p className="text-white font-bold text-sm md:text-lg">BEFORE</p>
        </div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/60 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-lg z-10">
          <p className="text-white font-bold text-sm md:text-lg">AFTER</p>
        </div>
      </div>

      {/* Slider للموبايل */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 md:hidden">
        <input
          type="range"
          min={0}
          max={100}
          value={revealPercent}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-300 rounded-lg accent-white"
        />
      </div>
    </div>
  );
}