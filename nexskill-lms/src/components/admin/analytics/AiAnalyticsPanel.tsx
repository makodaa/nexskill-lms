import React from 'react';

interface AiAnalytics {
  totalAiRequests: number;
  uniqueAiUsers: number;
  avgResponseTimeMs: number;
  errorRate: number;
  estimatedCostThisPeriod: number;
  requestsByTool: { tool: string; count: number }[];
  loadByHour: { hourLabel: string; requests: number }[];
  usageByRole: { role: string; requests: number }[];
}

interface GlobalFilters {
  timeframe: string;
  segment: string;
}

interface AiAnalyticsPanelProps {
  data: AiAnalytics;
  filters: GlobalFilters;
}

const AiAnalyticsPanel: React.FC<AiAnalyticsPanelProps> = ({ data }) => {
  const maxToolRequests = Math.max(...data.requestsByTool.map((t) => t.count), 1);
  const maxHourRequests = Math.max(...data.loadByHour.map((h) => h.requests), 1);
  const maxRoleRequests = Math.max(...data.usageByRole.map((r) => r.requests), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">AI Analytics</h2>
        <p className="text-gray-600">
          Monitor AI usage, load, and estimated cost across NexSkill.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6">
          <div className="text-sm text-indigo-700 mb-1">Total AI Requests</div>
          <div className="text-3xl font-bold text-indigo-900">
            {data.totalAiRequests.toLocaleString()}
          </div>
          <div className="text-xs text-indigo-600 mt-1">This period</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
          <div className="text-sm text-purple-700 mb-1">Unique AI Users</div>
          <div className="text-3xl font-bold text-purple-900">
            {data.uniqueAiUsers.toLocaleString()}
          </div>
          <div className="text-xs text-purple-600 mt-1">Active users</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
          <div className="text-sm text-blue-700 mb-1">Avg Response Time</div>
          <div className="text-3xl font-bold text-blue-900">{data.avgResponseTimeMs}ms</div>
          <div className="text-xs text-blue-600 mt-1">Average latency</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6">
          <div className="text-sm text-red-700 mb-1">Error Rate</div>
          <div className="text-3xl font-bold text-red-900">{data.errorRate.toFixed(2)}%</div>
          <div className="text-xs text-red-600 mt-1">Failed requests</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
          <div className="text-sm text-green-700 mb-1">Estimated Cost</div>
          <div className="text-3xl font-bold text-green-900">
            ${data.estimatedCostThisPeriod.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">This period</div>
        </div>
      </div>

      {/* Usage Breakdown and Load Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests by Tool */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Requests by Tool</h3>
          <div className="space-y-3">
            {data.requestsByTool.map((tool) => {
              const widthPercent = (tool.count / maxToolRequests) * 100;
              return (
                <div key={tool.tool}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{tool.tool}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {tool.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage by Role */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Usage by Role</h3>
          <div className="space-y-3">
            {data.usageByRole.map((role) => {
              const widthPercent = (role.requests / maxRoleRequests) * 100;
              const bgColor =
                role.role === 'Student'
                  ? 'from-blue-500 to-blue-600'
                  : role.role === 'Coach'
                  ? 'from-green-500 to-green-600'
                  : 'from-orange-500 to-orange-600';
              return (
                <div key={role.role}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{role.role}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {role.requests.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${bgColor} h-3 rounded-full transition-all`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Load Pattern: Requests by Hour */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Requests by Hour</h3>
        <div className="flex items-end justify-between gap-1 h-48">
          {data.loadByHour.map((hour) => {
            const heightPercent = (hour.requests / maxHourRequests) * 100;
            return (
              <div key={hour.hourLabel} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center h-40">
                  <div
                    className="w-full bg-gradient-to-t from-[#304DB5] to-blue-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                    style={{ height: `${heightPercent}%` }}
                    title={`${hour.hourLabel}: ${hour.requests} requests`}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {hour.requests}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{hour.hourLabel}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h4 className="text-sm font-bold text-yellow-900 mb-1">Note</h4>
            <p className="text-sm text-yellow-800">
              All values are simulated for UI purposes; no real cost calculation or AI tracking is
              performed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAnalyticsPanel;
