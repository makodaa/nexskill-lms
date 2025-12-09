import { useState } from 'react';
import { Ticket, Clock, ThumbsUp, Users, X } from 'lucide-react';

interface KpiDetail {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  bgColor: string;
  isPositive: boolean;
  description: string;
  breakdown: { label: string; value: string }[];
}

const SupportKpiStrip = () => {
  const [selectedKpi, setSelectedKpi] = useState<KpiDetail | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const kpis: KpiDetail[] = [
    {
      label: 'Open Tickets',
      value: '24',
      change: '+3 today',
      icon: Ticket,
      bgColor: 'from-blue-500 to-indigo-500',
      isPositive: false,
      description: 'Total number of tickets awaiting response or resolution',
      breakdown: [
        { label: 'Urgent', value: '3' },
        { label: 'High Priority', value: '8' },
        { label: 'Medium Priority', value: '9' },
        { label: 'Low Priority', value: '4' },
      ],
    },
    {
      label: 'Avg Response Time',
      value: '2.4h',
      change: '-0.3h vs last week',
      icon: Clock,
      bgColor: 'from-indigo-500 to-purple-500',
      isPositive: true,
      description: 'Average time to first response for new tickets',
      breakdown: [
        { label: 'Today', value: '2.4h' },
        { label: 'This Week', value: '2.7h' },
        { label: 'This Month', value: '3.1h' },
        { label: 'Target', value: '< 4h' },
      ],
    },
    {
      label: 'Customer Satisfaction',
      value: '94%',
      change: '+2% this month',
      icon: ThumbsUp,
      bgColor: 'from-purple-500 to-pink-500',
      isPositive: true,
      description: 'Based on post-resolution surveys from students',
      breakdown: [
        { label: '5 Stars', value: '78%' },
        { label: '4 Stars', value: '16%' },
        { label: '3 Stars', value: '4%' },
        { label: '1-2 Stars', value: '2%' },
      ],
    },
    {
      label: 'Active Students',
      value: '1,847',
      change: '+124 this week',
      icon: Users,
      bgColor: 'from-pink-500 to-rose-500',
      isPositive: true,
      description: 'Students who logged in within the last 7 days',
      breakdown: [
        { label: 'New This Week', value: '124' },
        { label: 'With Open Tickets', value: '18' },
        { label: 'Premium Members', value: '423' },
        { label: 'In Active Courses', value: '1,256' },
      ],
    },
  ];

  const showFeedback = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <>
      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 bg-blue-500 text-white">
          <span className="text-lg">ℹ️</span>
          <p className="text-sm font-medium">{actionFeedback}</p>
          <button onClick={() => setActionFeedback(null)} className="text-white/80 hover:text-white">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all"
              onClick={() => setSelectedKpi(kpi)}
            >
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

      {/* KPI Detail Modal */}
      {selectedKpi && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedKpi(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className={`bg-gradient-to-br ${selectedKpi.bgColor} p-6 rounded-t-3xl`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <selectedKpi.icon className="w-10 h-10 text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedKpi.label}</h3>
                    <p className="text-white/80 text-sm">{selectedKpi.description}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedKpi(null)} className="text-white/80 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-5xl font-bold text-white">{selectedKpi.value}</p>
                <p className={`text-sm mt-1 ${selectedKpi.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                  {selectedKpi.change}
                </p>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Breakdown</h4>
              <div className="space-y-2">
                {selectedKpi.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    showFeedback(`Opening detailed ${selectedKpi.label} report...`);
                    setSelectedKpi(null);
                  }}
                  className={`flex-1 px-4 py-3 bg-gradient-to-r ${selectedKpi.bgColor} text-white rounded-2xl font-semibold hover:shadow-lg`}
                >
                  View Full Report
                </button>
                <button
                  onClick={() => {
                    showFeedback(`Exporting ${selectedKpi.label} data...`);
                    setSelectedKpi(null);
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportKpiStrip;
