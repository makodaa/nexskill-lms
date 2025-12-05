import React, { useState } from 'react';
import ContentEditorLayout from '../../layouts/ContentEditorLayout';
import ContentReviewQueueTable from '../../components/content/ContentReviewQueueTable';

const ContentReviewQueuePage: React.FC = () => {
  const [filters, setFilters] = useState({
    course: 'all',
    type: 'all',
    priority: 'all',
  });

  const courses = ['JavaScript Mastery', 'UI/UX Design', 'Product Management', 'Data Analytics'];
  const types = ['Lesson', 'Resource', 'Quiz', 'Translation'];
  const priorities = ['High', 'Medium', 'Low'];

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
              onClick={() => console.log('Export queue')}
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
          <ContentReviewQueueTable />

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
    </ContentEditorLayout>
  );
};

export default ContentReviewQueuePage;
