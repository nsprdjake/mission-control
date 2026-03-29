'use client';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
}

export default function Toast({ message, type = 'success' }: ToastProps) {
  return (
    <div className={`toast ${type}`}>
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.9);
          color: #f5f5dc;
          border-radius: 0.5rem;
          z-index: 1000;
          animation: slideUp 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
          font-weight: 500;
        }

        .toast.success {
          border: 2px solid #4ade80;
        }

        .toast.error {
          border: 2px solid #ef4444;
        }

        .toast.info {
          border: 2px solid #60a5fa;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .toast {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
