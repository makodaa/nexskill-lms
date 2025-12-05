import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickLink {
  label: string;
  description: string;
  route?: string;
  icon: string;
}

interface SystemQuickLinksCardProps {
  quickLinks: QuickLink[];
}

const SystemQuickLinksCard: React.FC<SystemQuickLinksCardProps> = ({ quickLinks }) => {
  const navigate = useNavigate();

  const handleLinkClick = (link: QuickLink) => {
    if (link.route) {
      console.log(`Navigating to: ${link.route}`);
      navigate(link.route);
    } else {
      console.log(`TODO route for: ${link.label}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB] shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary mb-1">System Quick Links</h3>
        <p className="text-sm text-text-secondary">Navigate to key management areas</p>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => handleLinkClick(link)}
            className="w-full flex items-start gap-3 p-4 rounded-xl border border-[#EDF0FB] hover:bg-[#F5F7FF] hover:border-brand-primary transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-primary-soft flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-brand-primary transition-colors">
                {link.label}
              </h4>
              <p className="text-xs text-text-secondary line-clamp-2">{link.description}</p>
            </div>
            <div className="text-text-muted group-hover:text-brand-primary transition-colors">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SystemQuickLinksCard;
