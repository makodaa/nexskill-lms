import React from 'react';

interface Section {
  key: string;
  label: string;
  icon: string;
}

interface CourseBuilderSidebarProps {
  activeSection: string;
  onChangeSection: (sectionKey: string) => void;
  courseTitle: string;
  courseStatus: 'draft' | 'published';
}

const sections: Section[] = [
  { key: 'settings', label: 'Overview & settings', icon: '⚙️' },
  { key: 'curriculum', label: 'Curriculum', icon: '📚' },
  { key: 'live-sessions', label: 'Live Sessions', icon: '📹' },
  { key: 'drip', label: 'Drip schedule', icon: '📅' },
  { key: 'pricing', label: 'Pricing', icon: '💰' },
  { key: 'publish', label: 'Publish', icon: '🚀' },
  { key: 'preview', label: 'Preview', icon: '👁️' },
];

const CourseBuilderSidebar: React.FC<CourseBuilderSidebarProps> = ({
  activeSection,
  onChangeSection,
  courseTitle,
  courseStatus,
}) => {
  const getStatusColor = (status: string) => {
    return status === 'published'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-dark-text-primary border-slate-200';
  };

  return (
    <div className="w-[280px] flex-shrink-0 bg-white dark:bg-dark-background-card rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 p-5 h-fit sticky top-8">
      {/* Course Summary */}
      <div className="mb-6 pb-5 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 dark:text-dark-text-primary mb-2 line-clamp-2">{courseTitle}</h3>
        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(courseStatus)}`}>
          {courseStatus.charAt(0).toUpperCase() + courseStatus.slice(1)}
        </span>
      </div>

      {/* Section Navigation */}
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => onChangeSection(section.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeSection === section.key
                ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-medium shadow-md'
                : 'text-slate-700 dark:text-dark-text-primary hover:bg-slate-100'
              }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span className="text-sm">{section.label}</span>
          </button>
        ))}
      </nav>

      {/* Help Box */}
      <div className="mt-6 p-4 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">💡</span>
          <p className="text-xs font-semibold text-slate-700">Need help?</p>
        </div>
        <p className="text-xs text-slate-600">
          Check out our course creation guide or contact support.
        </p>
      </div>
    </div>
  );
};

export default CourseBuilderSidebar;
