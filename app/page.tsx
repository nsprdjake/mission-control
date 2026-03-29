'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  url: string;
  status: 'live' | 'in-progress' | 'coming-soon';
  category?: 'core' | 'business' | 'fun' | 'archive';
  progress?: number;
  updated_at?: string;
}

interface HealthStats {
  totalProjects: number;
  liveProjects: number;
  avgProgress: number;
  lastUpdate: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'lifeos',
    name: 'LifeOS',
    emoji: '🎯',
    description: 'Life tracking dashboard',
    url: 'https://pd.nsprd.com',
    status: 'live',
    category: 'core',
    progress: 100,
  },
  {
    id: 'lyne',
    name: 'LYNE',
    emoji: '🎮',
    description: 'Generational wealth platform',
    url: 'https://rp1.nsprd.com',
    status: 'live',
    category: 'core',
    progress: 100,
  },
  {
    id: 'portal',
    name: 'Inspired Design Portal',
    emoji: '💼',
    description: 'Business manager',
    url: 'https://nsprd.com/login',
    status: 'live',
    category: 'business',
    progress: 100,
  },
  {
    id: 'memory',
    name: 'Memory Palace',
    emoji: '🧠',
    description: 'Memory archive',
    url: 'https://memory.nsprd.com',
    status: 'live',
    category: 'core',
    progress: 100,
  },
  {
    id: 'bailey',
    name: 'Bailey Dashboard',
    emoji: '🐕',
    description: "Bailey's health tracker",
    url: 'https://bailey.nsprd.com',
    status: 'live',
    category: 'fun',
    progress: 100,
  },
  {
    id: 'faggnation',
    name: 'Faggnation Archive',
    emoji: '🎬',
    description: 'Podcast archive',
    url: 'https://faggnation.nsprd.com',
    status: 'live',
    category: 'archive',
    progress: 100,
  },
  {
    id: 'petos',
    name: 'PetOS',
    emoji: '🐾',
    description: 'Complete pet management system',
    url: 'https://petos.nsprd.com',
    status: 'live',
    category: 'core',
    progress: 100,
  },
  {
    id: 'prep',
    name: 'Print File Prep',
    emoji: '🖨️',
    description: 'Convert designs to print-ready PDFs',
    url: 'https://prep.nsprd.com',
    status: 'live',
    category: 'business',
    progress: 100,
  },
  {
    id: 'onething',
    name: 'ONE THING',
    emoji: '⏱️',
    description: 'Anti-multitasking productivity timer',
    url: 'https://one-thing-three.vercel.app',
    status: 'live',
    category: 'fun',
    progress: 100,
  },
  {
    id: 'wealthos',
    name: 'WealthOS',
    emoji: '💰',
    description: 'Personal finance tracker',
    url: 'https://wealth.nsprd.com',
    status: 'in-progress',
    category: 'core',
    progress: 40,
  },
  {
    id: 'hhh',
    name: 'Happy Hour Heroes',
    emoji: '🍺',
    description: 'The drinking game app',
    url: 'https://hhh.nsprd.com',
    status: 'in-progress',
    category: 'fun',
    progress: 30,
  },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthStats, setHealthStats] = useState<HealthStats>({
    totalProjects: 0,
    liveProjects: 0,
    avgProgress: 0,
    lastUpdate: 'Never',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('nsprd_projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped: Project[] = data.map((row) => ({
          id: row.id,
          name: row.name,
          emoji: row.emoji ?? '🚀',
          description: row.description ?? '',
          url: row.url ?? '',
          status: (row.status === 'archived' ? 'in-progress' : row.status) as Project['status'],
          category: row.category as Project['category'],
          progress: row.progress ?? 0,
          updated_at: row.updated_at ?? undefined,
        }));
        setProjects(mapped);
        calculateHealthStats(data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to defaults:', err);
    }

    setProjects(DEFAULT_PROJECTS);
    calculateHealthStats(DEFAULT_PROJECTS);
    setLoading(false);
  };

  const calculateHealthStats = (projectData: any[]) => {
    const total = projectData.length;
    const live = projectData.filter((p) => p.status === 'live').length;
    const avgProgress = projectData.reduce((sum, p) => sum + (p.progress ?? 0), 0) / (total || 1);
    
    const dates = projectData
      .map((p) => p.updated_at)
      .filter((d) => d)
      .sort()
      .reverse();
    
    const lastUpdate = dates[0] 
      ? new Date(dates[0]).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        })
      : 'Never';

    setHealthStats({
      totalProjects: total,
      liveProjects: live,
      avgProgress: Math.round(avgProgress),
      lastUpdate,
    });
  };

  const HealthWidgetSkeleton = () => (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginBottom: '32px',
      padding: '20px',
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    }}
      className="health-widget"
    >
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <div style={{
            height: '38px',
            width: '80%',
            background: 'var(--border)',
            borderRadius: '8px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          <div style={{
            height: '16px',
            width: '60%',
            background: 'var(--border)',
            borderRadius: '4px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
        </div>
      ))}
    </section>
  );

  return (
    <main style={{
      padding: '24px',
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.3px' }}>
          Mission Control
        </h1>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--live)',
          background: 'rgba(52, 199, 89, 0.1)',
          border: '1px solid rgba(52, 199, 89, 0.25)',
          borderRadius: '20px',
          padding: '3px 10px',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--live)',
            display: 'inline-block',
          }} />
          Live
        </span>
      </header>

      {/* Projects Health Score Widget */}
      {loading ? (
        <HealthWidgetSkeleton />
      ) : (
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '32px',
          padding: '20px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
          className="health-widget"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--text)',
            }}>
              {healthStats.totalProjects}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              Total Projects
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--live)',
            }}>
              {healthStats.liveProjects}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              Live Projects
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--text)',
            }}>
              {healthStats.avgProgress}%
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              Avg Progress
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--text)',
            }}>
              {healthStats.lastUpdate}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              Last Update
            </div>
          </div>
        </section>
      )}

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}
        className="project-grid"
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @media (max-width: 720px) {
          .health-widget {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .project-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .project-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
