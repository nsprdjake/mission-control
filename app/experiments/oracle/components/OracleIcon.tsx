'use client';

import Image from 'next/image';

interface OracleIconProps {
  onClick: () => void;
  size?: 'mobile' | 'tablet' | 'desktop';
}

export default function OracleIcon({ onClick, size = 'mobile' }: OracleIconProps) {
  const sizeMap = {
    mobile: 300,
    tablet: 400,
    desktop: 500,
  };

  const pixelSize = sizeMap[size];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Consult the Desert Oracle"
      className="oracle-icon-wrapper"
    >
      <Image
        src="/oracle-assets/oracle-cactus.png"
        alt="Desert Oracle Cactus"
        width={pixelSize}
        height={pixelSize}
        priority
        quality={85}
        sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
      />
      <style jsx>{`
        .oracle-icon-wrapper {
          cursor: pointer;
          user-select: none;
          will-change: transform;
          border-radius: 50%;
          outline: none;
          background: none;
          border: none;
          padding: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: breathe 3s ease-in-out infinite;
          position: relative;
        }

        .oracle-icon-wrapper:hover {
          filter: drop-shadow(0 0 30px rgba(232, 196, 104, 0.6));
        }

        .oracle-icon-wrapper:active {
          filter: drop-shadow(0 0 40px rgba(232, 196, 104, 0.8));
          transform: scale(1.05);
        }

        .oracle-icon-wrapper:focus-visible {
          outline: 2px solid #e8c468;
          outline-offset: 8px;
        }

        @keyframes breathe {
          0%,
          100% {
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
    </button>
  );
}
