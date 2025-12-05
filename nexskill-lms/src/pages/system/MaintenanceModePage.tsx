import React from 'react';
import PublicSystemLayout from '../../layouts/PublicSystemLayout';

const MaintenanceModePage: React.FC = () => {
  return (
    <PublicSystemLayout>
      <div className="text-center">
        {/* Icon */}
        <div className="mb-6">
          <span className="text-6xl">🛠️</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-[#111827] mb-4">
          We're performing scheduled maintenance
        </h1>

        {/* Body Copy */}
        <p className="text-base text-[#5F6473] mb-6 leading-relaxed">
          NexSkill LMS is temporarily unavailable while we upgrade our systems 
          to serve you better.
        </p>

        {/* Estimated Time */}
        <div className="mb-8 p-4 bg-[#E0E5FF] rounded-2xl">
          <p className="text-sm font-medium text-[#304DB5]">
            Estimated back online: Today at 3:00 PM EST
          </p>
        </div>

        {/* Reassurance Bullets */}
        <div className="text-left space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-[#5F6473]">
              Your courses and data are safe
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-[#5F6473]">
              You can close this window and come back later
            </p>
          </div>
        </div>
      </div>
    </PublicSystemLayout>
  );
};

export default MaintenanceModePage;
