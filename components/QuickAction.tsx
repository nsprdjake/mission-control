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
      className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 rounded-xl p-4 hover:scale-105 transition-all duration-300 text-left hover:bg-gray-800/50"
    >
      <div className="text-3xl mb-2">{action.icon}</div>
      <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
        {action.name}
      </h4>
      <p className="text-xs text-gray-500">{action.description}</p>
    </button>
  );
}
