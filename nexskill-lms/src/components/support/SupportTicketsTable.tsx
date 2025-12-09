import { useState } from 'react';
import { Eye, MessageSquare, Clock, Send, UserPlus, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  student: string;
  studentEmail: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'pending' | 'resolved';
  category: string;
  created: string;
  lastUpdate: string;
  messages: number;
  description?: string;
  assignedTo?: string;
}

interface Message {
  id: number;
  sender: 'student' | 'support';
  name: string;
  content: string;
  time: string;
}

interface SupportTicketsTableProps {
  onViewTicket?: (ticket: Ticket) => void;
}

const SupportTicketsTable = ({ onViewTicket }: SupportTicketsTableProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'pending' | 'resolved'>('all');
  const [replyModal, setReplyModal] = useState<Ticket | null>(null);
  const [escalateModal, setEscalateModal] = useState<Ticket | null>(null);
  const [assignModal, setAssignModal] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [escalateReason, setEscalateReason] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [actionFeedback, setActionFeedback] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'T-2401', subject: 'Cannot access course video', student: 'Sarah Chen', studentEmail: 'sarah.chen@email.com', priority: 'high', status: 'open', category: 'Technical', created: '2 hours ago', lastUpdate: '2 hours ago', messages: 1, description: 'I am unable to play any videos in the Advanced React course. The player just shows a spinning loader.' },
    { id: 'T-2402', subject: 'Billing question about refund', student: 'Michael Brown', studentEmail: 'michael.b@email.com', priority: 'medium', status: 'in-progress', category: 'Billing', created: '5 hours ago', lastUpdate: '1 hour ago', messages: 3, description: 'I purchased the wrong course and would like a refund. Can you help me process this?', assignedTo: 'Alex Support' },
    { id: 'T-2403', subject: 'Certificate not generating', student: 'Emma Wilson', studentEmail: 'emma.w@email.com', priority: 'urgent', status: 'open', category: 'Certificates', created: '30 minutes ago', lastUpdate: '30 minutes ago', messages: 1, description: 'I completed the Digital Marketing course but my certificate is not showing up.' },
    { id: 'T-2404', subject: 'How to reset my password?', student: 'James Lee', studentEmail: 'james.lee@email.com', priority: 'low', status: 'pending', category: 'Account', created: '1 day ago', lastUpdate: '8 hours ago', messages: 2, description: 'I forgot my password and need help resetting it.' },
    { id: 'T-2405', subject: 'Quiz not submitting answers', student: 'Olivia Martinez', studentEmail: 'olivia.m@email.com', priority: 'high', status: 'in-progress', category: 'Technical', created: '3 hours ago', lastUpdate: '20 minutes ago', messages: 4, description: 'When I try to submit my quiz answers, I get an error message.', assignedTo: 'You' },
    { id: 'T-2406', subject: 'Course completion issue', student: 'Noah Davis', studentEmail: 'noah.d@email.com', priority: 'medium', status: 'resolved', category: 'Progress', created: '2 days ago', lastUpdate: '1 day ago', messages: 5, description: 'My course shows 95% complete but I finished all lessons.' },
  ]);

  const [ticketMessages] = useState<Record<string, Message[]>>({
    'T-2401': [
      { id: 1, sender: 'student', name: 'Sarah Chen', content: 'I am unable to play any videos in the Advanced React course. The player just shows a spinning loader. I have tried different browsers but the issue persists.', time: '2 hours ago' },
    ],
    'T-2402': [
      { id: 1, sender: 'student', name: 'Michael Brown', content: 'I purchased the wrong course and would like a refund.', time: '5 hours ago' },
      { id: 2, sender: 'support', name: 'Alex Support', content: 'Hi Michael, I can help you with that. Could you please confirm which course you purchased and which one you intended to buy?', time: '4 hours ago' },
      { id: 3, sender: 'student', name: 'Michael Brown', content: 'I bought "React Basics" but meant to get "Advanced React". The purchase was made yesterday.', time: '1 hour ago' },
    ],
    'T-2405': [
      { id: 1, sender: 'student', name: 'Olivia Martinez', content: 'When I try to submit my quiz answers, I get an error message saying "submission failed".', time: '3 hours ago' },
      { id: 2, sender: 'support', name: 'You', content: 'Hi Olivia, I am sorry to hear that. Can you tell me which quiz this is happening on?', time: '2 hours ago' },
      { id: 3, sender: 'student', name: 'Olivia Martinez', content: 'It is the Module 3 quiz in the Python course.', time: '1 hour ago' },
      { id: 4, sender: 'support', name: 'You', content: 'Thank you for that info. I am looking into this now.', time: '20 minutes ago' },
    ],
  });

  const agents = ['Alex Support', 'Jordan Helper', 'Sam Assistant', 'Taylor Tech'];

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  const showFeedback = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setActionFeedback({ message, type });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleStatusChange = (ticketId: string, newStatus: Ticket['status']) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, status: newStatus, lastUpdate: 'Just now' } : t
    ));
    showFeedback(`Ticket ${ticketId} marked as ${newStatus.replace('-', ' ')}`);
    setSelectedTicket(null);
  };

  const handleSendReply = () => {
    if (replyModal && replyText.trim()) {
      setTickets(prev => prev.map(t => 
        t.id === replyModal.id 
          ? { ...t, messages: t.messages + 1, lastUpdate: 'Just now', status: 'in-progress' as const }
          : t
      ));
      showFeedback(`Reply sent to ${replyModal.student}`);
      setReplyModal(null);
      setReplyText('');
    }
  };

  const handleEscalate = () => {
    if (escalateModal && escalateReason) {
      setTickets(prev => prev.map(t => 
        t.id === escalateModal.id 
          ? { ...t, priority: 'urgent' as const, lastUpdate: 'Just now' }
          : t
      ));
      showFeedback(`Ticket ${escalateModal.id} escalated to senior support`, 'warning');
      setEscalateModal(null);
      setEscalateReason('');
    }
  };

  const handleAssign = () => {
    if (assignModal && selectedAgent) {
      setTickets(prev => prev.map(t => 
        t.id === assignModal.id 
          ? { ...t, assignedTo: selectedAgent, status: 'in-progress' as const, lastUpdate: 'Just now' }
          : t
      ));
      showFeedback(`Ticket assigned to ${selectedAgent}`);
      setAssignModal(null);
      setSelectedAgent('');
    }
  };

  const handleTakeTicket = (ticket: Ticket) => {
    setTickets(prev => prev.map(t => 
      t.id === ticket.id 
        ? { ...t, assignedTo: 'You', status: 'in-progress' as const, lastUpdate: 'Just now' }
        : t
    ));
    showFeedback(`You are now handling ticket ${ticket.id}`);
    setSelectedTicket(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'in-progress': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <>
      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div className={`fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ${
          actionFeedback.type === 'success' ? 'bg-green-500' : 
          actionFeedback.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
        } text-white`}>
          <span className="text-lg">
            {actionFeedback.type === 'success' ? '✅' : actionFeedback.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <p className="text-sm font-medium">{actionFeedback.message}</p>
          <button onClick={() => setActionFeedback(null)} className="text-white/80 hover:text-white">×</button>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-lg p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'open', 'in-progress', 'pending', 'resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All Tickets' : f.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              {f !== 'all' && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {tickets.filter(t => t.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ticket ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subject</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Assigned</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Last Update</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-50 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm font-semibold text-gray-700">{ticket.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{ticket.subject}</span>
                      {ticket.messages > 1 && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MessageSquare className="w-3 h-3" />
                          {ticket.messages}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{ticket.student}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {ticket.assignedTo ? (
                      <span className={`text-sm font-medium ${ticket.assignedTo === 'You' ? 'text-blue-600' : 'text-gray-700'}`}>
                        {ticket.assignedTo}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleTakeTicket(ticket)}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium"
                      >
                        Take It
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {ticket.lastUpdate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onViewTicket ? onViewTicket(ticket) : setSelectedTicket(ticket)}
                        className="p-2 hover:bg-blue-100 rounded-xl transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => setReplyModal(ticket)}
                        className="p-2 hover:bg-green-100 rounded-xl transition-colors"
                        title="Reply"
                      >
                        <Send className="w-5 h-5 text-green-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTicket(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-lg font-bold text-gray-900">{selectedTicket.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h3>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="text-2xl text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <span className="text-sm text-gray-600">Student</span>
                  <p className="font-medium text-gray-900">{selectedTicket.student}</p>
                  <p className="text-sm text-gray-500">{selectedTicket.studentEmail}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category</span>
                  <p className="font-medium text-gray-900">{selectedTicket.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Created</span>
                  <p className="font-medium text-gray-900">{selectedTicket.created}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Assigned To</span>
                  <p className="font-medium text-gray-900">{selectedTicket.assignedTo || 'Unassigned'}</p>
                </div>
              </div>

              {/* Conversation Thread */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Conversation</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {(ticketMessages[selectedTicket.id] || [{ id: 1, sender: 'student' as const, name: selectedTicket.student, content: selectedTicket.description || selectedTicket.subject, time: selectedTicket.created }]).map((msg) => (
                    <div key={msg.id} className={`p-3 rounded-xl ${msg.sender === 'student' ? 'bg-gray-100' : 'bg-blue-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-semibold ${msg.sender === 'student' ? 'text-gray-700' : 'text-blue-700'}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                    setReplyModal(selectedTicket);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600"
                >
                  <Send className="w-4 h-4" />
                  Reply
                </button>
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                    setAssignModal(selectedTicket);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600"
                >
                  <UserPlus className="w-4 h-4" />
                  Assign
                </button>
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                    setEscalateModal(selectedTicket);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Escalate
                </button>
                {selectedTicket.status !== 'resolved' && (
                  <button
                    onClick={() => handleStatusChange(selectedTicket.id, 'resolved')}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Resolve
                  </button>
                )}
              </div>

              {/* Status Change */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Change Status</h4>
                <div className="flex flex-wrap gap-2">
                  {['open', 'in-progress', 'pending', 'resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedTicket.id, status as Ticket['status'])}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedTicket.status === status
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      disabled={selectedTicket.status === status}
                    >
                      {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setReplyModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Reply to {replyModal.student}</h3>
                  <p className="text-sm text-gray-600">{replyModal.subject}</p>
                </div>
                <button onClick={() => setReplyModal(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none resize-none mb-4"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setReplyModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalate Modal */}
      {escalateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEscalateModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Escalate Ticket</h3>
                  <p className="text-sm text-gray-600">{escalateModal.id} - {escalateModal.subject}</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Escalation</label>
                <select
                  value={escalateReason}
                  onChange={(e) => setEscalateReason(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select a reason...</option>
                  <option value="technical">Complex Technical Issue</option>
                  <option value="billing">Billing Dispute</option>
                  <option value="vip">VIP Student</option>
                  <option value="legal">Legal/Compliance Issue</option>
                  <option value="urgent">Time-Sensitive Matter</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEscalateModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEscalate}
                  disabled={!escalateReason}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50"
                >
                  Escalate to Senior
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setAssignModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Assign Ticket</h3>
                  <p className="text-sm text-gray-600">{assignModal.id} - {assignModal.subject}</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Agent</label>
                <div className="space-y-2">
                  {agents.map((agent) => (
                    <button
                      key={agent}
                      onClick={() => setSelectedAgent(agent)}
                      className={`w-full p-3 text-left rounded-xl border-2 transition-all ${
                        selectedAgent === agent
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{agent}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAssignModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedAgent}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50"
                >
                  Assign Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportTicketsTable;
