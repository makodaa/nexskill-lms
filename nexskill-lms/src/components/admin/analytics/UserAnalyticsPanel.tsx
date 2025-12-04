import React from 'react';

interface GlobalFilters {
  timeframe: string;
  segment: string;
}

interface UserAnalytics {
  dau: number;
  mau: number;
  dauMauRatio: number;
  newUsers: number;
  returningUsers: number;
  retentionCurve: { dayLabel: string; percentage: number }[];
  activityByRegion: { region: string; users: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
}

interface UserAnalyticsPanelProps {
  data: UserAnalytics;
  filters: GlobalFilters;
}

const UserAnalyticsPanel: React.FC<UserAnalyticsPanelProps> = ({ data }) => {
  const maxRegionalUsers = Math.max(...data.activityByRegion.map((r) => r.users));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">User analytics</h2>
        <p className="text-gray-600 mt-1">Track growth, engagement, and retention.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Daily Active Users</div>
          <div className="text-2xl font-bold text-gray-900">{data.dau.toLocaleString()}</div>
          <div className="text-xs text-blue-600 mt-1">Live metric</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">Monthly Active Users</div>
          <div className="text-2xl font-bold text-gray-900">{data.mau.toLocaleString()}</div>
          <div className="text-xs text-blue-600 mt-1">30-day window</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">DAU/MAU Ratio</div>
          <div className="text-2xl font-bold text-gray-900">{data.dauMauRatio}%</div>
          <div className="text-xs text-green-600 mt-1">Healthy engagement</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="text-sm text-gray-600 mb-1">New vs Returning</div>
          <div className="text-2xl font-bold text-gray-900">
            {data.newUsers.toLocaleString()} / {data.returningUsers.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">This period</div>
        </div>
      </div>

      {/* Retention Curve */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Retention Curve</h3>
        <div className="flex items-end justify-between gap-4 h-48">
          {data.retentionCurve.map((point, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-[#304DB5] to-[#5E7BFF] rounded-t-lg transition-all"
                  style={{ height: `${point.percentage}%` }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-gray-700">{point.dayLabel}</div>
                <div className="text-xs text-gray-500">{point.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Percentage of users who return to the platform over time
        </p>
      </div>

      {/* Regional Breakdown & Device Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regional Activity */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity by Region</h3>
          <div className="space-y-4">
            {data.activityByRegion.map((region, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{region.region}</span>
                  <span className="text-sm text-gray-900 font-semibold">
                    {region.users.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] h-2 rounded-full transition-all"
                    style={{ width: `${(region.users / maxRegionalUsers) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {data.deviceBreakdown.map((device, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {device.device === 'Desktop'
                        ? '💻'
                        : device.device === 'Mobile'
                        ? '📱'
                        : '📱'}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{device.device}</span>
                  </div>
                  <span className="text-sm text-gray-900 font-semibold">{device.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      device.device === 'Desktop'
                        ? 'bg-blue-500'
                        : device.device === 'Mobile'
                        ? 'bg-green-500'
                        : 'bg-purple-500'
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div className="text-sm text-blue-800">
            <strong>Insight:</strong> User engagement metrics are updated in real-time. DAU/MAU ratio
            above 30% indicates strong daily engagement and platform stickiness.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalyticsPanel;
