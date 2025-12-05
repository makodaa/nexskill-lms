import React, { useState } from 'react';
import PlatformOwnerAppLayout from '../../layouts/PlatformOwnerAppLayout';
import { labelByRole, roleIcons, roleColors } from '../../types/roles';
import type { UserRole } from '../../types/roles';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
  createdAt: string;
}

const UsersRolesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Dummy user data
  const allUsers: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@nexskill.com',
      role: 'PLATFORM_OWNER',
      status: 'active',
      lastActive: '2 hours ago',
      createdAt: 'Jan 15, 2024',
    },
    {
      id: '2',
      name: 'Bob Martinez',
      email: 'bob@nexskill.com',
      role: 'ADMIN',
      status: 'active',
      lastActive: '1 hour ago',
      createdAt: 'Feb 20, 2024',
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@nexskill.com',
      role: 'ADMIN',
      status: 'active',
      lastActive: '3 hours ago',
      createdAt: 'Mar 10, 2024',
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david.chen@example.com',
      role: 'COACH',
      status: 'active',
      lastActive: '30 minutes ago',
      createdAt: 'Apr 5, 2024',
    },
    {
      id: '5',
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      role: 'COACH',
      status: 'active',
      lastActive: '1 day ago',
      createdAt: 'May 12, 2024',
    },
    {
      id: '6',
      name: 'Frank Garcia',
      email: 'frank.garcia@example.com',
      role: 'SUB_COACH',
      status: 'active',
      lastActive: '2 days ago',
      createdAt: 'Jun 8, 2024',
    },
    {
      id: '7',
      name: 'Grace Lee',
      email: 'grace.lee@example.com',
      role: 'CONTENT_EDITOR',
      status: 'active',
      lastActive: '5 hours ago',
      createdAt: 'Jul 22, 2024',
    },
    {
      id: '8',
      name: 'Henry Brown',
      email: 'henry.b@example.com',
      role: 'COMMUNITY_MANAGER',
      status: 'active',
      lastActive: '4 hours ago',
      createdAt: 'Aug 15, 2024',
    },
    {
      id: '9',
      name: 'Isabel Rodriguez',
      email: 'isabel.r@example.com',
      role: 'SUPPORT_STAFF',
      status: 'active',
      lastActive: '1 hour ago',
      createdAt: 'Sep 3, 2024',
    },
    {
      id: '10',
      name: 'Jack Smith',
      email: 'jack.smith@example.com',
      role: 'STUDENT',
      status: 'active',
      lastActive: '10 minutes ago',
      createdAt: 'Oct 1, 2024',
    },
    {
      id: '11',
      name: 'Karen White',
      email: 'karen@company.com',
      role: 'ORG_OWNER',
      status: 'active',
      lastActive: '2 hours ago',
      createdAt: 'Nov 5, 2024',
    },
    {
      id: '12',
      name: 'Leo Thompson',
      email: 'leo.t@suspended.com',
      role: 'STUDENT',
      status: 'suspended',
      lastActive: '1 week ago',
      createdAt: 'Sep 12, 2024',
    },
  ];

  // Filter users
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Role distribution stats
  const roleStats = {
    PLATFORM_OWNER: allUsers.filter((u) => u.role === 'PLATFORM_OWNER').length,
    ADMIN: allUsers.filter((u) => u.role === 'ADMIN').length,
    COACH: allUsers.filter((u) => u.role === 'COACH').length,
    SUB_COACH: allUsers.filter((u) => u.role === 'SUB_COACH').length,
    CONTENT_EDITOR: allUsers.filter((u) => u.role === 'CONTENT_EDITOR').length,
    COMMUNITY_MANAGER: allUsers.filter((u) => u.role === 'COMMUNITY_MANAGER').length,
    SUPPORT_STAFF: allUsers.filter((u) => u.role === 'SUPPORT_STAFF').length,
    STUDENT: allUsers.filter((u) => u.role === 'STUDENT').length,
    ORG_OWNER: allUsers.filter((u) => u.role === 'ORG_OWNER').length,
  };

  return (
    <PlatformOwnerAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Users & Roles</h1>
          <p className="text-sm text-text-secondary">
            Manage platform users and role assignments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Role Distribution Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(Object.keys(roleStats) as UserRole[]).map((role) => (
              <div
                key={role}
                className="bg-white rounded-xl p-4 border border-[#EDF0FB] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{roleIcons[role]}</span>
                  <span className="text-2xl font-bold text-text-primary">
                    {roleStats[role]}
                  </span>
                </div>
                <p className="text-xs text-text-muted">{labelByRole[role]}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-[#EDF0FB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Role
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-4 py-2 border border-[#EDF0FB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="all">All Roles</option>
                  {(Object.keys(roleStats) as UserRole[]).map((role) => (
                    <option key={role} value={role}>
                      {labelByRole[role]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-[#EDF0FB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-[#EDF0FB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F7FF]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-text-primary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0FB]">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#F5F7FF] transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{user.name}</p>
                          <p className="text-xs text-text-muted">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            roleColors[user.role].bg
                          } ${roleColors[user.role].text}`}
                        >
                          <span>{roleIcons[user.role]}</span>
                          {labelByRole[user.role]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : user.status === 'suspended'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {user.createdAt}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => console.log('View user:', user.id)}
                          className="text-sm text-brand-primary hover:text-brand-primary-dark font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-text-muted">No users found matching your filters</p>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="text-sm text-text-secondary">
            Showing {filteredUsers.length} of {allUsers.length} users
          </div>
        </div>
      </div>
    </PlatformOwnerAppLayout>
  );
};

export default UsersRolesPage;
