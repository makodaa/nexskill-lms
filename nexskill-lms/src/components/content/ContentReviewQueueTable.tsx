import React, { useState } from 'react';

interface ReviewItem {
  id: number;
  type: 'Lesson' | 'Resource' | 'Quiz' | 'Translation';
  title: string;
  course: string;
  module: string;
  requestedBy: string;
  submittedAt: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

interface ContentReviewQueueTableProps {
  compact?: boolean;
  limit?: number;
}

const ContentReviewQueueTable: React.FC<ContentReviewQueueTableProps> = ({ compact = false, limit }) => {
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  
  const allItems: ReviewItem[] = [
    {
      id: 1,
      type: 'Lesson',
      title: 'Introduction to React Hooks',
      course: 'JavaScript Mastery',
      module: 'Module 3: Advanced React',
      requestedBy: 'Coach Sarah',
      submittedAt: '2 hours ago',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Resource',
      title: 'Figma Design Template',
      course: 'UI/UX Design',
      module: 'Module 1: Design Tools',
      requestedBy: 'Coach Michael',
      submittedAt: '5 hours ago',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: 3,
      type: 'Translation',
      title: 'Product Management Overview',
      course: 'Product Management',
      module: 'Module 1: Fundamentals',
      requestedBy: 'Sub-Coach Emily',
      submittedAt: '1 day ago',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 4,
      type: 'Quiz',
      title: 'Python Basics Assessment',
      course: 'Data Analytics',
      module: 'Module 2: Python',
      requestedBy: 'Coach David',
      submittedAt: '2 days ago',
      priority: 'Low',
      status: 'Pending'
    },
    {
      id: 5,
      type: 'Lesson',
      title: 'Advanced SQL Queries',
      course: 'Data Analytics',
      module: 'Module 4: Databases',
      requestedBy: 'Coach Sarah',
      submittedAt: '3 days ago',
      priority: 'Medium',
      status: 'Completed'
    },
  ];

  const items = limit ? allItems.slice(0, limit) : allItems;

  const getPriorityBadge = (priority: string) => {
    const styles = {
      High: 'bg-red-100 text-red-700',
      Medium: 'bg-yellow-100 text-yellow-700',
      Low: 'bg-green-100 text-green-700'
    };
    return styles[priority as keyof typeof styles];
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700'
    };
    return styles[status as keyof typeof styles];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      Lesson: '📝',
      Resource: '📁',
      Quiz: '❓',
      Translation: '🌐'
    };
    return icons[type as keyof typeof icons];
  };

  const handleRowClick = (item: ReviewItem) => {
    if (!compact) {
      setSelectedItem(item);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Title
                </th>
                {!compact && (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Course / Module
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Requested By
                    </th>
                  </>
                )}
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className={`hover:bg-gray-50 transition-colors ${!compact ? 'cursor-pointer' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(item.type)}</span>
                      <span className="text-sm font-medium text-text-primary">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-primary">{item.title}</span>
                  </td>
                  {!compact && (
                    <>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{item.course}</p>
                          <p className="text-xs text-text-muted">{item.module}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-secondary">{item.requestedBy}</span>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Review Details</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Type</label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(selectedItem.type)}</span>
                  <span className="text-lg font-semibold">{selectedItem.type}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
                <input
                  type="text"
                  defaultValue={selectedItem.title}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Content / Description</label>
                <textarea
                  rows={6}
                  defaultValue="This is dummy content for the lesson. In a real scenario, this would contain the actual lesson text that needs to be reviewed and edited."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Editor Notes</label>
                <textarea
                  rows={3}
                  placeholder="Add your review notes here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Save draft edits for:', selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Save Draft Edits
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentReviewQueueTable;
