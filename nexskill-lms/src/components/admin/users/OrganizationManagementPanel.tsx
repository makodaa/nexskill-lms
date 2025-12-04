import React from 'react';

interface Organization {
  id: string;
  name: string;
  type: 'Individual' | 'B2B';
  usersCount: number;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  contact: string;
}

interface OrganizationManagementPanelProps {
  organizations: Organization[];
  onFilterByOrg: (orgId: string) => void;
}

const OrganizationManagementPanel: React.FC<OrganizationManagementPanelProps> = ({
  organizations,
  onFilterByOrg,
}) => {
  const b2bOrgs = organizations.filter((org) => org.type === 'B2B');
  const totalOrgs = b2bOrgs.length;
  const totalSeats = b2bOrgs.reduce((sum, org) => sum + org.usersCount, 0);
  const enterpriseCount = b2bOrgs.filter((org) => org.plan === 'Enterprise').length;

  const getPlanConfig = (plan: Organization['plan']) => {
    switch (plan) {
      case 'Starter':
        return {
          label: 'Starter',
          bg: 'bg-[#E5E7EB]',
          text: 'text-[#4B5563]',
        };
      case 'Pro':
        return {
          label: 'Pro',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
        };
      case 'Enterprise':
        return {
          label: 'Enterprise',
          bg: 'bg-[#EDE9FE]',
          text: 'text-[#6D28D9]',
        };
    }
  };

  const handleViewAll = () => {
    console.log('View all organizations clicked');
    window.alert('Full organization management page would open here');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#111827]">Organizations (B2B)</h2>
        <button
          onClick={handleViewAll}
          className="text-xs font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
        >
          View all →
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-3 border border-[#EDF0FB]">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Total Orgs</p>
          <p className="text-2xl font-bold text-[#111827]">{totalOrgs}</p>
        </div>
        <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-3 border border-[#EDF0FB]">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Active Seats</p>
          <p className="text-2xl font-bold text-[#22C55E]">{totalSeats}</p>
        </div>
        <div className="bg-gradient-to-br from-[#F5F7FF] to-white rounded-xl p-3 border border-[#EDF0FB]">
          <p className="text-xs text-[#9CA3B5] font-semibold mb-1">Enterprise</p>
          <p className="text-2xl font-bold text-[#6D28D9]">{enterpriseCount}</p>
        </div>
      </div>

      {/* Organization List */}
      <div className="space-y-3">
        {b2bOrgs.slice(0, 5).map((org) => {
          const planConfig = getPlanConfig(org.plan);
          return (
            <div
              key={org.id}
              className="p-3 bg-gradient-to-r from-white to-[#FEFEFE] rounded-xl border border-[#EDF0FB] hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#111827] text-sm mb-1">{org.name}</h3>
                  <p className="text-xs text-[#9CA3B5]">{org.contact}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${planConfig.bg} ${planConfig.text}`}
                >
                  {planConfig.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[#5F6473]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="font-semibold">{org.usersCount}</span> users
                </div>
                <button
                  onClick={() => {
                    onFilterByOrg(org.id);
                    console.log('Filter by organization:', org.id);
                  }}
                  className="text-xs font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
                >
                  Filter users
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {b2bOrgs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[#9CA3B5]">No B2B organizations yet</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationManagementPanel;
