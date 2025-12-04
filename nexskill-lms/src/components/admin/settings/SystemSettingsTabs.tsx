import React from 'react';

type TabValue = 'api' | 'integrations' | 'features' | 'audit' | 'languages' | 'access';

interface Tab {
  value: TabValue;
  label: string;
  icon: string;
}

interface SystemSettingsTabsProps {
  activeTab: TabValue;
  onChange: (tab: TabValue) => void;
}

const SystemSettingsTabs: React.FC<SystemSettingsTabsProps> = ({ activeTab, onChange }) => {
  const tabs: Tab[] = [
    { value: 'api', label: 'API Keys', icon: '🔑' },
    { value: 'integrations', label: 'Integrations', icon: '🔌' },
    { value: 'features', label: 'Features', icon: '🎛️' },
    { value: 'audit', label: 'Audit Logs', icon: '📜' },
    { value: 'languages', label: 'Languages', icon: '🌐' },
    { value: 'access', label: 'Access Control', icon: '🛡️' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              flex items-center gap-2 px-5 py-3 rounded-full font-medium
              transition-all duration-200
              ${
                activeTab === tab.value
                  ? 'bg-[#304DB5] text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SystemSettingsTabs;
