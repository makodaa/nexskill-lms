import React from 'react';
import CommunityManagerAppLayout from '../../layouts/CommunityManagerAppLayout';
import { roleCapabilities, roleDescriptions } from '../../types/roles';

/**
 * Community Manager Dashboard Placeholder
 * Landing page for COMMUNITY_MANAGER role - community engagement specialists
 */
const CommunityManagerDashboardPlaceholder: React.FC = () => {
  return (
    <CommunityManagerAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Community Manager Dashboard 💬
            </h1>
            <p className="text-sm text-text-secondary">
              Foster engagement and moderate discussions
            </p>
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <span className="text-xs font-medium">Community Lead</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Role Description Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">About Your Role</h3>
                <p className="text-text-secondary leading-relaxed">
                  {roleDescriptions.COMMUNITY_MANAGER}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-base font-semibold text-text-primary mb-4">Your Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleCapabilities.COMMUNITY_MANAGER.map((capability: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-text-secondary">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Content Moderation
              </h3>
              <p className="text-sm text-text-secondary">
                Review and moderate community discussions, posts, and comments
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Community Engagement
              </h3>
              <p className="text-sm text-text-secondary">
                Foster meaningful interactions and build vibrant learning communities
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Community Analytics
              </h3>
              <p className="text-sm text-text-secondary">
                Track engagement metrics and community health indicators
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-semibold mb-2">🚧 Dashboard Under Development</p>
            <p className="text-sm opacity-90">
              This is a placeholder page. Full community manager features will be available soon.
            </p>
          </div>
        </div>
      </div>
    </CommunityManagerAppLayout>
  );
};

export default CommunityManagerDashboardPlaceholder;
