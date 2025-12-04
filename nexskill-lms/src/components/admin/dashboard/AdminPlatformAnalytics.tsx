import React from 'react';

interface PlatformAnalytics {
  dau: number;
  mau: number;
  dauMauRatio: number;
  avgSessionsPerUser: number;
  avgTimePerSession: string;
  topGeographies: Array<{
    country: string;
    percentage: number;
  }>;
  topDevices: Array<{
    device: string;
    percentage: number;
  }>;
}

interface AdminPlatformAnalyticsProps {
  analytics: PlatformAnalytics;
}

const AdminPlatformAnalytics: React.FC<AdminPlatformAnalyticsProps> = ({ analytics }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#111827] mb-1">Platform Analytics</h2>
        <p className="text-sm text-[#5F6473]">Engagement and usage metrics</p>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Daily Active Users</p>
          <p className="text-2xl font-bold text-[#304DB5]">
            {analytics.dau.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Monthly Active Users</p>
          <p className="text-2xl font-bold text-[#304DB5]">
            {analytics.mau.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">DAU/MAU Ratio</p>
          <p className="text-2xl font-bold text-[#22C55E]">{analytics.dauMauRatio}%</p>
        </div>
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Avg Sessions/User</p>
          <p className="text-2xl font-bold text-[#304DB5]">{analytics.avgSessionsPerUser}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-4 border border-[#EDF0FB] mb-6">
        <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Avg Time per Session</p>
        <p className="text-2xl font-bold text-[#111827]">{analytics.avgTimePerSession}</p>
      </div>

      {/* Top Geographies */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#111827] mb-3">Top Geographies</p>
        <div className="space-y-3">
          {analytics.topGeographies.map((geo, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#111827]">{geo.country}</span>
                <span className="text-sm font-semibold text-[#304DB5]">{geo.percentage}%</span>
              </div>
              <div className="w-full bg-[#EDF0FB] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] h-2 rounded-full transition-all"
                  style={{ width: `${geo.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Devices */}
      <div>
        <p className="text-sm font-semibold text-[#111827] mb-3">Device Distribution</p>
        <div className="space-y-3">
          {analytics.topDevices.map((device, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#111827]">{device.device}</span>
                <span className="text-sm font-semibold text-[#22C55E]">{device.percentage}%</span>
              </div>
              <div className="w-full bg-[#EDF0FB] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#22C55E] to-[#10B981] h-2 rounded-full transition-all"
                  style={{ width: `${device.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPlatformAnalytics;
