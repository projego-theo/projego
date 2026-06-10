'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

// Framer Motion's useInView (IntersectionObserver) can fail on Safari iOS,
// leaving elements permanently at opacity:0. Detect and skip animations.
function detectSafariOrIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return (
    /^((?!chrome|android).)*safari/i.test(ua) ||
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    setNoAnim(detectSafariOrIOS());
  }, []);

  const visible = { opacity: 1, y: 0, x: 0 };
  const hidden = {
    opacity: 0,
    y: direction === 'up' ? 30 : 0,
    x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={noAnim ? visible : hidden}
      animate={noAnim ? visible : inView ? visible : hidden}
      transition={{
        duration: noAnim ? 0 : 0.6,
        delay: noAnim ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
