import React from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';
import CommunityGroupsList from '../../components/community/CommunityGroupsList';

const CommunityGroupsPage: React.FC = () => {
  const [showExportModal, setShowExportModal] = React.useState(false);
  const [exportFormat, setExportFormat] = React.useState('csv');

  const handleExport = () => {
    console.log('Exporting groups as:', exportFormat);
    alert(`📥 Groups exported successfully!\n\nFormat: ${exportFormat.toUpperCase()}\nFile: community-groups-${new Date().toISOString().split('T')[0]}.${exportFormat}`);
    setShowExportModal(false);
  };

  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Groups & Circles</h1>
            <p className="text-sm text-text-secondary">
              Manage specific groups and study circles within communities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              📥 Export Groups
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
                <span className="text-sm text-text-muted">Total Groups</span>
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">15</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Active Groups</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-green-600">15</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total Members</span>
                <span className="text-2xl">🙋</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">516</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Total Posts</span>
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">1,432</p>
            </div>
          </div>

          {/* Groups List */}
          <CommunityGroupsList />

          {/* Group Management Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-2">Group Management Best Practices</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Assign multiple moderators to active groups to ensure coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Monitor group post counts to identify groups that may need more engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Archive inactive groups to keep the community focused and organized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Review group settings regularly to ensure they align with community guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-[#EDF0FB]">
              <h3 className="text-xl font-bold text-text-primary">Export Groups</h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="csv">CSV - Comma Separated Values</option>
                  <option value="xlsx">XLSX - Excel Spreadsheet</option>
                  <option value="json">JSON - JavaScript Object Notation</option>
                  <option value="pdf">PDF - Portable Document Format</option>
                </select>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-2">
                  <span className="text-lg">ℹ️</span>
                  <div>
                    <p className="text-xs text-blue-700 font-medium mb-1">Export includes:</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Group names and descriptions</li>
                      <li>• Member counts and activity levels</li>
                      <li>• Moderator assignments</li>
                      <li>• Creation dates and status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#EDF0FB] flex justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-6 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-xl transition-all"
              >
                📥 Export
              </button>
            </div>
          </div>
        </div>
      )}
    </CommunityManagerLayout>
  );
};

export default CommunityGroupsPage;
