import React from 'react';

interface MarkLessonCompleteModalProps {
  isOpen: boolean;
  lessonTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const MarkLessonCompleteModal: React.FC<MarkLessonCompleteModalProps> = ({
  isOpen,
  lessonTitle,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        {/* Dialog */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary text-center mb-2">
            Mark lesson complete?
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary text-center mb-6">
            We'll update your course progress and unlock the next lesson.
          </p>

          {/* Lesson Title */}
          <div className="bg-[#F5F7FF] rounded-2xl p-4 mb-6">
            <p className="text-xs text-text-muted mb-1">Lesson:</p>
            <p className="text-sm font-medium text-text-primary">{lessonTitle}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-text-secondary font-medium rounded-full hover:bg-[#F5F7FF] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-medium rounded-full shadow-button-primary hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Yes, mark complete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkLessonCompleteModal;
