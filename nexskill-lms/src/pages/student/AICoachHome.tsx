import React from 'react';
import StudentAppLayout from '../../layouts/StudentAppLayout';
import AIChatPanel from '../../components/ai/AIChatPanel';
import AIProgressRecommendations from '../../components/ai/AIProgressRecommendations';
import AIExplainSimplyCard from '../../components/ai/AIExplainSimplyCard';
import AIRevisionTasks from '../../components/ai/AIRevisionTasks';
import AIMilestoneNotifications from '../../components/ai/AIMilestoneNotifications';
import AIPersonalizedStudyPlan from '../../components/ai/AIPersonalizedStudyPlan';

// Mock student progress data
const studentProgress = {
  activeCourses: 3,
  completedLessons: 42,
  totalLessons: 120,
  weeklyHours: 8.5,
  streakDays: 5,
  upcomingDeadlines: 2,
  averageQuizScore: 82,
  currentCourse: 'UI Design Basics',
  completionPercentage: 35,
};

const AICoachHome: React.FC = () => {
  return (
    <StudentAppLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#E7F0FF] via-[#F9F0FF] to-[#E3F4FF] py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Student Coach</h1>
            <p className="text-slate-600">Personalized guidance based on your learning activity.</p>
          </div>

          {/* Top row: Chat panel + Recommendations/Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left: Chat panel (spans 2 columns) */}
            <div className="lg:col-span-2">
              <AIChatPanel />
            </div>

            {/* Right: Stacked recommendations and milestones */}
            <div className="space-y-6">
              <AIProgressRecommendations progress={studentProgress} />
              <AIMilestoneNotifications progress={studentProgress} />
            </div>
          </div>

          {/* Second row: Explain Simply + Revision Tasks + Study Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AIExplainSimplyCard />
            <AIRevisionTasks />
            <AIPersonalizedStudyPlan />
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default AICoachHome;
