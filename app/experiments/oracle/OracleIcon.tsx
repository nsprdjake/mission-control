'use client';

import React from 'react';
import Image from 'next/image';

interface OracleIconProps {
  onClick: () => void;
  size?: 'mobile' | 'tablet' | 'desktop';
}

export const OracleIcon: React.FC<OracleIconProps> = ({ onClick, size = 'mobile' }) => {
  const sizeMap = {
    mobile: 300,
    tablet: 400,
    desktop: 500,
  };

  const dimension = sizeMap[size];

  return (
    <div
      className="oracle-icon-wrapper"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Consult the Desert Oracle"
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Image
        src="/oracle-assets/oracle-cactus.png"
        alt="Desert Oracle Cactus"
        width={dimension}
        height={dimension}
        priority
        quality={85}
        sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
      />
      
      <style jsx>{`
        .oracle-icon-wrapper {
          position: relative;
          cursor: pointer;
          user-select: none;
          will-change: transform;
          animation: breathe 3s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50%;
          outline: none;
        }

        .oracle-icon-wrapper:hover {
          filter: drop-shadow(0 0 30px rgba(232, 196, 104, 0.6));
        }

        .oracle-icon-wrapper:active {
          transform: scale(1.05);
          filter: drop-shadow(0 0 40px rgba(232, 196, 104, 0.8));
        }

        .oracle-icon-wrapper:focus-visible {
          outline: 2px solid #E8C468;
          outline-offset: 8px;
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .oracle-icon-wrapper {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
