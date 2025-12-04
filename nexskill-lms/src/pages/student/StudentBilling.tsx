import React, { useState } from 'react';
import StudentAppLayout from '../../layouts/StudentAppLayout';
import ProfileBillingHistory from '../../components/profile/ProfileBillingHistory';
import ProfilePaymentMethods from '../../components/profile/ProfilePaymentMethods';

interface PaymentMethod {
  id: string;
  type: 'Visa' | 'Mastercard' | 'AmEx';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

// Dummy data
const dummyTransactions = [
  {
    id: 'txn-1',
    date: 'Dec 1, 2025',
    description: 'Course: UI Design Fundamentals',
    amount: 49.99,
    status: 'Paid' as const,
  },
  {
    id: 'txn-2',
    date: 'Nov 28, 2025',
    description: '1:1 Coaching Session with Dr. Emily Chen',
    amount: 45.0,
    status: 'Paid' as const,
  },
  {
    id: 'txn-3',
    date: 'Nov 15, 2025',
    description: 'Course: JavaScript Mastery',
    amount: 59.99,
    status: 'Paid' as const,
  },
  {
    id: 'txn-4',
    date: 'Nov 10, 2025',
    description: 'Monthly Premium Subscription',
    amount: 29.99,
    status: 'Paid' as const,
  },
  {
    id: 'txn-5',
    date: 'Nov 5, 2025',
    description: 'Course: Product Management Basics',
    amount: 39.99,
    status: 'Refunded' as const,
  },
  {
    id: 'txn-6',
    date: 'Oct 20, 2025',
    description: 'Course: Data Analytics with Python',
    amount: 54.99,
    status: 'Paid' as const,
  },
];

const dummyPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'Visa' as const,
    last4: '4242',
    expiry: '12/26',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'Mastercard' as const,
    last4: '5555',
    expiry: '08/27',
    isDefault: false,
  },
];

const StudentBilling: React.FC = () => {
  const [transactions] = useState(dummyTransactions);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(dummyPaymentMethods);

  const handlePaymentMethodsChange = (updated: PaymentMethod[]) => {
    setPaymentMethods(updated);
  };

  return (
    <StudentAppLayout>
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Billing & payments</h1>
          <p className="text-lg text-slate-600">
            Review your invoices and manage payment methods
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Billing History (2/3 width) */}
          <div className="lg:col-span-2">
            <ProfileBillingHistory transactions={transactions} />
          </div>

          {/* Right column - Payment Methods (1/3 width) */}
          <div>
            <ProfilePaymentMethods methods={paymentMethods} onChange={handlePaymentMethodsChange} />
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default StudentBilling;
