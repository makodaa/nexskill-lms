import React from 'react';
import PlatformOwnerAppLayout from '../../layouts/PlatformOwnerAppLayout';
import PlatformOwnerOverviewKpiStrip from '../../components/owner/PlatformOwnerOverviewKpiStrip';
import RoleMatrixSummaryCard from '../../components/owner/RoleMatrixSummaryCard';
import SystemQuickLinksCard from '../../components/owner/SystemQuickLinksCard';
import DevRoleSwitcherPanel from '../../components/owner/DevRoleSwitcherPanel';

/**
 * Platform Owner Dashboard Page
 * High-level command center for the platform owner with global oversight
 */
const PlatformOwnerDashboardPage: React.FC = () => {
  // Dummy stats data
  const stats = {
    totalUsers: 12847,
    totalCoaches: 342,
    totalStudents: 11892,
    monthlyRecurringRevenue: 284500,
    activeCourses: 1247,
    aiRequestsThisMonth: 142385,
  };

  // Dummy roles summary data
  const rolesSummary = [
    {
      roleKey: 'PLATFORM_OWNER',
      label: 'Platform Owner',
      userCount: 2,
      keyCapabilities: [
        'Full platform administration',
        'Infrastructure & deployment control',
      ],
      icon: '👑',
      color: 'from-purple-500 to-purple-600',
    },
    {
      roleKey: 'ADMIN',
      label: 'Administrator',
      userCount: 8,
      keyCapabilities: [
        'User management & moderation',
        'Course approval & analytics',
      ],
      icon: '🔐',
      color: 'from-blue-500 to-blue-600',
    },
    {
      roleKey: 'COACH',
      label: 'Coach',
      userCount: 342,
      keyCapabilities: [
        'Create & manage courses',
        'Student interaction & mentoring',
      ],
      icon: '👨‍🏫',
      color: 'from-green-500 to-green-600',
    },
    {
      roleKey: 'SUB_COACH',
      label: 'Sub-Coach',
      userCount: 89,
      keyCapabilities: [
        'Assist primary coaches',
        'Limited course management',
      ],
      icon: '🧑‍🎓',
      color: 'from-teal-500 to-teal-600',
    },
    {
      roleKey: 'CONTENT_EDITOR',
      label: 'Content Editor',
      userCount: 15,
      keyCapabilities: [
        'Course content creation & editing',
        'Material review & approval',
      ],
      icon: '✍️',
      color: 'from-amber-500 to-amber-600',
    },
    {
      roleKey: 'COMMUNITY_MANAGER',
      label: 'Community Manager',
      userCount: 12,
      keyCapabilities: [
        'Community engagement oversight',
        'Discussion moderation',
      ],
      icon: '💬',
      color: 'from-pink-500 to-pink-600',
    },
    {
      roleKey: 'SUPPORT_STAFF',
      label: 'Support Staff',
      userCount: 24,
      keyCapabilities: [
        'Customer support & inquiries',
        'Technical issue resolution',
      ],
      icon: '🎧',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      roleKey: 'STUDENT',
      label: 'Student',
      userCount: 11892,
      keyCapabilities: [
        'Course enrollment & learning',
        'Community participation',
      ],
      icon: '👨‍🎓',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      roleKey: 'ORG_OWNER',
      label: 'Organization Owner',
      userCount: 463,
      keyCapabilities: [
        'Team member management',
        'Organizational billing & reporting',
      ],
      icon: '🏢',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  // Dummy quick links data
  const quickLinks = [
    {
      label: 'User Management',
      description: 'Manage all platform users, roles, and permissions',
      route: '/owner/users',
      icon: '👥',
    },
    {
      label: 'Billing & Payouts',
      description: 'Financial oversight, revenue tracking, and coach payouts',
      route: '/owner/billing',
      icon: '💰',
    },
    {
      label: 'Security Center',
      description: 'Access control, authentication, and security settings',
      route: '/owner/security',
      icon: '🔒',
    },
    {
      label: 'System Settings',
      description: 'Global platform configuration and feature toggles',
      route: '/owner/settings',
      icon: '⚙️',
    },
    {
      label: 'AI Governance',
      description: 'AI usage policies, cost management, and analytics',
      route: '/owner/ai-governance',
      icon: '🤖',
    },
  ];

  return (
    <PlatformOwnerAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Platform Owner Dashboard
              </h1>
              <p className="text-sm text-text-secondary">
                Global oversight of users, roles, billing, and AI usage across NexSkill
              </p>
            </div>
            <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2">
              <span className="text-lg">👑</span>
              <span className="text-xs font-medium">Super Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI Strip */}
          <PlatformOwnerOverviewKpiStrip stats={stats} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <RoleMatrixSummaryCard rolesSummary={rolesSummary} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <SystemQuickLinksCard quickLinks={quickLinks} />
              <DevRoleSwitcherPanel />
            </div>
          </div>
        </div>
      </div>
    </PlatformOwnerAppLayout>
  );
};

export default PlatformOwnerDashboardPage;
