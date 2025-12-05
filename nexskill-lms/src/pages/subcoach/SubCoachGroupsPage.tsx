import React, { useState } from 'react';
import SubCoachAppLayout from '../../layouts/SubCoachAppLayout';
import GroupSessionsList from '../../components/subcoach/GroupSessionsList';

const SubCoachGroupsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy sessions data
  const allSessions = [
    {
      id: '1',
      title: 'Q&A Session - UI Principles',
      courseName: 'UI Design Fundamentals',
      dateTime: 'Today, 3:00 PM',
      registeredStudents: 12,
      maxCapacity: 20,
      status: 'Upcoming' as const,
    },
    {
      id: '2',
      title: 'JavaScript Workshop',
      courseName: 'JavaScript Mastery',
      dateTime: 'Tomorrow, 10:00 AM',
      registeredStudents: 8,
      maxCapacity: 15,
      status: 'Upcoming' as const,
    },
    {
      id: '3',
      title: 'Product Strategy Discussion',
      courseName: 'Product Management',
      dateTime: 'Jan 25, 2:00 PM',
      registeredStudents: 6,
      maxCapacity: 10,
      status: 'Upcoming' as const,
    },
    {
      id: '4',
      title: 'Design Critique Session',
      courseName: 'UI Design Fundamentals',
      dateTime: 'Jan 20, 3:00 PM',
      registeredStudents: 15,
      maxCapacity: 20,
      status: 'Completed' as const,
    },
    {
      id: '5',
      title: 'Async JavaScript Deep Dive',
      courseName: 'JavaScript Mastery',
      dateTime: 'Jan 18, 11:00 AM',
      registeredStudents: 10,
      maxCapacity: 15,
      status: 'Completed' as const,
    },
    {
      id: '6',
      title: 'Office Hours',
      courseName: 'UI Design Fundamentals',
      dateTime: 'Jan 15, 4:00 PM',
      registeredStudents: 8,
      maxCapacity: 10,
      status: 'Cancelled' as const,
    },
  ];

  // Filter sessions
  const filteredSessions = allSessions.filter((session) => {
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    return matchesStatus;
  });

  // Statistics
  const upcomingCount = allSessions.filter((s) => s.status === 'Upcoming').length;
  const completedCount = allSessions.filter((s) => s.status === 'Completed').length;
  const cancelledCount = allSessions.filter((s) => s.status === 'Cancelled').length;

  return (
    <SubCoachAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Group Sessions</h1>
          <p className="text-sm text-text-secondary">
            Manage live sessions and workshops
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[#EDF0FB]">
              <div className="text-2xl font-bold text-text-primary">{allSessions.length}</div>
              <div className="text-xs text-text-secondary mt-1">Total Sessions</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{upcomingCount}</div>
              <div className="text-xs text-blue-600 mt-1">Upcoming</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
              <div className="text-2xl font-bold text-green-700">{completedCount}</div>
              <div className="text-xs text-green-600 mt-1">Completed</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-700">{cancelledCount}</div>
              <div className="text-xs text-gray-600 mt-1">Cancelled</div>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-[#EDF0FB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                >
                  <option value="all">All Sessions</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="text-xs text-text-secondary">
                Showing {filteredSessions.length} of {allSessions.length} sessions
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-text-primary">Your Sessions</h3>
              <button 
                onClick={() => console.log('Schedule new session')}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-xl transition-all"
              >
                + Schedule Session
              </button>
            </div>
            <GroupSessionsList
              sessions={filteredSessions}
              onViewDetails={(id: string) => console.log('View session:', id)}
            />
          </div>

          {/* Session Management Tips */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border-2 border-dashed border-cyan-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-xl flex-shrink-0">
                🎥
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">Session Management Tips</h4>
                <ul className="space-y-1 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>You can schedule sessions for courses you support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Prepare materials and review common questions 24 hours before each session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Record sessions when possible so students can review later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Share session recordings and notes with students after completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600">•</span>
                    <span>Contact your supervising coach to cancel or reschedule sessions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Access Notice */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-lg flex-shrink-0">
                🔒
              </div>
              <div>
                <h5 className="text-xs font-bold text-text-primary mb-1">Limited Session Management</h5>
                <p className="text-xs text-text-secondary">
                  You can schedule and host sessions for courses assigned to you. For changes to recurring session schedules or bulk session management, please contact your supervising coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubCoachAppLayout>
  );
};

export default SubCoachGroupsPage;
