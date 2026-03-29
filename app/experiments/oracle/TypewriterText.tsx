'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  onComplete,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!completed) {
      setCompleted(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, completed]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`typewriter-container ${className}`}>
      <p className="fortune-text">
        {displayText}
        {currentIndex < text.length && (
          <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
        )}
      </p>

      <style jsx>{`
        .typewriter-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .fortune-text {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 24px;
          line-height: 1.4;
          color: #E8C468;
          font-style: italic;
          text-align: center;
          margin: 0;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background-color: #E8C468;
          margin-left: 2px;
          vertical-align: text-bottom;
        }

        .cursor.visible {
          opacity: 1;
        }

        .cursor.hidden {
          opacity: 0;
        }

        @media (min-width: 768px) {
          .fortune-text {
            font-size: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fortune-text {
            animation: none;
          }
          .cursor {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
