import React from 'react';

interface TaxForm {
  id: string;
  name: string;
  year: string;
  type: 'PDF' | 'CSV';
  status: 'Available' | 'Coming soon';
}

const TaxFormsPanel: React.FC = () => {
  const taxForms: TaxForm[] = [
    {
      id: 'form-1',
      name: 'Annual Earnings Summary',
      year: '2025',
      type: 'PDF',
      status: 'Available',
    },
    {
      id: 'form-2',
      name: 'Tax Residency Form',
      year: '2025',
      type: 'PDF',
      status: 'Available',
    },
    {
      id: 'form-3',
      name: 'Quarterly Revenue Report',
      year: '2025 Q4',
      type: 'CSV',
      status: 'Available',
    },
    {
      id: 'form-4',
      name: '1099-MISC Form',
      year: '2024',
      type: 'PDF',
      status: 'Coming soon',
    },
  ];

  const handleDownload = (formId: string, formName: string) => {
    console.log('Downloading form:', formId, formName);
    alert(`Downloaded: ${formName}`);
  };

  const getTypeIcon = (type: string) => {
    return type === 'PDF' ? '📄' : '📊';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827] mb-1">Tax Forms & Documents</h3>
        <p className="text-sm text-[#5F6473]">Access tax-related documents and summaries</p>
      </div>

      {/* Informational Notice */}
      <div className="bg-[#FEF3E7] border-l-4 border-[#F97316] rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[#111827] mb-1">
              Simulated Tax Documents
            </p>
            <p className="text-xs text-[#5F6473]">
              This is a placeholder section for tax forms. In a real implementation, you would
              integrate with tax compliance services to generate forms like annual summaries,
              1099s, and other region-specific tax documents.
            </p>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {taxForms.map((form) => (
          <div
            key={form.id}
            className="border border-[#EDF0FB] rounded-xl p-4 hover:border-[#304DB5] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-3xl">{getTypeIcon(form.type)}</div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111827] mb-1">{form.name}</p>
                  <div className="flex items-center gap-3 text-xs text-[#9CA3B5]">
                    <span>{form.year}</span>
                    <span>•</span>
                    <span>{form.type}</span>
                  </div>
                </div>
              </div>

              {form.status === 'Available' ? (
                <button
                  onClick={() => handleDownload(form.id, form.name)}
                  className="px-4 py-2 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-medium rounded-full hover:shadow-lg transition-all text-sm"
                >
                  Download
                </button>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-[#9CA3B5] font-medium rounded-full text-sm">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-6 border-t border-[#EDF0FB] space-y-3">
        <button
          onClick={() => console.log('Request custom tax document')}
          className="w-full px-4 py-3 text-[#304DB5] font-semibold border-2 border-[#304DB5] rounded-full hover:bg-blue-50 transition-all"
        >
          Request Custom Document
        </button>
        <p className="text-xs text-center text-[#9CA3B5]">
          Need help? Contact{' '}
          <a href="#" className="text-[#304DB5] hover:underline">
            support@nexskill.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default TaxFormsPanel;
