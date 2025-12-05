import { useState } from 'react';

interface PasswordRules {
  minLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSymbol: boolean;
  requireRotationDays?: number;
}

interface PasswordRulesCardProps {
  rules: PasswordRules;
  onChange: (nextRules: PasswordRules) => void;
}

const PasswordRulesCard: React.FC<PasswordRulesCardProps> = ({ rules, onChange }) => {
  const [localRules, setLocalRules] = useState(rules);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key: keyof PasswordRules, value: number | boolean) => {
    const updated = { ...localRules, [key]: value };
    setLocalRules(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onChange(localRules);
    setHasChanges(false);
    console.log('Password rules saved:', localRules);
  };

  const handleReset = () => {
    setLocalRules(rules);
    setHasChanges(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#111827] mb-1">Password Rules</h2>
        <p className="text-sm text-[#5F6473]">
          Define baseline password requirements across NexSkill
        </p>
      </div>

      {/* Rules Form */}
      <div className="space-y-4">
        {/* Min Length */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Minimum password length
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="8"
              max="20"
              value={localRules.minLength}
              onChange={(e) => handleChange('minLength', parseInt(e.target.value))}
              className="flex-1 h-2 bg-[#EDF0FB] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#304DB5]"
            />
            <div className="w-16 px-3 py-2 text-center text-sm font-medium text-[#111827] bg-[#F5F7FF] rounded-lg border border-[#EDF0FB]">
              {localRules.minLength}
            </div>
          </div>
          <p className="text-xs text-[#5F6473] mt-2">
            Passwords must be at least {localRules.minLength} characters long
          </p>
        </div>

        {/* Complexity Requirements */}
        <div className="pt-4 border-t border-[#EDF0FB]">
          <p className="text-sm font-medium text-[#111827] mb-3">Complexity requirements</p>

          <div className="space-y-3">
            {/* Uppercase */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localRules.requireUppercase}
                onChange={(e) => handleChange('requireUppercase', e.target.checked)}
                className="w-4 h-4 text-[#304DB5] border-[#9CA3B5] rounded focus:ring-[#304DB5]"
              />
              <span className="text-sm text-[#111827]">
                Require at least one uppercase letter (A-Z)
              </span>
            </label>

            {/* Number */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localRules.requireNumber}
                onChange={(e) => handleChange('requireNumber', e.target.checked)}
                className="w-4 h-4 text-[#304DB5] border-[#9CA3B5] rounded focus:ring-[#304DB5]"
              />
              <span className="text-sm text-[#111827]">
                Require at least one number (0-9)
              </span>
            </label>

            {/* Symbol */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localRules.requireSymbol}
                onChange={(e) => handleChange('requireSymbol', e.target.checked)}
                className="w-4 h-4 text-[#304DB5] border-[#9CA3B5] rounded focus:ring-[#304DB5]"
              />
              <span className="text-sm text-[#111827]">
                Require at least one symbol (!@#$%^&*)
              </span>
            </label>
          </div>
        </div>

        {/* Password Rotation */}
        <div className="pt-4 border-t border-[#EDF0FB]">
          <label className="block text-sm font-medium text-[#111827] mb-2">
            Password rotation
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#5F6473]">Force password change every</span>
            <input
              type="number"
              min="0"
              max="365"
              value={localRules.requireRotationDays || 0}
              onChange={(e) => handleChange('requireRotationDays', parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 text-sm text-[#111827] bg-white border border-[#EDF0FB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#304DB5] focus:border-transparent"
            />
            <span className="text-sm text-[#5F6473]">days</span>
          </div>
          <p className="text-xs text-[#9CA3B5] mt-2">
            Set to 0 to disable automatic password rotation
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      {hasChanges && (
        <div className="mt-6 pt-6 border-t border-[#EDF0FB] flex items-center justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-[#5F6473] hover:text-[#111827] bg-transparent hover:bg-[#F5F7FF] rounded-full border border-[#EDF0FB] transition-all duration-200"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-[#304DB5] hover:bg-[#152457] rounded-full shadow-[0_4px_12px_rgba(35,76,200,0.25)] hover:shadow-[0_6px_16px_rgba(35,76,200,0.35)] transition-all duration-200"
          >
            Save rules
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordRulesCard;
