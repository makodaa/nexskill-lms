import React, { useState } from 'react';
import ContentEditorLayout from '../../layouts/ContentEditorLayout';
import TranslationReviewList from '../../components/content/TranslationReviewList';

const TranslationReviewPage: React.FC = () => {
  const [filters, setFilters] = useState({
    language: 'all',
    status: 'all',
    course: 'all',
  });

  const languages = ['Filipino', 'Spanish', 'French', 'German', 'Mandarin'];
  const statuses = ['Pending', 'In Review', 'Approved', 'Rejected'];
  const courses = ['JavaScript Mastery', 'UI/UX Design', 'Product Management', 'Data Analytics'];

  return (
    <ContentEditorLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Translation Review</h1>
            <p className="text-sm text-text-secondary">
              Review and approve translations for course content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => console.log('Show translation stats')}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📊 Translation Stats
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
                <span className="text-sm text-text-muted">Pending Review</span>
                <span className="text-2xl">⏳</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">6</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">In Review</span>
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Approved</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">48</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Languages</span>
                <span className="text-2xl">🌐</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">5</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Filters:</span>
              </div>
              
              {/* Language Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Language:</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="all">All Languages</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-secondary">Status:</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
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

              {/* Clear Filters */}
              {(filters.language !== 'all' || filters.status !== 'all' || filters.course !== 'all') && (
                <button
                  onClick={() => setFilters({ language: 'all', status: 'all', course: 'all' })}
                  className="px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Translation Review List */}
          <TranslationReviewList />

          {/* Language Coverage */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Language Coverage</h3>
            <div className="space-y-4">
              {[
                { lang: 'Filipino', code: 'FIL', progress: 85, total: 120, completed: 102 },
                { lang: 'Spanish', code: 'ES', progress: 72, total: 120, completed: 86 },
                { lang: 'French', code: 'FR', progress: 45, total: 120, completed: 54 },
                { lang: 'German', code: 'DE', progress: 30, total: 120, completed: 36 },
                { lang: 'Mandarin', code: 'ZH', progress: 15, total: 120, completed: 18 },
              ].map((item) => (
                <div key={item.code}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-text-primary">{item.lang}</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-xs text-text-muted rounded">{item.code}</span>
                    </div>
                    <span className="text-sm text-text-secondary">
                      {item.completed} / {item.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Translation Guidelines */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📖
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Translation Guidelines</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Maintain the original tone and context of the content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Preserve technical terms and code snippets in their original form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Use culturally appropriate examples and references when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Flag any ambiguous content for coach clarification</span>
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

export default TranslationReviewPage;
