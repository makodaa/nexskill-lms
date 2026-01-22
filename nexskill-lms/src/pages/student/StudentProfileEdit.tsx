import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import StudentAppLayout from '../../layouts/StudentAppLayout';
import ProfileInterestsGoals from '../../components/profile/ProfileInterestsGoals';

interface StudentProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  headline: string | null;
  bio: string | null;
  current_skill_level: 'Beginner' | 'Intermediate' | 'Advanced' | null;
  created_at: string;
  updated_at: string;
}

const StudentProfileEdit: React.FC = () => {
  const navigate = useNavigate();

  // Local state for form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    headline: '',
    bio: '',
  });

  // Dummy data for interests & goals (will be transferred to DB later)
  const [interestsGoals, setInterestsGoals] = useState({
    interests: ['Design', 'Business', 'Career'],
    goals: ['Get a job', 'Start a side project'],
    level: 'Intermediate',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch current profile data
  useEffect(() => {
    async function fetchProfile() {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        if (!user) {
          navigate('/login');
          return;
        }

        setUserId(user.id);

        // Fetch student profile
        const { data: profileData, error: profileError } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          // Profile doesn't exist yet - this is OK for new users
          if (profileError.code === 'PGRST116') {
            console.log('No profile found, will create on save');
            setLoading(false);
            return;
          }
          throw profileError;
        }
        
        // Type the profile data
        const profile: StudentProfile = profileData;
        
        // Populate form with existing data from database
        setFormData({
          firstName: profile.first_name,
          lastName: profile.last_name,
          displayName: `${profile.first_name} ${profile.last_name}`,
          headline: profile.headline || '',
          bio: profile.bio || '',
        });

        // Map database skill level to dummy data format
        if (profile.current_skill_level) {
          setInterestsGoals(prev => ({
            ...prev,
            level: profile.current_skill_level as 'Beginner' | 'Intermediate' | 'Advanced',
          }));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        setLoading(false);
      }
    }

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Prepare data for database
      const profileData = {
        user_id: userId,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        headline: formData.headline.trim() || null,
        bio: formData.bio.trim() || null,
        current_skill_level: interestsGoals.level,
      };

      // Save to database using upsert
      const { data, error: upsertError } = await supabase
        .from('student_profiles')
        .upsert(profileData, {
          onConflict: 'user_id',
        })
        .select()
        .single();

      if (upsertError) throw upsertError;

      console.log('Profile saved successfully:', data);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/student/profile');
      }, 1500);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile');
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <StudentAppLayout>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#304DB5] mb-4"></div>
            <p className="text-slate-600">Loading profile...</p>
          </div>
        </div>
      </StudentAppLayout>
    );
  }

  return (
    <StudentAppLayout>
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit profile</h1>
          <p className="text-lg text-slate-600">Update your personal details and learning goals</p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-700 font-medium">Profile saved successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white dark:bg-dark-background-card rounded-3xl shadow-md border border-slate-200 p-8 mb-6">
          {/* Avatar Section */}
          <div className="mb-8 pb-8 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Profile photo</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-bold text-4xl">
                {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '?'}
              </div>
              <button
                onClick={() => alert('Photo upload coming soon!')}
                className="px-6 py-2.5 text-sm font-medium text-[#304DB5] border-2 border-[#304DB5] rounded-full hover:bg-blue-50 transition-all"
              >
                Change photo
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Personal information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      firstName: e.target.value,
                      displayName: `${e.target.value} ${formData.lastName}`
                    });
                  }}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      lastName: e.target.value,
                      displayName: `${formData.firstName} ${e.target.value}`
                    });
                  }}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Display name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-2 text-xs text-slate-500">This is how your name appears to others</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Headline
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="What are you focusing on?"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Tell us a bit about yourself and your learning journey"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>
          </div>

          {/* Interests & Goals - Using original component with dummy data */}
          {/* TODO: This will be connected to database later */}
          <div className="mb-8">
            <ProfileInterestsGoals
              mode="edit"
              interests={interestsGoals.interests}
              goals={interestsGoals.goals}
              level={interestsGoals.level}
              onChange={(updated) => setInterestsGoals(updated)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <button
              onClick={() => navigate('/student/profile')}
              disabled={saving}
              className="px-8 py-3 text-slate-700 font-medium rounded-full border-2 border-slate-200 hover:border-slate-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default StudentProfileEdit;