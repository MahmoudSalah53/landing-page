"use client";

import { useState, useEffect, useRef } from "react";

export default function DesignerDeveloperReveal() {
  const [mouseX, setMouseX] = useState(50);
  const smoothRef = useRef(50);
  const [smoothX, setSmoothX] = useState(50);
  const rafRef = useRef<number | null>(null);

  // ✅ استخدم RAF واحد فقط وقلل re-render
  useEffect(() => {
    const animate = () => {
      const diff = mouseX - smoothRef.current;
      smoothRef.current += diff * 0.15;
      setSmoothX(smoothRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [mouseX]);

  // ✅ حرك المؤشر فقط بدون أي عمليات إضافية
  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    setMouseX(Math.max(0, Math.min(100, x)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());

  const handleMouseLeave = () => setMouseX(50);

  // الحسابات
  const clipPathRight = `inset(0 ${smoothX}% 0 0)`;
  const leftShift = (smoothX - 50) * 0.5;
  const rightShift = (50 - smoothX) * 0.5;
  const leftOpacity = smoothX < 50 ? 1 : Math.max(0, 1 - (smoothX - 50) / 15);
  const rightOpacity = smoothX > 50 ? 1 : Math.max(0, 1 - (50 - smoothX) / 15);
  const leftScale = 1 + Math.max(0, smoothX - 50) / 400;
  const rightScale = 1 + Math.max(0, 50 - smoothX) / 400;

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 md:p-8">
      <div
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        className="relative w-full max-w-6xl h-[500px] md:h-[650px] cursor-ew-resize rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Left Side */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${leftScale}) translateX(${leftShift}px)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <svg
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="70" r="30" fill="#FFF" opacity="0.9" />
              <rect
                x="70"
                y="105"
                width="60"
                height="70"
                rx="5"
                fill="#FFF"
                opacity="0.9"
              />
              <circle cx="85" cy="125" r="8" fill="#8B5CF6" />
            </svg>
          </div>
        </div>

        {/* Left Text */}
        <div
          className="absolute top-12 left-12 z-20 pointer-events-none"
          style={{
            opacity: leftOpacity,
            transform: `translateX(${leftShift}px)`,
          }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-3">
            DESIGNER
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Creative & Visual
          </p>
        </div>

        {/* Right Side */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            clipPath: clipPathRight,
            transform: `scale(${rightScale}) translateX(${-rightShift}px)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <svg
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 relative z-10"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="70" r="30" fill="#FFF" opacity="0.9" />
              <rect
                x="70"
                y="105"
                width="60"
                height="70"
                rx="5"
                fill="#FFF"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>

        {/* Right Text */}
        <div
          className="absolute top-12 right-12 z-20 text-right pointer-events-none"
          style={{
            opacity: rightOpacity,
            transform: `translateX(${-rightShift}px)`,
          }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-3">
            DEVELOPER
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Code & Logic
          </p>
        </div>
      </div>
    </section>
  );
}
