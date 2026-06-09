'use client';

import { useEffect } from 'react';

export default function AutoOpen() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('open-tunnel'));
  }, []);
  return null;
}
