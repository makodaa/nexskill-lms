import React from 'react';

interface Community {
  id: number;
  name: string;
  type: string;
  members: number;
  postsPerWeek: number;
  engagementRate: number;
  status: 'Active' | 'Quiet' | 'Growing';
}

interface CommunityOverviewListProps {
  limit?: number;
}

const CommunityOverviewList: React.FC<CommunityOverviewListProps> = ({ limit }) => {
  const communities: Community[] = [
    { id: 1, name: 'JavaScript Mastery Community', type: 'Course', members: 342, postsPerWeek: 45, engagementRate: 72, status: 'Active' },
    { id: 2, name: 'UI/UX Designers Hub', type: 'Course', members: 289, postsPerWeek: 38, engagementRate: 68, status: 'Active' },
    { id: 3, name: 'Product Management Circle', type: 'Course', members: 156, postsPerWeek: 22, engagementRate: 55, status: 'Growing' },
    { id: 4, name: 'Data Analytics Cohort', type: 'Cohort', members: 98, postsPerWeek: 12, engagementRate: 48, status: 'Quiet' },
    { id: 5, name: 'General Discussion', type: 'General', members: 512, postsPerWeek: 67, engagementRate: 78, status: 'Active' },
    { id: 6, name: 'Career Development', type: 'General', members: 423, postsPerWeek: 34, engagementRate: 62, status: 'Active' },
    { id: 7, name: 'Python Developers', type: 'Course', members: 267, postsPerWeek: 29, engagementRate: 58, status: 'Growing' },
    { id: 8, name: 'Mobile Dev Community', type: 'Course', members: 189, postsPerWeek: 18, engagementRate: 52, status: 'Quiet' },
  ];

  const displayCommunities = limit ? communities.slice(0, limit) : communities;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Growing': return 'bg-blue-100 text-blue-700';
      case 'Quiet': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return '📚';
      case 'Cohort': return '🎓';
      case 'General': return '💬';
      default: return '🏘️';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-6 space-y-3">
        {displayCommunities.map((community) => (
          <div
            key={community.id}
            className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
            onClick={() => console.log('View community:', community.name)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl">{getTypeIcon(community.type)}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{community.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {community.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(community.status)}`}>
                      {community.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-text-primary">{community.members}</p>
                <p className="text-xs text-text-muted">Members</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{community.postsPerWeek}</p>
                <p className="text-xs text-text-muted">Posts/week</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{community.engagementRate}%</p>
                <p className="text-xs text-text-muted">Engagement</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityOverviewList;
