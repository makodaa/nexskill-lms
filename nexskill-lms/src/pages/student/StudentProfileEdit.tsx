import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import StudentAppLayout from '../../layouts/StudentAppLayout';
import AutocompleteModal from '../../components/AutocompleteModal';

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

interface Interest {
  id: string;
  name: string;
}

interface Goal {
  id: string;
  name: string;
}

interface CategorizedOption {
  id: string;
  name: string;
  type: 'interest' | 'goal';
}

const StudentProfileEdit: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    headline: '',
    bio: '',
  });

  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([]);
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Unified modal state
  const [showAutocompleteModal, setShowAutocompleteModal] = useState(false);

  // Available options from database
  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [availableGoals, setAvailableGoals] = useState<Goal[]>([]);

  // Combined categorized options for autocomplete
  const [categorizedOptions, setCategorizedOptions] = useState<CategorizedOption[]>([]);

  // Fetch available interests and goals
  useEffect(() => {
    async function fetchOptions() {
      const { data: interestsData, error: interestsError } = await supabase
        .from('interests')
        .select('id, name')
        .eq('is_active', true)
        .order('display_order');

      if (!interestsError && interestsData) {
        setAvailableInterests(interestsData);
      }

      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('id, name')
        .eq('is_active', true)
        .order('display_order');

      if (!goalsError && goalsData) {
        setAvailableGoals(goalsData);
      }
    }

    fetchOptions();
  }, []);

  // Combine interests and goals into categorized options
  useEffect(() => {
    const interests: CategorizedOption[] = availableInterests.map(i => ({
      id: i.id,
      name: i.name,
      type: 'interest' as const,
    }));

    const goals: CategorizedOption[] = availableGoals.map(g => ({
      id: g.id,
      name: g.name,
      type: 'goal' as const,
    }));

    setCategorizedOptions([...interests, ...goals]);
  }, [availableInterests, availableGoals]);

  // Fetch current profile data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) {
          navigate('/login');
          return;
        }

        setUserId(user.id);

        const { data: profileData, error: profileError } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          if (profileError.code === 'PGRST116') {
            setLoading(false);
            return;
          }
          throw profileError;
        }

        const profile: StudentProfile = profileData;

        setFormData({
          firstName: profile.first_name,
          lastName: profile.last_name,
          displayName: `${profile.first_name} ${profile.last_name}`,
          headline: profile.headline || '',
          bio: profile.bio || '',
        });

        if (profile.current_skill_level) {
          setSkillLevel(profile.current_skill_level);
        }

        // Fetch user's interests
        const { data: interestsData, error: interestsError } = await supabase
          .from('student_interests')
          .select('interest_id')
          .eq('student_profile_id', profile.id);

        if (!interestsError && interestsData) {
          setSelectedInterestIds(interestsData.map(item => item.interest_id));
        }

        // Fetch user's goals
        const { data: goalsData, error: goalsError } = await supabase
          .from('student_goals')
          .select('goal_id')
          .eq('student_profile_id', profile.id);

        if (!goalsError && goalsData) {
          setSelectedGoalIds(goalsData.map(item => item.goal_id));
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

  // Handle unified selection
  const handleSelect = (id: string, type: 'interest' | 'goal') => {
    if (type === 'interest') {
      if (selectedInterestIds.includes(id)) {
        setSelectedInterestIds(prev => prev.filter(i => i !== id));
      } else {
        setSelectedInterestIds(prev => [...prev, id]);
      }
    } else {
      if (selectedGoalIds.includes(id)) {
        setSelectedGoalIds(prev => prev.filter(g => g !== id));
      } else {
        setSelectedGoalIds(prev => [...prev, id]);
      }
    }
  };

  const handleRemoveInterest = (interestId: string) => {
    setSelectedInterestIds(prev => prev.filter(id => id !== interestId));
  };

  const handleRemoveGoal = (goalId: string) => {
    setSelectedGoalIds(prev => prev.filter(id => id !== goalId));
  };

  const handleSave = async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const profileData = {
        user_id: userId,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        headline: formData.headline.trim() || null,
        bio: formData.bio.trim() || null,
        current_skill_level: skillLevel,
      };

      const { data, error: upsertError } = await supabase
        .from('student_profiles')
        .upsert(profileData, { onConflict: 'user_id' })
        .select()
        .single();

      if (upsertError) throw upsertError;

      const savedProfileId = data.id;

      // Save interests
      await supabase
        .from('student_interests')
        .delete()
        .eq('student_profile_id', savedProfileId);

      if (selectedInterestIds.length > 0) {
        const interestRecords = selectedInterestIds.map(interestId => ({
          student_profile_id: savedProfileId,
          interest_id: interestId,
        }));

        const { error: interestsError } = await supabase
          .from('student_interests')
          .insert(interestRecords);

        if (interestsError) console.error('Error saving interests:', interestsError);
      }

      // Save goals
      await supabase
        .from('student_goals')
        .delete()
        .eq('student_profile_id', savedProfileId);

      if (selectedGoalIds.length > 0) {
        const goalRecords = selectedGoalIds.map(goalId => ({
          student_profile_id: savedProfileId,
          goal_id: goalId,
        }));

        const { error: goalsError } = await supabase
          .from('student_goals')
          .insert(goalRecords);

        if (goalsError) console.error('Error saving goals:', goalsError);
      }

      setShowSuccessMessage(true);

      setTimeout(() => {
        navigate('/student/profile');
      }, 1500);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile');
      setSaving(false);
    }
  };

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

  const selectedInterests = availableInterests.filter(i => selectedInterestIds.includes(i.id));
  const selectedGoals = availableGoals.filter(g => selectedGoalIds.includes(g.id));
  const allSelectedIds = [...selectedInterestIds, ...selectedGoalIds];

  return (
    <StudentAppLayout>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit profile</h1>
          <p className="text-lg text-slate-600">Update your personal details and learning goals</p>
        </div>

        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 font-medium">Profile saved successfully!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-8 mb-6">
          {/* Personal Information */}
          <div className="mb-8 pb-8 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Personal information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Headline</label>
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
                placeholder="Tell us a bit about yourself"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>
          </div>

          {/* Interests & Goals Combined Section */}
          <div className="mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Interests & Learning Goals</h2>
              <button
                type="button"
                onClick={() => setShowAutocompleteModal(true)}
                className="px-4 py-2 bg-[#304DB5] text-white rounded-full text-sm font-medium hover:bg-[#2840a0] transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Interest or Goal
              </button>
            </div>

            {/* Interests Display */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Interests</h3>
              {selectedInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.map((interest) => (
                    <span
                      key={interest.id}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {interest.name}
                      <button
                        onClick={() => handleRemoveInterest(interest.id)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No interests selected yet</p>
              )}
            </div>

            {/* Goals Display */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Learning Goals</h3>
              {selectedGoals.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedGoals.map((goal) => (
                    <span
                      key={goal.id}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm font-medium"
                    >
                      {goal.name}
                      <button
                        onClick={() => handleRemoveGoal(goal.id)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-green-200 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No goals selected yet</p>
              )}
            </div>
          </div>

          {/* Skill Level */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Experience Level</h2>
            <div className="space-y-3">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSkillLevel(level)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${skillLevel === level
                    ? 'border-[#304DB5] bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">{level}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${skillLevel === level ? 'border-[#304DB5]' : 'border-slate-300'
                      }`}>
                      {skillLevel === level && (
                        <div className="w-3 h-3 rounded-full bg-[#304DB5]"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
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

      {/* Unified Autocomplete Modal */}
      <AutocompleteModal
        isOpen={showAutocompleteModal}
        onClose={() => setShowAutocompleteModal(false)}
        title="Add Interests & Learning Goals"
        placeholder="Search interests or goals (e.g., Design, Data, Get a job...)"
        options={categorizedOptions}
        selectedIds={allSelectedIds}
        onSelect={handleSelect}
      />
    </StudentAppLayout>
  );
};

export default StudentProfileEdit;