import React from 'react';
import BrandLockup from '../components/brand/BrandLockup';

interface StudentAuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'small' | 'large' | 'full';
}

const StudentAuthLayout: React.FC<StudentAuthLayoutProps> = ({ 
  children, 
  maxWidth = 'large' 
}) => {
  const widthClasses = {
    small: 'max-w-[600px]',
    large: 'max-w-[1100px]',
    full: 'max-w-full'
  };

  const widthClass = widthClasses[maxWidth];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7F0FF] via-[#F9F0FF] to-[#E3F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-8 transition-colors">
      <div className={`w-full ${widthClass} bg-white dark:bg-dark-background-shell rounded-[32px] shadow-card p-8 md:p-12 transition-colors`}>
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <BrandLockup orientation="vertical" />
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default StudentAuthLayout;