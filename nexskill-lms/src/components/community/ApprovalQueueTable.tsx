import React, { useState } from 'react';

interface Post {
  id: number;
  excerpt: string;
  author: string;
  community: string;
  reason: string;
  submittedAt: string;
  type: 'Question' | 'Announcement' | 'Media' | 'Discussion';
  fullContent?: string;
}

interface ApprovalQueueTableProps {
  limit?: number;
}

const ApprovalQueueTable: React.FC<ApprovalQueueTableProps> = ({ limit }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Post[] = [
    { id: 1, excerpt: 'How do I implement useState with TypeScript?', author: 'John Smith', community: 'JavaScript Mastery', reason: 'Pending approval', submittedAt: '2 hours ago', type: 'Question', fullContent: 'I am trying to use useState in TypeScript but getting type errors. Can someone help me understand how to properly type my state?' },
    { id: 2, excerpt: 'Check out my latest design portfolio!', author: 'Emma Wilson', community: 'UI/UX Design', reason: 'Reported for spam', submittedAt: '4 hours ago', type: 'Media', fullContent: 'Here is my portfolio with 10+ case studies. Available for freelance work!' },
    { id: 3, excerpt: 'Upcoming webinar on Product Strategy', author: 'Mike Johnson', community: 'Product Management', reason: 'Pending approval', submittedAt: '6 hours ago', type: 'Announcement', fullContent: 'Join us next week for a deep dive into product strategy frameworks used by top companies.' },
    { id: 4, excerpt: 'SQL query optimization tips?', author: 'Sarah Davis', community: 'Data Analytics', reason: 'Pending approval', submittedAt: '8 hours ago', type: 'Question', fullContent: 'What are the best practices for optimizing complex SQL queries with multiple joins?' },
    { id: 5, excerpt: 'Inappropriate language in post', author: 'Alex Brown', community: 'General Discussion', reason: 'Reported for language', submittedAt: '10 hours ago', type: 'Discussion', fullContent: 'This is the reported content that contains inappropriate language.' },
    { id: 6, excerpt: 'Python decorator patterns explained', author: 'Lisa Chen', community: 'Python Fundamentals', reason: 'Pending approval', submittedAt: '12 hours ago', type: 'Discussion', fullContent: 'A comprehensive guide to understanding and using Python decorators effectively.' },
    { id: 7, excerpt: 'Buy my course at discount!', author: 'Spam User', community: 'Career Prep', reason: 'Reported for spam', submittedAt: '1 day ago', type: 'Media', fullContent: 'Limited time offer! Buy my course now with 90% discount. Link in bio.' },
    { id: 8, excerpt: 'React vs Vue - Which to learn?', author: 'Tom White', community: 'JavaScript Mastery', reason: 'Pending approval', submittedAt: '1 day ago', type: 'Question', fullContent: 'I am new to frontend development. Should I start with React or Vue? What are the pros and cons?' },
  ];

  const displayPosts = limit ? posts.slice(0, limit) : posts;

  const handleAction = (postId: number, action: 'approve' | 'reject' | 'hide') => {
    console.log(`${action} post:`, postId);
    setSelectedPost(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Question': return 'bg-blue-100 text-blue-700';
      case 'Announcement': return 'bg-purple-100 text-purple-700';
      case 'Media': return 'bg-orange-100 text-orange-700';
      case 'Discussion': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReasonColor = (reason: string) => {
    if (reason.includes('spam')) return 'text-red-600';
    if (reason.includes('language')) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Post</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Community</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-left flex-1"
                      >
                        <p className="text-sm font-medium text-text-primary hover:text-green-600 transition-colors line-clamp-2">
                          {post.excerpt}
                        </p>
                        <span className={`inline-flex mt-1 px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(post.type)}`}>
                          {post.type}
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{post.author}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{post.community}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getReasonColor(post.reason)}`}>
                      {post.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-muted">{post.submittedAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction(post.id, 'approve')}
                        className="text-xs px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(post.id, 'reject')}
                        className="text-xs px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction(post.id, 'hide')}
                        className="text-xs px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Hide
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2">Post Details</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(selectedPost.type)}`}>
                      {selectedPost.type}
                    </span>
                    <span className="text-sm text-text-muted">by {selectedPost.author}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-2xl text-text-muted hover:text-text-primary transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-text-secondary mb-1">Community:</p>
                  <p className="text-sm text-text-primary">{selectedPost.community}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-text-secondary mb-1">Reason for Review:</p>
                  <p className={`text-sm font-medium ${getReasonColor(selectedPost.reason)}`}>
                    {selectedPost.reason}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-text-secondary mb-1">Full Content:</p>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-text-primary whitespace-pre-wrap">
                      {selectedPost.fullContent || selectedPost.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleAction(selectedPost.id, 'hide')}
                    className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all text-sm font-medium"
                  >
                    Hide
                  </button>
                  <button
                    onClick={() => handleAction(selectedPost.id, 'reject')}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all text-sm font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedPost.id, 'approve')}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all text-sm font-medium"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApprovalQueueTable;
