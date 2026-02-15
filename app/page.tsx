'use client';

import { useState, useEffect } from 'react';
import { StatusIndicator } from '@/components/StatusIndicator';
import { ProjectCard } from '@/components/ProjectCard';
import { QuickAction } from '@/components/QuickAction';

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  url: string;
  status: 'live' | 'in-progress' | 'coming-soon';
}

const projects: Project[] = [
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

const quickActions = [
  { id: 'devbot', name: 'DevBot', icon: '💻', description: 'Development assistance' },
  { id: 'chatbot', name: 'ChatBot', icon: '💬', description: 'General conversation' },
  { id: 'creativebot', name: 'CreativeBot', icon: '🎨', description: 'Creative projects' },
  { id: 'bizbot', name: 'BizBot', icon: '📊', description: 'Business strategy' },
  { id: 'researchbot', name: 'ResearchBot', icon: '🔬', description: 'Research & analysis' },
  { id: 'reminders', name: 'Today\'s Reminders', icon: '⏰', description: 'View reminders' },
  { id: 'wins', name: 'Recent Wins', icon: '🏆', description: 'Celebrate success' },
  { id: 'bailey', name: 'Bailey Walk Tracker', icon: '🐕', description: 'Track walks' },
];

export default function Home() {
  const [siteStatuses, setSiteStatuses] = useState<Record<string, boolean>>({});
  const [checking, setChecking] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const liveProjects = projects.filter(p => p.status === 'live').length;
  const upSites = Object.values(siteStatuses).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Animated Background Gradient Mesh */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        {/* Hero Section */}
        <div className={`text-center mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="mb-6 inline-block">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-2 animate-float">🚀</div>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x inline-block">
              Mission Control
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Your command center for all projects, tools, and systems
          </p>
          
          {/* System Status Card */}
          <div className="inline-flex items-center gap-4 sm:gap-6 bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-2xl px-6 sm:px-8 py-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <StatusIndicator isUp={!checking && upSites === liveProjects} size="md" />
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">System Status</div>
                <div className="text-sm sm:text-base text-gray-300 font-semibold">
                  {checking ? 'Checking...' : `${upSites}/${liveProjects} Online`}
                </div>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-800"></div>
            <button
              onClick={checkSiteStatuses}
              disabled={checking}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-300 text-white font-medium shadow-lg shadow-blue-900/50 hover:shadow-blue-800/60 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className={`text-lg ${checking ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}>🔄</span>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <section className={`mb-16 sm:mb-20 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="text-3xl sm:text-4xl">🎯</div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="transition-all duration-700"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: mounted ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                  opacity: mounted ? 1 : 0,
                }}
              >
                <ProjectCard
                  project={project}
                  isUp={siteStatuses[project.id]}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className={`mb-16 sm:mb-20 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="text-3xl sm:text-4xl">⚡</div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <div
                key={action.id}
                className="transition-all duration-700"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: mounted ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                  opacity: mounted ? 1 : 0,
                }}
              >
                <QuickAction action={action} />
              </div>
            ))}
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className={`mb-12 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="text-3xl sm:text-4xl">📊</div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Overview
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="group relative bg-gradient-to-br from-blue-600/10 to-blue-800/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 sm:p-8 hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-black text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {liveProjects}
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">Projects Live</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-green-600/10 to-green-800/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 sm:p-8 hover:border-green-400/40 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-black text-green-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {checking ? '...' : upSites}
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">Systems Up</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-purple-600/10 to-purple-800/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 sm:p-8 hover:border-purple-400/40 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-black text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {quickActions.length}
                </div>
                <div className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">Quick Actions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-16 sm:mt-20 text-center transition-all duration-1000 delay-800 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
            <p className="text-gray-500 text-sm font-medium">Built with Next.js 15 & Tailwind CSS</p>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="animate-pulse">✨</span>
              <span>Front door to Jake's digital empire</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
