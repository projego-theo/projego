'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const TunnelQualification = dynamic(
  () => import('@/app/demarrer-mon-projet/TunnelQualification'),
  { ssr: false }
);

export default function TunnelModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handler() {
      if (window.innerWidth < 1024) {
        router.push('/demarrer-mon-projet');
      } else {
        setIsOpen(true);
      }
    }
    window.addEventListener('open-tunnel', handler);
    return () => window.removeEventListener('open-tunnel', handler);
  }, [router]);

  function handleClose() {
    setIsOpen(false);
    if (pathname === '/demarrer-mon-projet') {
      router.push('/');
    }
  }

  return (
    <AnimatePresence>
      {isOpen && <TunnelQualification onClose={handleClose} />}
    </AnimatePresence>
  );
}
