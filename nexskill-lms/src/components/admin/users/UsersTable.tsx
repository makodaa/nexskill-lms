import React from 'react';
import UserRoleBadge from './UserRoleBadge';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'banned' | 'pending';
  roles: string[];
  organizationId?: string;
  organizationName?: string;
  createdAt: string;
  lastActiveAt: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (userId: string) => void;
  onToggleBan: (userId: string) => void;
  onSelect: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onToggleBan, onSelect }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusConfig = (status: User['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          bg: 'bg-[#D1FAE5]',
          text: 'text-[#059669]',
          border: 'border-[#6EE7B7]',
        };
      case 'banned':
        return {
          label: 'Banned',
          bg: 'bg-[#FEE2E2]',
          text: 'text-[#DC2626]',
          border: 'border-[#FCA5A5]',
        };
      case 'pending':
        return {
          label: 'Pending',
          bg: 'bg-[#FEF3C7]',
          text: 'text-[#D97706]',
          border: 'border-[#FCD34D]',
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#EDF0FB] p-12 shadow-md text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-lg font-semibold text-[#111827] mb-2">No users found</p>
        <p className="text-sm text-[#5F6473]">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] shadow-md overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F7FF] border-b border-[#EDF0FB]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Roles
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#5F6473] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0FB]">
            {users.map((user) => {
              const statusConfig = getStatusConfig(user.status);
              return (
                <tr
                  key={user.id}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  onClick={() => onSelect(user.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-[#9CA3B5]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role, idx) => (
                        <UserRoleBadge key={idx} role={role} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#5F6473]">
                      {user.organizationName || 'Individual'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#5F6473]">{formatDate(user.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#5F6473]">{getRelativeTime(user.lastActiveAt)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(user.id);
                        }}
                        className="px-3 py-1 text-xs font-semibold text-[#304DB5] hover:bg-[#F5F7FF] rounded-full transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBan(user.id);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                          user.status === 'banned'
                            ? 'text-[#059669] hover:bg-[#D1FAE5]'
                            : 'text-[#DC2626] hover:bg-[#FEE2E2]'
                        }`}
                      >
                        {user.status === 'banned' ? 'Unban' : 'Ban'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-[#EDF0FB]">
        {users.map((user) => {
          const statusConfig = getStatusConfig(user.status);
          return (
            <div
              key={user.id}
              className="p-4 hover:bg-[#F9FAFB] transition-colors"
              onClick={() => onSelect(user.id)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-bold shadow-md">
                  {getInitials(user.firstName, user.lastName)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111827]">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-[#9CA3B5] mb-2">{user.email}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {user.roles.map((role, idx) => (
                      <UserRoleBadge key={idx} role={role} />
                    ))}
                  </div>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#EDF0FB]">
                <span className="text-xs text-[#9CA3B5]">
                  {user.organizationName || 'Individual'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user.id);
                    }}
                    className="px-3 py-1 text-xs font-semibold text-[#304DB5] bg-[#F5F7FF] rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBan(user.id);
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'banned'
                        ? 'text-[#059669] bg-[#D1FAE5]'
                        : 'text-[#DC2626] bg-[#FEE2E2]'
                    }`}
                  >
                    {user.status === 'banned' ? 'Unban' : 'Ban'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersTable;
