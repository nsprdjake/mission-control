'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50,
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!hasCompleted) {
      setHasCompleted(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, hasCompleted]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`typewriter-container ${className}`}>
      <p className="fortune-text">
        {displayedText}
        {currentIndex < text.length && (
          <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}>|</span>
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
          font-style: italic;
          line-height: 1.4;
          color: #e8c468;
          text-align: center;
          margin: 0;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background-color: #e8c468;
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
}
