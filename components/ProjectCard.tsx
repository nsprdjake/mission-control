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
}

export function ProjectCard({ project, isUp }: ProjectCardProps) {
  const statusColors = {
    live: 'border-green-500/30 bg-green-500/5',
    'in-progress': 'border-yellow-500/30 bg-yellow-500/5',
    'coming-soon': 'border-gray-500/30 bg-gray-500/5',
  };

  const statusLabels = {
    live: 'Live',
    'in-progress': 'In Progress',
    'coming-soon': 'Coming Soon',
  };

  return (
    <div
      className={`relative group bg-gray-800/50 backdrop-blur-sm border ${statusColors[project.status]} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {project.status === 'live' && isUp !== undefined && (
          <StatusIndicator isUp={isUp} size="sm" />
        )}
        <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
          {statusLabels[project.status]}
        </span>
      </div>

      {/* Icon */}
      <div className="text-5xl mb-4">{project.emoji}</div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-2 text-white">{project.name}</h3>
      <p className="text-gray-400 mb-4">{project.description}</p>

      {/* Link Button */}
      {project.status === 'live' ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white font-medium"
        >
          Open <span>→</span>
        </a>
      ) : (
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg cursor-not-allowed text-gray-500 font-medium"
        >
          {project.status === 'in-progress' ? 'Building...' : 'Soon'}
        </button>
      )}
    </div>
  );
}
