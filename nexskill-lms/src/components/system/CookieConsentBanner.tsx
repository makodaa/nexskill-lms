import { useState, useEffect } from 'react';

interface CookieConsentBannerProps {
  initialVisible?: boolean;
  onAcceptAll?: () => void;
  onReject?: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  initialVisible = true,
  onAcceptAll,
  onReject,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('nexskillCookieConsent');
    if (!hasConsented && initialVisible) {
      setIsVisible(true);
    }
  }, [initialVisible]);

  const handleAcceptAll = () => {
    localStorage.setItem('nexskillCookieConsent', 'accepted');
    setIsVisible(false);
    onAcceptAll?.();
  };

  const handleReject = () => {
    localStorage.setItem('nexskillCookieConsent', 'rejected');
    setIsVisible(false);
    onReject?.();
  };

  const handleCustomize = () => {
    console.log('Cookie customization panel - TODO');
    // Future: Open a modal with granular cookie options
  };

  const handleLearnMore = () => {
    console.log('Navigate to privacy policy - TODO');
    // Future: Navigate to /privacy or /cookies
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fadeIn">
      {/* Banner */}
      <div className="bg-white border-t border-[#EDF0FB] shadow-[0_-4px_20px_rgba(15,35,95,0.08)]">
        <div className="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🍪</span>
                <div>
                  <p className="text-sm text-[#111827] leading-relaxed mb-2">
                    We use cookies to improve your experience, analyze site usage, and personalize content.{' '}
                    <button
                      onClick={handleLearnMore}
                      className="text-[#304DB5] hover:underline font-medium"
                    >
                      Learn more
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 md:flex-shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm font-medium text-[#5F6473] hover:text-[#111827] bg-transparent hover:bg-[#F5F7FF] rounded-full border border-[#EDF0FB] transition-all duration-200"
              >
                Reject non-essential
              </button>
              <button
                onClick={handleCustomize}
                className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:text-[#152457] bg-transparent hover:bg-[#E0E5FF] rounded-full border border-[#304DB5] transition-all duration-200"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-[#304DB5] hover:bg-[#152457] rounded-full shadow-[0_4px_12px_rgba(35,76,200,0.25)] hover:shadow-[0_6px_16px_rgba(35,76,200,0.35)] transition-all duration-200"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
