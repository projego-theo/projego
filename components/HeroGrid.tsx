'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";

const GridPattern = ({ offsetX, offsetY }: { offsetX: any; offsetY: any }) => (
  <svg className="w-full h-full">
    <defs>
      <motion.pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse" x={offsetX} y={offsetY}>
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#29abe2" strokeWidth="1" />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

export const HeroGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className={`relative w-full flex items-center overflow-hidden bg-[#1a1a2e] ${className ?? 'min-h-screen'}`}>
      {/* Subtle texture image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/69c6b6dad79887.04141594_64311173-A970-4955-9E44-DD2B7077ADED2.PNG"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          priority
        />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div className="absolute inset-0 z-0 opacity-40" style={{ maskImage, WebkitMaskImage: maskImage }}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-[#29abe2]/20 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-[#3d3d3d]/40 blur-[120px]" />
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
