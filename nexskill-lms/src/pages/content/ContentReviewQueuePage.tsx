import React, { useState } from 'react';
import ContentEditorLayout from '../../layouts/ContentEditorLayout';
import ContentReviewQueueTable from '../../components/content/ContentReviewQueueTable';

const ContentReviewQueuePage: React.FC = () => {
  const [filters, setFilters] = useState({
    course: 'all',
    type: 'all',
    priority: 'all',
  });

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [reviewNote, setReviewNote] = useState('');

  const courses = ['JavaScript Mastery', 'UI/UX Design', 'Product Management', 'Data Analytics'];
  const types = ['Lesson', 'Resource', 'Quiz', 'Translation'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleReviewItem = (item: any) => {
    setSelectedItem(item);
    setShowReviewModal(true);
  };

  const handleApprove = () => {
    console.log('Approving item:', selectedItem, 'Note:', reviewNote);
    alert('Content approved successfully!');
    setShowReviewModal(false);
    setReviewNote('');
  };

  const handleRequestChanges = () => {
    console.log('Requesting changes for:', selectedItem, 'Note:', reviewNote);
    alert('Change request sent to coach!');
    setShowReviewModal(false);
    setReviewNote('');
  };

  const handleExportQueue = () => {
    console.log('Exporting review queue...');
    alert('Queue exported successfully!');
  };

  return (
    <ContentEditorLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Content Review Queue</h1>
            <p className="text-sm text-text-secondary">
              Review and edit content items submitted by coaches
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportQueue}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📥 Export Queue
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
                <span className="text-sm text-text-muted">Total Items</span>
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">12</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">High Priority</span>
                <span className="text-2xl">🔴</span>
              </div>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">In Progress</span>
                <span className="text-2xl">⏳</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Completed Today</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Filters:</span>
              </div>
              
              {/* Course Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Course:</label>
                <select
                  value={filters.course}
                  onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="all">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Type:</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="all">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Priority:</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="all">All Priorities</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.course !== 'all' || filters.type !== 'all' || filters.priority !== 'all') && (
                <button
                  onClick={() => setFilters({ course: 'all', type: 'all', priority: 'all' })}
                  className="px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Review Queue Table */}
          <ContentReviewQueueTable onReviewItem={handleReviewItem} />

          {/* Help Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Review Queue Tips</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Click on any row to open the review panel and edit content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Prioritize high-priority items to meet content deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Save draft edits frequently - changes are not published until coach approval</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Content</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Item Details */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Content Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Course:</span>
                    <p className="font-semibold text-gray-900">JavaScript Mastery</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="font-semibold text-gray-900">Lesson</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Submitted by:</span>
                    <p className="font-semibold text-gray-900">John Doe (Coach)</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Priority:</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">High</span>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Content Preview</h4>
                <p className="text-sm text-gray-700">
                  This lesson covers advanced JavaScript concepts including closures, promises, and async/await patterns...
                </p>
              </div>

              {/* Review Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes
                </label>
                <textarea
                  rows={4}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Add notes about your review (optional for approval, required for change requests)..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRequestChanges}
                  className="px-4 py-3 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all"
                >
                  🔄 Request Changes
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  ✅ Approve Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContentEditorLayout>
  );
};

export default ContentReviewQueuePage;
