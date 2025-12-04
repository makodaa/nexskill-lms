import React from 'react';

interface Feature {
  name: string;
  description: string;
  free: boolean | string;
  pro: boolean | string;
  elite: boolean | string;
}

const features: Feature[] = [
  {
    name: 'Access to free courses',
    description: 'Browse and complete all free courses in the catalog',
    free: true,
    pro: true,
    elite: true,
  },
  {
    name: 'Premium course catalog',
    description: 'Full access to all premium courses and specializations',
    free: false,
    pro: true,
    elite: true,
  },
  {
    name: 'AI Coach',
    description: 'Get personalized learning guidance from AI',
    free: 'Limited',
    pro: 'Unlimited',
    elite: 'Unlimited',
  },
  {
    name: '1:1 Coaching sessions',
    description: 'Book sessions with expert career coaches',
    free: false,
    pro: '2 credits/month',
    elite: '10 credits/month',
  },
  {
    name: 'Live classes',
    description: 'Join interactive live sessions with instructors',
    free: false,
    pro: true,
    elite: true,
  },
  {
    name: 'Course certificates',
    description: 'Earn verified certificates upon course completion',
    free: false,
    pro: true,
    elite: true,
  },
  {
    name: 'Blockchain verification',
    description: 'Certificates verified on blockchain for authenticity',
    free: false,
    pro: false,
    elite: true,
  },
  {
    name: 'Community access',
    description: 'Join discussions, forums, and study groups',
    free: true,
    pro: true,
    elite: true,
  },
  {
    name: 'Download courses offline',
    description: 'Download course materials for offline learning',
    free: false,
    pro: true,
    elite: true,
  },
  {
    name: 'Priority support',
    description: 'Get faster responses from support team',
    free: false,
    pro: false,
    elite: true,
  },
  {
    name: 'Career services',
    description: 'Resume reviews, interview prep, job placement',
    free: false,
    pro: false,
    elite: true,
  },
];

const MembershipFeatureCompare: React.FC = () => {
  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (value === false) {
      return (
        <svg className="w-6 h-6 text-slate-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return <span className="text-sm font-medium text-[#304DB5] text-center block">{value}</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Compare features</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-4 px-4 font-semibold text-slate-700">Feature</th>
              <th className="text-center py-4 px-4 font-semibold text-slate-700">Free</th>
              <th className="text-center py-4 px-4 font-semibold text-[#304DB5] bg-blue-50 rounded-t-xl">
                Pro
              </th>
              <th className="text-center py-4 px-4 font-semibold text-slate-700">Elite</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-slate-900">{feature.name}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">{renderFeatureValue(feature.free)}</td>
                <td className="py-4 px-4 text-center bg-blue-50/50">{renderFeatureValue(feature.pro)}</td>
                <td className="py-4 px-4 text-center">{renderFeatureValue(feature.elite)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="md:hidden space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-1">{feature.name}</h3>
            <p className="text-sm text-slate-600 mb-3">{feature.description}</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-xs font-medium text-slate-600 mb-1">Free</p>
                {renderFeatureValue(feature.free)}
              </div>
              <div className="text-center bg-blue-50 rounded-lg py-2">
                <p className="text-xs font-medium text-[#304DB5] mb-1">Pro</p>
                {renderFeatureValue(feature.pro)}
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-slate-600 mb-1">Elite</p>
                {renderFeatureValue(feature.elite)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipFeatureCompare;
