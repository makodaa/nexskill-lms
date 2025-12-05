interface SecurityActivity {
  lastLoginLocation: string;
  lastLoginDevice: string;
  lastPasswordChangeAt?: string;
  failedLoginAttemptsLast7d: number;
  activeSessionsCount: number;
}

interface SecurityActivitySummaryCardProps {
  activity: SecurityActivity;
}

const SecurityActivitySummaryCard: React.FC<SecurityActivitySummaryCardProps> = ({ activity }) => {
  const getRiskLevel = (): { label: string; color: string; bgColor: string } => {
    if (activity.failedLoginAttemptsLast7d > 5) {
      return { label: 'High', color: '#EF4444', bgColor: '#FEE2E2' };
    }
    if (activity.failedLoginAttemptsLast7d > 2) {
      return { label: 'Medium', color: '#F97316', bgColor: '#FFEDD5' };
    }
    return { label: 'Low', color: '#22C55E', bgColor: '#D1FAE5' };
  };

  const riskLevel = getRiskLevel();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827] mb-1">Security Activity</h2>
          <p className="text-sm text-[#5F6473]">Recent security events</p>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: riskLevel.bgColor, color: riskLevel.color }}
        >
          Risk: {riskLevel.label}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {/* Last Login Location */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0E5FF] flex items-center justify-center flex-shrink-0">
            <span className="text-base">📍</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#9CA3B5] uppercase tracking-wide">
              Last Login Location
            </p>
            <p className="text-sm font-medium text-[#111827] mt-1">
              {activity.lastLoginLocation}
            </p>
          </div>
        </div>

        {/* Last Login Device */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0E5FF] flex items-center justify-center flex-shrink-0">
            <span className="text-base">💻</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#9CA3B5] uppercase tracking-wide">
              Last Login Device
            </p>
            <p className="text-sm font-medium text-[#111827] mt-1">
              {activity.lastLoginDevice}
            </p>
          </div>
        </div>

        {/* Last Password Change */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0E5FF] flex items-center justify-center flex-shrink-0">
            <span className="text-base">🔑</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#9CA3B5] uppercase tracking-wide">
              Last Password Change
            </p>
            <p className="text-sm font-medium text-[#111827] mt-1">
              {formatDate(activity.lastPasswordChangeAt)}
            </p>
          </div>
        </div>

        {/* Failed Login Attempts */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0E5FF] flex items-center justify-center flex-shrink-0">
            <span className="text-base">⚠️</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#9CA3B5] uppercase tracking-wide">
              Failed Attempts (7d)
            </p>
            <p className="text-sm font-medium text-[#111827] mt-1">
              {activity.failedLoginAttemptsLast7d === 0
                ? 'None'
                : `${activity.failedLoginAttemptsLast7d} attempts`}
            </p>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0E5FF] flex items-center justify-center flex-shrink-0">
            <span className="text-base">🔓</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#9CA3B5] uppercase tracking-wide">
              Active Sessions
            </p>
            <p className="text-sm font-medium text-[#111827] mt-1">
              {activity.activeSessionsCount} {activity.activeSessionsCount === 1 ? 'session' : 'sessions'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-6 border-t border-[#EDF0FB]">
        <p className="text-xs text-[#9CA3B5]">
          Security activity is monitored 24/7. Contact support if you notice suspicious behavior.
        </p>
      </div>
    </div>
  );
};

export default SecurityActivitySummaryCard;
