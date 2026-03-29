'use client';

import React, { useState } from 'react';
import { TypewriterText } from './TypewriterText';
import { Button } from './Button';

interface FortuneScreenProps {
  fortune: string;
  fortuneId: string;
  onConsultAgain: () => void;
}

export const FortuneScreen: React.FC<FortuneScreenProps> = ({
  fortune,
  fortuneId,
  onConsultAgain,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/experiments/oracle?f=${fortuneId}`;
    const shareText = `${fortune}\n\n🌵 Desert Oracle`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Desert Oracle',
          text: shareText,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.log('Share cancelled or failed:', err);
    }
  };

  return (
    <div className="fortune-screen">
      <div className="fortune-content">
        <TypewriterText
          text={fortune}
          speed={50}
          onComplete={() => setShowButtons(true)}
        />
      </div>

      {showButtons && (
        <div className="button-group">
          <Button variant="primary" onClick={onConsultAgain}>
            Consult Again
          </Button>
          <Button variant="secondary" onClick={handleShare}>
            {copied ? 'Copied! ✓' : 'Share This Wisdom'}
          </Button>
        </div>
      )}

      <style jsx>{`
        .fortune-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 100vh;
          padding: 24px;
          animation: fadeIn 0.5s ease-in;
        }

        .fortune-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 800px;
          margin-bottom: 32px;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 400px;
          animation: slideUp 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 768px) {
          .button-group {
            flex-direction: row;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fortune-screen,
          .button-group {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
