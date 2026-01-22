import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GlobalTopBarControls from '../components/system/GlobalTopBarControls';
import BrandLogo from '../components/brand/BrandLogo';
import { LogOut } from 'lucide-react';

interface CoachAppLayoutProps {
  children: React.ReactNode;
}

const CoachAppLayout: React.FC<CoachAppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens/session here
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  const navItems = [
    { path: '/coach/dashboard', label: 'Dashboard' },
    { path: '/coach/demo-lesson', label: 'Lessons' },
    { path: '/coach/courses', label: 'Courses' },
    { path: '/coach/ai-tools', label: 'AI Tools' },
    { path: '/coach/quizzes', label: 'Quizzes & Assessments' },
    { path: '/coach/coaching-tools', label: 'Coaching Tools' },
    { path: '/coach/students', label: 'Students' },
    { path: '/coach/subcoach-management', label: 'Sub-Coaches' },
    { path: '/coach/earnings', label: 'Earnings' },
    { path: '/coach/messages', label: 'Messages' },
    { path: '/coach/profile', label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7F0FF] via-[#F9F0FF] to-[#E3F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors">
      <div className="mx-auto bg-white dark:bg-dark-background-shell rounded-[32px] shadow-card overflow-hidden flex transition-colors" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Left Sidebar */}
        <aside className="w-[240px] flex-shrink-0 flex flex-col p-6 border-r border-[#EDF0FB] dark:border-gray-700">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/coach/dashboard" className="flex items-center gap-3">
              <BrandLogo size="md" showText={false} />
              <div>
                <span className="text-xl font-bold text-brand-primary block leading-tight">NexSkill</span>
                <span className="text-xs text-slate-600 dark:text-gray-400">Coach Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                    ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-medium shadow-md'
                    : 'text-text-secondary dark:text-dark-text-secondary hover:bg-[#F5F7FF] dark:hover:bg-gray-800 hover:text-brand-primary dark:hover:text-blue-400'
                  }`}
              >
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Coach Profile */}
          <div className="pt-6 mt-6 border-t border-[#EDF0FB] dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                C
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary truncate">Coach User</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Instructor</p>
              </div>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar with Global Controls */}
          <div className="flex items-center justify-end px-8 pt-6 pb-4 border-b border-[#EDF0FB] dark:border-gray-700">
            <GlobalTopBarControls />
          </div>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoachAppLayout;
