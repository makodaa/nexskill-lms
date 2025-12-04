import React, { useState } from 'react';

interface Policies {
  cancellation: string;
  refund: string;
  rescheduling: string;
  conduct: string;
}

interface CoachPoliciesPanelProps {
  policies: Policies;
  onChange: (updatedPolicies: Policies) => void;
}

const CoachPoliciesPanel: React.FC<CoachPoliciesPanelProps> = ({ policies, onChange }) => {
  const [currentPolicies, setCurrentPolicies] = useState<Policies>(policies);
  const [activeSection, setActiveSection] = useState<keyof Policies | null>(null);

  const handlePolicyChange = (section: keyof Policies, value: string) => {
    const updated = { ...currentPolicies, [section]: value };
    setCurrentPolicies(updated);
    onChange(updated);
    console.log(`Updated ${section} policy`);
  };

  const policyConfig: Array<{
    key: keyof Policies;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      key: 'cancellation',
      label: 'Cancellation Policy',
      placeholder:
        'e.g., Students may cancel up to 24 hours before the session for a full refund...',
      color: '#EF4444',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      key: 'refund',
      label: 'Refund Policy',
      placeholder:
        'e.g., Full refund if canceled 48+ hours before session. 50% refund if canceled 24-48 hours before...',
      color: '#10B981',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      key: 'rescheduling',
      label: 'Rescheduling Policy',
      placeholder:
        'e.g., Free rescheduling allowed up to 24 hours before the session. One free reschedule per booking...',
      color: '#F59E0B',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      key: 'conduct',
      label: 'Code of Conduct',
      placeholder:
        'e.g., Students are expected to arrive on time, be prepared with questions, and maintain professional communication...',
      color: '#6366F1',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <svg
          className="w-6 h-6 text-[#304DB5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="text-xl font-bold text-[#111827]">Coaching Policies</h2>
      </div>

      <p className="text-sm text-[#5F6473] mb-6">
        Set clear expectations for your students regarding cancellations, refunds, and conduct
      </p>

      <div className="space-y-6">
        {policyConfig.map((policy) => (
          <div key={policy.key}>
            <label className="block text-sm font-semibold text-[#111827] mb-2 flex items-center gap-2">
              <span style={{ color: policy.color }}>{policy.icon}</span>
              {policy.label}
            </label>
            <div className="relative">
              <textarea
                value={currentPolicies[policy.key]}
                onChange={(e) => handlePolicyChange(policy.key, e.target.value)}
                onFocus={() => setActiveSection(policy.key)}
                onBlur={() => setActiveSection(null)}
                placeholder={policy.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none resize-none transition-all"
                rows={activeSection === policy.key ? 5 : 3}
              />
              <p className="text-xs text-[#9CA3B5] mt-1">
                {currentPolicies[policy.key].length} characters
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[#92400E] mb-1">Important Notice</p>
            <p className="text-sm text-[#92400E]">
              These policies will be visible to students before they book sessions with you.
              Make sure they're clear and comply with your local regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachPoliciesPanel;
