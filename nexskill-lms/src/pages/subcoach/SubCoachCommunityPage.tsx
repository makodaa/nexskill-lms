import React, { useState } from 'react';
import SubCoachAppLayout from '../../layouts/SubCoachAppLayout';

const SubCoachCommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recent' | 'reported'>('recent');

  // Dummy recent posts
  const recentPosts = [
    {
      id: '1',
      author: 'Alex Martinez',
      courseName: 'UI Design Fundamentals',
      content: 'Can someone explain the difference between RGB and CMYK color models?',
      timestamp: '10 minutes ago',
      replies: 3,
      likes: 5,
    },
    {
      id: '2',
      author: 'Emma Wilson',
      courseName: 'JavaScript Mastery',
      content: 'Just finished the async/await module. This is a game changer!',
      timestamp: '45 minutes ago',
      replies: 8,
      likes: 12,
    },
    {
      id: '3',
      author: 'David Lee',
      courseName: 'Product Management',
      content: 'Looking for feedback on my product roadmap assignment. Anyone willing to review?',
      timestamp: '2 hours ago',
      replies: 2,
      likes: 4,
    },
  ];

  // Dummy reported content
  const reportedContent = [
    {
      id: '1',
      author: 'Anonymous User',
      courseName: 'UI Design Fundamentals',
      content: '[Potentially inappropriate content flagged by student]',
      reportedBy: 'Sarah Johnson',
      reportReason: 'Off-topic spam',
      timestamp: '1 hour ago',
      status: 'Pending' as const,
    },
    {
      id: '2',
      author: 'Another User',
      courseName: 'JavaScript Mastery',
      content: '[Content under review]',
      reportedBy: 'Michael Chen',
      reportReason: 'Inappropriate language',
      timestamp: '3 hours ago',
      status: 'Under Review' as const,
    },
  ];

  return (
    <SubCoachAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Community Moderation</h1>
          <p className="text-sm text-text-secondary">
            Monitor and moderate community discussions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[#EDF0FB]">
              <div className="text-2xl font-bold text-text-primary">{recentPosts.length}</div>
              <div className="text-xs text-text-secondary mt-1">Recent Posts (24h)</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-200">
              <div className="text-2xl font-bold text-amber-700">{reportedContent.length}</div>
              <div className="text-xs text-amber-600 mt-1">Reported Content</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {recentPosts.reduce((sum, post) => sum + post.replies, 0)}
              </div>
              <div className="text-xs text-green-600 mt-1">Total Replies</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-[#EDF0FB]">
            <div className="border-b border-[#EDF0FB] px-6 pt-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('recent')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === 'recent'
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-b-2 border-teal-500'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Recent Posts
                </button>
                <button
                  onClick={() => setActiveTab('reported')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === 'reported'
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-b-2 border-teal-500'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Reported Content
                  {reportedContent.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                      {reportedContent.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'recent' && (
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-teal-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-semibold text-text-primary">{post.author}</div>
                          <div className="text-xs text-text-secondary">{post.courseName}</div>
                        </div>
                        <div className="text-xs text-text-secondary">{post.timestamp}</div>
                      </div>
                      <p className="text-sm text-text-primary mb-3">{post.content}</p>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => console.log('View replies for post:', post.id)}
                          className="text-xs text-text-secondary hover:text-teal-600 flex items-center gap-1"
                        >
                          💬 {post.replies} replies
                        </button>
                        <button 
                          onClick={() => console.log('Like post:', post.id)}
                          className="text-xs text-text-secondary hover:text-teal-600 flex items-center gap-1"
                        >
                          ❤️ {post.likes} likes
                        </button>
                        <button 
                          onClick={() => console.log('Reply to post:', post.id)}
                          className="text-xs text-teal-600 hover:text-teal-700 font-medium ml-auto"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reported' && (
                <div className="space-y-4">
                  {reportedContent.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-3">✅</div>
                      <p className="text-sm text-text-secondary">No reported content at this time</p>
                    </div>
                  ) : (
                    reportedContent.map((item) => (
                      <div
                        key={item.id}
                        className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-semibold text-text-primary">{item.author}</div>
                            <div className="text-xs text-text-secondary">{item.courseName}</div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-lg ${
                              item.status === 'Pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-text-primary mb-3 italic">{item.content}</p>
                        <div className="text-xs text-text-secondary mb-3">
                          Reported by <span className="font-medium">{item.reportedBy}</span> • Reason:{' '}
                          <span className="font-medium">{item.reportReason}</span> • {item.timestamp}
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => console.log('Remove post:', item.id)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            Remove Post
                          </button>
                          <button 
                            onClick={() => console.log('Approve post:', item.id)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                          >
                            Approve Post
                          </button>
                          <button 
                            onClick={() => console.log('Escalate post to coach:', item.id)}
                            className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            Escalate to Coach
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Moderation Guidelines */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border-2 border-dashed border-cyan-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-xl flex-shrink-0">
                👥
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">Moderation Guidelines</h4>
                <ul className="space-y-1 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Monitor discussions in your assigned courses for off-topic or inappropriate content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Respond to student questions promptly to encourage engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Review reported content within 24 hours and take appropriate action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Escalate serious issues (harassment, threats, etc.) to your supervising coach immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Foster a positive learning environment by encouraging helpful discussions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Access Notice */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-lg flex-shrink-0">
                🔒
              </div>
              <div>
                <h5 className="text-xs font-bold text-text-primary mb-1">Limited Moderation Access</h5>
                <p className="text-xs text-text-secondary">
                  You can moderate posts in courses assigned to you. For platform-wide moderation or policy changes, contact your supervising coach or the community manager.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubCoachAppLayout>
  );
};

export default SubCoachCommunityPage;
