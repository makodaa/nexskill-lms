import React from 'react';
import CoachAppLayout from '../../layouts/CoachAppLayout';
import { roleCapabilities, roleDescriptions } from '../../types/roles';

/**
 * SubCoach Dashboard Placeholder
 * Landing page for SUB_COACH role - assistant instructors
 */
const SubCoachDashboardPlaceholder: React.FC = () => {
  return (
    <CoachAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              Sub-Coach Dashboard 🎓
            </h1>
            <p className="text-sm text-text-secondary">
              Supporting main coaches in course delivery
            </p>
          </div>
          <div className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full">
            <span className="text-xs font-medium">Assistant Instructor</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Role Description Card */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 border border-teal-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🎓
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">About Your Role</h3>
                <p className="text-text-secondary leading-relaxed">
                  {roleDescriptions.SUB_COACH}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-base font-semibold text-text-primary mb-4">Your Capabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleCapabilities.SUB_COACH.map((capability: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-teal-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-text-secondary">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Course Support
              </h3>
              <p className="text-sm text-text-secondary">
                Assist main coaches with course delivery and student support
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Student Engagement
              </h3>
              <p className="text-sm text-text-secondary">
                Help students with questions and facilitate learning activities
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">✏️</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                Content Review
              </h3>
              <p className="text-sm text-text-secondary">
                Review and provide feedback on course materials and assignments
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 text-white text-center">
            <p className="text-lg font-semibold mb-2">🚧 Dashboard Under Development</p>
            <p className="text-sm opacity-90">
              This is a placeholder page. Full sub-coach features will be available soon.
            </p>
          </div>
        </div>
      </div>
    </CoachAppLayout>
  );
};

export default SubCoachDashboardPlaceholder;
