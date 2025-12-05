interface TwoFactorState {
  enabled: boolean;
  method: 'auth_app' | 'sms' | 'email';
  lastChangedAt?: string;
}

interface TwoFactorSettingsCardProps {
  state: TwoFactorState;
  onChange: (nextState: TwoFactorState) => void;
}

const TwoFactorSettingsCard: React.FC<TwoFactorSettingsCardProps> = ({ state, onChange }) => {
  const handleToggle = () => {
    onChange({
      ...state,
      enabled: !state.enabled,
      lastChangedAt: new Date().toISOString(),
    });
  };

  const handleMethodChange = (method: TwoFactorState['method']) => {
    onChange({
      ...state,
      method,
      lastChangedAt: new Date().toISOString(),
    });
  };

  const handleViewBackupCodes = () => {
    console.log('View backup codes - TODO');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#111827] mb-1">
            Two-factor authentication (2FA)
          </h2>
          <p className="text-sm text-[#5F6473]">
            Add an extra layer of security to your account
          </p>
        </div>
        <div>
          {state.enabled ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#22C55E]/10 text-[#22C55E]">
              ✓ Enabled
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#9CA3B5]/10 text-[#5F6473]">
              Disabled
            </span>
          )}
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-between py-4 border-t border-[#EDF0FB]">
        <div>
          <p className="text-sm font-medium text-[#111827]">Enable 2FA</p>
          <p className="text-xs text-[#5F6473] mt-1">
            Require a second verification step when signing in
          </p>
        </div>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.enabled ? 'bg-[#304DB5]' : 'bg-[#9CA3B5]'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Method Selector (when enabled) */}
      {state.enabled && (
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-[#111827] mb-3">
              Choose verification method:
            </p>

            <div className="space-y-2">
              {/* Auth App */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-[#EDF0FB] hover:bg-[#F5F7FF] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="2fa-method"
                  value="auth_app"
                  checked={state.method === 'auth_app'}
                  onChange={() => handleMethodChange('auth_app')}
                  className="mt-1 w-4 h-4 text-[#304DB5] border-[#9CA3B5] focus:ring-[#304DB5]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#111827]">
                      Authentication app
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#E0E5FF] text-[#304DB5] font-medium">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-[#5F6473] mt-1">
                    Use Google Authenticator, Authy, or similar apps
                  </p>
                </div>
              </label>

              {/* SMS */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-[#EDF0FB] hover:bg-[#F5F7FF] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="2fa-method"
                  value="sms"
                  checked={state.method === 'sms'}
                  onChange={() => handleMethodChange('sms')}
                  className="mt-1 w-4 h-4 text-[#304DB5] border-[#9CA3B5] focus:ring-[#304DB5]"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111827]">SMS</p>
                  <p className="text-xs text-[#5F6473] mt-1">
                    Receive verification codes via text message
                  </p>
                </div>
              </label>

              {/* Email */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-[#EDF0FB] hover:bg-[#F5F7FF] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="2fa-method"
                  value="email"
                  checked={state.method === 'email'}
                  onChange={() => handleMethodChange('email')}
                  className="mt-1 w-4 h-4 text-[#304DB5] border-[#9CA3B5] focus:ring-[#304DB5]"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111827]">Email</p>
                  <p className="text-xs text-[#5F6473] mt-1">
                    Receive verification codes via email
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Backup Codes */}
          <div className="pt-4 border-t border-[#EDF0FB]">
            <button
              onClick={handleViewBackupCodes}
              className="text-sm font-medium text-[#304DB5] hover:text-[#152457] transition-colors"
            >
              View backup codes →
            </button>
          </div>
        </div>
      )}

      {/* Disabled State Message */}
      {!state.enabled && (
        <div className="mt-6 p-4 bg-[#E0E5FF]/30 rounded-xl">
          <p className="text-sm text-[#5F6473]">
            Enable 2FA to add an extra layer of security to your account. Even if someone knows your
            password, they won't be able to access your account without the second verification step.
          </p>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSettingsCard;
