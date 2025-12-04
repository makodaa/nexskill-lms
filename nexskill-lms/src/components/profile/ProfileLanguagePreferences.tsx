import React from 'react';

interface LanguagePreferences {
  primaryLanguage: string;
  showSubtitles: boolean;
}

interface ProfileLanguagePreferencesProps {
  preferences: LanguagePreferences;
  onChange: (updated: LanguagePreferences) => void;
}

const languages = ['English', 'Filipino', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin'];

const ProfileLanguagePreferences: React.FC<ProfileLanguagePreferencesProps> = ({
  preferences,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Language preferences</h2>

      {/* Primary Language */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Primary language</label>
        <select
          value={preferences.primaryLanguage}
          onChange={(e) => onChange({ ...preferences, primaryLanguage: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">
          This affects the interface language and content recommendations
        </p>
      </div>

      {/* Subtitles Toggle */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <div>
          <div className="text-sm font-semibold text-slate-900">Show subtitles by default</div>
          <div className="text-xs text-slate-600 mt-1">
            Automatically enable subtitles when watching video lessons
          </div>
        </div>
        <button
          onClick={() => onChange({ ...preferences, showSubtitles: !preferences.showSubtitles })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            preferences.showSubtitles ? 'bg-[#304DB5]' : 'bg-slate-300'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              preferences.showSubtitles ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileLanguagePreferences;
