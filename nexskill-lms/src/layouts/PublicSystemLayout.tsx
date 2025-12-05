import React from 'react';
import BrandLogo from '../components/brand/BrandLogo';

interface PublicSystemLayoutProps {
  children: React.ReactNode;
}

const PublicSystemLayout: React.FC<PublicSystemLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#E7F0FF] via-[#F9F0FF] to-[#E3F4FF]">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <BrandLogo size="md" showText={true} direction="row" />
      </div>

      {/* Content Card */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,35,95,0.08)] p-8 md:p-10">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[#9CA3B5]">
          © {new Date().getFullYear()} NexSkill LMS – All rights reserved
        </p>
      </div>
    </div>
  );
};

export default PublicSystemLayout;
