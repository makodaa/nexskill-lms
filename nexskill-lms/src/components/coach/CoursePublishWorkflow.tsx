import React from 'react';

interface CheckItem {
  id: string;
  label: string;
  completed: boolean;
}

interface CoursePublishWorkflowProps {
  courseStatus: 'draft' | 'published';
  onPublish: () => void;
  onUnpublish: () => void;
}

const CoursePublishWorkflow: React.FC<CoursePublishWorkflowProps> = ({
  courseStatus,
  onPublish,
  onUnpublish,
}) => {
  // Simulated readiness checks
  const checks: CheckItem[] = [
    { id: '1', label: 'Course title and description added', completed: true },
    { id: '2', label: 'At least one module with lessons created', completed: true },
    { id: '3', label: 'Pricing configured', completed: true },
    { id: '4', label: 'At least one video uploaded', completed: false },
  ];

  const allComplete = checks.every((c) => c.completed);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Publish course</h2>
      <p className="text-slate-600 mb-6">
        Review the checklist and publish your course to make it available to students.
      </p>

      {/* Status indicator */}
      <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {courseStatus === 'published' ? '✅' : courseStatus === 'draft' ? '📝' : '📦'}
          </span>
          <div>
            <p className="font-semibold text-slate-900">Current status</p>
            <p className="text-sm text-slate-600 capitalize">{courseStatus}</p>
          </div>
        </div>
      </div>

      {/* Readiness checklist */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-4">Readiness checklist</h3>
        <div className="space-y-3">
          {checks.map((check) => (
            <div
              key={check.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                check.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  check.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}
              >
                {check.completed ? '✓' : '○'}
              </div>
              <p className={`flex-1 ${check.completed ? 'text-slate-900' : 'text-slate-600'}`}>
                {check.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Warning if not ready */}
      {!allComplete && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-slate-900 mb-1">Not ready to publish</p>
              <p className="text-sm text-slate-600">
                Complete all checklist items before publishing your course.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Publish/Unpublish actions */}
      {courseStatus === 'draft' ? (
        <button
          onClick={onPublish}
          disabled={!allComplete}
          className={`w-full py-4 px-6 font-semibold rounded-full transition-all ${
            allComplete
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {allComplete ? '🚀 Publish course' : 'Complete checklist to publish'}
        </button>
      ) : courseStatus === 'published' ? (
        <div className="space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Course is live!</p>
                <p className="text-sm text-slate-600">
                  Your course is now visible to students. You can continue editing while published.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onUnpublish}
            className="w-full py-4 px-6 bg-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-300 transition-all"
          >
            Unpublish course
          </button>
        </div>
      ) : (
        <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl text-center">
          <p className="text-slate-600">This course is archived.</p>
        </div>
      )}
    </div>
  );
};

export default CoursePublishWorkflow;
