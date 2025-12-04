import React, { useState } from 'react';

interface AnnouncementPayload {
  subject: string;
  channels: {
    email: boolean;
    inApp: boolean;
  };
  body: string;
}

interface GroupAnnouncementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (payload: AnnouncementPayload) => void;
}

const GroupAnnouncementPanel: React.FC<GroupAnnouncementPanelProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [subject, setSubject] = useState('');
  const [channels, setChannels] = useState({ email: true, inApp: true });
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!subject.trim() || !body.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    if (!channels.email && !channels.inApp) {
      alert('Please select at least one channel');
      return;
    }

    onSend({ subject, channels, body });
    
    // Reset form
    setSubject('');
    setBody('');
    setChannels({ email: true, inApp: true });
  };

  const handleCancel = () => {
    setSubject('');
    setBody('');
    setChannels({ email: true, inApp: true });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#EDF0FB]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">Send Announcement</h2>
              <p className="text-sm text-[#5F6473]">
                Message all enrolled students in this course
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-[#5F6473] hover:text-[#111827] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto flex-1 space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Subject Line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter announcement subject..."
              className="w-full px-4 py-3 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
            />
          </div>

          {/* Channel Selection */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3">
              Delivery Channels
            </label>
            <div className="space-y-3 bg-[#F5F7FF] rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.email}
                  onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                  className="w-4 h-4 text-[#304DB5] rounded focus:ring-[#304DB5]"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  <div>
                    <span className="text-sm font-medium text-[#111827]">Email</span>
                    <p className="text-xs text-[#5F6473]">
                      Send to students' registered email addresses
                    </p>
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.inApp}
                  onChange={(e) => setChannels({ ...channels, inApp: e.target.checked })}
                  className="w-4 h-4 text-[#304DB5] rounded focus:ring-[#304DB5]"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔔</span>
                  <div>
                    <span className="text-sm font-medium text-[#111827]">In-app notification</span>
                    <p className="text-xs text-[#5F6473]">Display in student dashboard</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Message Body */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your announcement..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5] focus:border-transparent resize-none"
            />
            <p className="text-xs text-[#9CA3B5] mt-2">
              Tip: Keep your message clear and actionable. Include any important dates or links.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#EDF0FB] flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-[#5F6473] font-medium rounded-full hover:bg-[#F5F7FF] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!subject.trim() || !body.trim()}
            className="px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupAnnouncementPanel;
