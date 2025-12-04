import React from 'react';

interface GlobalFilters {
  timeframe: string;
  segment: string;
}

interface CoachAnalytics {
  activeCoaches: number;
  newCoachesThisPeriod: number;
  avgCoursesPerCoach: number;
  avgRevenuePerCoach: number;
  coachActivityTrend: { label: string; value: number }[];
  topCoaches: { name: string; courses: number; students: number; rating: number }[];
}

interface CoachAnalyticsPanelProps {
  data: CoachAnalytics;
  filters: GlobalFilters;
}

const CoachAnalyticsPanel: React.FC<CoachAnalyticsPanelProps> = ({ data }) => {
  const maxTrendValue = Math.max(...data.coachActivityTrend.map((t) => t.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">Coach analytics</h2>
        <p className="text-gray-600 mt-1">Monitor coach engagement, content volume, and impact.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Active Coaches</div>
          <div className="text-2xl font-bold text-gray-900">{data.activeCoaches}</div>
          <div className="text-xs text-green-600 mt-1">Currently teaching</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">New Coaches</div>
          <div className="text-2xl font-bold text-gray-900">+{data.newCoachesThisPeriod}</div>
          <div className="text-xs text-blue-600 mt-1">This period</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Avg Courses/Coach</div>
          <div className="text-2xl font-bold text-gray-900">{data.avgCoursesPerCoach.toFixed(1)}</div>
          <div className="text-xs text-gray-500 mt-1">Per active coach</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Avg Revenue/Coach</div>
          <div className="text-2xl font-bold text-gray-900">
            ${data.avgRevenuePerCoach.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">Monthly average</div>
        </div>
      </div>

      {/* Coach Activity Trend */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Coach Activity Trend</h3>
        <div className="flex items-end justify-between gap-4 h-48">
          {data.coachActivityTrend.map((point, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg transition-all"
                  style={{ height: `${(point.value / maxTrendValue) * 100}%` }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-gray-700">{point.label}</div>
                <div className="text-xs text-gray-500">{point.value}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">Number of active coaches over time</p>
      </div>

      {/* Top Coaches */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Coaches</h3>
        <div className="space-y-3">
          {data.topCoaches.map((coach, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-4 hover:border-[#304DB5] hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {coach.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{coach.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <span>📚 {coach.courses} courses</span>
                      <span>•</span>
                      <span>👥 {coach.students} students</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-lg font-bold text-gray-900">{coach.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">Avg rating</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-purple-600 text-xl">💡</span>
          <div className="text-sm text-purple-800">
            <strong>Insight:</strong> Top coaches drive platform growth through quality content and
            strong student engagement. Consider featuring them in marketing campaigns.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAnalyticsPanel;
