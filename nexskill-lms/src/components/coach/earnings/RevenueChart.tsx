import React from 'react';

interface RevenueDataPoint {
  label: string;
  amount: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  timeframe: string;
  currency: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, timeframe, currency }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate stats
  const maxAmount = Math.max(...data.map((d) => d.amount));
  const minAmount = Math.min(...data.map((d) => d.amount));
  const peakDay = data.find((d) => d.amount === maxAmount);
  const lowestDay = data.find((d) => d.amount === minAmount);
  const avgAmount = data.reduce((sum, d) => sum + d.amount, 0) / data.length;

  // Normalize bar heights (0-100%)
  const normalizeHeight = (amount: number) => {
    if (maxAmount === 0) return 0;
    return Math.max((amount / maxAmount) * 100, 5); // Min 5% for visibility
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#111827]">Revenue Over Time</h3>
          <p className="text-sm text-[#5F6473] mt-1">{timeframe}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#9CA3B5] mb-1">Average</p>
          <p className="text-lg font-bold text-[#304DB5]">{formatCurrency(avgAmount)}</p>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 mb-6">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[100, 75, 50, 25, 0].map((percent) => (
            <div key={percent} className="flex items-center">
              <span className="text-xs text-[#9CA3B5] w-12">
                {formatCurrency((maxAmount * percent) / 100)}
              </span>
              <div className="flex-1 h-px bg-[#EDF0FB] ml-2" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-between gap-2 pl-14 pr-2">
          {data.map((point, index) => {
            const height = normalizeHeight(point.amount);
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-[#304DB5] to-[#5E7BFF] rounded-t-lg hover:opacity-80 transition-all cursor-pointer relative"
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-[#111827] text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      <p className="font-semibold">{point.label}</p>
                      <p>{formatCurrency(point.amount)}</p>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <p className="text-xs text-[#9CA3B5] mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                  {point.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#EDF0FB]">
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-[#22C55E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <p className="text-xs font-semibold text-[#5F6473] uppercase">Peak Day</p>
          </div>
          <p className="text-sm font-medium text-[#111827] mb-1">{peakDay?.label}</p>
          <p className="text-lg font-bold text-[#22C55E]">
            {formatCurrency(peakDay?.amount || 0)}
          </p>
        </div>

        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-[#F97316]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
            <p className="text-xs font-semibold text-[#5F6473] uppercase">Lowest Day</p>
          </div>
          <p className="text-sm font-medium text-[#111827] mb-1">{lowestDay?.label}</p>
          <p className="text-lg font-bold text-[#F97316]">
            {formatCurrency(lowestDay?.amount || 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
