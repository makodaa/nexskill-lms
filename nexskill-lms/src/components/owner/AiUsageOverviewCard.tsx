import React from 'react';

interface AiUsageOverviewCardProps {
  aiUsage: {
    totalRequests: number;
    estimatedCostUsd: number;
    topTools: { name: string; requests: number }[];
  };
}

const AiUsageOverviewCard: React.FC<AiUsageOverviewCardProps> = ({ aiUsage }) => {
  const maxRequests = Math.max(...aiUsage.topTools.map(t => t.requests));

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB] shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary mb-1">AI Usage Overview</h3>
        <p className="text-sm text-text-secondary">Platform-wide AI consumption metrics</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-purple-700">
            {(aiUsage.totalRequests / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">Est. Cost</p>
          <p className="text-2xl font-bold text-amber-700">
            ${aiUsage.estimatedCostUsd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Top Tools */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3">Top AI Tools</h4>
        <div className="space-y-3">
          {aiUsage.topTools.map((tool, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">{tool.name}</span>
                <span className="text-xs font-medium text-text-muted">
                  {tool.requests.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-[#F5F7FF] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${(tool.requests / maxRequests) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiUsageOverviewCard;
