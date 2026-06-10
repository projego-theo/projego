'use client';

import type { ReactNode } from 'react';

const DEFAULT_CLASSNAME = 'inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg';

export default function StartProjectButton({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-tunnel'))}
      className={`cursor-pointer ${className ?? DEFAULT_CLASSNAME}`}
    >
      {children ?? (
        <>
          Démarrer mon projet
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </>
      )}
    </button>
  );
}
