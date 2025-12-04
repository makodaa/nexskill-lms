import React from 'react';

interface NotificationSettings {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  mobilePush: boolean;
  learningProgress: boolean;
  courseRecommendations: boolean;
  aiCoachNudges: boolean;
  billingAlerts: boolean;
}

interface ProfileNotificationSettingsProps {
  settings: NotificationSettings;
  onChange: (updated: NotificationSettings) => void;
}

const ProfileNotificationSettings: React.FC<ProfileNotificationSettingsProps> = ({
  settings,
  onChange,
}) => {
  const toggleSetting = (key: keyof NotificationSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  const ToggleRow: React.FC<{
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
  }> = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className="text-xs text-slate-600 mt-1">{description}</div>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-[#304DB5]' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Notifications</h2>

      {/* Channels */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Notification channels</h3>
        <div className="space-y-2">
          <ToggleRow
            label="Email notifications"
            description="Receive updates via email"
            enabled={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
          />
          <ToggleRow
            label="In-app notifications"
            description="See notifications within NexSkill"
            enabled={settings.inAppNotifications}
            onToggle={() => toggleSetting('inAppNotifications')}
          />
          <ToggleRow
            label="Mobile push notifications"
            description="Get alerts on your mobile device"
            enabled={settings.mobilePush}
            onToggle={() => toggleSetting('mobilePush')}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Notification categories</h3>
        <div className="space-y-2">
          <ToggleRow
            label="Learning progress updates"
            description="Milestones, streaks, and achievements"
            enabled={settings.learningProgress}
            onToggle={() => toggleSetting('learningProgress')}
          />
          <ToggleRow
            label="Course recommendations"
            description="Personalized course suggestions"
            enabled={settings.courseRecommendations}
            onToggle={() => toggleSetting('courseRecommendations')}
          />
          <ToggleRow
            label="AI coach nudges"
            description="Study reminders and motivational messages"
            enabled={settings.aiCoachNudges}
            onToggle={() => toggleSetting('aiCoachNudges')}
          />
          <ToggleRow
            label="Billing and payment alerts"
            description="Transaction confirmations and receipts"
            enabled={settings.billingAlerts}
            onToggle={() => toggleSetting('billingAlerts')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileNotificationSettings;
