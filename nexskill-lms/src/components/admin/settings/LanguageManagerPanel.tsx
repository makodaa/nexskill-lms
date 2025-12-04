import React, { useState } from 'react';

interface Language {
  code: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  translationCoverage: number;
}

interface TranslationNamespace {
  id: string;
  key: string;
  translatedKeys: number;
  totalKeys: number;
}

interface LanguageManagerPanelProps {
  languages: Language[];
  namespaces?: TranslationNamespace[];
  onChange: (languages: Language[]) => void;
}

const LanguageManagerPanel: React.FC<LanguageManagerPanelProps> = ({
  languages,
  namespaces,
  onChange,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageCode, setNewLanguageCode] = useState('');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSetDefault = (code: string) => {
    const updated = languages.map((lang) => ({
      ...lang,
      isDefault: lang.code === code,
    }));
    onChange(updated);
    showNotification(`✓ ${languages.find((l) => l.code === code)?.name} set as default`);
  };

  const handleToggleActive = (code: string) => {
    const language = languages.find((l) => l.code === code);
    if (language?.isDefault) {
      showNotification('⚠️ Cannot deactivate the default language');
      return;
    }

    const updated = languages.map((lang) =>
      lang.code === code ? { ...lang, isActive: !lang.isActive } : lang
    );
    onChange(updated);
    const newState = !language?.isActive;
    showNotification(
      `✓ ${language?.name} ${newState ? 'activated' : 'deactivated'}`
    );
  };

  const handleAddLanguage = () => {
    if (!newLanguageName.trim() || !newLanguageCode.trim()) {
      showNotification('⚠️ Please enter both name and code');
      return;
    }

    if (languages.some((l) => l.code === newLanguageCode)) {
      showNotification('⚠️ Language code already exists');
      return;
    }

    const newLanguage: Language = {
      code: newLanguageCode.toLowerCase(),
      name: newLanguageName,
      isDefault: false,
      isActive: false,
      translationCoverage: 0,
    };

    onChange([...languages, newLanguage]);
    setNewLanguageName('');
    setNewLanguageCode('');
    setShowAddForm(false);
    showNotification(`✓ Added ${newLanguageName}`);
  };

  const handleViewNamespaces = (code: string) => {
    setSelectedLanguageCode(selectedLanguageCode === code ? null : code);
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return 'bg-green-500';
    if (coverage >= 70) return 'bg-yellow-500';
    if (coverage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
      {/* Notification Banner */}
      {notification && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Languages & translations</h2>
          <p className="text-gray-600 mt-1">
            Manage available locales and translation coverage.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#304DB5] text-white px-6 py-3 rounded-full font-medium hover:bg-[#5E7BFF] transition-colors shadow-lg"
        >
          + Add language
        </button>
      </div>

      {/* Add Language Form */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900">Add new language</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language Name
              </label>
              <input
                type="text"
                value={newLanguageName}
                onChange={(e) => setNewLanguageName(e.target.value)}
                placeholder="e.g., German"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language Code
              </label>
              <input
                type="text"
                value={newLanguageCode}
                onChange={(e) => setNewLanguageCode(e.target.value)}
                placeholder="e.g., de"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddLanguage}
              className="bg-[#304DB5] text-white px-6 py-2 rounded-full font-medium hover:bg-[#5E7BFF] transition-colors"
            >
              Add language
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-900">{languages.length}</span> languages
        </div>
        <div>·</div>
        <div>
          <span className="font-medium text-green-600">
            {languages.filter((l) => l.isActive).length}
          </span>{' '}
          active
        </div>
        <div>·</div>
        <div>
          <span className="font-medium text-gray-500">
            {languages.filter((l) => !l.isActive).length}
          </span>{' '}
          inactive
        </div>
      </div>

      {/* Languages List */}
      <div className="space-y-3">
        {languages.map((language) => (
          <div key={language.code}>
            <div
              className={`border rounded-xl p-5 transition-all ${
                language.isActive
                  ? 'bg-white border-gray-200 hover:border-[#304DB5] hover:shadow-md'
                  : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-900">
                      {language.name}{' '}
                      <span className="font-mono text-sm text-gray-500">({language.code})</span>
                    </h3>
                    {language.isDefault && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Default
                      </span>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        language.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {language.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Coverage Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Translation coverage</span>
                      <span className="font-medium">{language.translationCoverage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getCoverageColor(
                          language.translationCoverage
                        )}`}
                        style={{ width: `${language.translationCoverage}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    {!language.isDefault && (
                      <button
                        onClick={() => handleSetDefault(language.code)}
                        disabled={!language.isActive}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🌟 Set as default
                      </button>
                    )}
                    <button
                      onClick={() => handleToggleActive(language.code)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        language.isActive
                          ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {language.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
                    </button>
                    {namespaces && (
                      <button
                        onClick={() => handleViewNamespaces(language.code)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        📊 View namespaces
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Namespaces Breakdown */}
              {selectedLanguageCode === language.code && namespaces && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Translation namespaces
                  </h4>
                  <div className="space-y-2">
                    {namespaces.map((ns) => (
                      <div key={ns.id} className="flex items-center justify-between text-sm">
                        <span className="font-mono text-gray-600">{ns.key}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500">
                            {ns.translatedKeys} / {ns.totalKeys}
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${getCoverageColor(
                                (ns.translatedKeys / ns.totalKeys) * 100
                              )}`}
                              style={{
                                width: `${(ns.translatedKeys / ns.totalKeys) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-purple-600 text-xl">💡</span>
          <div className="text-sm text-purple-800">
            <strong>Best practice:</strong> Maintain at least 80% translation coverage before
            activating a language. The default language cannot be deactivated.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageManagerPanel;
