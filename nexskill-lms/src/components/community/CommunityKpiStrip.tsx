import React from 'react';

const CommunityKpiStrip: React.FC = () => {
  const kpis = [
    { label: 'Active Groups', value: '15', trend: '+2', icon: '🏘️', color: 'green' },
    { label: 'Posts (7d)', value: '243', trend: '+18%', icon: '💬', color: 'blue' },
    { label: 'Reported Posts', value: '8', trend: '-3', icon: '🚨', color: 'red' },
    { label: 'Active Members', value: '1,847', trend: '+127', icon: '👥', color: 'purple' },
    { label: 'Engagement Rate', value: '68%', trend: '+5%', icon: '📊', color: 'teal' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; trend: string }> = {
      green: { bg: 'bg-green-50', text: 'text-green-700', trend: 'text-green-600' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', trend: 'text-blue-600' },
      red: { bg: 'bg-red-50', text: 'text-red-700', trend: 'text-red-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', trend: 'text-purple-600' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-700', trend: 'text-teal-600' },
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const colorClasses = getColorClasses(kpi.color);
        return (
          <div key={index} className={`${colorClasses.bg} rounded-2xl p-6 border border-gray-100`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorClasses.trend} bg-white`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1 text-text-primary">{kpi.value}</p>
            <p className="text-xs text-text-muted font-medium">{kpi.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityKpiStrip;
