import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlobalTopBarControls from '../components/system/GlobalTopBarControls';

interface CommunityManagerAppLayoutProps {
  children: React.ReactNode;
}

const CommunityManagerAppLayout: React.FC<CommunityManagerAppLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/community/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/community/discussions', label: 'Discussions', icon: '💬' },
    { path: '/community/moderation', label: 'Moderation', icon: '🛡️' },
    { path: '/community/reported-content', label: 'Reported Content', icon: '⚠️' },
    { path: '/community/members', label: 'Members', icon: '👥' },
    { path: '/community/engagement', label: 'Engagement', icon: '📈' },
    { path: '/community/guidelines', label: 'Guidelines', icon: '📋' },
    { path: '/community/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FFF4] via-[#E8FFF0] to-[#D0FFE8] p-8">
      <div className="max-w-[1440px] mx-auto bg-white rounded-[32px] shadow-card overflow-hidden flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Left Sidebar */}
        <aside className="w-[240px] flex-shrink-0 flex flex-col p-6 border-r border-[#EDF0FB]">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/community/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-green-600 block leading-tight">NexSkill</span>
                <span className="text-xs text-slate-600">Community Manager</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                    : 'text-text-secondary hover:bg-[#F0FFF4] hover:text-text-primary'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Alerts */}
          <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-800 mb-2">Pending Reviews</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-green-600">Reported posts</span>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">3</span>
            </div>
            <button className="w-full px-3 py-2 bg-white text-green-600 text-xs font-medium rounded-lg hover:bg-green-50 transition-colors border border-green-200">
              Review Now
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="px-8 py-4 border-b border-[#EDF0FB] flex items-center justify-end">
            <GlobalTopBarControls />
          </header>

          {/* Page Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CommunityManagerAppLayout;
