import React, { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited' | 'Suspended';
  assignedSeats: number;
  avatar: string;
}

const OrgTeamTable: React.FC = () => {
  const [members] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@acme.com',
      role: 'Manager',
      status: 'Active',
      assignedSeats: 25,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@acme.com',
      role: 'Sub-Coach',
      status: 'Active',
      assignedSeats: 35,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@acme.com',
      role: 'Sub-Coach',
      status: 'Active',
      assignedSeats: 28,
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@acme.com',
      role: 'Support',
      status: 'Active',
      assignedSeats: 12,
      avatar: 'DK'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.t@acme.com',
      role: 'Manager',
      status: 'Invited',
      assignedSeats: 0,
      avatar: 'LT'
    },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      Active: 'bg-green-100 text-green-700',
      Invited: 'bg-blue-100 text-blue-700',
      Suspended: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || styles.Active;
  };

  const handleEdit = (member: TeamMember) => {
    console.log('Edit member:', member);
  };

  const handleSuspend = (member: TeamMember) => {
    console.log('Suspend member:', member);
  };

  const handleRemove = (member: TeamMember) => {
    console.log('Remove member:', member);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Assigned Seats
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold text-sm">
                      {member.avatar}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{member.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{member.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-primary">{member.role}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(member.status)}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">{member.assignedSeats}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    {member.status !== 'Suspended' && (
                      <button
                        onClick={() => handleSuspend(member)}
                        className="px-3 py-1 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        Suspend
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(member)}
                      className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrgTeamTable;
