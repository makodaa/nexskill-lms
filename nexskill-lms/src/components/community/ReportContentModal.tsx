import React, { useState } from 'react';

interface ReportContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details?: string) => void;
}

const ReportContentModal: React.FC<ReportContentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const reasons = [
    { id: 'spam', label: 'Spam or advertising' },
    { id: 'harassment', label: 'Harassment or hate speech' },
    { id: 'inappropriate', label: 'Inappropriate content' },
    { id: 'other', label: 'Other' },
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason, details);
      setSelectedReason('');
      setDetails('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Report content</h2>
          <p className="text-slate-600">Tell us what's wrong with this post.</p>
        </div>

        {/* Reason selection */}
        <div className="space-y-3 mb-6">
          {reasons.map((reason) => (
            <label
              key={reason.id}
              className={`
                flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                ${
                  selectedReason === reason.id
                    ? 'border-[#304DB5] bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }
              `}
            >
              <input
                type="radio"
                name="reason"
                value={reason.id}
                checked={selectedReason === reason.id}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="mt-0.5 w-4 h-4 text-[#304DB5] focus:ring-[#304DB5]"
              />
              <span className={`font-medium ${selectedReason === reason.id ? 'text-[#304DB5]' : 'text-slate-900'}`}>
                {reason.label}
              </span>
            </label>
          ))}
        </div>

        {/* Optional details */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Additional details (optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide any additional context..."
            rows={3}
            className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 rounded-full font-semibold text-slate-700 border-2 border-slate-300 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className={`
              flex-1 px-6 py-3 rounded-full font-semibold transition-all
              ${
                selectedReason
                  ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            Submit report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportContentModal;
