import React from 'react';
import CoachAvatarUploader from './CoachAvatarUploader';

interface ProfileHeaderData {
  name: string;
  headline: string;
  avatarUrl?: string;
}

interface ProfileStats {
  courses: number;
  students: number;
  rating: number;
}

interface CoachProfileHeaderProps {
  profile: ProfileHeaderData;
  stats: ProfileStats;
  onProfileChange: (updatedProfile: Partial<ProfileHeaderData>) => void;
}

const CoachProfileHeader: React.FC<CoachProfileHeaderProps> = ({
  profile,
  stats,
  onProfileChange,
}) => {
  const handleAvatarChange = (newAvatarMeta: { url?: string; fileName?: string }) => {
    onProfileChange({ avatarUrl: newAvatarMeta.url });
  };

  const handleViewPublicProfile = () => {
    console.log('View public profile clicked');
    alert('Public profile view would open here');
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDF0FB] p-8 shadow-lg">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Avatar */}
        <div className="flex-shrink-0">
          <CoachAvatarUploader
            avatarUrl={profile.avatarUrl}
            name={profile.name}
            onChange={handleAvatarChange}
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1">
          {/* Name and Headline */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#111827] mb-2">{profile.name}</h1>
            <p className="text-lg text-[#5F6473]">{profile.headline}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F5F7FF] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-[#304DB5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-xs text-[#9CA3B5] uppercase font-semibold">Courses</p>
              </div>
              <p className="text-2xl font-bold text-[#111827]">{stats.courses}</p>
            </div>

            <div className="bg-[#F5F7FF] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-[#22C55E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <p className="text-xs text-[#9CA3B5] uppercase font-semibold">Students</p>
              </div>
              <p className="text-2xl font-bold text-[#111827]">{stats.students}</p>
            </div>

            <div className="bg-[#F5F7FF] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-[#F59E0B]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <p className="text-xs text-[#9CA3B5] uppercase font-semibold">Rating</p>
              </div>
              <p className="text-2xl font-bold text-[#111827]">{stats.rating}</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleViewPublicProfile}
            className="px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            View Public Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachProfileHeader;
