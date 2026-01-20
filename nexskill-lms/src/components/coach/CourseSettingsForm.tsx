import React, { useState } from 'react';

interface CourseSettings {
  title: string;
  subtitle: string;
  category: string;
  level: string;
  language: string;
  shortDescription: string;
  longDescription: string;
  tags: string;
  visibility: 'public' | 'unlisted' | 'private';
}

interface CourseSettingsFormProps {
  settings: CourseSettings;
  onChange: (updatedSettings: CourseSettings) => void;
  onSave: () => Promise<void>;
}

const CourseSettingsForm: React.FC<CourseSettingsFormProps> = ({ settings, onChange, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...settings, [name]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  return (
    <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Course settings</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 font-semibold rounded-full transition-all ${isSaving
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
            }`}
        >
          {isSaving ? '✓ Saved' : 'Save changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* General Info */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-dark-text-primary mb-4">General information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Course title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={settings.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Subtitle / tagline
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={settings.subtitle}
                onChange={handleInputChange}
                placeholder="A brief tagline to complement your title"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={settings.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={settings.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-dark-text-primary mb-4">Course details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="shortDescription" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Short description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={settings.shortDescription}
                onChange={handleInputChange}
                rows={2}
                placeholder="One or two sentences for the course card"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            <div>
              <label htmlFor="longDescription" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Long description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                value={settings.longDescription}
                onChange={handleInputChange}
                rows={6}
                placeholder="Detailed description of what students will learn"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-slate-700 dark:text-dark-text-primary mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={settings.tags}
                onChange={handleInputChange}
                placeholder="javascript, react, frontend (comma-separated)"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-dark-text-primary mb-4">Visibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(['public', 'unlisted', 'private'] as const).map((vis) => (
              <button
                key={vis}
                type="button"
                onClick={() => onChange({ ...settings, visibility: vis })}
                className={`p-4 rounded-xl border-2 transition-all text-left ${settings.visibility === vis
                  ? 'border-[#5E7BFF] bg-blue-50'
                  : 'border-slate-200 dark:border-gray-700 hover:border-slate-300'
                  }`}
              >
                <p className="font-semibold text-slate-900 dark:text-dark-text-primary capitalize mb-1">{vis}</p>
                <p className="text-xs text-slate-600">
                  {vis === 'public' && 'Visible to all users'}
                  {vis === 'unlisted' && 'Only via direct link'}
                  {vis === 'private' && 'Only invited students'}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSettingsForm;
