import React from 'react';

interface Affiliate {
  id: string;
  code: string;
  name: string;
  referredCount: number;
  revenue: number;
  commission: number;
  status: 'Active' | 'Paused';
}

interface AffiliateEarningsPanelProps {
  affiliates: Affiliate[];
  currency: string;
}

const AffiliateEarningsPanel: React.FC<AffiliateEarningsPanelProps> = ({
  affiliates,
  currency,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = affiliates.reduce((sum, a) => sum + a.revenue, 0);
  const activeAffiliates = affiliates.filter((a) => a.status === 'Active').length;
  const totalReferred = affiliates.reduce((sum, a) => sum + a.referredCount, 0);
  const conversionRate = totalReferred > 0 ? Math.round((totalReferred / (totalReferred * 3)) * 100) : 0; // Simulated

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-[#22C55E] text-white'
      : 'bg-gray-400 text-white';
  };

  const viewAffiliateDetails = (affiliateId: string) => {
    console.log('View affiliate details:', affiliateId);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827] mb-1">Affiliate Earnings</h3>
        <p className="text-sm text-[#5F6473]">Revenue from affiliate partnerships</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] rounded-xl p-4 text-white">
          <p className="text-xs opacity-90 mb-1">Total Revenue</p>
          <p className="text-xl font-bold">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] mb-1">Active Affiliates</p>
          <p className="text-xl font-bold text-[#111827]">{activeAffiliates}</p>
        </div>
        <div className="bg-[#F5F7FF] rounded-xl p-4">
          <p className="text-xs text-[#9CA3B5] mb-1">Conversion</p>
          <p className="text-xl font-bold text-[#111827]">{conversionRate}%</p>
        </div>
      </div>

      {/* Affiliate List */}
      <div className="space-y-3">
        {affiliates.map((affiliate) => (
          <div
            key={affiliate.id}
            className="border border-[#EDF0FB] rounded-xl p-4 hover:border-[#304DB5] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#111827]">{affiliate.name}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      affiliate.status
                    )}`}
                  >
                    {affiliate.status}
                  </span>
                </div>
                <p className="text-xs text-[#9CA3B5] font-mono">{affiliate.code}</p>
              </div>
              <button
                onClick={() => viewAffiliateDetails(affiliate.id)}
                className="px-3 py-1 text-xs font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Referred</p>
                <p className="font-medium text-[#111827]">{affiliate.referredCount} students</p>
              </div>
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Revenue</p>
                <p className="font-medium text-[#111827]">{formatCurrency(affiliate.revenue)}</p>
              </div>
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Commission</p>
                <p className="font-bold text-[#22C55E]">{formatCurrency(affiliate.commission)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {affiliates.length === 0 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">🤝</div>
          <p className="text-sm text-[#5F6473] mb-2">No affiliate partners yet</p>
          <p className="text-xs text-[#9CA3B5]">
            Start an affiliate program to boost your reach
          </p>
        </div>
      )}

      {/* Footer Action */}
      <div className="mt-6 pt-6 border-t border-[#EDF0FB]">
        <button
          onClick={() => console.log('Manage affiliate program')}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
        >
          Manage Affiliate Program
        </button>
      </div>
    </div>
  );
};

export default AffiliateEarningsPanel;
