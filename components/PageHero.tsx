'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroGrid } from './HeroGrid';
import { Typewriter } from './Typewriter';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  typewriterTexts?: string[];
  compact?: boolean;
}

const HeroContent = ({ title, subtitle, badge, typewriterTexts, compact }: PageHeroProps) => {
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setNoAnim(
      /^((?!chrome|android).)*safari/i.test(ua) ||
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }, []);

  return (
    <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${compact ? 'pt-32 pb-12' : 'pt-28 pb-12'}`}>
      {badge && (
        <motion.span
          initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: noAnim ? 0 : 0.6, delay: noAnim ? 0 : 0.1 }}
          className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
        >
          {badge}
        </motion.span>
      )}
      <motion.h1
        initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: noAnim ? 0 : 0.7, delay: noAnim ? 0 : 0.2 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
      >
        {title}
      </motion.h1>
      {typewriterTexts && typewriterTexts.length > 0 && (
        <motion.div
          initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: noAnim ? 0 : 0.6, delay: noAnim ? 0 : 0.35 }}
          style={{ minHeight: '2.5rem' }}
          className="mb-4"
        >
          <p className="text-lg md:text-xl text-[#29abe2] font-medium">
            <Typewriter
              text={typewriterTexts}
              speed={60}
              deleteSpeed={30}
              waitTime={2500}
              className="text-[#29abe2]"
              cursorChar="|"
              cursorClassName="text-[#29abe2] ml-1"
            />
          </p>
        </motion.div>
      )}
      {subtitle && (
        <motion.p
          initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: noAnim ? 0 : 0.6, delay: noAnim ? 0 : 0.45 }}
          className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-300"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default function PageHero(props: PageHeroProps) {
  if (props.compact) {
    return (
      <div className="relative bg-[#1a1a2e] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(41,171,226,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,171,226,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <HeroContent {...props} />
      </div>
    );
  }

  return (
    <HeroGrid className="min-h-[45vh]">
      <HeroContent {...props} />
    </HeroGrid>
  );
}
