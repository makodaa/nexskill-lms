import React, { useState } from 'react';

interface RefundRequest {
  id: string;
  date: string;
  studentName: string;
  course: string;
  amount: number;
  reason: string;
  status: 'Pending review' | 'Approved' | 'Declined';
}

interface RefundRequestsPanelProps {
  refunds: RefundRequest[];
  currency: string;
}

const RefundRequestsPanel: React.FC<RefundRequestsPanelProps> = ({ refunds: initialRefunds, currency }) => {
  const [refunds, setRefunds] = useState(initialRefunds);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending review':
        return 'bg-[#F97316] text-white';
      case 'Approved':
        return 'bg-[#22C55E] text-white';
      case 'Declined':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const openRequests = refunds.filter((r) => r.status === 'Pending review').length;
  const refundRate = 5.2; // Simulated percentage

  const handleApprove = (refundId: string) => {
    setRefunds(
      refunds.map((r) =>
        r.id === refundId ? { ...r, status: 'Approved' as const } : r
      )
    );
    console.log('Approved refund:', refundId);
  };

  const handleDecline = (refundId: string) => {
    setRefunds(
      refunds.map((r) =>
        r.id === refundId ? { ...r, status: 'Declined' as const } : r
      )
    );
    console.log('Declined refund:', refundId);
  };

  const viewDetails = (refundId: string) => {
    console.log('View refund details:', refundId);
  };

  // Show top 5 most recent
  const displayedRefunds = refunds.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827] mb-1">Refund Requests</h3>
        <p className="text-sm text-[#5F6473]">Manage refund requests from students</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#FEF3E7] rounded-xl p-4">
          <p className="text-xs text-[#F97316] mb-1">Open Requests</p>
          <p className="text-2xl font-bold text-[#111827]">{openRequests}</p>
        </div>
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] mb-1">Refund Rate</p>
          <p className="text-2xl font-bold text-[#111827]">{refundRate}%</p>
        </div>
      </div>

      {/* Refund List */}
      <div className="space-y-3">
        {displayedRefunds.map((refund) => (
          <div
            key={refund.id}
            className="border border-[#EDF0FB] rounded-xl p-4 hover:border-[#304DB5] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-semibold text-[#111827] mb-1">{refund.studentName}</p>
                <p className="text-sm text-[#5F6473] mb-1">{refund.course}</p>
                <p className="text-xs text-[#9CA3B5]">{refund.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#F97316] mb-2">{formatCurrency(refund.amount)}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    refund.status
                  )}`}
                >
                  {refund.status}
                </span>
              </div>
            </div>

            <div className="bg-[#F5F7FF] rounded-lg p-3 mb-3">
              <p className="text-xs text-[#9CA3B5] mb-1">Reason</p>
              <p className="text-sm text-[#111827]">{refund.reason}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {refund.status === 'Pending review' ? (
                <>
                  <button
                    onClick={() => handleApprove(refund.id)}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white bg-[#22C55E] rounded-lg hover:bg-[#16A34A] transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(refund.id)}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white bg-[#EF4444] rounded-lg hover:bg-[#DC2626] transition-colors"
                  >
                    Decline
                  </button>
                </>
              ) : (
                <button
                  onClick={() => viewDetails(refund.id)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayedRefunds.length === 0 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">✅</div>
          <p className="text-sm text-[#5F6473] mb-2">No refund requests</p>
          <p className="text-xs text-[#9CA3B5]">You're all caught up!</p>
        </div>
      )}

      {/* Footer */}
      {refunds.length > 5 && (
        <div className="mt-6 pt-6 border-t border-[#EDF0FB] text-center">
          <button
            onClick={() => console.log('View all refunds')}
            className="text-sm font-medium text-[#304DB5] hover:underline"
          >
            View all {refunds.length} refund requests →
          </button>
        </div>
      )}
    </div>
  );
};

export default RefundRequestsPanel;
