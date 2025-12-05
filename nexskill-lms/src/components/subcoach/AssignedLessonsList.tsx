import React from 'react';

interface Lesson {
  id: string;
  courseName: string;
  moduleName: string;
  lessonTitle: string;
  type: 'Video' | 'PDF' | 'Quiz' | 'Assignment';
  status: 'Draft' | 'Published' | 'Needs Review';
}

interface AssignedLessonsListProps {
  lessons: Lesson[];
  onLessonClick?: (lessonId: string) => void;
}

const AssignedLessonsList: React.FC<AssignedLessonsListProps> = ({
  lessons,
  onLessonClick,
}) => {
  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'Video':
        return '🎥';
      case 'PDF':
        return '📄';
      case 'Quiz':
        return '📝';
      case 'Assignment':
        return '✍️';
      default:
        return '📚';
    }
  };

  const getStatusColor = (status: Lesson['status']) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Needs Review':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white rounded-xl p-5 border border-[#EDF0FB] hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl flex-shrink-0">
              {getTypeIcon(lesson.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-text-primary mb-1">
                    {lesson.lessonTitle}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {lesson.courseName} • {lesson.moduleName}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    lesson.status
                  )}`}
                >
                  {lesson.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                  {getTypeIcon(lesson.type)}
                  {lesson.type}
                </span>
                <button
                  onClick={() => onLessonClick?.(lesson.id)}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
          
          {/* Limited access note */}
          <div className="mt-4 pt-4 border-t border-[#EDF0FB]">
            <p className="text-xs text-text-muted italic">
              📌 Limited access: View-only. Contact supervising coach to modify content.
            </p>
          </div>
        </div>
      ))}

      {lessons.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#EDF0FB]">
          <p className="text-text-muted">No lessons assigned yet</p>
        </div>
      )}
    </div>
  );
};

export default AssignedLessonsList;
