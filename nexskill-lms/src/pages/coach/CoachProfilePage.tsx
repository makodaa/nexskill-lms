import React, { useState } from 'react';
import CoachAppLayout from '../../layouts/CoachAppLayout';
import CoachProfileHeader from '../../components/coach/profile/CoachProfileHeader';
import CoachBioForm from '../../components/coach/profile/CoachBioForm';
import CoachSocialLinksForm from '../../components/coach/profile/CoachSocialLinksForm';
import CoachAchievementsPanel from '../../components/coach/profile/CoachAchievementsPanel';
import CoachPoliciesPanel from '../../components/coach/profile/CoachPoliciesPanel';

interface CoachProfile {
  name: string;
  headline: string;
  avatarUrl?: string;
  bio: {
    headline: string;
    shortBio: string;
    fullBio: string;
    specialties: string[];
  };
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    year: number;
  }>;
  policies: {
    cancellation: string;
    refund: string;
    rescheduling: string;
    conduct: string;
  };
  stats: {
    courses: number;
    students: number;
    rating: number;
  };
}

const CoachProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<CoachProfile>({
    name: 'Dr. Sarah Mitchell',
    headline: 'Leadership Coach & Corporate Trainer',
    avatarUrl: undefined,
    bio: {
      headline: 'Leadership Coach & Corporate Trainer',
      shortBio:
        'Helping executives and teams unlock their full potential through evidence-based coaching.',
      fullBio:
        'With over 15 years of experience in leadership development, I specialize in helping executives, managers, and high-performing teams achieve breakthrough results. My coaching approach combines neuroscience, positive psychology, and practical business acumen to create lasting transformation.',
      specialties: ['Executive Coaching', 'Team Building', 'Emotional Intelligence', 'Change Management'],
    },
    socialLinks: {
      website: 'https://sarahmitchell.com',
      linkedin: 'https://linkedin.com/in/sarahmitchell',
      twitter: '',
      youtube: '',
      facebook: '',
    },
    achievements: [
      {
        id: 'ach-1',
        title: 'ICF Professional Certified Coach (PCC)',
        description: 'International Coaching Federation certification',
        year: 2018,
      },
      {
        id: 'ach-2',
        title: 'Best Leadership Coach Award',
        description: 'Recognized by the Global Coaching Summit',
        year: 2022,
      },
    ],
    policies: {
      cancellation:
        'Students may cancel up to 24 hours before the scheduled session for a full refund. Cancellations made less than 24 hours in advance will not be refunded.',
      refund:
        'Full refund if canceled 48+ hours before session. 50% refund if canceled 24-48 hours before. No refund for cancellations within 24 hours.',
      rescheduling:
        'Free rescheduling allowed up to 24 hours before the session. One free reschedule per booking. Additional reschedules may incur a $25 fee.',
      conduct:
        'Students are expected to arrive on time, be prepared with questions or materials discussed in advance, maintain professional communication, and respect confidentiality of discussions.',
    },
    stats: {
      courses: 12,
      students: 847,
      rating: 4.9,
    },
  });

  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleProfileHeaderChange = (updatedHeader: Partial<Pick<CoachProfile, 'name' | 'headline' | 'avatarUrl'>>) => {
    setProfile((prev) => ({ ...prev, ...updatedHeader }));
    setHasUnsavedChanges(true);
    console.log('Profile header updated:', updatedHeader);
  };

  const handleBioChange = (updatedBio: CoachProfile['bio']) => {
    setProfile((prev) => ({ ...prev, bio: updatedBio, headline: updatedBio.headline }));
    setHasUnsavedChanges(true);
    console.log('Bio updated:', updatedBio);
  };

  const handleSocialLinksChange = (updatedLinks: CoachProfile['socialLinks']) => {
    setProfile((prev) => ({ ...prev, socialLinks: updatedLinks }));
    setHasUnsavedChanges(true);
    console.log('Social links updated:', updatedLinks);
  };

  const handleAchievementsChange = (updatedAchievements: CoachProfile['achievements']) => {
    setProfile((prev) => ({ ...prev, achievements: updatedAchievements }));
    setHasUnsavedChanges(true);
    console.log('Achievements updated:', updatedAchievements);
  };

  const handlePoliciesChange = (updatedPolicies: CoachProfile['policies']) => {
    setProfile((prev) => ({ ...prev, policies: updatedPolicies }));
    setHasUnsavedChanges(true);
    console.log('Policies updated:', updatedPolicies);
  };

  const handleSaveAll = () => {
    console.log('Saving profile:', profile);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    alert('Profile saved successfully!');
  };

  return (
    <CoachAppLayout>
      <div className="max-w-7xl mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-[#111827]">Coach Profile</h1>
            <div className="flex gap-3 items-center">
              {hasUnsavedChanges && (
                <span className="text-sm text-[#F59E0B] font-medium">Unsaved changes</span>
              )}
              <button
                onClick={handleSaveAll}
                disabled={!hasUnsavedChanges}
                className={`px-6 py-3 font-semibold rounded-full transition-all ${
                  hasUnsavedChanges
                    ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
                    : 'bg-[#E5E7EB] text-[#9CA3B5] cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
          <p className="text-[#5F6473]">
            Manage your public profile, bio, achievements, and coaching policies
          </p>
          <p className="text-xs text-[#9CA3B5] mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header Section (Full Width) */}
          <CoachProfileHeader
            profile={{
              name: profile.name,
              headline: profile.headline,
              avatarUrl: profile.avatarUrl,
            }}
            stats={profile.stats}
            onProfileChange={handleProfileHeaderChange}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <CoachBioForm bio={profile.bio} onChange={handleBioChange} />
              <CoachSocialLinksForm links={profile.socialLinks} onChange={handleSocialLinksChange} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <CoachAchievementsPanel
                achievements={profile.achievements}
                onChange={handleAchievementsChange}
              />
              <CoachPoliciesPanel policies={profile.policies} onChange={handlePoliciesChange} />
            </div>
          </div>
        </div>
      </div>
    </CoachAppLayout>
  );
};

export default CoachProfilePage;
