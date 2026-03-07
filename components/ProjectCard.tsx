'use client';

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  url: string;
  status: 'live' | 'in-progress' | 'coming-soon';
  progress?: number;
  updated_at?: string;
}

const STATUS_COLOR: Record<string, string> = {
  live: '#34C759',
  'in-progress': '#FF9500',
  'coming-soon': '#8E8E93',
};

const STATUS_LABEL: Record<string, string> = {
  live: 'Live',
  'in-progress': 'In Progress',
  'coming-soon': 'Coming Soon',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function ProjectCard({ project }: { project: Project }) {
  const statusColor = STATUS_COLOR[project.status] ?? '#8E8E93';
  const statusLabel = STATUS_LABEL[project.status] ?? project.status;

  return (
    <div style={{ position: 'relative' }}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card-link"
      >
        <div className="project-card">
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <span style={{ fontSize: '28px', lineHeight: 1 }}>{project.emoji}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: statusColor,
                flexShrink: 0,
              }} />
            </div>
          </div>

          {/* Name */}
          <h2 style={{
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '4px',
            color: 'var(--text)',
            letterSpacing: '-0.1px',
          }}>
            {project.name}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            lineHeight: 1.4,
          }}>
            {project.description}
          </p>

          {/* Footer */}
          <div style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: statusColor,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}>
              {statusLabel}
            </span>

            {project.updated_at && (
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Updated {timeAgo(project.updated_at)}
              </span>
            )}

            {typeof project.progress === 'number' && project.progress < 100 && (
              <div style={{
                height: '3px',
                background: 'var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  height: '100%',
                  background: statusColor,
                  borderRadius: '2px',
                }} />
              </div>
            )}
          </div>
        </div>
      </a>

      {/* Vercel quick-link */}
      <a
        href="https://vercel.com/jake-8792"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          lineHeight: 1,
          zIndex: 1,
        }}
        title="Vercel dashboard"
      >
        ↗
      </a>

      <style>{`
        .project-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .project-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--shadow);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: flex;
          flex-direction: column;
          min-height: 160px;
        }
        .project-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        @media (prefers-color-scheme: dark) {
          .project-card:hover {
            box-shadow: 0 6px 20px rgba(0,0,0,0.6);
          }
        }
      `}</style>
    </div>
  );
}
