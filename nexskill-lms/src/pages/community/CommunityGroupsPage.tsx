import React from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import CommunityGroupsList from '../../components/community/CommunityGroupsList';

const CommunityGroupsPage: React.FC = () => {
  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Groups & Circles</h1>
            <p className="text-sm text-text-secondary">
              Manage specific groups and study circles within communities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => console.log('Export groups')}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📥 Export Groups
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
                <span className="text-sm text-text-muted">Total Groups</span>
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">15</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Active Groups</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">15</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total Members</span>
                <span className="text-2xl">🙋</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">516</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total Posts</span>
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">1,432</p>
            </div>
          </div>

          {/* Groups List */}
          <CommunityGroupsList />

          {/* Group Management Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Group Management Best Practices</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Assign multiple moderators to active groups to ensure coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Monitor group post counts to identify groups that may need more engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Archive inactive groups to keep the community focused and organized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Review group settings regularly to ensure they align with community guidelines</span>
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

export default CommunityGroupsPage;
