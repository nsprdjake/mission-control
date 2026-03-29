'use client';

import React from 'react';
import { OracleIcon } from './OracleIcon';

interface LandingScreenProps {
  onConsult: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onConsult }) => {
  // Detect screen size
  const [screenSize, setScreenSize] = React.useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="landing-screen">
      <h1 className="heading">Consult the Desert Oracle</h1>
      <OracleIcon onClick={onConsult} size={screenSize} />

      <style jsx>{`
        .landing-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 100vh;
          padding: 24px;
          animation: fadeIn 0.5s ease-in;
        }

        .heading {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 20px;
          font-weight: 400;
          color: #8A9A5B;
          letter-spacing: 0.5px;
          text-align: center;
          margin-bottom: 48px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (min-width: 768px) {
          .heading {
            font-size: 28px;
            margin-bottom: 64px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .landing-screen {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
