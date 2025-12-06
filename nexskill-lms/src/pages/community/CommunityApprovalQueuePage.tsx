import React, { useState } from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import ApprovalQueueTable from '../../components/community/ApprovalQueueTable';

const CommunityApprovalQueuePage: React.FC = () => {
  const [filters, setFilters] = useState({
    community: 'all',
    type: 'all',
    reason: 'all',
  });
  const [showStatsModal, setShowStatsModal] = useState(false);

  const communities = ['JavaScript Mastery', 'UI/UX Design', 'Product Management', 'General Discussion'];
  const types = ['Question', 'Announcement', 'Media', 'Discussion'];
  const reasons = ['Pending approval', 'Reported for spam', 'Reported for language'];

  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Post Approval Queue</h1>
            <p className="text-sm text-text-secondary">
              Review and moderate posts submitted to communities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowStatsModal(true)}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📊 Queue Stats
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total in Queue</span>
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">8</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Pending</span>
                <span className="text-2xl">⏳</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">5</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Reported</span>
                <span className="text-2xl">🚨</span>
              </div>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Approved Today</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Filters:</span>
              </div>
              
              {/* Community Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Community:</label>
                <select
                  value={filters.community}
                  onChange={(e) => setFilters({ ...filters, community: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="all">All Communities</option>
                  {communities.map((community) => (
                    <option key={community} value={community}>{community}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Type:</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="all">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Reason Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Reason:</label>
                <select
                  value={filters.reason}
                  onChange={(e) => setFilters({ ...filters, reason: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="all">All Reasons</option>
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.community !== 'all' || filters.type !== 'all' || filters.reason !== 'all') && (
                <button
                  onClick={() => setFilters({ community: 'all', type: 'all', reason: 'all' })}
                  className="px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Approval Queue Table */}
          <ApprovalQueueTable />

          {/* Moderation Guidelines */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🛡️
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Moderation Guidelines</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Approve posts that add value and follow community guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Reject spam, promotional content without educational value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Hide inappropriate language or offensive content immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>When in doubt, consult with coaches or escalate to platform owner</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#EDF0FB] flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-primary">Queue Statistics</h3>
              <button
                onClick={() => setShowStatsModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                  <div className="text-xs text-amber-700 mb-1">Avg. Response Time</div>
                  <div className="text-2xl font-bold text-amber-900">2.5 hours</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="text-xs text-green-700 mb-1">Approval Rate</div>
                  <div className="text-2xl font-bold text-green-900">78%</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-xs text-blue-700 mb-1">Posts This Week</div>
                  <div className="text-2xl font-bold text-blue-900">156</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="text-xs text-purple-700 mb-1">Pending Avg Age</div>
                  <div className="text-2xl font-bold text-purple-900">4.2 hours</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-text-primary mb-3">Top Moderators This Week</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-primary">Sarah Johnson</span>
                    <span className="text-sm font-semibold text-green-600">42 approvals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-primary">Michael Chen</span>
                    <span className="text-sm font-semibold text-green-600">38 approvals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-primary">Emma Wilson</span>
                    <span className="text-sm font-semibold text-green-600">35 approvals</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#EDF0FB] flex justify-end">
              <button
                onClick={() => setShowStatsModal(false)}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </CommunityManagerLayout>
  );
};

export default CommunityApprovalQueuePage;
