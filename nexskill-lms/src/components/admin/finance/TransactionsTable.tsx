import React from 'react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  userName: string;
  userEmail: string;
  itemType: 'course' | 'coaching' | 'subscription';
  itemName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  paymentMethod: string;
  payoutBatchId?: string;
  refundId?: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  searchQuery,
  onSearchChange,
}) => {
  const getStatusConfig = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          bg: 'bg-[#D1FAE5]',
          text: 'text-[#047857]',
        };
      case 'pending':
        return {
          label: 'Pending',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
        };
      case 'refunded':
        return {
          label: 'Refunded',
          bg: 'bg-[#FEE2E2]',
          text: 'text-[#991B1B]',
        };
      case 'failed':
        return {
          label: 'Failed',
          bg: 'bg-[#FEE2E2]',
          text: 'text-[#DC2626]',
        };
    }
  };

  const getItemTypeConfig = (itemType: Transaction['itemType']) => {
    switch (itemType) {
      case 'course':
        return {
          label: 'Course',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
        };
      case 'coaching':
        return {
          label: 'Coaching',
          bg: 'bg-[#FCE7F3]',
          text: 'text-[#9F1239]',
        };
      case 'subscription':
        return {
          label: 'Subscription',
          bg: 'bg-[#E0E7FF]',
          text: 'text-[#3730A3]',
        };
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      transaction.id.toLowerCase().includes(query) ||
      transaction.userName.toLowerCase().includes(query) ||
      transaction.userEmail.toLowerCase().includes(query) ||
      transaction.itemName.toLowerCase().includes(query)
    );
  });

  const handleViewDetails = (transactionId: string) => {
    console.log('Viewing transaction details:', transactionId);
    window.alert(`Transaction ${transactionId} details would be displayed here.`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-[#EDF0FB]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#111827]">All Transactions</h2>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F7FF] text-[#304DB5]">
            Showing {filteredTransactions.length} of {transactions.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by user, item, or transaction ID"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#304DB5]/20 focus:border-[#304DB5]"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3B5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F7FF]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Payment Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5F6473] uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0FB]">
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <div className="text-5xl mb-3">💳</div>
                  <p className="text-sm font-semibold text-[#111827] mb-1">
                    No transactions found
                  </p>
                  <p className="text-xs text-[#9CA3B5]">
                    {searchQuery
                      ? 'Try adjusting your search criteria'
                      : 'Transactions will appear here'}
                  </p>
                </td>
              </tr>
            )}
            {filteredTransactions.map((transaction) => {
              const statusConfig = getStatusConfig(transaction.status);
              const itemTypeConfig = getItemTypeConfig(transaction.itemType);

              return (
                <tr key={transaction.id} className="hover:bg-[#F5F7FF] transition-colors">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-[#111827]">{transaction.date}</div>
                    <div className="text-xs text-[#9CA3B5]">{transaction.time}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-[#111827]">{transaction.userName}</div>
                    <div className="text-xs text-[#9CA3B5]">{transaction.userEmail}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-[#111827] mb-1">
                      {transaction.itemName}
                    </div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${itemTypeConfig.bg} ${itemTypeConfig.text}`}
                    >
                      {itemTypeConfig.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-bold text-[#111827]">
                      {transaction.currency}
                      {transaction.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#5F6473]">{transaction.paymentMethod}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs font-mono text-[#5F6473]">{transaction.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleViewDetails(transaction.id)}
                      className="text-xs font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-[#EDF0FB]">
        {filteredTransactions.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="text-5xl mb-3">💳</div>
            <p className="text-sm font-semibold text-[#111827] mb-1">No transactions found</p>
            <p className="text-xs text-[#9CA3B5]">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Transactions will appear here'}
            </p>
          </div>
        )}
        {filteredTransactions.map((transaction) => {
          const statusConfig = getStatusConfig(transaction.status);
          const itemTypeConfig = getItemTypeConfig(transaction.itemType);

          return (
            <div key={transaction.id} className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-bold text-[#111827] mb-1">
                    {transaction.userName}
                  </div>
                  <div className="text-xs text-[#9CA3B5]">{transaction.userEmail}</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Item */}
              <div className="mb-3">
                <div className="text-sm font-medium text-[#111827] mb-1">
                  {transaction.itemName}
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${itemTypeConfig.bg} ${itemTypeConfig.text}`}
                >
                  {itemTypeConfig.label}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <span className="text-[#9CA3B5]">Amount:</span>
                  <div className="font-bold text-[#111827] mt-0.5">
                    {transaction.currency}
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-[#9CA3B5]">Payment:</span>
                  <div className="text-[#5F6473] mt-0.5">{transaction.paymentMethod}</div>
                </div>
                <div>
                  <span className="text-[#9CA3B5]">Date:</span>
                  <div className="text-[#5F6473] mt-0.5">{transaction.date}</div>
                </div>
                <div>
                  <span className="text-[#9CA3B5]">Time:</span>
                  <div className="text-[#5F6473] mt-0.5">{transaction.time}</div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="text-xs mb-3">
                <span className="text-[#9CA3B5]">ID:</span>
                <div className="font-mono text-[#5F6473] mt-0.5">{transaction.id}</div>
              </div>

              {/* Actions */}
              <button
                onClick={() => handleViewDetails(transaction.id)}
                className="w-full py-2 text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF] border border-[#304DB5] rounded-full transition-colors"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionsTable;
