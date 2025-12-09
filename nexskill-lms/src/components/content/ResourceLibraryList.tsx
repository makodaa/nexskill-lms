import React, { useState } from 'react';

interface Resource {
  id: number;
  name: string;
  type: 'PDF' | 'Image' | 'Video' | 'Other';
  course: string;
  lesson: string;
  lastUpdated: string;
  size: string;
  description?: string;
  status: 'active' | 'flagged' | 'archived';
}

const ResourceLibraryList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      name: 'JavaScript Cheat Sheet.pdf',
      type: 'PDF',
      course: 'JavaScript Mastery',
      lesson: 'Variables and Data Types',
      lastUpdated: '2 days ago',
      size: '2.4 MB',
      description: 'A comprehensive cheat sheet covering all JavaScript fundamentals.',
      status: 'active'
    },
    {
      id: 2,
      name: 'Figma Design Template.fig',
      type: 'Other',
      course: 'UI/UX Design',
      lesson: 'Figma Fundamentals',
      lastUpdated: '5 hours ago',
      size: '8.1 MB',
      description: 'Starter template for UI design projects.',
      status: 'active'
    },
    {
      id: 3,
      name: 'React Components Diagram.png',
      type: 'Image',
      course: 'JavaScript Mastery',
      lesson: 'Introduction to React Hooks',
      lastUpdated: '1 week ago',
      size: '456 KB',
      description: 'Visual diagram showing React component lifecycle.',
      status: 'flagged'
    },
    {
      id: 4,
      name: 'Product Strategy Video.mp4',
      type: 'Video',
      course: 'Product Management',
      lesson: 'Product Management Overview',
      lastUpdated: '3 days ago',
      size: '124 MB',
      description: 'Video lecture on product strategy fundamentals.',
      status: 'active'
    },
    {
      id: 5,
      name: 'SQL Queries Reference.pdf',
      type: 'PDF',
      course: 'Data Analytics',
      lesson: 'Advanced SQL Queries',
      lastUpdated: '1 day ago',
      size: '1.8 MB',
      description: 'Reference guide for SQL query syntax and examples.',
      status: 'active'
    },
  ]);

  const [editingDescription, setEditingDescription] = useState<number | null>(null);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [showReplaceModal, setShowReplaceModal] = useState<Resource | null>(null);
  const [showViewModal, setShowViewModal] = useState<Resource | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Resource | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);

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

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      flagged: 'bg-orange-100 text-orange-700',
      archived: 'bg-gray-100 text-gray-500'
    };
    return styles[status as keyof typeof styles];
  };

  const handleStartEdit = (resource: Resource) => {
    setEditingDescription(resource.id);
    setDescriptionValue(resource.description || '');
  };

  const handleSaveDescription = (resourceId: number) => {
    setResources(resources.map(r => 
      r.id === resourceId 
        ? { ...r, description: descriptionValue, lastUpdated: 'Just now' }
        : r
    ));
    setEditingDescription(null);
    setDescriptionValue('');
  };

  const handleReplaceFile = () => {
    if (showReplaceModal && replaceFile) {
      setResources(resources.map(r => 
        r.id === showReplaceModal.id 
          ? { ...r, name: replaceFile.name, size: `${(replaceFile.size / (1024 * 1024)).toFixed(1)} MB`, lastUpdated: 'Just now' }
          : r
      ));
      setShowReplaceModal(null);
      setReplaceFile(null);
    }
  };

  const handleFlagForReview = (resource: Resource) => {
    const newStatus = resource.status === 'flagged' ? 'active' : 'flagged';
    setResources(resources.map(r => 
      r.id === resource.id 
        ? { ...r, status: newStatus, lastUpdated: 'Just now' }
        : r
    ));
  };

  const handleDeleteResource = () => {
    if (showDeleteConfirm) {
      setResources(resources.filter(r => r.id !== showDeleteConfirm.id));
      setShowDeleteConfirm(null);
    }
  };

  const handleArchiveResource = (resource: Resource) => {
    const newStatus = resource.status === 'archived' ? 'active' : 'archived';
    setResources(resources.map(r => 
      r.id === resource.id 
        ? { ...r, status: newStatus, lastUpdated: 'Just now' }
        : r
    ));
  };

  return (
    <>
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
                  Status
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
                  <tr className={`hover:bg-gray-50 transition-colors ${resource.status === 'archived' ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setShowViewModal(resource)}
                        className="flex items-center gap-3 hover:text-amber-600 transition-colors"
                      >
                        <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                        <span className="text-sm font-medium text-text-primary hover:text-amber-600">{resource.name}</span>
                      </button>
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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(resource.status)}`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{resource.lastUpdated}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setShowViewModal(resource)}
                          className="px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setShowReplaceModal(resource)}
                          className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Replace File"
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => handleStartEdit(resource)}
                          className="px-2 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Description"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleFlagForReview(resource)}
                          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                            resource.status === 'flagged' 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-orange-600 hover:bg-orange-50'
                          }`}
                          title={resource.status === 'flagged' ? 'Unflag' : 'Flag for Review'}
                        >
                          {resource.status === 'flagged' ? 'Unflag' : 'Flag'}
                        </button>
                        <button
                          onClick={() => handleArchiveResource(resource)}
                          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                            resource.status === 'archived'
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          title={resource.status === 'archived' ? 'Restore' : 'Archive'}
                        >
                          {resource.status === 'archived' ? 'Restore' : 'Archive'}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(resource)}
                          className="px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editingDescription === resource.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-amber-50">
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-text-primary">Edit Description</label>
                          <textarea
                            rows={3}
                            value={descriptionValue}
                            onChange={(e) => setDescriptionValue(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Enter resource description..."
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveDescription(resource.id)}
                              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all"
                            >
                              💾 Save Description
                            </button>
                            <button
                              onClick={() => {
                                setEditingDescription(null);
                                setDescriptionValue('');
                              }}
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

      {/* View Resource Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Resource Details</h2>
              <button
                onClick={() => setShowViewModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Resource Preview */}
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">{getTypeIcon(showViewModal.type)}</span>
                  <p className="text-lg font-semibold text-text-primary">{showViewModal.name}</p>
                  <p className="text-sm text-text-muted">{showViewModal.size}</p>
                </div>
              </div>

              {/* Resource Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Type</span>
                  <p className="font-semibold text-text-primary">{showViewModal.type}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Status</span>
                  <p className="font-semibold text-text-primary capitalize">{showViewModal.status}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Course</span>
                  <p className="font-semibold text-text-primary">{showViewModal.course}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Lesson</span>
                  <p className="font-semibold text-text-primary">{showViewModal.lesson}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-blue-50 rounded-xl">
                <span className="text-sm text-text-muted">Description</span>
                <p className="font-medium text-text-primary mt-1">{showViewModal.description || 'No description available.'}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowViewModal(null);
                    setShowReplaceModal(showViewModal);
                  }}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                >
                  🔄 Replace File
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(null);
                    handleStartEdit(showViewModal);
                  }}
                  className="flex-1 px-4 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
                >
                  ✏️ Edit Description
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replace File Modal */}
      {showReplaceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Replace File</h2>
              <button
                onClick={() => {
                  setShowReplaceModal(null);
                  setReplaceFile(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Current File */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-text-muted">Current File</span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl">{getTypeIcon(showReplaceModal.type)}</span>
                  <div>
                    <p className="font-semibold text-text-primary">{showReplaceModal.name}</p>
                    <p className="text-xs text-text-muted">{showReplaceModal.size}</p>
                  </div>
                </div>
              </div>

              {/* Upload New File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-500 transition-colors">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReplaceFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="replace-file-upload"
                  />
                  <label htmlFor="replace-file-upload" className="cursor-pointer">
                    {replaceFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl">📄</span>
                        <div className="text-left">
                          <p className="font-semibold text-text-primary">{replaceFile.name}</p>
                          <p className="text-xs text-text-muted">{(replaceFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl mb-2">📤</div>
                        <p className="text-sm text-gray-700 font-medium mb-1">Click to browse files</p>
                        <p className="text-xs text-gray-500">or drag and drop</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowReplaceModal(null);
                    setReplaceFile(null);
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplaceFile}
                  disabled={!replaceFile}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Replace File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗑️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Resource?</h2>
              <p className="text-sm text-text-muted">
                Are you sure you want to delete <span className="font-semibold">{showDeleteConfirm.name}</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteResource}
                className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceLibraryList;
