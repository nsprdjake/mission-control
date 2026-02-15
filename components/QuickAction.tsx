interface QuickActionProps {
  action: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
}

export function QuickAction({ action }: QuickActionProps) {
  const handleClick = () => {
    // Placeholder - can be connected to actual actions later
    alert(`${action.name} - Coming soon!`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 text-left hover:scale-[1.05] hover:-translate-y-0.5 shadow-lg hover:shadow-2xl hover:shadow-purple-900/30 overflow-hidden"
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>

      {/* Content */}
      <div className="relative">
        <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 inline-block">
          {action.icon}
        </div>
        <h4 className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300 text-sm sm:text-base mb-1.5 leading-tight">
          {action.name}
        </h4>
        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 leading-relaxed">
          {action.description}
        </p>
      </div>

      {/* Corner Glow */}
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </button>
  );
}
