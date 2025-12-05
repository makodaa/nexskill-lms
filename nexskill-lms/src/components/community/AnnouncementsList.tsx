import React from 'react';

interface Announcement {
  id: number;
  title: string;
  target: string;
  createdAt: string;
  status: 'Active' | 'Scheduled' | 'Archived';
  author: string;
}

const AnnouncementsList: React.FC = () => {
  const announcements: Announcement[] = [
    { id: 1, title: 'Platform Maintenance Scheduled', target: 'All Communities', createdAt: '2 days ago', status: 'Active', author: 'Admin Team' },
    { id: 2, title: 'New Community Guidelines', target: 'All Communities', createdAt: '5 days ago', status: 'Active', author: 'Community Team' },
    { id: 3, title: 'JavaScript Course Update Available', target: 'JavaScript Mastery', createdAt: '1 week ago', status: 'Active', author: 'Coach Sarah' },
    { id: 4, title: 'Welcome New Members!', target: 'General Discussion', createdAt: '1 week ago', status: 'Active', author: 'CM Alex' },
    { id: 5, title: 'Holiday Schedule Changes', target: 'All Communities', createdAt: '2 weeks ago', status: 'Scheduled', author: 'Admin Team' },
    { id: 6, title: 'Q3 Community Awards', target: 'All Communities', createdAt: '3 weeks ago', status: 'Archived', author: 'Community Team' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="p-6 space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary mb-1">{announcement.title}</h3>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span>📢 {announcement.target}</span>
                  <span>•</span>
                  <span>by {announcement.author}</span>
                  <span>•</span>
                  <span>{announcement.createdAt}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(announcement.status)}`}>
                {announcement.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => console.log('Edit announcement:', announcement.id)}
                className="text-xs px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => console.log('Archive announcement:', announcement.id)}
                className="text-xs px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Archive
              </button>
              <button
                onClick={() => console.log('Delete announcement:', announcement.id)}
                className="text-xs px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsList;
