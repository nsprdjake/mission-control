interface StatusIndicatorProps {
  isUp: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusIndicator({ isUp, size = 'md' }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const glowClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer Glow */}
      {isUp && (
        <div
          className={`absolute ${glowClasses[size]} rounded-full ${
            isUp ? 'bg-green-500/30' : 'bg-red-500/30'
          } blur-md`}
        ></div>
      )}
      
      {/* Pulsing Ring */}
      {isUp && (
        <div
          className={`absolute ${sizeClasses[size]} rounded-full bg-green-400 animate-ping opacity-40`}
        ></div>
      )}
      
      {/* Core Dot */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full ${
          isUp ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50' : 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/50'
        } ${isUp ? 'animate-pulse-slow' : ''}`}
      >
        {/* Inner Highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
