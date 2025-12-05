import React from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import EngagementMetricsPanel from '../../components/community/EngagementMetricsPanel';

const CommunityEngagementPage: React.FC = () => {
  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Engagement & Reports</h1>
            <p className="text-sm text-text-secondary">
              Track community engagement metrics and activity trends
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => console.log('Export engagement report')}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📥 Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Avg Daily Posts</span>
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">46</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Avg Daily Comments</span>
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">178</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% vs last week</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Response Rate</span>
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">82%</p>
              <p className="text-xs text-blue-600 mt-1">Within 24 hours</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Member Satisfaction</span>
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">4.6</p>
              <p className="text-xs text-text-muted mt-1">Out of 5.0</p>
            </div>
          </div>

          {/* Engagement Metrics Panel */}
          <EngagementMetricsPanel />

          {/* Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Patterns */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-base font-bold text-text-primary mb-4">Activity Patterns</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">Peak Activity</p>
                      <p className="text-xs text-text-secondary">
                        Thursdays see 35% more engagement than other weekdays. Consider scheduling important announcements on Thursdays.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">High Engagement Communities</p>
                      <p className="text-xs text-text-secondary">
                        General Discussion and JavaScript Mastery have consistently high engagement rates above 70%.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">Attention Needed</p>
                      <p className="text-xs text-text-secondary">
                        Mobile Dev Community and Data Analytics Cohort have lower engagement. Consider intervention strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Health Score */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-base font-bold text-text-primary mb-4">Community Health Score</h3>
              <div className="text-center mb-6">
                <div className="inline-block relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                      <div>
                        <p className="text-4xl font-bold text-green-600">8.4</p>
                        <p className="text-xs text-text-muted">out of 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Activity Level</span>
                    <span className="text-xs font-semibold text-text-primary">9.2</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Response Quality</span>
                    <span className="text-xs font-semibold text-text-primary">8.6</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Member Retention</span>
                    <span className="text-xs font-semibold text-text-primary">7.8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Content Quality</span>
                    <span className="text-xs font-semibold text-text-primary">8.1</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityManagerLayout>
  );
};

export default CommunityEngagementPage;
