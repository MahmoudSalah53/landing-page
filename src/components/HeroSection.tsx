"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImageReveal() {
  const [revealPercent, setRevealPercent] = useState(50);

  // Desktop: السحب بالماوس
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setRevealPercent(Math.max(0, Math.min(100, x)));
  };

  // Mobile: السحب عبر Slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevealPercent(Number(e.target.value));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* المنطقة الرئيسية */}
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full h-full cursor-ew-resize md:cursor-ew-resize"
      >
        {/* Before */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/image1.png"
            alt="Before"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        {/* After */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `inset(0 ${100 - revealPercent}% 0 0)` }}
          transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        >
          <Image
            src="/image2.png"
            alt="After"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </motion.div>

        {/* الخط الفاصل */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10"
          style={{ left: `${revealPercent}%` }}
          transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        >
          {/* الدائرة المتحركة (السهمين) تظهر فقط على Desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-200">
            <svg
              className="w-8 h-8 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
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
