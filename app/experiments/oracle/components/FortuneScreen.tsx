'use client';

import { useState } from 'react';
import TypewriterText from './TypewriterText';
import OracleButton from './OracleButton';
import Toast from './Toast';

interface FortuneScreenProps {
  fortune: string;
  fortuneId: string;
  onConsultAgain: () => void;
}

export default function FortuneScreen({ fortune, fortuneId, onConsultAgain }: FortuneScreenProps) {
  const [showButtons, setShowButtons] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/experiments/oracle?f=${fortuneId}`;
    const shareText = `${fortune}\n\n🌵 Desert Oracle`;

    // ALWAYS update the URL first (this always works)
    window.history.pushState({}, '', `/experiments/oracle?f=${fortuneId}`);

    // Try clipboard copy
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        showToast('Link copied to clipboard!', 'success');
      } else {
        // Fallback: try native share if available
        if (navigator.share) {
          await navigator.share({
            title: 'Desert Oracle',
            text: shareText,
            url: shareUrl,
          });
          showToast('Shared successfully!', 'success');
        } else {
          // No clipboard, no share - just inform user URL is updated
          showToast('Link updated! Copy from address bar.', 'info');
        }
      }
    } catch (error) {
      console.log('Share cancelled or failed:', error);
      
      // Try native share as fallback
      if (navigator.share && error instanceof Error && error.name === 'NotAllowedError') {
        try {
          await navigator.share({
            title: 'Desert Oracle',
            text: shareText,
            url: shareUrl,
          });
        } catch (shareError) {
          // User cancelled share or it failed - URL is still updated
          showToast('Link updated! Copy from address bar.', 'info');
        }
      } else {
        // Clipboard failed but URL is updated
        showToast('Link updated! Copy from address bar.', 'info');
      }
    }
  };

  return (
    <div className="fortune-screen">
      <div className="fortune-content">
        <TypewriterText text={fortune} speed={50} onComplete={() => setShowButtons(true)} />
      </div>

      {showButtons && (
        <div className="button-group">
          <OracleButton variant="primary" onClick={onConsultAgain}>
            Consult Again
          </OracleButton>
          <OracleButton variant="secondary" onClick={handleShare}>
            Share This Wisdom
          </OracleButton>
        </div>
      )}

      {toastMessage && <Toast message={toastMessage} type={toastType} />}

      <style jsx>{`
        .fortune-screen {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 24px;
          animation: fadeIn 0.5s ease-in;
        }

        .fortune-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
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
}
