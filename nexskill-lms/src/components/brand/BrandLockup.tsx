import React from 'react';
import BrandLogo from './BrandLogo';

interface BrandLockupProps {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const BrandLockup: React.FC<BrandLockupProps> = ({
  orientation = 'vertical',
  className = '',
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`flex items-center gap-6 ${className}`}>
        <BrandLogo size="lg" showText={true} direction="row" />
        <div className="h-8 w-px bg-slate-300" />
        <p className="text-sm text-slate-600 font-medium">
          Master Your Skill. Build Your Future.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <BrandLogo size="lg" showText={true} direction="column" />
      <p className="text-sm text-slate-500 text-center font-medium">
        Master Your Skill. Build Your Future.
      </p>
    </div>
  );
};

export default BrandLockup;
