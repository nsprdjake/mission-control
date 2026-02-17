'use client';

import { useState, useEffect } from 'react';
import { StatusIndicator } from './StatusIndicator';

interface SystemMetric {
  label: string;
  value: string | number;
  status: 'good' | 'warning' | 'error';
  icon: string;
}

export function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: 'API Response', value: 'Checking...', status: 'good', icon: '🚀' },
    { label: 'SSL Certificates', value: 'Valid', status: 'good', icon: '🔒' },
    { label: 'Storage Used', value: '42%', status: 'good', icon: '💾' },
    { label: 'Active Sessions', value: '3', status: 'good', icon: '👥' },
  ]);
  
  const [expandedView, setExpandedView] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date());

  useEffect(() => {
    // Simulate checking system health
    const checkHealth = async () => {
      // In a real app, this would fetch actual metrics
      const avgResponseTime = Math.floor(Math.random() * 200) + 100;
      const storageUsed = Math.floor(Math.random() * 20) + 40;
      const activeSessions = Math.floor(Math.random() * 5) + 1;
      
      setMetrics([
        { 
          label: 'API Response', 
          value: `${avgResponseTime}ms`, 
          status: avgResponseTime < 300 ? 'good' : avgResponseTime < 500 ? 'warning' : 'error',
          icon: '🚀' 
        },
        { 
          label: 'SSL Certificates', 
          value: 'Valid', 
          status: 'good', 
          icon: '🔒' 
        },
        { 
          label: 'Storage Used', 
          value: `${storageUsed}%`, 
          status: storageUsed < 70 ? 'good' : storageUsed < 85 ? 'warning' : 'error',
          icon: '💾' 
        },
        { 
          label: 'Active Sessions', 
          value: activeSessions, 
          status: 'good', 
          icon: '👥' 
        },
      ]);
      setLastChecked(new Date());
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🏥</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            System Health
          </h2>
        </div>
        <button
          onClick={() => setExpandedView(!expandedView)}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
        >
          {expandedView ? 'Collapse' : 'Expand'} View
        </button>
      </div>

      {/* Compact View */}
      {!expandedView && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{metric.icon}</span>
                <StatusIndicator 
                  isUp={metric.status !== 'error'} 
                  size="sm"
                />
              </div>
              <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
              <div className={`font-semibold ${
                metric.status === 'good' ? 'text-green-400' :
                metric.status === 'warning' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expanded View */}
      {expandedView && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metrics */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-400">System Metrics</h3>
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{metric.icon}</span>
                      <span className="text-gray-300">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        metric.status === 'good' ? 'text-green-400' :
                        metric.status === 'warning' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {metric.value}
                      </span>
                      <StatusIndicator isUp={metric.status !== 'error'} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure Overview */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Infrastructure</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">🌐 Primary Domain</span>
                  <span className="text-gray-400">nsprd.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">☁️ Hosting</span>
                  <span className="text-gray-400">Vercel + DreamHost</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">🔧 Framework</span>
                  <span className="text-gray-400">Next.js 15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">🗄️ Database</span>
                  <span className="text-gray-400">Supabase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Last Checked */}
          <div className="text-center text-sm text-gray-500">
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
        </div>
      )}
    </section>
  );
}