import React from 'react';

interface Progress {
  activeCourses: number;
  completedLessons: number;
  totalLessons: number;
  weeklyHours: number;
  streakDays: number;
  upcomingDeadlines: number;
  averageQuizScore: number;
  currentCourse: string;
  completionPercentage: number;
}

interface AIProgressRecommendationsProps {
  progress: Progress;
}

const AIProgressRecommendations: React.FC<AIProgressRecommendationsProps> = ({ progress }) => {
  const recommendations = [
    {
      id: 1,
      text: `Finish 2 more lessons in '${progress.currentCourse}' to complete this week's target.`,
      tag: 'Today',
      tagColor: 'bg-blue-100 text-blue-700',
      icon: '💡',
    },
    {
      id: 2,
      text: `You're most active on Wednesdays. Schedule a 30-minute block today for maximum retention.`,
      tag: 'This week',
      tagColor: 'bg-purple-100 text-purple-700',
      icon: '📅',
    },
    {
      id: 3,
      text: `Your quiz scores (${progress.averageQuizScore}% avg) are excellent! Consider moving to intermediate level content.`,
      tag: 'Stretch goal',
      tagColor: 'bg-green-100 text-green-700',
      icon: '🎯',
    },
    {
      id: 4,
      text: `You have ${progress.upcomingDeadlines} upcoming deadlines. Prioritize 'JavaScript Fundamentals Quiz 3' for tomorrow.`,
      tag: 'Urgent',
      tagColor: 'bg-orange-100 text-orange-700',
      icon: '⚡',
    },
    {
      id: 5,
      text: `Your ${progress.streakDays}-day streak is impressive! Keep it going by completing at least one lesson today.`,
      tag: 'Motivation',
      tagColor: 'bg-pink-100 text-pink-700',
      icon: '🔥',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Progress recommendations</h3>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Recommendations list */}
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex-shrink-0 text-2xl">{rec.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 leading-relaxed mb-2">{rec.text}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${rec.tagColor}`}>
                {rec.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProgressRecommendations;
