import React, { useState } from 'react';
import CommunityManagerLayout from '../../layouts/CommunityManagerLayout';

const CommunityProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@nexskill.com',
    role: 'Community Manager',
    joinDate: 'March 2024',
    preferences: {
      autoSubscribe: true,
      emailReports: true,
      emailAlerts: true,
      weeklyDigest: false,
    },
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    alert(`✅ Profile updated successfully!\n\nName: ${profile.name}\nEmail: ${profile.email}`);
    setIsEditing(false);
  };

  return (
    <CommunityManagerLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Profile & Settings</h1>
            <p className="text-sm text-text-secondary">
              Manage your community manager profile and preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
                >
                  💾 Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                AT
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-1">{profile.name}</h2>
                <p className="text-sm text-text-secondary mb-3">{profile.role} • Joined {profile.joinDate}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white text-green-700 rounded-lg text-sm font-medium border border-green-200">
                    8 Communities Managed
                  </span>
                  <span className="px-3 py-1 bg-white text-teal-700 rounded-lg text-sm font-medium border border-teal-200">
                    15 Active Groups
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Moderation Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Moderation Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.preferences.autoSubscribe}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, autoSubscribe: e.target.checked },
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500 disabled:opacity-50"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Auto-subscribe to new communities</p>
                  <p className="text-xs text-text-muted">Automatically follow new communities when they are created</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.preferences.emailReports}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, emailReports: e.target.checked },
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500 disabled:opacity-50"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Email alerts for reported posts</p>
                  <p className="text-xs text-text-muted">Get notified when posts are flagged for moderation</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.preferences.emailAlerts}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, emailAlerts: e.target.checked },
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500 disabled:opacity-50"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Instant alerts for high-priority flags</p>
                  <p className="text-xs text-text-muted">Receive immediate notifications for urgent moderation issues</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.preferences.weeklyDigest}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, weeklyDigest: e.target.checked },
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500 disabled:opacity-50"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Weekly summary digest</p>
                  <p className="text-xs text-text-muted">Summary of moderation activity and community health</p>
                </div>
              </div>
            </div>
          </div>

          {/* Workload Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Workload Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-3xl font-bold text-green-700">8</p>
                <p className="text-xs text-text-muted mt-1">Communities Managed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-3xl font-bold text-blue-700">15</p>
                <p className="text-xs text-text-muted mt-1">Active Groups</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-3xl font-bold text-purple-700">12</p>
                <p className="text-xs text-text-muted mt-1">Avg Tasks/Day</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-xl">
                <p className="text-3xl font-bold text-teal-700">4.8</p>
                <p className="text-xs text-text-muted mt-1">Performance Score</p>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-base font-bold text-text-primary mb-4">This Month</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-blue-700">127</p>
                <p className="text-xs text-text-muted mt-1">Posts Moderated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">8</p>
                <p className="text-xs text-text-muted mt-1">Announcements Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">23</p>
                <p className="text-xs text-text-muted mt-1">Reports Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityManagerLayout>
  );
};

export default CommunityProfilePage;
