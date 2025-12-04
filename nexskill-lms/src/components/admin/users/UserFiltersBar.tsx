import React from 'react';

interface FilterState {
  search: string;
  status: string;
  role: string;
  organizationId: string;
}

interface Organization {
  id: string;
  name: string;
}

interface UserFiltersBarProps {
  value: FilterState;
  organizations: Organization[];
  onChange: (updatedFilters: FilterState) => void;
}

const UserFiltersBar: React.FC<UserFiltersBarProps> = ({ value, organizations, onChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, status: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, role: e.target.value });
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, organizationId: e.target.value });
  };

  const handleReset = () => {
    onChange({
      search: '',
      status: 'all',
      role: 'all',
      organizationId: 'all',
    });
  };

  const hasActiveFilters =
    value.search ||
    value.status !== 'all' ||
    value.role !== 'all' ||
    value.organizationId !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] p-4 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search Input */}
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3B5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={value.search}
              onChange={handleSearchChange}
              placeholder="Search by name, email, or ID"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <select
          value={value.status}
          onChange={handleStatusChange}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm font-medium text-[#5F6473] bg-white"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
          <option value="pending">Pending</option>
        </select>

        {/* Role Dropdown */}
        <select
          value={value.role}
          onChange={handleRoleChange}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm font-medium text-[#5F6473] bg-white"
        >
          <option value="all">All roles</option>
          <option value="student">Student</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
          <option value="org_admin">Org Admin</option>
        </select>

        {/* Organization Dropdown */}
        <select
          value={value.organizationId}
          onChange={handleOrganizationChange}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#304DB5] focus:border-transparent outline-none text-sm font-medium text-[#5F6473] bg-white"
        >
          <option value="all">All organizations</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-semibold text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
};

export default UserFiltersBar;
