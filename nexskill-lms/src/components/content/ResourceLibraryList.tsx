import React, { useState } from 'react';

interface Resource {
  id: number;
  name: string;
  type: 'PDF' | 'Image' | 'Video' | 'Other';
  course: string;
  lesson: string;
  lastUpdated: string;
  size: string;
}

const ResourceLibraryList: React.FC = () => {
  const [resources] = useState<Resource[]>([
    {
      id: 1,
      name: 'JavaScript Cheat Sheet.pdf',
      type: 'PDF',
      course: 'JavaScript Mastery',
      lesson: 'Variables and Data Types',
      lastUpdated: '2 days ago',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Figma Design Template.fig',
      type: 'Other',
      course: 'UI/UX Design',
      lesson: 'Figma Fundamentals',
      lastUpdated: '5 hours ago',
      size: '8.1 MB'
    },
    {
      id: 3,
      name: 'React Components Diagram.png',
      type: 'Image',
      course: 'JavaScript Mastery',
      lesson: 'Introduction to React Hooks',
      lastUpdated: '1 week ago',
      size: '456 KB'
    },
    {
      id: 4,
      name: 'Product Strategy Video.mp4',
      type: 'Video',
      course: 'Product Management',
      lesson: 'Product Management Overview',
      lastUpdated: '3 days ago',
      size: '124 MB'
    },
    {
      id: 5,
      name: 'SQL Queries Reference.pdf',
      type: 'PDF',
      course: 'Data Analytics',
      lesson: 'Advanced SQL Queries',
      lastUpdated: '1 day ago',
      size: '1.8 MB'
    },
  ]);

  const [editingDescription, setEditingDescription] = useState<number | null>(null);

  const getTypeIcon = (type: string) => {
    const icons = {
      PDF: '📄',
      Image: '🖼️',
      Video: '🎥',
      Other: '📎'
    };
    return icons[type as keyof typeof icons];
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      PDF: 'bg-red-100 text-red-700',
      Image: 'bg-purple-100 text-purple-700',
      Video: 'bg-blue-100 text-blue-700',
      Other: 'bg-gray-100 text-gray-700'
    };
    return styles[type as keyof typeof styles];
  };

  const handleReplaceFile = (resource: Resource) => {
    console.log('Replace file for:', resource);
    // In real app, this would open file picker
  };

  const handleFlagForReview = (resource: Resource) => {
    console.log('Flag for coach review:', resource);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Resource
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Linked To
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resources.map((resource) => (
              <React.Fragment key={resource.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                      <span className="text-sm font-medium text-text-primary">{resource.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(resource.type)}`}>
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{resource.course}</p>
                      <p className="text-xs text-text-muted">{resource.lesson}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{resource.size}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{resource.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleReplaceFile(resource)}
                        className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => setEditingDescription(editingDescription === resource.id ? null : resource.id)}
                        className="px-3 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        Edit Desc
                      </button>
                      <button
                        onClick={() => handleFlagForReview(resource)}
                        className="px-3 py-1 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        Flag
                      </button>
                    </div>
                  </td>
                </tr>
                {editingDescription === resource.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-text-primary">Description</label>
                        <textarea
                          rows={3}
                          defaultValue="This is a dummy description for the resource. Edit and save changes here."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingDescription(null)}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingDescription(null)}
                            className="px-4 py-2 border border-gray-200 text-text-primary text-sm font-medium rounded-lg hover:bg-gray-100 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceLibraryList;
