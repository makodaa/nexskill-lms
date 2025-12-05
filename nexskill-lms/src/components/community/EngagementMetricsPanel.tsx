import React from 'react';

const EngagementMetricsPanel: React.FC = () => {
  const topCommunities = [
    { name: 'General Discussion', engagement: 78, posts: 67, comments: 234 },
    { name: 'JavaScript Mastery', engagement: 72, posts: 45, comments: 189 },
    { name: 'Career Development', engagement: 62, posts: 34, comments: 156 },
    { name: 'UI/UX Designers Hub', engagement: 68, posts: 38, comments: 167 },
  ];

  const topContributors = [
    { name: 'Sarah Martinez', posts: 23, comments: 89, helpfulVotes: 156 },
    { name: 'John Chen', posts: 18, comments: 67, helpfulVotes: 134 },
    { name: 'Emma Wilson', posts: 15, comments: 54, helpfulVotes: 98 },
    { name: 'Mike Johnson', posts: 12, comments: 43, helpfulVotes: 87 },
    { name: 'Lisa Davis', posts: 11, comments: 39, helpfulVotes: 76 },
  ];

  const dailyMetrics = [
    { day: 'Mon', posts: 45, comments: 178 },
    { day: 'Tue', posts: 52, comments: 201 },
    { day: 'Wed', posts: 48, comments: 189 },
    { day: 'Thu', posts: 61, comments: 234 },
    { day: 'Fri', posts: 58, comments: 212 },
    { day: 'Sat', posts: 32, comments: 134 },
    { day: 'Sun', posts: 28, comments: 98 },
  ];

  const maxPosts = Math.max(...dailyMetrics.map(d => d.posts));

  return (
    <div className="space-y-6">
      {/* Daily Activity Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-base font-bold text-text-primary mb-4">Daily Activity (Last 7 Days)</h3>
        <div className="space-y-4">
          <div className="flex items-end gap-2 h-48">
            {dailyMetrics.map((metric, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-teal-500 rounded-t-lg transition-all"
                    style={{ height: `${(metric.posts / maxPosts) * 150}px` }}
                  ></div>
                  <span className="text-xs font-semibold text-green-600">{metric.posts}</span>
                </div>
                <span className="text-xs text-text-muted font-medium">{metric.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-teal-500 rounded"></div>
              <span className="text-text-secondary">Posts per day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Communities */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-base font-bold text-text-primary mb-4">Top Communities by Engagement</h3>
          <div className="space-y-3">
            {topCommunities.map((community, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{community.name}</span>
                  <span className="text-sm font-bold text-green-600">{community.engagement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all"
                    style={{ width: `${community.engagement}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>📝 {community.posts} posts</span>
                  <span>💬 {community.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-base font-bold text-text-primary mb-4">Top Contributors</h3>
          <div className="space-y-3">
            {topContributors.map((contributor, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      #{idx + 1}
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{contributor.name}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
                    ⭐ {contributor.helpfulVotes}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted ml-10">
                  <span>📝 {contributor.posts} posts</span>
                  <span>💬 {contributor.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
        <h3 className="text-base font-bold text-text-primary mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-700">324</p>
            <p className="text-xs text-text-muted mt-1">Total Posts</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-teal-700">1,246</p>
            <p className="text-xs text-text-muted mt-1">Total Comments</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700">847</p>
            <p className="text-xs text-text-muted mt-1">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-700">68%</p>
            <p className="text-xs text-text-muted mt-1">Avg Engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementMetricsPanel;
