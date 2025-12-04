import React, { useState } from 'react';

const AIPersonalizedStudyPlan: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());

  const studyPlan = [
    {
      day: 'Today',
      dayId: 'day1',
      tasks: [
        'Watch 2 lessons from UI Design Basics (30 min)',
        'Complete JavaScript quiz 2 (15 min)',
        'Review notes for 10 minutes',
      ],
    },
    {
      day: 'Tomorrow',
      dayId: 'day2',
      tasks: [
        'Practice Figma prototyping exercises (25 min)',
        'Read React documentation chapter 3 (20 min)',
        'Do 5 coding challenges (15 min)',
      ],
    },
    {
      day: 'Day 3',
      dayId: 'day3',
      tasks: [
        'Watch advanced CSS Grid lesson (20 min)',
        'Build mini-project: Landing page (45 min)',
        'Join live study session at 7 PM',
      ],
    },
  ];

  const handleMarkDayDone = (dayId: string) => {
    setCompletedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayId)) {
        newSet.delete(dayId);
      } else {
        newSet.add(dayId);
      }
      return newSet;
    });
  };

  const handleAdjustPlan = () => {
    console.log('Adjust plan clicked');
    alert('Plan adjustment feature coming soon! This would allow you to customize your learning schedule.');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Personalized study plan</h3>
        <p className="text-sm text-slate-600">Based on your goals and recent activity</p>
      </div>

      {/* Plan overview */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">3-Day Micro-Plan</p>
            <p className="text-xs text-slate-600">~2 hours per day</p>
          </div>
          <div className="text-2xl">📚</div>
        </div>
      </div>

      {/* Daily plan sections */}
      <div className="space-y-4 mb-4">
        {studyPlan.map((dayPlan) => {
          const isCompleted = completedDays.has(dayPlan.dayId);
          return (
            <div
              key={dayPlan.dayId}
              className={`p-4 rounded-xl border-2 transition-all ${
                isCompleted
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className={`font-semibold ${isCompleted ? 'text-green-700' : 'text-slate-900'}`}>
                    {dayPlan.day}
                  </h4>
                  {isCompleted && (
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {dayPlan.dayId === 'day1' && !isCompleted && (
                  <button
                    onClick={() => handleMarkDayDone(dayPlan.dayId)}
                    className="text-xs font-medium text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                  >
                    Mark as done
                  </button>
                )}
              </div>
              <ul className="space-y-2">
                {dayPlan.tasks.map((task, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className={`mt-1 ${isCompleted ? 'text-green-600' : 'text-[#304DB5]'}`}>•</span>
                    <span className={isCompleted ? 'text-green-700' : 'text-slate-700'}>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={handleAdjustPlan}
          className="flex-1 py-2.5 rounded-full font-medium text-slate-700 border-2 border-slate-300 hover:bg-slate-50 transition-all"
        >
          Adjust plan
        </button>
        <button
          onClick={() => handleMarkDayDone('day1')}
          className="flex-1 py-2.5 rounded-full font-medium bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg transition-all"
        >
          {completedDays.has('day1') ? 'Undo today' : 'Mark today done'}
        </button>
      </div>
    </div>
  );
};

export default AIPersonalizedStudyPlan;
