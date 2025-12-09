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
  content?: string;
  editorNotes?: string;
}

interface ContentReviewQueueTableProps {
  compact?: boolean;
  limit?: number;
  onReviewItem?: (item: ReviewItem) => void;
}

const ContentReviewQueueTable: React.FC<ContentReviewQueueTableProps> = ({ compact = false, limit, onReviewItem }) => {
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [editorNotes, setEditorNotes] = useState('');
  const [items, setItems] = useState<ReviewItem[]>([
    {
      id: 1,
      type: 'Lesson',
      title: 'Introduction to React Hooks',
      course: 'JavaScript Mastery',
      module: 'Module 3: Advanced React',
      requestedBy: 'Coach Sarah',
      submittedAt: '2 hours ago',
      priority: 'High',
      status: 'Pending',
      content: 'React Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. This lesson covers useState for managing component state and useEffect for handling side effects like data fetching, subscriptions, or manually changing the DOM.'
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
      status: 'In Progress',
      content: 'A comprehensive Figma template that includes pre-built components, design tokens, and layout grids. Students can use this as a starting point for their design projects.'
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
      status: 'Pending',
      content: 'This module introduces the core concepts of product management including product lifecycle, stakeholder management, and roadmap planning. Translation needed for Spanish localization.'
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
      status: 'Pending',
      content: 'A 20-question quiz covering Python fundamentals including variables, data types, loops, and functions. Review questions for accuracy and clarity.'
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
      status: 'Completed',
      content: 'Learn advanced SQL concepts including JOINs, subqueries, CTEs, and window functions. This lesson includes practical examples with real-world datasets.',
      editorNotes: 'All content reviewed and approved. Minor typos fixed.'
    },
  ]);

  const displayItems = limit ? items.slice(0, limit) : items;

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
      if (onReviewItem) {
        onReviewItem(item);
      } else {
        setSelectedItem(item);
        setEditedContent(item.content || '');
        setEditorNotes(item.editorNotes || '');
      }
    }
  };

  const handleSaveDraft = () => {
    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { ...item, content: editedContent, editorNotes, status: 'In Progress' as const, submittedAt: 'Just now' }
          : item
      ));
      setSelectedItem(null);
    }
  };

  const handleMarkComplete = () => {
    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { ...item, content: editedContent, editorNotes, status: 'Completed' as const, submittedAt: 'Just now' }
          : item
      ));
      setSelectedItem(null);
    }
  };

  const handleStartReview = (item: ReviewItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(items.map(i => 
      i.id === item.id 
        ? { ...i, status: 'In Progress' as const }
        : i
    ));
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
                {!compact && (
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayItems.map((item) => (
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
                  {!compact && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'Pending' && (
                          <button
                            onClick={(e) => handleStartReview(item, e)}
                            className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Start Review
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(item);
                          }}
                          className="px-3 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          {item.status === 'Completed' ? 'View' : 'Edit'}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getTypeIcon(selectedItem.type)}</span>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{selectedItem.title}</h2>
                  <p className="text-sm text-text-muted">{selectedItem.course} • {selectedItem.module}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Meta Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Priority</span>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(selectedItem.priority)}`}>
                      {selectedItem.priority}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Status</span>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Requested By</span>
                  <p className="font-semibold text-text-primary mt-1">{selectedItem.requestedBy}</p>
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Content / Description
                  {selectedItem.status === 'Completed' && (
                    <span className="ml-2 text-xs text-green-600 font-normal">(Read-only - Already reviewed)</span>
                  )}
                </label>
                <textarea
                  rows={8}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  disabled={selectedItem.status === 'Completed'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-50 disabled:text-text-muted font-mono text-sm"
                  placeholder="Content to review..."
                />
              </div>

              {/* Editor Notes */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Editor Notes
                  <span className="ml-2 text-xs text-text-muted font-normal">(Your review comments)</span>
                </label>
                <textarea
                  rows={3}
                  value={editorNotes}
                  onChange={(e) => setEditorNotes(e.target.value)}
                  disabled={selectedItem.status === 'Completed'}
                  placeholder="Add your review notes, suggestions, or feedback here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-50 disabled:text-text-muted"
                />
              </div>

              {/* Quick Fixes */}
              {selectedItem.status !== 'Completed' && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <label className="block text-sm font-semibold text-blue-800 mb-3">Quick Fixes</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setEditedContent(editedContent.replace(/  +/g, ' '))}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      Remove Extra Spaces
                    </button>
                    <button
                      onClick={() => setEditedContent(editedContent.trim())}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      Trim Whitespace
                    </button>
                    <button
                      onClick={() => setEditedContent(editedContent.charAt(0).toUpperCase() + editedContent.slice(1))}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      Capitalize First Letter
                    </button>
                    <button
                      onClick={() => {
                        const wordCount = editedContent.split(/\s+/).filter(Boolean).length;
                        const charCount = editedContent.length;
                        alert(`Word Count: ${wordCount}\nCharacter Count: ${charCount}`);
                      }}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      📊 Word Count
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-3 border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Close
                </button>
                {selectedItem.status !== 'Completed' && (
                  <>
                    <button
                      onClick={handleSaveDraft}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      💾 Save Draft
                    </button>
                    <button
                      onClick={handleMarkComplete}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      ✅ Mark Complete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentReviewQueueTable;
