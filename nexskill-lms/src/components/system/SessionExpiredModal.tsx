import React from 'react';

interface SessionExpiredModalProps {
  open: boolean;
  onRelogin: () => void;
  onGoHome: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  open,
  onRelogin,
  onGoHome,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-scaleIn">
        {/* Icon */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E0E5FF]">
            <svg className="w-8 h-8 text-[#304DB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#111827] text-center mb-4">
          Session expired
        </h2>

        {/* Body */}
        <p className="text-base text-[#5F6473] text-center mb-8 leading-relaxed">
          For security, your session has expired. Please log in again to continue.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRelogin}
            className="w-full px-6 py-3 bg-[#304DB5] hover:bg-[#152457] text-white font-medium rounded-full shadow-[0_12px_24px_rgba(35,76,200,0.35)] hover:shadow-[0_16px_32px_rgba(35,76,200,0.45)] transition-all duration-200"
          >
            Log in again
          </button>
          <button
            onClick={onGoHome}
            className="w-full px-6 py-3 bg-transparent hover:bg-[#E0E5FF] text-[#304DB5] font-medium rounded-full border border-[#304DB5] transition-all duration-200"
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
