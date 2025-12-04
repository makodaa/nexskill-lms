import React from 'react';

interface NotificationChannelsTabsProps {
  activeTab: 'email' | 'sms' | 'push' | 'automation';
  onChange: (tab: 'email' | 'sms' | 'push' | 'automation') => void;
}

const NotificationChannelsTabs: React.FC<NotificationChannelsTabsProps> = ({
  activeTab,
  onChange,
}) => {
  const tabs = [
    { key: 'email' as const, label: 'Email', icon: '📧' },
    { key: 'sms' as const, label: 'SMS', icon: '💬' },
    { key: 'push' as const, label: 'Push', icon: '🔔' },
    { key: 'automation' as const, label: 'Automation Rules', icon: '⚙️' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-md p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white shadow-md'
                : 'text-[#5F6473] hover:bg-[#F5F7FF] hover:text-[#304DB5]'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationChannelsTabs;
