import React from 'react';

interface BlockchainVerificationBadgeProps {
  status: 'verified' | 'pending' | 'unverified';
  hash?: string;
  onViewVerification?: () => void;
}

const BlockchainVerificationBadge: React.FC<BlockchainVerificationBadgeProps> = ({
  status,
  hash,
  onViewVerification,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'unverified':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'verified':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'unverified':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'verified':
        return 'Verified on blockchain';
      case 'pending':
        return 'Verification pending';
      case 'unverified':
        return 'Not verified';
      default:
        return 'Unknown status';
    }
  };

  const truncateHash = (hash: string) => {
    if (hash.length <= 12) return hash;
    return `${hash.slice(0, 6)}…${hash.slice(-6)}`;
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusStyles()}`}>
      {getStatusIcon()}
      <span className="text-xs font-medium">{getStatusLabel()}</span>
      {hash && <span className="text-xs font-mono opacity-75">{truncateHash(hash)}</span>}
      {onViewVerification && (
        <button
          onClick={onViewVerification}
          className="ml-1 text-xs underline hover:no-underline transition-all"
        >
          View
        </button>
      )}
    </div>
  );
};

export default BlockchainVerificationBadge;
