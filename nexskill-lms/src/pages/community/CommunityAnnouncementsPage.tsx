import React, { useState } from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import AnnouncementsList from '../../components/community/AnnouncementsList';

const CommunityAnnouncementsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    target: 'all',
    content: '',
  });

  const handlePublish = () => {
    console.log('Publishing announcement:', formData);
    alert(`📢 Announcement published successfully!\n\nTitle: ${formData.title}\nTarget: ${formData.target}\nThe announcement will be visible to ${formData.target === 'all' ? 'all communities' : formData.target}.`);
    setShowForm(false);
    setFormData({ title: '', target: 'all', content: '' });
  };

  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Announcements</h1>
            <p className="text-sm text-text-secondary">
              Create and manage platform-wide and community-specific announcements
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
            >
              {showForm ? '✕ Cancel' : '📢 New Announcement'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total</span>
                <span className="text-2xl">📢</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">6</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Active</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">4</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Scheduled</span>
                <span className="text-2xl">⏰</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">1</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Archived</span>
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-2xl font-bold text-gray-600">1</p>
            </div>
          </div>

          {/* New Announcement Form */}
          {showForm && (
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-base font-bold text-text-primary mb-4">Create New Announcement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter announcement title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Target</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Communities</option>
                    <option value="javascript">JavaScript Mastery</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="product">Product Management</option>
                    <option value="data">Data Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Enter announcement content..."
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePublish}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
                  >
                    📢 Publish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Announcements List */}
          <AnnouncementsList />

          {/* Best Practices */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Announcement Best Practices</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Keep announcements concise and action-oriented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Use clear subject lines that describe the announcement content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Target specific communities when the announcement is not relevant to all</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Schedule important announcements for optimal visibility times</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityManagerLayout>
  );
};

export default CommunityAnnouncementsPage;
