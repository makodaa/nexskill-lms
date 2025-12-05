import React, { useState } from 'react';

interface Learner {
  id: number;
  name: string;
  email: string;
  assignedCoach: string;
  coursesEnrolled: number;
  progress: number;
  lastActive: string;
  avatar: string;
}

const OrgLearnersTable: React.FC = () => {
  const [learners] = useState<Learner[]>([
    {
      id: 1,
      name: 'Alex Martinez',
      email: 'alex.m@acme.com',
      assignedCoach: 'Michael Chen',
      coursesEnrolled: 3,
      progress: 87,
      lastActive: '2 hours ago',
      avatar: 'AM'
    },
    {
      id: 2,
      name: 'Jessica Park',
      email: 'j.park@acme.com',
      assignedCoach: 'Sarah Johnson',
      coursesEnrolled: 2,
      progress: 65,
      lastActive: '1 day ago',
      avatar: 'JP'
    },
    {
      id: 3,
      name: 'Robert Williams',
      email: 'r.williams@acme.com',
      assignedCoach: 'Emily Rodriguez',
      coursesEnrolled: 4,
      progress: 92,
      lastActive: '3 hours ago',
      avatar: 'RW'
    },
    {
      id: 4,
      name: 'Amanda Foster',
      email: 'a.foster@acme.com',
      assignedCoach: 'Michael Chen',
      coursesEnrolled: 1,
      progress: 34,
      lastActive: '5 days ago',
      avatar: 'AF'
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'j.wilson@acme.com',
      assignedCoach: 'Sarah Johnson',
      coursesEnrolled: 3,
      progress: 78,
      lastActive: '12 hours ago',
      avatar: 'JW'
    },
    {
      id: 6,
      name: 'Maria Garcia',
      email: 'm.garcia@acme.com',
      assignedCoach: 'Emily Rodriguez',
      coursesEnrolled: 2,
      progress: 56,
      lastActive: '2 days ago',
      avatar: 'MG'
    },
  ]);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-700 bg-green-100';
    if (progress >= 50) return 'text-blue-700 bg-blue-100';
    return 'text-orange-700 bg-orange-100';
  };

  const handleRowClick = (learner: Learner) => {
    console.log('Learner clicked:', learner);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Learner
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Assigned Coach
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Last Active
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {learners.map((learner) => (
              <tr
                key={learner.id}
                onClick={() => handleRowClick(learner)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm">
                      {learner.avatar}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{learner.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{learner.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-primary">{learner.assignedCoach}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">{learner.coursesEnrolled}</span>
                    <span className="text-xs text-text-muted">enrolled</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[100px]">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                          style={{ width: `${learner.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getProgressColor(learner.progress)}`}>
                      {learner.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{learner.lastActive}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrgLearnersTable;
