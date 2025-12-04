import React from 'react';

type TabValue = 'users' | 'coaches' | 'courses' | 'funnels' | 'ai' | 'bi';

interface Tab {
  value: TabValue;
  label: string;
  icon: string;
}

interface AnalyticsTabsProps {
  activeTab: TabValue;
  onChange: (tab: TabValue) => void;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ activeTab, onChange }) => {
  const tabs: Tab[] = [
    { value: 'users', label: 'Users', icon: '👥' },
    { value: 'coaches', label: 'Coaches', icon: '🎓' },
    { value: 'courses', label: 'Courses', icon: '📚' },
    { value: 'funnels', label: 'Funnels', icon: '🔄' },
    { value: 'ai', label: 'AI', icon: '🤖' },
    { value: 'bi', label: 'BI', icon: '📊' },
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

export default AnalyticsTabs;
