import React from 'react';

interface RevenueSummary {
  gross: number;
  net: number;
  refundRate: number;
  trendData: Array<{
    period: string;
    amount: number;
  }>;
}

interface AdminRevenueOverviewProps {
  summary: RevenueSummary;
  timeframe: string;
}

const AdminRevenueOverview: React.FC<AdminRevenueOverviewProps> = ({ summary, timeframe }) => {
  const maxAmount = Math.max(...summary.trendData.map((d) => d.amount));
  const minAmount = Math.min(...summary.trendData.map((d) => d.amount));

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#111827] mb-1">Revenue Overview</h2>
        <p className="text-sm text-[#5F6473]">
          Platform-wide revenue for {timeframe.toLowerCase()}
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-4 border border-[#EDF0FB]">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Gross Revenue</p>
          <p className="text-2xl font-bold text-[#111827]">
            ${summary.gross.toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-4 border border-[#EDF0FB]">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Net Revenue</p>
          <p className="text-2xl font-bold text-[#22C55E]">
            ${summary.net.toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-4 border border-[#EDF0FB]">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Refund Rate</p>
          <p className="text-2xl font-bold text-[#EF4444]">{summary.refundRate}%</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div>
        <p className="text-sm font-semibold text-[#111827] mb-3">Revenue Trend</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {summary.trendData.map((data, index) => {
            const height = (data.amount / maxAmount) * 100;
            const isPeak = data.amount === maxAmount;
            const isLowest = data.amount === minAmount;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full">
                  {isPeak && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#22C55E] whitespace-nowrap">
                      Peak
                    </div>
                  )}
                  {isLowest && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#EF4444] whitespace-nowrap">
                      Low
                    </div>
                  )}
                  <div
                    className="w-full bg-gradient-to-t from-[#304DB5] to-[#5E7BFF] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${data.period}: $${data.amount.toLocaleString()}`}
                  />
                </div>
                <p className="text-xs text-[#9CA3B5] font-medium">{data.period}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminRevenueOverview;
