import React, { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  studentName: string;
  course: string;
  type: 'Course purchase' | 'Coaching session' | 'Refund';
  amount: number;
  status: 'Completed' | 'Refunded' | 'Pending';
  transactionId: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  currency: string;
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({
  transactions,
  currency,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('30days');

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(absAmount);
    return amount < 0 ? `-${formatted}` : formatted;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#22C55E] text-white';
      case 'Refunded':
        return 'bg-[#F97316] text-white';
      case 'Pending':
        return 'bg-[#304DB5] text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course purchase':
        return '📚';
      case 'Coaching session':
        return '👥';
      case 'Refund':
        return '↩️';
      default:
        return '💰';
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleTransactionClick = (transaction: Transaction) => {
    console.log('Transaction details:', transaction);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827] mb-1">Transaction History</h3>
        <p className="text-sm text-[#5F6473]">Detailed ledger of all revenue transactions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by student, course, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#EDF0FB] focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-[#EDF0FB] bg-white text-[#111827] font-medium focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
        >
          <option value="All">All Types</option>
          <option value="Course purchase">Course purchase</option>
          <option value="Coaching session">Coaching session</option>
          <option value="Refund">Refund</option>
        </select>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-[#EDF0FB] bg-white text-[#111827] font-medium focus:outline-none focus:ring-2 focus:ring-[#304DB5]"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="alltime">All time</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EDF0FB]">
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Date & Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Student
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Course/Item
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Type
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Amount
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => handleTransactionClick(transaction)}
                className="border-b border-[#EDF0FB] hover:bg-[#F5F7FF] cursor-pointer transition-colors"
              >
                <td className="py-4 px-4">
                  <p className="text-sm font-medium text-[#111827]">{transaction.date}</p>
                  <p className="text-xs text-[#9CA3B5]">{transaction.time}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-[#111827]">{transaction.studentName}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-[#111827]">{transaction.course}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                    <p className="text-sm text-[#5F6473]">{transaction.type}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <p
                    className={`font-bold ${
                      transaction.amount < 0 ? 'text-[#F97316]' : 'text-[#22C55E]'
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-xs font-mono text-[#5F6473]">{transaction.transactionId}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            onClick={() => handleTransactionClick(transaction)}
            className="bg-[#F5F7FF] rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getTypeIcon(transaction.type)}</span>
                <div>
                  <p className="font-semibold text-[#111827]">{transaction.studentName}</p>
                  <p className="text-xs text-[#9CA3B5]">{transaction.type}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  transaction.status
                )}`}
              >
                {transaction.status}
              </span>
            </div>

            <p className="text-sm text-[#5F6473] mb-3">{transaction.course}</p>

            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Date</p>
                <p className="text-[#111827]">{transaction.date}</p>
              </div>
              <div>
                <p className="text-[#9CA3B5] text-xs mb-1">Amount</p>
                <p
                  className={`font-bold ${
                    transaction.amount < 0 ? 'text-[#F97316]' : 'text-[#22C55E]'
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EDF0FB]">
              <p className="text-xs text-[#9CA3B5] font-mono">{transaction.transactionId}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg text-[#5F6473] mb-2">No transactions found</p>
          <p className="text-sm text-[#9CA3B5]">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Summary Footer */}
      <div className="mt-6 pt-6 border-t border-[#EDF0FB] flex items-center justify-between">
        <p className="text-sm text-[#5F6473]">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
        <button
          onClick={() => console.log('Export transactions')}
          className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default TransactionHistoryTable;
