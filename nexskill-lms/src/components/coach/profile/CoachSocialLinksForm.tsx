import React, { useState } from 'react';

interface SocialLinks {
  website?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
}

interface CoachSocialLinksFormProps {
  links: SocialLinks;
  onChange: (updatedLinks: SocialLinks) => void;
}

const CoachSocialLinksForm: React.FC<CoachSocialLinksFormProps> = ({ links, onChange }) => {
  const [currentLinks, setCurrentLinks] = useState<SocialLinks>(links);

  const handleLinkChange = (platform: keyof SocialLinks, value: string) => {
    const updated = { ...currentLinks, [platform]: value };
    setCurrentLinks(updated);
    onChange(updated);
    console.log(`Updated ${platform}:`, value);
  };

  const platforms: Array<{
    key: keyof SocialLinks;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      key: 'website',
      label: 'Website',
      placeholder: 'https://yourwebsite.com',
      color: '#304DB5',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/in/yourprofile',
      color: '#0A66C2',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      key: 'twitter',
      label: 'Twitter (X)',
      placeholder: 'https://twitter.com/yourhandle',
      color: '#1DA1F2',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      key: 'youtube',
      label: 'YouTube',
      placeholder: 'https://youtube.com/@yourchannel',
      color: '#FF0000',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      key: 'facebook',
      label: 'Facebook',
      placeholder: 'https://facebook.com/yourpage',
      color: '#1877F2',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <svg
          className="w-6 h-6 text-[#304DB5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <h2 className="text-xl font-bold text-[#111827]">Social Links</h2>
      </div>

      <p className="text-sm text-[#5F6473] mb-6">
        Add your social media profiles to help students connect with you
      </p>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.key}>
            <label className="block text-sm font-semibold text-[#111827] mb-2 flex items-center gap-2">
              <span style={{ color: platform.color }}>{platform.icon}</span>
              {platform.label}
            </label>
            <input
              type="url"
              value={currentLinks[platform.key] || ''}
              onChange={(e) => handleLinkChange(platform.key, e.target.value)}
              placeholder={platform.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#F5F7FF] rounded-xl">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-[#304DB5] flex-shrink-0 mt-0.5"
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
          <p className="text-sm text-[#5F6473]">
            Your social links will appear on your public profile and course pages. Make sure
            to enter full URLs starting with https://
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachSocialLinksForm;
