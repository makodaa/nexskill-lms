import React, { useState } from 'react';

interface CoursePreviewPaneProps {
  courseTitle: string;
  courseSubtitle: string;
  courseDescription: string;
  instructorName: string;
}

const CoursePreviewPane: React.FC<CoursePreviewPaneProps> = ({
  courseTitle,
  courseSubtitle,
  courseDescription,
  instructorName,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Preview</h2>
          <p className="text-slate-600">See how students will view your course</p>
        </div>

        {/* View mode toggle */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'desktop'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🖥️ Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'mobile'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📱 Mobile
          </button>
        </div>
      </div>

      {/* Preview frame */}
      <div
        className={`mx-auto transition-all duration-300 ${
          viewMode === 'desktop' ? 'max-w-full' : 'max-w-md'
        }`}
      >
        <div className="bg-slate-100 rounded-2xl p-6 shadow-inner">
          {/* Simulated course landing page */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Hero section */}
            <div className="h-48 bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center">
              <div className="text-6xl">🎓</div>
            </div>

            <div className="p-6 space-y-4">
              <h1 className="text-2xl font-bold text-slate-900">{courseTitle || 'Course Title'}</h1>
              <p className="text-slate-700">{courseSubtitle || 'Course subtitle'}</p>

              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>4.8 (126 reviews)</span>
                </div>
                <div>👥 1,234 students</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center font-bold text-slate-700">
                  {instructorName?.charAt(0).toUpperCase() || 'I'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{instructorName || 'Instructor Name'}</p>
                  <p className="text-xs text-slate-600">Course instructor</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">About this course</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {courseDescription || 'Course description will appear here'}
                </p>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full">
                Enroll now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl">👁️</span>
          <div>
            <p className="font-semibold text-slate-900 mb-1">Preview mode</p>
            <p className="text-sm text-slate-600">
              This is a simplified preview. The actual course page will include curriculum details, reviews, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPane;
