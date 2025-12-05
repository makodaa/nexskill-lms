import React from 'react';
import { Link } from 'react-router-dom';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import CommunityKpiStrip from '../../components/community/CommunityKpiStrip';
import CommunityOverviewList from '../../components/community/CommunityOverviewList';
import ApprovalQueueTable from '../../components/community/ApprovalQueueTable';

const CommunityDashboardPage: React.FC = () => {
  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Community Dashboard</h1>
            <p className="text-sm text-text-secondary">
              Monitor engagement, moderation, and group activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/community/approvals"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
            >
              🛡️ Review Queue
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* KPI Strip */}
          <CommunityKpiStrip />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Top Communities */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-text-primary">Top Communities</h2>
                <Link
                  to="/community/overview"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  View All →
                </Link>
              </div>
              <CommunityOverviewList limit={5} />
            </div>

            {/* Right: Approval Queue Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-text-primary">Pending Approvals</h2>
                <Link
                  to="/community/approvals"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  View All →
                </Link>
              </div>
              <ApprovalQueueTable limit={5} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                to="/community/groups"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👥
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Manage Groups</p>
                  <p className="text-xs text-text-muted">15 active</p>
                </div>
              </Link>

              <Link
                to="/community/announcements"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📢
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Announcements</p>
                  <p className="text-xs text-text-muted">Create new</p>
                </div>
              </Link>

              <Link
                to="/community/engagement"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📈
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Engagement</p>
                  <p className="text-xs text-text-muted">View metrics</p>
                </div>
              </Link>

              <Link
                to="/community/overview"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏘️
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">All Communities</p>
                  <p className="text-xs text-text-muted">Browse all</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Recent Moderation Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Approved post', community: 'JavaScript Mastery', time: '5 minutes ago', type: 'success' },
                { action: 'Rejected spam', community: 'General Discussion', time: '15 minutes ago', type: 'warning' },
                { action: 'Created announcement', community: 'All Communities', time: '1 hour ago', type: 'info' },
                { action: 'Archived group', community: 'Old Cohort', time: '2 hours ago', type: 'neutral' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xl">
                    {activity.type === 'success' ? '✅' : activity.type === 'warning' ? '🚨' : activity.type === 'info' ? '📢' : '📦'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{activity.action}</p>
                    <p className="text-xs text-text-muted">{activity.community} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CommunityManagerLayout>
  );
};

export default CommunityDashboardPage;
