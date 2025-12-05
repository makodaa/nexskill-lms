import React from 'react';

const OrgSeatsSummaryCard: React.FC = () => {
  const totalSeats = 200;
  const usedSeats = 142;
  const remainingSeats = totalSeats - usedSeats;
  const usagePercentage = (usedSeats / totalSeats) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-1">Seat Usage</h3>
          <p className="text-sm text-text-secondary">Current license allocation</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
          🎫
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            {usedSeats} of {totalSeats} seats used
          </span>
          <span className="text-sm font-bold text-orange-600">
            {usagePercentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-text-primary mb-1">{totalSeats}</p>
          <p className="text-xs text-text-muted">Total</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <p className="text-2xl font-bold text-green-700 mb-1">{usedSeats}</p>
          <p className="text-xs text-text-muted">Used</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl">
          <p className="text-2xl font-bold text-orange-700 mb-1">{remainingSeats}</p>
          <p className="text-xs text-text-muted">Available</p>
        </div>
      </div>

      {/* Recommendation */}
      {usagePercentage > 70 && (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-sm font-semibold text-orange-900 mb-1">
                Consider upgrading
              </p>
              <p className="text-xs text-orange-700">
                You're using {usagePercentage.toFixed(0)}% of your seats. Upgrade to accommodate more learners.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
        Manage Seat Allocation
      </button>
    </div>
  );
};

export default OrgSeatsSummaryCard;
