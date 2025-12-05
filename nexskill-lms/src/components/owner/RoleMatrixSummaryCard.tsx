import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RoleSummary {
  roleKey: string;
  label: string;
  userCount: number;
  keyCapabilities: string[];
  icon: string;
  color: string;
}

interface RoleMatrixSummaryCardProps {
  rolesSummary: RoleSummary[];
}

const RoleMatrixSummaryCard: React.FC<RoleMatrixSummaryCardProps> = ({ rolesSummary }) => {
  const navigate = useNavigate();

  const handleViewAccessControl = () => {
    console.log('Navigating to: /owner/security');
    navigate('/owner/security');
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB] shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary mb-1">Role Hierarchy</h3>
        <p className="text-sm text-text-secondary">Active roles and their responsibilities</p>
      </div>

      {/* Role List */}
      <div className="space-y-4 mb-6">
        {rolesSummary.map((role, index) => (
          <div
            key={index}
            className="border border-[#EDF0FB] rounded-xl p-4 hover:bg-[#F5F7FF] transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center text-lg flex-shrink-0`}>
                {role.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-text-primary">{role.label}</h4>
                  <span className="text-xs font-medium text-text-muted bg-[#F5F7FF] px-2 py-1 rounded-full">
                    {role.userCount.toLocaleString()} users
                  </span>
                </div>
                <ul className="space-y-1">
                  {role.keyCapabilities.slice(0, 2).map((capability, capIndex) => (
                    <li key={capIndex} className="text-xs text-text-secondary flex items-start gap-2">
                      <span className="text-brand-primary mt-0.5">•</span>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <button
        onClick={handleViewAccessControl}
        className="w-full py-3 px-4 bg-brand-primary-soft text-brand-primary rounded-xl font-medium text-sm hover:bg-brand-primary hover:text-white transition-colors"
      >
        View Access Control →
      </button>
    </div>
  );
};

export default RoleMatrixSummaryCard;
