import React, { useState } from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import CommunityOverviewList from '../../components/community/CommunityOverviewList';

const CommunityOverviewPage: React.FC = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
  });

  const categories = ['Course', 'Cohort', 'General'];
  const statuses = ['Active', 'Quiet', 'Growing', 'Archived'];

  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Communities Overview</h1>
            <p className="text-sm text-text-secondary">
              High-level view of all communities and their activity
            </p>
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
                <span className="text-sm text-text-muted">Total Communities</span>
                <span className="text-2xl">🏘️</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">8</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Active</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">6</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total Members</span>
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">2,176</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Avg Engagement</span>
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">63%</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Category:</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Status:</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.category !== 'all' || filters.status !== 'all') && (
                <button
                  onClick={() => setFilters({ category: 'all', status: 'all' })}
                  className="px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Communities List */}
          <CommunityOverviewList />

          {/* Help Section */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Community Health Tips</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Monitor engagement rates weekly to identify communities needing attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Quiet communities may benefit from announcements or coach engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Growing communities should be monitored for moderation needs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityManagerLayout>
  );
};

export default CommunityOverviewPage;
