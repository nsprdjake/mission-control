'use client';

import { useState, useEffect } from 'react';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ProjectCard } from '@/components/ProjectCard';
import { AddProjectModal } from '@/components/AddProjectModal';

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  url: string;
  status: 'live' | 'in-progress' | 'coming-soon';
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'lifeos',
    name: 'LifeOS',
    emoji: '🎯',
    description: 'Life tracking dashboard',
    url: 'https://pd.nsprd.com',
    status: 'live',
  },
  {
    id: 'lyne',
    name: 'LYNE',
    emoji: '🎮',
    description: 'Generational wealth platform',
    url: 'https://rp1.nsprd.com',
    status: 'live',
  },
  {
    id: 'portal',
    name: 'Inspired Design Portal',
    emoji: '💼',
    description: 'Business manager',
    url: 'https://portal.nsprd.com',
    status: 'live',
  },
  {
    id: 'memory',
    name: 'Memory Palace',
    emoji: '🧠',
    description: 'Memory archive',
    url: 'https://memory.nsprd.com',
    status: 'live',
  },
  {
    id: 'faggnation',
    name: 'Faggnation Archive',
    emoji: '🎬',
    description: 'Podcast archive',
    url: 'https://faggnation.nsprd.com',
    status: 'live',
  },
  {
    id: 'vibe',
    name: 'Desert Vibe Check',
    emoji: '🎨',
    description: 'Fun project',
    url: 'https://vibe.nsprd.com',
    status: 'in-progress',
  },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [siteStatuses, setSiteStatuses] = useState<Record<string, boolean>>({});
  const [checking, setChecking] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
    // Load projects from localStorage or use defaults
    const saved = localStorage.getItem('missionControlProjects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('missionControlProjects', JSON.stringify(DEFAULT_PROJECTS));
    }
    checkSiteStatuses();
  }, []);

  const checkSiteStatuses = async () => {
    setChecking(true);
    const statuses: Record<string, boolean> = {};
    
    for (const project of projects) {
      if (project.status === 'live') {
        try {
          const response = await fetch(`/api/check-status?url=${encodeURIComponent(project.url)}`);
          const data = await response.json();
          statuses[project.id] = data.isUp;
        } catch (error) {
          statuses[project.id] = false;
        }
      }
    }
    
    setSiteStatuses(statuses);
    setChecking(false);
  };

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('missionControlProjects', JSON.stringify(newProjects));
  };

  const handleAddProject = (project: Project) => {
    const newProjects = [...projects, project];
    saveProjects(newProjects);
    setShowAddModal(false);
  };

  const handleEditProject = (project: Project) => {
    const newProjects = projects.map(p => p.id === project.id ? project : p);
    saveProjects(newProjects);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const newProjects = projects.filter(p => p.id !== id);
      saveProjects(newProjects);
    }
  };

  const liveProjects = projects.filter(p => p.status === 'live').length;
  const upSites = Object.values(siteStatuses).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        {/* Hero Section */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="mb-4 inline-block">
            <div className="text-6xl sm:text-7xl animate-float">🚀</div>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              Mission Control
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Your command center for all projects, tools, and systems
          </p>
          
          {/* System Status */}
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <StatusIndicator isUp={!checking && upSites === liveProjects} size="md" />
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase font-medium">System Status</div>
                <div className="text-sm text-gray-300 font-semibold">
                  {checking ? 'Checking...' : `${upSites}/${liveProjects} Online`}
                </div>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <button
              onClick={checkSiteStatuses}
              disabled={checking}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition-all text-white font-medium disabled:opacity-50"
            >
              <span className={checking ? 'animate-spin' : ''}>🔄</span>
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <section className={`mb-12 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎯</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                Projects
              </h2>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all text-white font-medium shadow-lg shadow-purple-900/50"
            >
              + Add Project
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isUp={siteStatuses[project.id]}
                onEdit={() => setEditingProject(project)}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className={`transition-all duration-1000 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
              <div className="text-4xl font-black text-purple-400 mb-2">
                {liveProjects}
              </div>
              <div className="text-gray-400 text-sm font-medium">Projects Live</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all">
              <div className="text-4xl font-black text-green-400 mb-2">
                {checking ? '...' : upSites}
              </div>
              <div className="text-gray-400 text-sm font-medium">Systems Up</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all">
              <div className="text-4xl font-black text-pink-400 mb-2">
                {projects.length}
              </div>
              <div className="text-gray-400 text-sm font-medium">Total Projects</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-12 text-center transition-all duration-1000 delay-600 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <span className="animate-pulse">✨</span>
            <span>Front door to Jake's digital empire</span>
            <span className="animate-pulse">✨</span>
          </div>
        </footer>
      </div>

      {/* Add/Edit Project Modal */}
      {(showAddModal || editingProject) && (
        <AddProjectModal
          project={editingProject}
          onSave={editingProject ? handleEditProject : handleAddProject}
          onClose={() => {
            setShowAddModal(false);
            setEditingProject(null);
          }}
        />
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(10px) translateX(-20px); }
          66% { transform: translateY(-10px) translateX(10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(15px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
