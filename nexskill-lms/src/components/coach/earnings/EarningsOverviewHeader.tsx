import React from 'react';

interface EarningsSummary {
  currentMonth: number;
  lastMonth: number;
  allTime: number;
  pendingPayouts: number;
  deltaMonth: number;
}

interface FilterState {
  timeframe: string;
  currency: string;
}

interface EarningsOverviewHeaderProps {
  summary: EarningsSummary;
  filterState: FilterState;
  onFilterChange: (updatedFilterState: FilterState) => void;
}

const EarningsOverviewHeader: React.FC<EarningsOverviewHeaderProps> = ({
  summary,
  filterState,
  onFilterChange,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: filterState.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDelta = (delta: number) => {
    const sign = delta >= 0 ? '+' : '';
    return `${sign}${delta}%`;
  };

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return 'text-[#22C55E]';
    if (delta < 0) return 'text-[#F97316]';
    return 'text-[#9CA3B5]';
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDF0FB] p-8 shadow-xl">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Earnings Dashboard</h1>
          <p className="text-[#5F6473]">
            Track your course revenue, payouts, and affiliate earnings
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <select
            value={filterState.timeframe}
            onChange={(e) =>
              onFilterChange({ ...filterState, timeframe: e.target.value })
            }
            className="px-4 py-2 rounded-xl border border-[#EDF0FB] bg-white text-[#111827] font-medium focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="thisyear">This year</option>
            <option value="alltime">All time</option>
          </select>

          <select
            value={filterState.currency}
            onChange={(e) =>
              onFilterChange({ ...filterState, currency: e.target.value })
            }
            className="px-4 py-2 rounded-xl border border-[#EDF0FB] bg-white text-[#111827] font-medium focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
          >
            <option value="USD">USD</option>
            <option value="PHP">PHP</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      {/* KPI Band */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* This Month's Earnings */}
        <div className="bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">This Month</p>
            <svg
              className="w-6 h-6 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(summary.currentMonth)}</p>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${getDeltaColor(summary.deltaMonth)}`}>
              {formatDelta(summary.deltaMonth)}
            </span>
            <span className="text-xs opacity-80">vs last month</span>
          </div>
        </div>

        {/* Last Month */}
        <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5F6473]">Last Month</p>
            <svg
              className="w-6 h-6 text-[#9CA3B5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-3xl font-bold text-[#111827] mb-1">
            {formatCurrency(summary.lastMonth)}
          </p>
          <p className="text-xs text-[#9CA3B5]">Previous period</p>
        </div>

        {/* All-Time Earnings */}
        <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5F6473]">All-Time Earnings</p>
            <svg
              className="w-6 h-6 text-[#22C55E]"
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
          </div>
          <p className="text-3xl font-bold text-[#111827] mb-1">
            {formatCurrency(summary.allTime)}
          </p>
          <p className="text-xs text-[#9CA3B5]">Lifetime revenue</p>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5F6473]">Pending Payouts</p>
            <svg
              className="w-6 h-6 text-[#F97316]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-3xl font-bold text-[#111827] mb-1">
            {formatCurrency(summary.pendingPayouts)}
          </p>
          <p className="text-xs text-[#9CA3B5]">Awaiting transfer</p>
        </div>
      </div>
    </div>
  );
};

export default EarningsOverviewHeader;
