import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: string;
  bgColor: string;
  change?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, icon, bgColor, change }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        {change && (
          <span className="text-xs font-semibold text-amber-600">{change}</span>
        )}
      </div>
      <div>
        <p className="text-sm text-text-muted mb-1">{label}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
};

const ContentEditorKpiStrip: React.FC = () => {
  const kpis = [
    {
      label: 'Review Queue',
      value: 12,
      icon: '📋',
      bgColor: 'bg-blue-100',
      change: '3 urgent'
    },
    {
      label: 'Lessons Needing Edits',
      value: 8,
      icon: '✏️',
      bgColor: 'bg-amber-100',
      change: '2 new'
    },
    {
      label: 'Resources Flagged',
      value: 15,
      icon: '📁',
      bgColor: 'bg-orange-100',
      change: '5 this week'
    },
    {
      label: 'Translation Tasks',
      value: 6,
      icon: '🌐',
      bgColor: 'bg-purple-100',
      change: '1 overdue'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default ContentEditorKpiStrip;
