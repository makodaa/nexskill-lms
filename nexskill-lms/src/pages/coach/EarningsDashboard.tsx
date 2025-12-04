import React, { useState } from 'react';
import CoachAppLayout from '../../layouts/CoachAppLayout';
import EarningsOverviewHeader from '../../components/coach/earnings/EarningsOverviewHeader';
import RevenueChart from '../../components/coach/earnings/RevenueChart';
import MonthlyPayoutTable from '../../components/coach/earnings/MonthlyPayoutTable';
import TransactionHistoryTable from '../../components/coach/earnings/TransactionHistoryTable';
import AffiliateEarningsPanel from '../../components/coach/earnings/AffiliateEarningsPanel';
import RefundRequestsPanel from '../../components/coach/earnings/RefundRequestsPanel';
import TaxFormsPanel from '../../components/coach/earnings/TaxFormsPanel';

const EarningsDashboard: React.FC = () => {
  // Filter state
  const [filterState, setFilterState] = useState({
    timeframe: '30days',
    currency: 'USD',
  });

  // Earnings summary data
  const summary = {
    currentMonth: 8450,
    lastMonth: 7150,
    allTime: 142800,
    pendingPayouts: 3200,
    deltaMonth: 18,
  };

  // Revenue chart data (last 30 days)
  const revenueData = [
    { label: 'Week 1', amount: 1200 },
    { label: 'Week 2', amount: 1850 },
    { label: 'Week 3', amount: 2100 },
    { label: 'Week 4', amount: 3300 },
  ];

  // Monthly payouts data
  const payouts = [
    {
      id: 'payout-1',
      monthLabel: 'Nov 2025',
      gross: 7150,
      fees: 715,
      refunds: 150,
      net: 6285,
      status: 'Sent' as const,
      payoutDate: '2025-12-01',
    },
    {
      id: 'payout-2',
      monthLabel: 'Oct 2025',
      gross: 9800,
      fees: 980,
      refunds: 200,
      net: 8620,
      status: 'Sent' as const,
      payoutDate: '2025-11-01',
    },
    {
      id: 'payout-3',
      monthLabel: 'Sep 2025',
      gross: 6500,
      fees: 650,
      refunds: 0,
      net: 5850,
      status: 'Sent' as const,
      payoutDate: '2025-10-01',
    },
    {
      id: 'payout-4',
      monthLabel: 'Aug 2025',
      gross: 8200,
      fees: 820,
      refunds: 300,
      net: 7080,
      status: 'Sent' as const,
      payoutDate: '2025-09-01',
    },
    {
      id: 'payout-5',
      monthLabel: 'Dec 2025',
      gross: 8450,
      fees: 845,
      refunds: 100,
      net: 7505,
      status: 'Pending' as const,
    },
  ];

  // Transaction history data
  const transactions = [
    {
      id: 'txn-1',
      date: '2025-12-03',
      time: '10:30 AM',
      studentName: 'Emma Wilson',
      course: 'Advanced Marketing Strategy',
      type: 'Course purchase' as const,
      amount: 299,
      status: 'Completed' as const,
      transactionId: 'TXN-2025-001234',
    },
    {
      id: 'txn-2',
      date: '2025-12-02',
      time: '02:15 PM',
      studentName: 'James Chen',
      course: '1:1 Strategy Session',
      type: 'Coaching session' as const,
      amount: 150,
      status: 'Completed' as const,
      transactionId: 'TXN-2025-001233',
    },
    {
      id: 'txn-3',
      date: '2025-12-02',
      time: '09:45 AM',
      studentName: 'Sophia Martinez',
      course: 'SEO Masterclass',
      type: 'Course purchase' as const,
      amount: 199,
      status: 'Completed' as const,
      transactionId: 'TXN-2025-001232',
    },
    {
      id: 'txn-4',
      date: '2025-12-01',
      time: '04:20 PM',
      studentName: 'Liam Brown',
      course: 'Content Creation Bootcamp',
      type: 'Refund' as const,
      amount: -199,
      status: 'Refunded' as const,
      transactionId: 'TXN-2025-001231',
    },
    {
      id: 'txn-5',
      date: '2025-12-01',
      time: '11:00 AM',
      studentName: 'Olivia Taylor',
      course: 'Digital Marketing Bundle',
      type: 'Course purchase' as const,
      amount: 499,
      status: 'Completed' as const,
      transactionId: 'TXN-2025-001230',
    },
    {
      id: 'txn-6',
      date: '2025-11-30',
      time: '03:30 PM',
      studentName: 'Noah Garcia',
      course: 'Group Workshop',
      type: 'Coaching session' as const,
      amount: 200,
      status: 'Completed' as const,
      transactionId: 'TXN-2025-001229',
    },
    {
      id: 'txn-7',
      date: '2025-11-30',
      time: '10:15 AM',
      studentName: 'Ava Rodriguez',
      course: 'Email Marketing Mastery',
      type: 'Course purchase' as const,
      amount: 149,
      status: 'Pending' as const,
      transactionId: 'TXN-2025-001228',
    },
    {
      id: 'txn-8',
      date: '2025-11-29',
      time: '01:45 PM',
      studentName: 'Ethan Kim',
      course: 'Social Media Strategy',
      type: 'Course purchase' as const,
      amount: 179,
      status: 'Completed' as const,
      transactionId: 'TXN-2025-001227',
    },
  ];

  // Affiliate data
  const affiliates = [
    {
      id: 'aff-1',
      code: 'UX-REF-ALEX',
      name: 'Alex Marketing Pro',
      referredCount: 24,
      revenue: 4800,
      commission: 720,
      status: 'Active' as const,
    },
    {
      id: 'aff-2',
      code: 'PARTNER-SARAH',
      name: 'Sarah Digital Agency',
      referredCount: 18,
      revenue: 3600,
      commission: 540,
      status: 'Active' as const,
    },
    {
      id: 'aff-3',
      code: 'COACH-MIKE',
      name: 'Mike Business Coach',
      referredCount: 12,
      revenue: 2400,
      commission: 360,
      status: 'Paused' as const,
    },
  ];

  // Refund requests data
  const refunds = [
    {
      id: 'ref-1',
      date: '2025-12-01',
      studentName: 'Liam Brown',
      course: 'Content Creation Bootcamp',
      amount: 199,
      reason: 'Course content did not match expectations. Requested alternative.',
      status: 'Pending review' as const,
    },
    {
      id: 'ref-2',
      date: '2025-11-28',
      studentName: 'Isabella White',
      course: 'Advanced SEO Tactics',
      amount: 249,
      reason: 'Technical issues accessing course materials.',
      status: 'Approved' as const,
    },
    {
      id: 'ref-3',
      date: '2025-11-25',
      studentName: 'Mason Lee',
      course: 'Email Marketing 101',
      amount: 99,
      reason: 'Purchased by mistake, already owns similar course.',
      status: 'Approved' as const,
    },
    {
      id: 'ref-4',
      date: '2025-11-22',
      studentName: 'Charlotte Davis',
      course: 'Social Media Workshop',
      amount: 149,
      reason: 'Found better alternative course elsewhere.',
      status: 'Declined' as const,
    },
  ];

  return (
    <CoachAppLayout>
      <div className="p-8 space-y-8">
        {/* Header with KPIs and Filters */}
        <EarningsOverviewHeader
          summary={summary}
          filterState={filterState}
          onFilterChange={setFilterState}
        />

        {/* Row 1: Revenue Chart + Compact Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart
              data={revenueData}
              timeframe={filterState.timeframe}
              currency={filterState.currency}
            />
          </div>
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
              <h3 className="text-sm font-semibold text-[#5F6473] uppercase tracking-wider mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#5F6473]">Courses Sold</p>
                  <p className="text-lg font-bold text-[#111827]">47</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#5F6473]">Coaching Sessions</p>
                  <p className="text-lg font-bold text-[#111827]">12</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#5F6473]">Avg. Transaction</p>
                  <p className="text-lg font-bold text-[#304DB5]">$179</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#EDF0FB]">
                  <p className="text-sm text-[#5F6473]">Success Rate</p>
                  <p className="text-lg font-bold text-[#22C55E]">94.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Monthly Payouts + Affiliate Earnings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthlyPayoutTable payouts={payouts} currency={filterState.currency} />
          </div>
          <div>
            <AffiliateEarningsPanel affiliates={affiliates} currency={filterState.currency} />
          </div>
        </div>

        {/* Row 3: Transaction History + Refunds + Tax Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionHistoryTable
              transactions={transactions}
              currency={filterState.currency}
            />
          </div>
          <div className="space-y-6">
            <RefundRequestsPanel refunds={refunds} currency={filterState.currency} />
            <TaxFormsPanel />
          </div>
        </div>
      </div>
    </CoachAppLayout>
  );
};

export default EarningsDashboard;
