import React, { useState } from 'react';

interface PaymentMethod {
  id: string;
  type: 'Visa' | 'Mastercard' | 'AmEx';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface ProfilePaymentMethodsProps {
  methods: PaymentMethod[];
  onChange: (updated: PaymentMethod[]) => void;
}

const ProfilePaymentMethods: React.FC<ProfilePaymentMethodsProps> = ({ methods, onChange }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSetDefault = (id: string) => {
    const updated = methods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }));
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    const updated = methods.filter((method) => method.id !== id);
    onChange(updated);
  };

  const getCardIcon = () => {
    return (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Saved payment methods</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-sm font-medium text-[#304DB5] border-2 border-[#304DB5] rounded-full hover:bg-blue-50 transition-all"
        >
          + Add new
        </button>
      </div>

      {methods.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <p className="text-lg text-slate-600 mb-2">No payment methods saved</p>
          <p className="text-sm text-slate-500">Add a card to make checkout faster</p>
        </div>
      ) : (
        <div className="space-y-3">
          {methods.map((method) => (
            <div
              key={method.id}
              className="p-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-slate-600">{getCardIcon()}</div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {method.type} •••• {method.last4}
                    </div>
                    <div className="text-sm text-slate-600">Expires {method.expiry}</div>
                  </div>
                  {method.isDefault && (
                    <span className="px-3 py-1 bg-blue-100 text-[#304DB5] text-xs font-semibold rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-300 rounded-full hover:bg-slate-50 transition-all"
                    >
                      Set default
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(method.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-300 rounded-full hover:bg-red-50 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add payment method modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add payment method</h3>
            <p className="text-sm text-slate-600 mb-4">
              Payment method management coming soon. For now, this is a placeholder for future integration
              with payment providers.
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePaymentMethods;
