import React from 'react';

interface GradingItem {
  id: string;
  studentName: string;
  courseName: string;
  lessonTitle: string;
  submittedAt: string;
  status: 'Submitted' | 'In Review' | 'Graded';
}

interface GradingQueueListProps {
  items: GradingItem[];
  onGrade?: (itemId: string) => void;
}

const GradingQueueList: React.FC<GradingQueueListProps> = ({ items, onGrade }) => {
  const getStatusColor = (status: GradingItem['status']) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'In Review':
        return 'bg-amber-100 text-amber-800';
      case 'Graded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sort by status priority (Submitted first)
  const sortedItems = [...items].sort((a, b) => {
    const priority = { Submitted: 0, 'In Review': 1, Graded: 2 };
    return priority[a.status] - priority[b.status];
  });

  return (
    <div className="space-y-3">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl p-5 border border-[#EDF0FB] hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h4 className="text-base font-semibold text-text-primary mb-1">
                {item.studentName}
              </h4>
              <p className="text-sm text-text-secondary">
                {item.courseName} • {item.lessonTitle}
              </p>
            </div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                item.status
              )}`}
            >
              {item.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span>📅</span>
              <span>Submitted {item.submittedAt}</span>
            </div>
            {item.status !== 'Graded' && (
              <button
                onClick={() => onGrade?.(item.id)}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
              >
                {item.status === 'In Review' ? 'Continue Grading' : 'Start Grading'}
              </button>
            )}
            {item.status === 'Graded' && (
              <button
                onClick={() => onGrade?.(item.id)}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                View Feedback
              </button>
            )}
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#EDF0FB]">
          <div className="text-4xl mb-3">✅</div>
          <p className="text-text-primary font-medium mb-1">All caught up!</p>
          <p className="text-sm text-text-muted">No assignments pending grading</p>
        </div>
      )}
    </div>
  );
};

export default GradingQueueList;
