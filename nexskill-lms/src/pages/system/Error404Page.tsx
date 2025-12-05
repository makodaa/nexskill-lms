import React from 'react';
import { useNavigate } from 'react-router-dom';
import PublicSystemLayout from '../../layouts/PublicSystemLayout';

const Error404Page: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <PublicSystemLayout>
      <div className="text-center">
        {/* Icon */}
        <div className="mb-6">
          <span className="text-6xl">🧭</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-[#111827] mb-4">
          Page not found
        </h1>

        {/* Body Copy */}
        <p className="text-base text-[#5F6473] mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved. 
          You might have followed an outdated or broken link.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoToDashboard}
            className="px-6 py-3 bg-[#304DB5] hover:bg-[#152457] text-white font-medium rounded-full shadow-[0_12px_24px_rgba(35,76,200,0.35)] hover:shadow-[0_16px_32px_rgba(35,76,200,0.45)] transition-all duration-200"
          >
            Go to dashboard
          </button>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-transparent hover:bg-[#E0E5FF] text-[#304DB5] font-medium rounded-full border border-[#304DB5] transition-all duration-200"
          >
            Back to previous page
          </button>
        </div>
      </div>
    </PublicSystemLayout>
  );
};

export default Error404Page;
