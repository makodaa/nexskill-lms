import React, { useState } from 'react';

interface BioData {
  headline: string;
  shortBio: string;
  fullBio: string;
  specialties: string[];
}

interface CoachBioFormProps {
  bio: BioData;
  onChange: (updatedBio: BioData) => void;
}

const CoachBioForm: React.FC<CoachBioFormProps> = ({ bio, onChange }) => {
  const [currentBio, setCurrentBio] = useState<BioData>(bio);
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleFieldChange = (field: keyof BioData, value: string) => {
    const updated = { ...currentBio, [field]: value };
    setCurrentBio(updated);
    onChange(updated);
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      const updated = {
        ...currentBio,
        specialties: [...currentBio.specialties, newSpecialty.trim()],
      };
      setCurrentBio(updated);
      onChange(updated);
      setNewSpecialty('');
      console.log('Added specialty:', newSpecialty.trim());
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    const updated = {
      ...currentBio,
      specialties: currentBio.specialties.filter((_, i) => i !== index),
    };
    setCurrentBio(updated);
    onChange(updated);
    console.log('Removed specialty at index:', index);
  };

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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <h2 className="text-xl font-bold text-[#111827]">About You</h2>
      </div>

      <div className="space-y-6">
        {/* Headline */}
        <div>
          <label className="block text-sm font-semibold text-[#111827] mb-2">
            Headline
          </label>
          <input
            type="text"
            value={currentBio.headline}
            onChange={(e) => handleFieldChange('headline', e.target.value)}
            placeholder="e.g., Leadership Coach & Corporate Trainer"
            className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
            maxLength={100}
          />
          <p className="text-xs text-[#9CA3B5] mt-1">
            {currentBio.headline.length}/100 characters
          </p>
        </div>

        {/* Short Bio */}
        <div>
          <label className="block text-sm font-semibold text-[#111827] mb-2">
            Short Bio
          </label>
          <textarea
            value={currentBio.shortBio}
            onChange={(e) => handleFieldChange('shortBio', e.target.value)}
            placeholder="A brief summary (shown on course listings)"
            className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none resize-none"
            rows={3}
            maxLength={250}
          />
          <p className="text-xs text-[#9CA3B5] mt-1">
            {currentBio.shortBio.length}/250 characters
          </p>
        </div>

        {/* Full Bio */}
        <div>
          <label className="block text-sm font-semibold text-[#111827] mb-2">
            Full Bio
          </label>
          <textarea
            value={currentBio.fullBio}
            onChange={(e) => handleFieldChange('fullBio', e.target.value)}
            placeholder="Tell students about your background, expertise, and teaching philosophy"
            className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none resize-none"
            rows={8}
            maxLength={2000}
          />
          <p className="text-xs text-[#9CA3B5] mt-1">
            {currentBio.fullBio.length}/2000 characters
          </p>
        </div>

        {/* Specialties */}
        <div>
          <label className="block text-sm font-semibold text-[#111827] mb-2">
            Areas of Expertise
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSpecialty()}
              placeholder="e.g., Executive Coaching, Mindfulness"
              className="flex-1 px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none"
            />
            <button
              onClick={handleAddSpecialty}
              className="px-4 py-2 bg-[#304DB5] text-white font-semibold rounded-full hover:bg-[#5E7BFF] transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentBio.specialties.length === 0 && (
              <p className="text-sm text-[#9CA3B5] italic">No specialties added yet</p>
            )}
            {currentBio.specialties.map((specialty, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F7FF] text-[#304DB5] rounded-full text-sm font-medium"
              >
                {specialty}
                <button
                  onClick={() => handleRemoveSpecialty(idx)}
                  className="hover:text-[#EF4444] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachBioForm;
