import React from 'react';

interface Group {
  id: number;
  name: string;
  linkedCourse: string;
  members: number;
  moderators: string[];
  status: 'Active' | 'Archived';
  postsCount: number;
}

const CommunityGroupsList: React.FC = () => {
  const groups: Group[] = [
    { id: 1, name: 'React Hooks Study Group', linkedCourse: 'JavaScript Mastery', members: 45, moderators: ['Coach Sarah', 'CM Alex'], status: 'Active', postsCount: 128 },
    { id: 2, name: 'Figma Design Challenge', linkedCourse: 'UI/UX Design', members: 38, moderators: ['Coach Mike'], status: 'Active', postsCount: 95 },
    { id: 3, name: 'Product Case Studies', linkedCourse: 'Product Management', members: 29, moderators: ['Coach Lisa', 'SubCoach Tom'], status: 'Active', postsCount: 67 },
    { id: 4, name: 'SQL Practice Group', linkedCourse: 'Data Analytics', members: 22, moderators: ['Coach John'], status: 'Active', postsCount: 54 },
    { id: 5, name: 'Python Beginners', linkedCourse: 'Python Fundamentals', members: 56, moderators: ['Coach Emma', 'CM Alex'], status: 'Active', postsCount: 142 },
    { id: 6, name: 'Career Prep Circle', linkedCourse: 'General', members: 73, moderators: ['CM Alex'], status: 'Active', postsCount: 201 },
    { id: 7, name: 'Mobile Dev Q&A', linkedCourse: 'Mobile Development', members: 31, moderators: ['Coach Dan'], status: 'Active', postsCount: 78 },
    { id: 8, name: 'Alumni Network', linkedCourse: 'General', members: 89, moderators: ['CM Alex', 'Coach Sarah'], status: 'Active', postsCount: 267 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Group</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Linked Course</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Members</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Moderators</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Posts</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👥</span>
                    <span className="text-sm font-medium text-text-primary">{group.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{group.linkedCourse}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">{group.members}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {group.moderators.map((mod, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                        {mod}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{group.postsCount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                    group.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {group.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => console.log('View posts:', group.name)}
                      className="text-xs px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      View Posts
                    </button>
                    <button
                      onClick={() => console.log('Edit settings:', group.name)}
                      className="text-xs px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      Settings
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

export default CommunityGroupsList;
