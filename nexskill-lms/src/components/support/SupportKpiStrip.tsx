import { Ticket, Clock, ThumbsUp, Users } from 'lucide-react';

const SupportKpiStrip = () => {
  const kpis = [
    {
      label: 'Open Tickets',
      value: '24',
      change: '+3 today',
      icon: Ticket,
      bgColor: 'from-blue-500 to-indigo-500',
      isPositive: false,
    },
    {
      label: 'Avg Response Time',
      value: '2.4h',
      change: '-0.3h vs last week',
      icon: Clock,
      bgColor: 'from-indigo-500 to-purple-500',
      isPositive: true,
    },
    {
      label: 'Customer Satisfaction',
      value: '94%',
      change: '+2% this month',
      icon: ThumbsUp,
      bgColor: 'from-purple-500 to-pink-500',
      isPositive: true,
    },
    {
      label: 'Active Students',
      value: '1,847',
      change: '+124 this week',
      icon: Users,
      bgColor: 'from-pink-500 to-rose-500',
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-br ${kpi.bgColor} p-4`}>
              <div className="flex items-center justify-between">
                <Icon className="w-8 h-8 text-white opacity-90" />
                <span className="text-3xl font-bold text-white">{kpi.value}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">{kpi.label}</h3>
              <p className={`text-xs ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupportKpiStrip;
