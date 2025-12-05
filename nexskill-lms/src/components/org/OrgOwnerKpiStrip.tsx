import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, icon, trend, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-text-muted mb-1">{label}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
};

const OrgOwnerKpiStrip: React.FC = () => {
  const kpis = [
    {
      label: 'Seats Purchased',
      value: 200,
      icon: '🎫',
      bgColor: 'bg-blue-100',
      trend: { value: 0, isPositive: true }
    },
    {
      label: 'Seats Used',
      value: 142,
      icon: '✓',
      bgColor: 'bg-green-100',
      trend: { value: 12, isPositive: true }
    },
    {
      label: 'Active Learners',
      value: 89,
      icon: '🎓',
      bgColor: 'bg-purple-100',
      trend: { value: 8, isPositive: true }
    },
    {
      label: 'Avg Completion Rate',
      value: '78%',
      icon: '📊',
      bgColor: 'bg-orange-100',
      trend: { value: 5, isPositive: true }
    },
    {
      label: 'Active Courses',
      value: 15,
      icon: '📚',
      bgColor: 'bg-pink-100',
      trend: { value: 3, isPositive: true }
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpis.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default OrgOwnerKpiStrip;
