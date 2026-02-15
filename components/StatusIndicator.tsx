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

  return (
    <div className="relative inline-flex">
      <div
        className={`${sizeClasses[size]} rounded-full ${
          isUp ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {isUp && (
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-green-400 animate-ping opacity-75`} />
        )}
      </div>
    </div>
  );
}
