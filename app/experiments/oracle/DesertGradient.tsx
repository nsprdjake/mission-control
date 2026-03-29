'use client';

import React from 'react';

interface DesertGradientProps {
  state: 'landing' | 'fortune';
  children: React.ReactNode;
}

export const DesertGradient: React.FC<DesertGradientProps> = ({ state, children }) => {
  return (
    <div className={`desert-gradient ${state}`}>
      {children}

      <style jsx>{`
        .desert-gradient {
          position: relative;
          width: 100%;
          min-height: 100vh;
          transition: all 2000ms ease-in-out;
        }

        .desert-gradient.landing {
          background: linear-gradient(180deg, #4A3B5C 0%, #8A9A5B 50%, #D2691E 100%);
        }

        .desert-gradient.fortune {
          background: linear-gradient(180deg, #4A3B5C 0%, #D2691E 100%);
        }
      `}</style>
    </div>
  );
};
