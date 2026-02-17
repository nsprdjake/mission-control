'use client';

import { useState, useEffect } from 'react';

interface Agent {
  name: string;
  emoji: string;
  description: string;
  command: string;
}

const AI_AGENTS: Agent[] = [
  { name: 'DevBot', emoji: '🛠️', description: 'Code & development', command: '/agent dev' },
  { name: 'CreativeBot', emoji: '🎨', description: 'Design & creative', command: '/agent creative' },
  { name: 'BizBot', emoji: '💼', description: 'Business strategy', command: '/agent biz' },
  { name: 'ResearchBot', emoji: '🔬', description: 'Deep research', command: '/agent research' },
];

export function QuickActions() {
  const [todayFocus, setTodayFocus] = useState('');
  const [recentWins, setRecentWins] = useState<string[]>([]);
  const [baileyWalks, setBaileyWalks] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage
    const saved = {
      focus: localStorage.getItem('missionControlTodayFocus') || '',
      wins: JSON.parse(localStorage.getItem('missionControlRecentWins') || '[]'),
      walks: parseInt(localStorage.getItem('missionControlBaileyWalks') || '0'),
    };
    setTodayFocus(saved.focus);
    setRecentWins(saved.wins.slice(0, 3)); // Keep only last 3
    setBaileyWalks(saved.walks);

    // Reset Bailey walks at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msToMidnight = midnight.getTime() - now.getTime();
    const resetTimer = setTimeout(() => {
      setBaileyWalks(0);
      localStorage.setItem('missionControlBaileyWalks', '0');
    }, msToMidnight);

    return () => clearTimeout(resetTimer);
  }, []);

  const updateTodayFocus = (focus: string) => {
    setTodayFocus(focus);
    localStorage.setItem('missionControlTodayFocus', focus);
  };

  const addWin = (win: string) => {
    if (!win.trim()) return;
    const newWins = [win, ...recentWins].slice(0, 3);
    setRecentWins(newWins);
    localStorage.setItem('missionControlRecentWins', JSON.stringify(newWins));
  };

  const recordBaileyWalk = () => {
    const newCount = baileyWalks + 1;
    setBaileyWalks(newCount);
    localStorage.setItem('missionControlBaileyWalks', newCount.toString());
  };

  if (!mounted) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">⚡</div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Agents */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-400">AI Agents</h3>
          <div className="grid grid-cols-2 gap-3">
            {AI_AGENTS.map((agent) => (
              <div
                key={agent.name}
                onClick={() => {
                  navigator.clipboard.writeText(agent.command);
                  alert(`Command copied: ${agent.command}`);
                }}
                className="cursor-pointer bg-black/30 hover:bg-purple-600/20 border border-white/10 hover:border-purple-400 rounded-lg p-3 transition-all"
              >
                <div className="text-2xl mb-1">{agent.emoji}</div>
                <div className="text-sm font-medium text-white">{agent.name}</div>
                <div className="text-xs text-gray-500">{agent.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today\'s Focus */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Today\'s Focus</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={todayFocus}
              onChange={(e) => updateTodayFocus(e.target.value)}
              placeholder="What\'s the main focus today?"
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-green-400"
            />
            <div className="text-sm text-gray-400">
              {todayFocus ? '✨ Stay focused on this!' : 'Set your daily intention'}
            </div>
          </div>
        </div>

        {/* Recent Wins */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Recent Wins 🏆</h3>
          <div className="space-y-3">
            <div className="space-y-2 mb-3">
              {recentWins.length === 0 ? (
                <div className="text-gray-500 text-sm">No wins recorded yet</div>
              ) : (
                recentWins.map((win, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span className="text-gray-300 text-sm">{win}</span>
                  </div>
                ))
              )}
            </div>
            <input
              type="text"
              placeholder="Add a win..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addWin(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        {/* Bailey Tracker */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">Bailey Walks Today 🐕</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">{baileyWalks}</div>
              <div className="text-gray-400">
                {baileyWalks === 0 ? 'No walks yet' : baileyWalks === 1 ? 'walk today' : 'walks today'}
              </div>
            </div>
            <button
              onClick={recordBaileyWalk}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all text-white font-medium"
            >
              + Record Walk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}