'use client';

import { ReactNode } from 'react';

interface OracleButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export default function OracleButton({
  children,
  onClick,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
}: OracleButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled || loading} className={`oracle-button ${variant}`}>
      {loading && (
        <svg viewBox="0 0 24 24" className="spinner">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            className="opacity-75"
          />
        </svg>
      )}
      {icon && <span className="icon">{icon}</span>}
      {children}
      <style jsx>{`
        .oracle-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          min-width: 140px;
          border: none;
          border-radius: 9999px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }

        .oracle-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .oracle-button.primary {
          background-color: #d2691e;
          color: #f5f1e8;
          border: 2px solid transparent;
        }

        .oracle-button.primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(210, 105, 30, 0.4);
        }

        .oracle-button.primary:active:not(:disabled) {
          transform: scale(0.95);
        }

        .oracle-button.secondary {
          background-color: transparent;
          color: #8a9a5b;
          border: 2px solid #8a9a5b;
        }

        .oracle-button.secondary:hover:not(:disabled) {
          background-color: #8a9a5b;
          color: #f5f1e8;
        }

        .oracle-button.secondary:active:not(:disabled) {
          transform: scale(0.95);
        }

        .oracle-button:focus-visible {
          outline: 2px solid #e8c468;
          outline-offset: 2px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .oracle-button {
            width: 100%;
          }
        }
      `}</style>
    </button>
  );
}
