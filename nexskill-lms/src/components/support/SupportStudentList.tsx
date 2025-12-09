import { useState } from 'react';
import { Eye, Mail, Phone, Calendar, MessageSquare, BookOpen, Send, AlertTriangle, X, ChevronDown, History, Shield, Ticket } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  coursesEnrolled: number;
  ticketsOpened: number;
  status: 'active' | 'inactive' | 'suspended';
}

interface SupportStudentListProps {
  onViewStudent?: (student: Student) => void;
}

const SupportStudentList = ({ onViewStudent }: SupportStudentListProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'tickets' | 'courses' | 'activity'>('details');
  const [emailModal, setEmailModal] = useState<Student | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [actionDropdown, setActionDropdown] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Mock ticket history for students
  const studentTickets = [
    { id: 'TKT-1001', subject: 'Cannot access course materials', status: 'resolved', date: 'May 1, 2024' },
    { id: 'TKT-1015', subject: 'Payment issue', status: 'open', date: 'May 10, 2024' },
    { id: 'TKT-1022', subject: 'Certificate not received', status: 'pending', date: 'May 15, 2024' },
  ];

  // Mock course enrollments
  const studentCourses = [
    { name: 'Advanced JavaScript', progress: 85, status: 'in-progress' },
    { name: 'React Fundamentals', progress: 100, status: 'completed' },
    { name: 'Node.js Backend', progress: 45, status: 'in-progress' },
    { name: 'TypeScript Mastery', progress: 0, status: 'not-started' },
  ];

  // Mock activity log
  const studentActivity = [
    { action: 'Completed lesson', detail: 'React Hooks Deep Dive', time: '2 hours ago' },
    { action: 'Submitted quiz', detail: 'JavaScript Basics Quiz - Score: 92%', time: '1 day ago' },
    { action: 'Opened ticket', detail: 'TKT-1022 - Certificate not received', time: '3 days ago' },
    { action: 'Logged in', detail: 'From Chrome on MacOS', time: '4 days ago' },
  ];

  const students: Student[] = [
    { id: 'STU-1001', name: 'Sarah Chen', email: 'sarah.chen@email.com', phone: '+1 234-567-8901', joinedDate: 'Jan 15, 2024', coursesEnrolled: 5, ticketsOpened: 3, status: 'active' },
    { id: 'STU-1002', name: 'Michael Brown', email: 'michael.b@email.com', phone: '+1 234-567-8902', joinedDate: 'Feb 20, 2024', coursesEnrolled: 3, ticketsOpened: 1, status: 'active' },
    { id: 'STU-1003', name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 234-567-8903', joinedDate: 'Mar 10, 2024', coursesEnrolled: 8, ticketsOpened: 5, status: 'active' },
    { id: 'STU-1004', name: 'James Lee', email: 'james.lee@email.com', phone: '+1 234-567-8904', joinedDate: 'Jan 5, 2024', coursesEnrolled: 2, ticketsOpened: 0, status: 'inactive' },
    { id: 'STU-1005', name: 'Olivia Martinez', email: 'olivia.m@email.com', phone: '+1 234-567-8905', joinedDate: 'Apr 12, 2024', coursesEnrolled: 6, ticketsOpened: 2, status: 'active' },
    { id: 'STU-1006', name: 'Noah Davis', email: 'noah.d@email.com', phone: '+1 234-567-8906', joinedDate: 'Feb 28, 2024', coursesEnrolled: 4, ticketsOpened: 1, status: 'active' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'suspended': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Student ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Courses</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tickets</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-semibold text-gray-700">{student.id}</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">{student.name}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {student.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {student.joinedDate}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {student.coursesEnrolled}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                      {student.ticketsOpened}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(student.status)}`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 relative">
                      <button
                        onClick={() => onViewStudent ? onViewStudent(student) : setSelectedStudent(student)}
                        className="p-2 hover:bg-blue-100 rounded-xl transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setEmailModal(student);
                          setEmailSubject('');
                          setEmailBody('');
                        }}
                        className="p-2 hover:bg-green-100 rounded-xl transition-colors"
                        title="Send Email"
                      >
                        <Send className="w-5 h-5 text-green-600" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setActionDropdown(actionDropdown === student.id ? null : student.id)}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                          title="More Actions"
                        >
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        </button>
                        {actionDropdown === student.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-20">
                            <button
                              onClick={() => {
                                showToast(`Viewing tickets for ${student.name}...`);
                                setSelectedStudent(student);
                                setActiveTab('tickets');
                                setActionDropdown(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 rounded-t-xl"
                            >
                              <Ticket className="w-4 h-4" /> View Tickets
                            </button>
                            <button
                              onClick={() => {
                                showToast(`Viewing courses for ${student.name}...`);
                                setSelectedStudent(student);
                                setActiveTab('courses');
                                setActionDropdown(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <BookOpen className="w-4 h-4" /> View Courses
                            </button>
                            <button
                              onClick={() => {
                                showToast(`Viewing activity for ${student.name}...`);
                                setSelectedStudent(student);
                                setActiveTab('activity');
                                setActionDropdown(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <History className="w-4 h-4" /> View Activity
                            </button>
                            <hr className="border-gray-100" />
                            {student.status === 'active' && (
                              <button
                                onClick={() => {
                                  showToast(`⚠️ Suspended account for ${student.name}`);
                                  setActionDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 rounded-b-xl"
                              >
                                <Shield className="w-4 h-4" /> Suspend Account
                              </button>
                            )}
                            {student.status === 'suspended' && (
                              <button
                                onClick={() => {
                                  showToast(`✓ Reactivated account for ${student.name}`);
                                  setActionDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 text-green-600 flex items-center gap-2 rounded-b-xl"
                              >
                                <Shield className="w-4 h-4" /> Reactivate Account
                              </button>
                            )}
                            {student.status === 'inactive' && (
                              <button
                                onClick={() => {
                                  setEmailModal(student);
                                  setEmailSubject('We miss you!');
                                  setEmailBody('Hi ' + student.name + ',\n\nWe noticed you haven\'t been active lately. Is there anything we can help you with?\n\nBest regards,\nSupport Team');
                                  setActionDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-blue-600 flex items-center gap-2 rounded-b-xl"
                              >
                                <Mail className="w-4 h-4" /> Send Re-engagement Email
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Email Modal */}
      {emailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEmailModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Send Email to {emailModal.name}</h3>
              <button onClick={() => setEmailModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">To</label>
                <input type="text" value={emailModal.email} disabled className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Subject</label>
                <input 
                  type="text" 
                  value={emailSubject} 
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Message</label>
                <textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Enter your message..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none resize-none" 
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEmailModal(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    showToast(`✓ Email sent to ${emailModal.email}`);
                    setEmailModal(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setSelectedStudent(null); setActiveTab('details'); }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-sm text-gray-600 font-mono">{selectedStudent.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedStudent.status)}`}>
                    {selectedStudent.status.toUpperCase()}
                  </span>
                  <button onClick={() => { setSelectedStudent(null); setActiveTab('details'); }} className="p-2 hover:bg-gray-100 rounded-xl">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              {[
                { key: 'details', label: 'Details', icon: Eye },
                { key: 'tickets', label: 'Tickets', icon: MessageSquare },
                { key: 'courses', label: 'Courses', icon: BookOpen },
                { key: 'activity', label: 'Activity', icon: History },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === tab.key 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {activeTab === 'details' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-600">Email</span>
                    <p className="text-gray-900 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedStudent.email}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-600">Phone</span>
                    <p className="text-gray-900 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedStudent.phone}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-600">Joined Date</span>
                    <p className="text-gray-900 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {selectedStudent.joinedDate}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-600">Courses Enrolled</span>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{selectedStudent.coursesEnrolled}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-600">Tickets Opened</span>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">{selectedStudent.ticketsOpened}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-600">Account Status</span>
                    <p className="mt-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedStudent.status)}`}>
                        {selectedStudent.status.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="space-y-3">
                  {studentTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-mono text-sm text-gray-500">{ticket.id}</p>
                        <p className="font-medium text-gray-900">{ticket.subject}</p>
                        <p className="text-sm text-gray-500">{ticket.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ticket.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          ticket.status === 'open' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {ticket.status.toUpperCase()}
                        </span>
                        <button 
                          onClick={() => showToast(`Opening ticket ${ticket.id}...`)}
                          className="p-2 hover:bg-blue-100 rounded-xl"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => showToast('Creating new ticket for student...')}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium"
                  >
                    + Create New Ticket
                  </button>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-3">
                  {studentCourses.map((course, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{course.name}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === 'completed' ? 'bg-green-100 text-green-700' :
                          course.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {course.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{course.progress}% complete</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-3">
                  {studentActivity.map((activity, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-2xl flex items-start gap-3 hover:bg-gray-100 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setEmailModal(selectedStudent);
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Send Email
              </button>
              {selectedStudent.status !== 'suspended' && (
                <button
                  onClick={() => {
                    showToast(`⚠️ Account suspended for ${selectedStudent.name}`);
                    setSelectedStudent(null);
                    setActiveTab('details');
                  }}
                  className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-2xl font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" /> Suspend
                </button>
              )}
              <button
                onClick={() => { setSelectedStudent(null); setActiveTab('details'); }}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-100 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportStudentList;
