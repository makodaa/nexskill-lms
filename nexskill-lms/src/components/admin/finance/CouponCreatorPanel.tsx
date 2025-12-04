import React, { useState } from 'react';

interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  appliesTo: 'all_courses' | 'single_course' | 'subscriptions';
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'expired' | 'scheduled';
  startDate?: string;
  endDate?: string;
}

interface CouponCreatorPanelProps {
  coupons: Coupon[];
  onChange: (updatedCoupons: Coupon[]) => void;
}

const CouponCreatorPanel: React.FC<CouponCreatorPanelProps> = ({ coupons, onChange }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    appliesTo: 'all_courses' as 'all_courses' | 'single_course' | 'subscriptions',
    usageLimit: 100,
    startDate: '',
    endDate: '',
  });

  const getStatusConfig = (status: Coupon['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          bg: 'bg-[#D1FAE5]',
          text: 'text-[#047857]',
        };
      case 'expired':
        return {
          label: 'Expired',
          bg: 'bg-[#F3F4F6]',
          text: 'text-[#6B7280]',
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
        };
    }
  };

  const handleCreateCoupon = () => {
    if (!formData.code.trim()) {
      window.alert('Please enter a coupon code.');
      return;
    }

    if (formData.value <= 0) {
      window.alert('Please enter a valid discount value.');
      return;
    }

    // Check for duplicate code
    if (coupons.some((c) => c.code.toLowerCase() === formData.code.toLowerCase())) {
      window.alert('A coupon with this code already exists.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    let status: Coupon['status'] = 'active';

    if (formData.startDate && formData.startDate > today) {
      status = 'scheduled';
    } else if (formData.endDate && formData.endDate < today) {
      status = 'expired';
    }

    const newCoupon: Coupon = {
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: formData.value,
      appliesTo: formData.appliesTo,
      usageLimit: formData.usageLimit,
      usedCount: 0,
      status,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
    };

    onChange([...coupons, newCoupon]);
    console.log('Created coupon:', newCoupon);

    // Reset form
    setFormData({
      code: '',
      type: 'percentage',
      value: 0,
      appliesTo: 'all_courses',
      usageLimit: 100,
      startDate: '',
      endDate: '',
    });
    setIsCreating(false);
    window.alert(`Coupon ${newCoupon.code} created successfully!`);
  };

  const handleDeactivate = (code: string) => {
    console.log('Deactivating coupon:', code);
    const updated = coupons.map((c) => (c.code === code ? { ...c, status: 'expired' as const } : c));
    onChange(updated);
    window.alert(`Coupon ${code} has been deactivated.`);
  };

  const handleDuplicate = (code: string) => {
    const coupon = coupons.find((c) => c.code === code);
    if (!coupon) return;

    const newCode = `${coupon.code}_COPY`;
    console.log('Duplicating coupon:', code, 'as', newCode);

    const duplicated: Coupon = {
      ...coupon,
      code: newCode,
      usedCount: 0,
      status: 'active',
    };

    onChange([...coupons, duplicated]);
    window.alert(`Coupon duplicated as ${newCode}.`);
  };

  const handleDelete = (code: string) => {
    console.log('Deleting coupon:', code);
    const updated = coupons.filter((c) => c.code !== code);
    onChange(updated);
    window.alert(`Coupon ${code} has been deleted.`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-md p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#111827]">Coupons & Promo Codes</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white rounded-full hover:shadow-md transition-shadow"
          >
            + New Coupon
          </button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="mb-4 p-4 bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl border border-[#EDF0FB]">
          <h3 className="text-sm font-bold text-[#111827] mb-3">Create New Coupon</h3>

          {/* Code */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#5F6473] mb-1">Code</label>
            <input
              type="text"
              placeholder="e.g., LAUNCH25"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
            />
          </div>

          {/* Type & Value */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-semibold text-[#5F6473] mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })
                }
                className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5F6473] mb-1">
                Value {formData.type === 'percentage' ? '(%)' : '($)'}
              </label>
              <input
                type="number"
                min="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
              />
            </div>
          </div>

          {/* Applies To */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#5F6473] mb-1">Applies To</label>
            <select
              value={formData.appliesTo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  appliesTo: e.target.value as 'all_courses' | 'single_course' | 'subscriptions',
                })
              }
              className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
            >
              <option value="all_courses">All Courses</option>
              <option value="single_course">Single Course</option>
              <option value="subscriptions">Subscriptions</option>
            </select>
          </div>

          {/* Usage Limit */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#5F6473] mb-1">Usage Limit</label>
            <input
              type="number"
              min="1"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
            />
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-[#5F6473] mb-1">
                Start Date (optional)
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5F6473] mb-1">
                End Date (optional)
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleCreateCoupon}
              className="flex-1 py-2 text-sm font-semibold bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white rounded-full hover:shadow-md transition-shadow"
            >
              Create Coupon
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-sm font-semibold text-[#5F6473] hover:text-[#111827] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing Coupons */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {coupons.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎟️</div>
            <p className="text-sm font-semibold text-[#111827] mb-1">No coupons created yet</p>
            <p className="text-xs text-[#9CA3B5]">Create your first coupon to get started</p>
          </div>
        )}
        {coupons.map((coupon) => {
          const statusConfig = getStatusConfig(coupon.status);

          return (
            <div
              key={coupon.code}
              className="p-3 rounded-xl border border-[#EDF0FB] bg-gradient-to-br from-[#F5F7FF] to-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-[#111827] mb-0.5">{coupon.code}</div>
                  <div className="text-xs text-[#9CA3B5] capitalize">
                    {coupon.appliesTo.replace('_', ' ')}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Details */}
              <div className="mb-2">
                <div className="text-lg font-bold text-[#111827] mb-1">
                  {coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} off`}
                </div>
                <div className="text-xs text-[#5F6473]">
                  Used {coupon.usedCount} / {coupon.usageLimit} times
                </div>
              </div>

              {/* Dates */}
              {(coupon.startDate || coupon.endDate) && (
                <div className="text-xs text-[#9CA3B5] mb-2">
                  {coupon.startDate && <span>From {coupon.startDate}</span>}
                  {coupon.startDate && coupon.endDate && <span> · </span>}
                  {coupon.endDate && <span>Until {coupon.endDate}</span>}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E5E7EB]/50 text-xs">
                {coupon.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleDeactivate(coupon.code)}
                      className="font-semibold text-[#DC2626] hover:text-[#EF4444] transition-colors"
                    >
                      Deactivate
                    </button>
                    <span className="text-[#E5E7EB]">|</span>
                  </>
                )}
                <button
                  onClick={() => handleDuplicate(coupon.code)}
                  className="font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                >
                  Duplicate
                </button>
                <span className="text-[#E5E7EB]">|</span>
                <button
                  onClick={() => handleDelete(coupon.code)}
                  className="font-semibold text-[#DC2626] hover:text-[#EF4444] transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CouponCreatorPanel;
