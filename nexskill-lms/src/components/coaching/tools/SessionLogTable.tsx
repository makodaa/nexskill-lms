import React, { useState } from 'react';

interface Session {
  id: string;
  studentName: string;
  bookingType: string;
  date: string;
  time: string;
  duration: number;
  status: 'Completed' | 'Scheduled' | 'Cancelled' | 'No-show';
  meetingLink?: string;
  notes?: string;
}

const SessionLogTable: React.FC = () => {
  const [sessions] = useState<Session[]>([
    {
      id: 'session-1',
      studentName: 'Emma Wilson',
      bookingType: '1:1 Strategy Session',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 60,
      status: 'Completed',
      notes: 'Discussed career goals and created action plan',
    },
    {
      id: 'session-2',
      studentName: 'James Chen',
      bookingType: 'Quick Q&A',
      date: '2024-01-16',
      time: '02:00 PM',
      duration: 30,
      status: 'Completed',
      notes: 'Answered questions about module 3',
    },
    {
      id: 'session-3',
      studentName: 'Sophia Martinez',
      bookingType: 'Group Workshop',
      date: '2024-01-18',
      time: '03:00 PM',
      duration: 90,
      status: 'Scheduled',
      meetingLink: 'https://zoom.us/j/123456789',
    },
    {
      id: 'session-4',
      studentName: 'Liam Brown',
      bookingType: '1:1 Strategy Session',
      date: '2024-01-12',
      time: '11:00 AM',
      duration: 60,
      status: 'No-show',
      notes: 'Student did not attend, email sent',
    },
    {
      id: 'session-5',
      studentName: 'Olivia Taylor',
      bookingType: 'Office Hours',
      date: '2024-01-10',
      time: '09:00 AM',
      duration: 30,
      status: 'Cancelled',
      notes: 'Student requested reschedule',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.bookingType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#22C55E] text-white';
      case 'Scheduled':
        return 'bg-[#304DB5] text-white';
      case 'Cancelled':
        return 'bg-gray-400 text-white';
      case 'No-show':
        return 'bg-[#F97316] text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Meeting link copied to clipboard!');
  };

  const addNotes = (sessionId: string) => {
    console.log('Adding notes to session:', sessionId);
    alert('Notes feature would open a modal here');
  };

  const markComplete = (sessionId: string) => {
    console.log('Marking session as complete:', sessionId);
    alert('Session marked as complete');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-[#111827]">Session Log</h3>
        <p className="text-sm text-[#5F6473] mt-1">
          View and manage all past and upcoming coaching sessions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by student or booking type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No-show">No-show</option>
        </select>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#EDF0FB] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FF]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Booking Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0FB]">
            {filteredSessions.map((session) => (
              <tr
                key={session.id}
                className="hover:bg-[#F5F7FF] cursor-pointer"
                onClick={() => setSelectedSession(session)}
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-[#111827]">{session.studentName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#5F6473]">{session.bookingType}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#111827]">{session.date}</p>
                  <p className="text-xs text-[#9CA3B5]">{session.time}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#5F6473]">{session.duration} min</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      session.status
                    )}`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {session.meetingLink && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyMeetingLink(session.meetingLink!);
                        }}
                        className="px-3 py-1 text-xs font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Copy Link
                      </button>
                    )}
                    {session.status === 'Scheduled' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markComplete(session.id);
                        }}
                        className="px-3 py-1 text-xs font-medium text-[#22C55E] hover:bg-green-50 rounded-lg transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addNotes(session.id);
                      }}
                      className="px-3 py-1 text-xs font-medium text-[#5F6473] hover:bg-[#F5F7FF] rounded-lg transition-colors"
                    >
                      Notes
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            onClick={() => setSelectedSession(session)}
            className="bg-white rounded-2xl border border-[#EDF0FB] p-4 hover:border-[#304DB5] transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-[#111827]">{session.studentName}</p>
                <p className="text-sm text-[#5F6473]">{session.bookingType}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  session.status
                )}`}
              >
                {session.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Date</p>
                <p className="text-[#111827]">{session.date}</p>
              </div>
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Time</p>
                <p className="text-[#111827]">{session.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-[#EDF0FB]">
              {session.meetingLink && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyMeetingLink(session.meetingLink!);
                  }}
                  className="flex-1 px-3 py-2 text-xs font-medium text-[#304DB5] bg-blue-50 rounded-lg"
                >
                  Copy Link
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addNotes(session.id);
                }}
                className="flex-1 px-3 py-2 text-xs font-medium text-[#5F6473] bg-[#F5F7FF] rounded-lg"
              >
                Notes
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#EDF0FB] p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg text-[#5F6473] mb-2">No sessions found</p>
          <p className="text-sm text-[#9CA3B5]">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Session Details Modal */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#111827]">Session Details</h3>
                <p className="text-sm text-[#5F6473] mt-1">{selectedSession.id}</p>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-[#5F6473] hover:text-[#111827]"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-1">Student</p>
                  <p className="font-semibold text-[#111827]">{selectedSession.studentName}</p>
                </div>
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-1">Booking Type</p>
                  <p className="font-semibold text-[#111827]">{selectedSession.bookingType}</p>
                </div>
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-1">Date & Time</p>
                  <p className="font-semibold text-[#111827]">
                    {selectedSession.date} at {selectedSession.time}
                  </p>
                </div>
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-1">Duration</p>
                  <p className="font-semibold text-[#111827]">{selectedSession.duration} min</p>
                </div>
              </div>

              <div className="bg-[#F5F7FF] rounded-xl p-4">
                <p className="text-xs text-[#9CA3B5] mb-1">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    selectedSession.status
                  )}`}
                >
                  {selectedSession.status}
                </span>
              </div>

              {selectedSession.meetingLink && (
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-2">Meeting Link</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={selectedSession.meetingLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white rounded-lg text-sm text-[#5F6473]"
                    />
                    <button
                      onClick={() => copyMeetingLink(selectedSession.meetingLink!)}
                      className="px-4 py-2 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-medium rounded-full hover:shadow-lg transition-all"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {selectedSession.notes && (
                <div className="bg-[#F5F7FF] rounded-xl p-4">
                  <p className="text-xs text-[#9CA3B5] mb-2">Session Notes</p>
                  <p className="text-sm text-[#111827]">{selectedSession.notes}</p>
                </div>
              )}

              {!selectedSession.notes && (
                <div className="bg-[#FEF3E7] rounded-xl p-4 text-center">
                  <p className="text-sm text-[#F97316] mb-2">No notes added yet</p>
                  <button
                    onClick={() => addNotes(selectedSession.id)}
                    className="px-6 py-2 bg-white text-[#F97316] font-semibold rounded-full hover:shadow-md transition-all"
                  >
                    Add Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionLogTable;
