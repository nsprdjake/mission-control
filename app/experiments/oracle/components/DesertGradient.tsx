'use client';

import { ReactNode } from 'react';

interface DesertGradientProps {
  state: 'landing' | 'fortune';
  children: ReactNode;
}

export default function DesertGradient({ state, children }: DesertGradientProps) {
  return (
    <div className={`desert-gradient ${state}`}>
      {children}
      <style jsx>{`
        .desert-gradient {
          width: 100%;
          min-height: 100vh;
          position: relative;
          transition: all 2s ease-in-out;
        }

        .desert-gradient.landing {
          background: linear-gradient(180deg, #4a3b5c 0%, #8a9a5b 50%, #d2691e 100%);
        }

        .desert-gradient.fortune {
          background: linear-gradient(180deg, #4a3b5c 0%, #d2691e 100%);
        }
      `}</style>
    </div>
  );
}
