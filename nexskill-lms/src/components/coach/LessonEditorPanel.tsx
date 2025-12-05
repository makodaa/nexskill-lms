import React from 'react';
import VideoUploadPanel from './VideoUploadPanel';
import ResourceUploadPanel from './ResourceUploadPanel';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'live';
  duration: string;
  summary: string;
  video?: { filename: string; duration: string };
  resources?: Array<{ name: string; type: string; size: string }>;
}

interface LessonEditorPanelProps {
  lesson: Lesson;
  onChange: (updatedLesson: Lesson) => void;
  onClose: () => void;
}

const LessonEditorPanel: React.FC<LessonEditorPanelProps> = ({ lesson, onChange, onClose }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...lesson, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-background-card rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-background-card border-b border-slate-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Edit lesson</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:text-dark-text-secondary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basics */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
              Lesson title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={lesson.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Lesson type
              </label>
              <select
                id="type"
                name="type"
                value={lesson.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="video">Video</option>
                <option value="pdf">PDF / Document</option>
                <option value="quiz">Quiz</option>
                <option value="live">Live session</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={lesson.duration}
                onChange={handleInputChange}
                placeholder="e.g., 15 min"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
              Summary / description
            </label>
            <textarea
              id="summary"
              name="summary"
              value={lesson.summary}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe what students will learn in this lesson"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* Conditional Content */}
          {lesson.type === 'video' && (
            <VideoUploadPanel
              currentVideo={lesson.video}
              onChange={(video: { filename: string; duration: string }) => onChange({ ...lesson, video })}
            />
          )}

          {lesson.type === 'pdf' && (
            <ResourceUploadPanel
              resources={lesson.resources || []}
              onChange={(resources: Array<{ name: string; type: string; size: string }>) => onChange({ ...lesson, resources })}
            />
          )}

          {lesson.type === 'quiz' && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-dark-text-primary mb-1">Configure quiz</p>
                  <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-3">
                    Use the Quiz Builder section to create and edit quiz questions for this lesson.
                  </p>
                  <button className="text-sm font-medium text-[#304DB5] hover:text-[#5E7BFF]">
                    Go to Quiz Builder →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-slate-700 dark:text-dark-text-primary font-medium rounded-full border-2 border-slate-300 dark:border-gray-600 hover:bg-white dark:bg-dark-background-card transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Save lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonEditorPanel;
