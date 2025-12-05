import React, { useState } from 'react';
import ContentEditorLayout from '../../layouts/ContentEditorLayout';

const ContentEditorProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@nexskill.com',
    role: 'Content Editor',
    joinDate: 'Jan 2024',
    specializations: ['JavaScript', 'UI/UX', 'Product Management'],
    workloadPreference: 'medium',
    notifications: {
      newReviewItems: true,
      suggestionResponses: true,
      translationUpdates: false,
      weeklyDigest: true,
    },
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
    // In real app, would save to backend
  };

  return (
    <ContentEditorLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Profile & Settings</h1>
            <p className="text-sm text-text-secondary">
              Manage your content editor profile and preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
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
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
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
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                SJ
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-1">{profile.name}</h2>
                <p className="text-sm text-text-secondary mb-3">{profile.role} • Joined {profile.joinDate}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {profile.specializations.map((spec) => (
                    <span key={spec} className="px-3 py-1 bg-white text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                      {spec}
                    </span>
                  ))}
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50 disabled:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Content Specializations</h3>
            <p className="text-sm text-text-secondary mb-4">
              Select areas where you have expertise for content review
            </p>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'Python', 'UI/UX', 'Product Management', 'Data Analytics', 'Marketing', 'AI/ML', 'Mobile Dev'].map((spec) => (
                <button
                  key={spec}
                  disabled={!isEditing}
                  onClick={() => {
                    if (profile.specializations.includes(spec)) {
                      setProfile({
                        ...profile,
                        specializations: profile.specializations.filter((s) => s !== spec),
                      });
                    } else {
                      setProfile({
                        ...profile,
                        specializations: [...profile.specializations, spec],
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    profile.specializations.includes(spec)
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : 'bg-gray-100 text-text-muted hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {profile.specializations.includes(spec) ? '✓ ' : ''}{spec}
                </button>
              ))}
            </div>
          </div>

          {/* Workload Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Workload Preferences</h3>
            <p className="text-sm text-text-secondary mb-4">
              Set your preferred workload level for content review assignments
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', desc: '~5 items/week', emoji: '🌱' },
                { value: 'medium', label: 'Medium', desc: '~10 items/week', emoji: '⚡' },
                { value: 'heavy', label: 'Heavy', desc: '~20 items/week', emoji: '🔥' },
              ].map((option) => (
                <button
                  key={option.value}
                  disabled={!isEditing}
                  onClick={() => setProfile({ ...profile, workloadPreference: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    profile.workloadPreference === option.value
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="text-3xl block mb-2">{option.emoji}</span>
                  <p className="text-sm font-semibold text-text-primary">{option.label}</p>
                  <p className="text-xs text-text-muted">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { key: 'newReviewItems', label: 'New Review Items', desc: 'Get notified when new content is added to your queue' },
                { key: 'suggestionResponses', label: 'Suggestion Responses', desc: 'Coach responses to your suggestions' },
                { key: 'translationUpdates', label: 'Translation Updates', desc: 'Updates on translation review status' },
                { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your activity and pending work' },
              ].map((notif) => (
                <div key={notif.key} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={profile.notifications[notif.key as keyof typeof profile.notifications]}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        notifications: {
                          ...profile.notifications,
                          [notif.key]: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 w-4 h-4 text-amber-600 rounded focus:ring-amber-500 disabled:opacity-50"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{notif.label}</p>
                    <p className="text-xs text-text-muted">{notif.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-base font-bold text-text-primary mb-4">Your Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-700">127</p>
                <p className="text-xs text-text-muted mt-1">Items Reviewed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-700">23</p>
                <p className="text-xs text-text-muted mt-1">Suggestions Made</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-700">48</p>
                <p className="text-xs text-text-muted mt-1">Translations</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-700">4.8</p>
                <p className="text-xs text-text-muted mt-1">Quality Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentEditorLayout>
  );
};

export default ContentEditorProfilePage;
