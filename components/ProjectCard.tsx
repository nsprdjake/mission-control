import { StatusIndicator } from './StatusIndicator';

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  url: string;
  status: 'live' | 'in-progress' | 'coming-soon';
}

interface ProjectCardProps {
  project: Project;
  isUp?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProjectCard({ project, isUp, onEdit, onDelete }: ProjectCardProps) {
  const statusConfig = {
    live: {
      gradient: 'from-green-600/20 to-emerald-800/20',
      border: 'border-green-500/30',
      hoverBorder: 'hover:border-green-400/60',
      glow: 'shadow-green-900/20 hover:shadow-green-800/40',
      label: 'Live',
      labelBg: 'bg-green-500/20 text-green-300 border-green-500/30',
    },
    'in-progress': {
      gradient: 'from-yellow-600/20 to-orange-800/20',
      border: 'border-yellow-500/30',
      hoverBorder: 'hover:border-yellow-400/60',
      glow: 'shadow-yellow-900/20 hover:shadow-yellow-800/40',
      label: 'In Progress',
      labelBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    },
    'coming-soon': {
      gradient: 'from-gray-600/20 to-gray-800/20',
      border: 'border-gray-500/30',
      hoverBorder: 'hover:border-gray-400/60',
      glow: 'shadow-gray-900/20 hover:shadow-gray-800/40',
      label: 'Coming Soon',
      labelBg: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    },
  };

  const config = statusConfig[project.status];

  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-${config.border.split('-')[1]}/50 rounded-2xl p-6 sm:p-7 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 shadow-2xl hover:shadow-3xl ${config.glow} overflow-hidden`}
    >
      {/* Animated Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Status Badge & Actions */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {project.status === 'live' && isUp !== undefined && (
          <StatusIndicator isUp={isUp} size="sm" />
        )}
        <span className={`text-xs px-3 py-1.5 rounded-full border ${config.labelBg} font-semibold backdrop-blur-sm`}>
          {config.label}
        </span>
      </div>
      
      {/* Edit/Delete Actions */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {onEdit && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
            className="w-8 h-8 rounded-lg bg-blue-600/80 hover:bg-blue-500 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
            title="Edit project"
          >
            ✏️
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            className="w-8 h-8 rounded-lg bg-red-600/80 hover:bg-red-500 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
            title="Delete project"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Icon */}
      <div className="relative text-6xl sm:text-7xl mb-5 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
        {project.emoji}
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {project.name}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed transition-colors duration-300">
          {project.description}
        </p>

        {/* Link Button */}
        {project.status === 'live' ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-900/50 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Open
              <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </a>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl cursor-not-allowed text-gray-500 font-semibold backdrop-blur-sm"
          >
            {project.status === 'in-progress' ? (
              <>
                <span className="animate-pulse">🔨</span>
                Building...
              </>
            ) : (
              <>
                <span>🔜</span>
                Soon
              </>
            )}
          </button>
        )}
      </div>

      {/* Corner Accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
