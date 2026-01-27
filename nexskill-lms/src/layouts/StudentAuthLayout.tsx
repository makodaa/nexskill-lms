import React from 'react';
import BrandLockup from '../components/brand/BrandLockup';

interface StudentAuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'small' | 'large' | 'full';
}

const StudentAuthLayout: React.FC<StudentAuthLayoutProps> = ({
  children,
  maxWidth = 'small'
}) => {
  // Use maxWidth to silence lint error and provide flexibility
  const containerClass = maxWidth === 'full' ? 'max-w-full' : (maxWidth === 'large' ? 'max-w-[1400px]' : 'max-w-[1200px]');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className={`w-full ${containerClass} h-full min-h-[600px] bg-white dark:bg-slate-800 rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row`}>

        {/* Left Column - Image/Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-brand-primary to-indigo-900 relative overflow-hidden">
          {/* Background Education Image - Student with Laptop */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-25"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/80 to-brand-primary/40"></div>


          {/* Content */}
          <div className="relative z-10 p-10 lg:p-12 flex flex-col justify-between h-full text-white">
            <div>
              {/* Logo with WHITE background for visibility */}
              <div className="bg-white rounded-2xl p-3 inline-block mb-8 shadow-lg">
                <BrandLockup orientation="horizontal" />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                Unlock Your <br />
                <span className="text-blue-200">Full Potential</span>
              </h2>
              <p className="text-white/90 text-lg max-w-md leading-relaxed drop-shadow-md">
                Join thousands of learners mastering new skills with world-class instructors and personalized guidance.
              </p>

              {/* Stats */}
              <div className="flex gap-6 pt-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs text-white/80">Active Learners</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs text-white/80">Expert Coaches</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-xs text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
            </div>
          </div>
        </div>



        {/* Right Column - Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto">
          <div className="md:hidden mb-8 flex justify-center">
            <BrandLockup orientation="horizontal" />
          </div>
          {children}

          {/* Footer / Copyright */}
          <div className="mt-8 text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} NexSkill. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAuthLayout;