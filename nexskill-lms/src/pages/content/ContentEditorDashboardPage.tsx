import React from 'react';
import { Link } from 'react-router-dom';
import ContentEditorLayout from '../../layouts/ContentEditorLayout';
import ContentEditorKpiStrip from '../../components/content/ContentEditorKpiStrip';
import ContentReviewQueueTable from '../../components/content/ContentReviewQueueTable';

const ContentEditorDashboardPage: React.FC = () => {
  const recentlyUpdatedLessons = [
    { id: 1, title: 'Introduction to React Hooks', course: 'JavaScript Mastery', updatedAt: '2 hours ago' },
    { id: 2, title: 'Figma Design Template', course: 'UI/UX Design', updatedAt: '5 hours ago' },
    { id: 3, title: 'Product Management Overview', course: 'Product Management', updatedAt: '1 day ago' },
    { id: 4, title: 'Advanced SQL Queries', course: 'Data Analytics', updatedAt: '2 days ago' },
  ];

  return (
    <ContentEditorLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Content Editor Dashboard
            </h1>
            <p className="text-sm text-text-secondary">
              Monitor your review queue, resources, and translation workload
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/content/review-queue"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
            >
              📋 View Full Queue
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* KPI Strip */}
          <ContentEditorKpiStrip />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Review Queue Snapshot */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-text-primary">Review Queue Snapshot</h2>
                <Link
                  to="/content/review-queue"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  View All →
                </Link>
              </div>
              <ContentReviewQueueTable compact={true} limit={5} />
            </div>

            {/* Right: Recently Updated & Suggestions */}
            <div className="space-y-6">
              {/* Recently Updated Lessons */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-base font-bold text-text-primary mb-4">Recently Updated Lessons</h3>
                <div className="space-y-3">
                  {recentlyUpdatedLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="text-xl">📝</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{lesson.title}</p>
                        <p className="text-xs text-text-muted">{lesson.course} • {lesson.updatedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Suggestions */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">Open Suggestions</h3>
                    <p className="text-sm text-text-secondary">Awaiting response from coaches</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-amber-700">8</p>
                    <p className="text-xs text-text-muted">Pending review</p>
                  </div>
                  <Link
                    to="/content/suggestions"
                    className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:shadow-md transition-all text-sm font-semibold border border-amber-200"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                to="/content/courses"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📚
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Browse Courses</p>
                  <p className="text-xs text-text-muted">Edit content</p>
                </div>
              </Link>

              <Link
                to="/content/resources"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📁
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Resource Library</p>
                  <p className="text-xs text-text-muted">Manage files</p>
                </div>
              </Link>

              <Link
                to="/content/translations"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌐
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Translations</p>
                  <p className="text-xs text-text-muted">Review localization</p>
                </div>
              </Link>

              <Link
                to="/content/suggestions"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💡
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Suggestions</p>
                  <p className="text-xs text-text-muted">Track changes</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentEditorLayout>
  );
};

export default ContentEditorDashboardPage;
