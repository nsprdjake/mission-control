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

  useEffect(() => {
    // Check site statuses on load
    checkSiteStatuses();
  }, []);

  const checkSiteStatuses = async () => {
    setChecking(true);
    const statuses: Record<string, boolean> = {};
    
    for (const project of projects) {
      if (project.status === 'live') {
        try {
          // Use a simple fetch with no-cors to check if site is reachable
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Jake's Mission Control
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Central hub for all projects and tools
          </p>
          
          {/* System Status */}
          <div className="flex justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <StatusIndicator isUp={!checking && upSites === liveProjects} />
              <span className="text-gray-400">
                {checking ? 'Checking systems...' : `${upSites}/${liveProjects} systems operational`}
              </span>
            </div>
            <button
              onClick={checkSiteStatuses}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              🔄 Refresh Status
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>🚀</span> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isUp={siteStatuses[project.id]}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <QuickAction key={action.id} action={action} />
            ))}
          </div>
        </section>

        {/* Stats Dashboard */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>📊</span> Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">{liveProjects}</div>
              <div className="text-gray-400">Projects Live</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {checking ? '...' : upSites}
              </div>
              <div className="text-gray-400">Systems Up</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {quickActions.length}
              </div>
              <div className="text-gray-400">Quick Actions</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with Next.js 15 & Tailwind CSS</p>
          <p className="mt-2">🚀 Front door to Jake's digital empire</p>
        </footer>
      </div>
    </main>
  );
}
