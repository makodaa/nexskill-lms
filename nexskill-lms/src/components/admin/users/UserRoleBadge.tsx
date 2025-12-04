import React from 'react';

interface UserRoleBadgeProps {
  role: string;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  const getRoleConfig = (role: string) => {
    const normalized = role.toLowerCase();
    
    switch (normalized) {
      case 'student':
        return {
          label: 'Student',
          bg: 'bg-[#E5E7EB]',
          text: 'text-[#4B5563]',
          border: 'border-[#D1D5DB]',
        };
      case 'coach':
        return {
          label: 'Coach',
          bg: 'bg-[#DBEAFE]',
          text: 'text-[#1E40AF]',
          border: 'border-[#93C5FD]',
        };
      case 'admin':
        return {
          label: 'Admin',
          bg: 'bg-[#EDE9FE]',
          text: 'text-[#6D28D9]',
          border: 'border-[#C4B5FD]',
        };
      case 'org_admin':
      case 'org admin':
        return {
          label: 'Org Admin',
          bg: 'bg-[#FEF3C7]',
          text: 'text-[#B45309]',
          border: 'border-[#FCD34D]',
        };
      default:
        return {
          label: role,
          bg: 'bg-[#F3F4F6]',
          text: 'text-[#6B7280]',
          border: 'border-[#E5E7EB]',
        };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  );
};

export default UserRoleBadge;
