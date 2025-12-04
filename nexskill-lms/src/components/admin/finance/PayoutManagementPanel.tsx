import React, { useState } from 'react';

interface Payout {
  id: string;
  periodLabel: string;
  totalAmount: number;
  status: 'scheduled' | 'processing' | 'paid' | 'on_hold';
  scheduledDate: string;
  paidDate?: string;
  destinationSummary: string;
}

interface PayoutManagementPanelProps {
  payouts: Payout[];
  onUpdatePayout: (payoutId: string, updatedFields: Partial<Payout>) => void;
}

const PayoutManagementPanel: React.FC<PayoutManagementPanelProps> = ({
  payouts,
  onUpdatePayout,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'processing' | 'paid'>('all');

  const getStatusConfig = (status: Payout['status']) => {
    switch (status) {
      case 'scheduled':
        return {
          label: 'Scheduled',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
        };
      case 'processing':
        return {
          label: 'Processing',
          bg: 'bg-[#FEF3C7]',
          text: 'text-[#92400E]',
        };
      case 'paid':
        return {
          label: 'Paid',
          bg: 'bg-[#D1FAE5]',
          text: 'text-[#047857]',
        };
      case 'on_hold':
        return {
          label: 'On Hold',
          bg: 'bg-[#FED7AA]',
          text: 'text-[#9A3412]',
        };
    }
  };

  const filteredPayouts = payouts.filter((payout) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'scheduled') return payout.status === 'scheduled';
    if (activeTab === 'processing') return payout.status === 'processing';
    if (activeTab === 'paid') return payout.status === 'paid';
    return true;
  });

  const nextScheduledPayout = payouts
    .filter((p) => p.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())[0];

  const totalNextBatchAmount = payouts
    .filter((p) => p.status === 'scheduled')
    .reduce((sum, p) => sum + p.totalAmount, 0);

  const batchesOnHold = payouts.filter((p) => p.status === 'on_hold').length;

  const handleViewDetails = (payoutId: string) => {
    console.log('Viewing payout details:', payoutId);
    window.alert(`Payout ${payoutId} details would be displayed here.`);
  };

  const handleHold = (payoutId: string) => {
    console.log('Holding payout:', payoutId);
    onUpdatePayout(payoutId, { status: 'on_hold' });
    window.alert(`Payout ${payoutId} has been placed on hold.`);
  };

  const handleReleaseHold = (payoutId: string) => {
    console.log('Releasing hold on payout:', payoutId);
    onUpdatePayout(payoutId, { status: 'scheduled' });
    window.alert(`Payout ${payoutId} hold has been released.`);
  };

  const handleMarkAsPaid = (payoutId: string) => {
    console.log('Marking payout as paid:', payoutId);
    const today = new Date().toISOString().split('T')[0];
    onUpdatePayout(payoutId, { status: 'paid', paidDate: today });
    window.alert(`Payout ${payoutId} has been marked as paid.`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-md p-5">
      {/* Header */}
      <h2 className="text-lg font-bold text-[#111827] mb-4">Payout Management</h2>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'bg-[#304DB5] text-white'
              : 'bg-[#F5F7FF] text-[#5F6473] hover:bg-[#EDF0FB]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
            activeTab === 'scheduled'
              ? 'bg-[#304DB5] text-white'
              : 'bg-[#F5F7FF] text-[#5F6473] hover:bg-[#EDF0FB]'
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setActiveTab('processing')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
            activeTab === 'processing'
              ? 'bg-[#304DB5] text-white'
              : 'bg-[#F5F7FF] text-[#5F6473] hover:bg-[#EDF0FB]'
          }`}
        >
          Processing
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
            activeTab === 'paid'
              ? 'bg-[#304DB5] text-white'
              : 'bg-[#F5F7FF] text-[#5F6473] hover:bg-[#EDF0FB]'
          }`}
        >
          Paid
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-[#DBEAFE] to-white rounded-xl border border-[#93C5FD]">
          <p className="text-xs text-[#1E40AF] mb-1">Next Payout Batch</p>
          <p className="text-sm font-bold text-[#111827]">
            {nextScheduledPayout ? nextScheduledPayout.scheduledDate : 'N/A'}
          </p>
        </div>
        <div className="p-3 bg-gradient-to-br from-[#D1FAE5] to-white rounded-xl border border-[#6EE7B7]">
          <p className="text-xs text-[#047857] mb-1">Amount in Next Batch</p>
          <p className="text-sm font-bold text-[#111827]">
            ${totalNextBatchAmount.toLocaleString()}
          </p>
        </div>
        {batchesOnHold > 0 && (
          <div className="p-3 bg-gradient-to-br from-[#FED7AA] to-white rounded-xl border border-[#FDBA74]">
            <p className="text-xs text-[#9A3412] mb-1">Batches On Hold</p>
            <p className="text-sm font-bold text-[#111827]">{batchesOnHold}</p>
          </div>
        )}
      </div>

      {/* Payout List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {filteredPayouts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-sm font-semibold text-[#111827] mb-1">No payouts found</p>
            <p className="text-xs text-[#9CA3B5]">No payouts match the selected filter</p>
          </div>
        )}
        {filteredPayouts.map((payout) => {
          const statusConfig = getStatusConfig(payout.status);

          return (
            <div
              key={payout.id}
              className="p-3 rounded-xl border border-[#EDF0FB] bg-gradient-to-br from-[#F5F7FF] to-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-[#111827] mb-1">
                    {payout.periodLabel}
                  </div>
                  <div className="text-xs text-[#9CA3B5]">{payout.destinationSummary}</div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Amount & Date */}
              <div className="mb-3">
                <div className="text-lg font-bold text-[#111827] mb-1">
                  ${payout.totalAmount.toLocaleString()}
                </div>
                <div className="text-xs text-[#5F6473]">
                  {payout.status === 'paid' && payout.paidDate && (
                    <span>Paid on {payout.paidDate}</span>
                  )}
                  {payout.status === 'scheduled' && (
                    <span>Scheduled for {payout.scheduledDate}</span>
                  )}
                  {payout.status === 'processing' && (
                    <span>Processing since {payout.scheduledDate}</span>
                  )}
                  {payout.status === 'on_hold' && <span>On hold</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E5E7EB]/50 text-xs">
                <button
                  onClick={() => handleViewDetails(payout.id)}
                  className="font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                >
                  View Details
                </button>

                {payout.status === 'scheduled' && (
                  <>
                    <span className="text-[#E5E7EB]">|</span>
                    <button
                      onClick={() => handleHold(payout.id)}
                      className="font-semibold text-[#D97706] hover:text-[#F59E0B] transition-colors"
                    >
                      Hold
                    </button>
                    <span className="text-[#E5E7EB]">|</span>
                    <button
                      onClick={() => handleMarkAsPaid(payout.id)}
                      className="font-semibold text-[#059669] hover:text-[#10B981] transition-colors"
                    >
                      Mark as Paid
                    </button>
                  </>
                )}

                {payout.status === 'on_hold' && (
                  <>
                    <span className="text-[#E5E7EB]">|</span>
                    <button
                      onClick={() => handleReleaseHold(payout.id)}
                      className="font-semibold text-[#059669] hover:text-[#10B981] transition-colors"
                    >
                      Release Hold
                    </button>
                  </>
                )}

                {payout.status === 'processing' && (
                  <>
                    <span className="text-[#E5E7EB]">|</span>
                    <button
                      onClick={() => handleMarkAsPaid(payout.id)}
                      className="font-semibold text-[#059669] hover:text-[#10B981] transition-colors"
                    >
                      Mark as Paid
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayoutManagementPanel;
