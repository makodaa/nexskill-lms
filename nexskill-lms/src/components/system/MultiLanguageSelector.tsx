import { useState, useRef, useEffect } from 'react';
import { useUiPreferences } from '../../context/UiPreferencesContext';

interface Language {
  code: string;
  label: string;
  emoji: string;
}

interface MultiLanguageSelectorProps {
  availableLanguages?: Language[];
}

const defaultLanguages: Language[] = [
  { code: 'en', label: 'English', emoji: '🇺🇸' },
  { code: 'fil', label: 'Filipino', emoji: '🇵🇭' },
  { code: 'es', label: 'Spanish', emoji: '🇪🇸' },
];

const MultiLanguageSelector: React.FC<MultiLanguageSelectorProps> = ({
  availableLanguages = defaultLanguages,
}) => {
  const { language, setLanguage } = useUiPreferences();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = availableLanguages.find((lang) => lang.code === language) || availableLanguages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white hover:bg-[#E0E5FF] border border-[#EDF0FB] transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Select language"
      >
        <span className="text-base">{currentLanguage.emoji}</span>
        <span className="text-sm font-medium text-[#111827] uppercase">
          {currentLanguage.code}
        </span>
        <svg
          className={`w-4 h-4 text-[#5F6473] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_12px_30px_rgba(20,46,130,0.12)] border border-[#EDF0FB] py-2 z-50 animate-fadeIn">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                lang.code === language
                  ? 'bg-[#E0E5FF] text-[#304DB5] font-medium'
                  : 'text-[#111827] hover:bg-[#F5F7FF]'
              }`}
            >
              <span className="text-lg">{lang.emoji}</span>
              <div className="flex-1">
                <p className="text-sm">{lang.label}</p>
              </div>
              {lang.code === language && (
                <svg className="w-4 h-4 text-[#304DB5]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiLanguageSelector;
