import React, { useState } from 'react';

interface Suggestion {
  id: number;
  type: 'Curriculum' | 'Lesson' | 'Resource';
  course: string;
  reference: string;
  summary: string;
  details: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  submittedAt: string;
  coachFeedback?: string;
}

const ContentSuggestionsList: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 1,
      type: 'Lesson',
      course: 'JavaScript Mastery',
      reference: 'Module 3 • React Hooks',
      summary: 'Add practical examples for useEffect hook',
      details: 'The lesson covers the theory well but could benefit from 2-3 practical examples showing common use cases for useEffect, such as API calls, subscriptions, and cleanup functions.',
      status: 'Pending',
      submittedAt: '2 days ago'
    },
    {
      id: 2,
      type: 'Curriculum',
      course: 'UI/UX Design',
      reference: 'Overall Structure',
      summary: 'Consider adding a module on accessibility',
      details: 'Accessibility is becoming increasingly important in design. Suggest adding a dedicated module covering WCAG guidelines, screen reader testing, and inclusive design principles.',
      status: 'Accepted',
      submittedAt: '1 week ago',
      coachFeedback: 'Great suggestion! We will add this as Module 8 in the next course update.'
    },
    {
      id: 3,
      type: 'Resource',
      course: 'Product Management',
      reference: 'Module 1 • User Research',
      summary: 'Update user research template with 2024 best practices',
      details: 'The current template is from 2022. Recommend updating with modern remote research techniques and new tools like UserTesting 2.0 and recent Figma research features.',
      status: 'Pending',
      submittedAt: '5 hours ago'
    },
    {
      id: 4,
      type: 'Lesson',
      course: 'Data Analytics',
      reference: 'Module 4 • SQL',
      summary: 'Simplify complex query examples',
      details: 'Several students reported difficulty with the advanced JOIN examples. Suggest breaking down into smaller steps with intermediate examples.',
      status: 'Rejected',
      submittedAt: '3 days ago',
      coachFeedback: 'While we appreciate the feedback, the complexity is intentional to prepare students for real-world scenarios. We have added extra hints instead.'
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingSuggestion, setEditingSuggestion] = useState<Suggestion | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Suggestion | null>(null);
  const [editedSummary, setEditedSummary] = useState('');
  const [editedDetails, setEditedDetails] = useState('');

  const getTypeBadge = (type: string) => {
    const styles = {
      Curriculum: 'bg-purple-100 text-purple-700',
      Lesson: 'bg-blue-100 text-blue-700',
      Resource: 'bg-orange-100 text-orange-700'
    };
    return styles[type as keyof typeof styles];
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Accepted: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      Curriculum: '📚',
      Lesson: '📝',
      Resource: '📁'
    };
    return icons[type as keyof typeof icons];
  };

  const handleStartEdit = (suggestion: Suggestion) => {
    setEditingSuggestion(suggestion);
    setEditedSummary(suggestion.summary);
    setEditedDetails(suggestion.details);
  };

  const handleSaveEdit = () => {
    if (editingSuggestion) {
      setSuggestions(suggestions.map(s => 
        s.id === editingSuggestion.id 
          ? { ...s, summary: editedSummary, details: editedDetails, submittedAt: 'Just now' }
          : s
      ));
      setEditingSuggestion(null);
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      setSuggestions(suggestions.filter(s => s.id !== showDeleteConfirm.id));
      setShowDeleteConfirm(null);
    }
  };

  const handleWithdraw = (suggestion: Suggestion) => {
    if (confirm('Are you sure you want to withdraw this suggestion? This will mark it as rejected.')) {
      setSuggestions(suggestions.map(s => 
        s.id === suggestion.id 
          ? { ...s, status: 'Rejected' as const, coachFeedback: 'Withdrawn by content editor.' }
          : s
      ));
    }
  };

  const handleDuplicate = (suggestion: Suggestion) => {
    const newSuggestion: Suggestion = {
      ...suggestion,
      id: Date.now(),
      summary: `${suggestion.summary} (Copy)`,
      status: 'Pending',
      submittedAt: 'Just now',
      coachFeedback: undefined
    };
    setSuggestions([newSuggestion, ...suggestions]);
  };

  return (
    <>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl">{getTypeIcon(suggestion.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(suggestion.type)}`}>
                      {suggestion.type}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(suggestion.status)}`}>
                      {suggestion.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-1">
                    {suggestion.summary}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {suggestion.course} • {suggestion.reference}
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    Submitted {suggestion.submittedAt}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {suggestion.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleStartEdit(suggestion)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleWithdraw(suggestion)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Withdraw"
                    >
                      ↩️
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDuplicate(suggestion)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  📋
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(suggestion)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>

            {expandedId === suggestion.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-2">Details:</p>
                  <p className="text-sm text-text-secondary leading-relaxed p-4 bg-gray-50 rounded-xl">
                    {suggestion.details}
                  </p>
                </div>
                
                {suggestion.coachFeedback && (
                  <div className={`p-4 rounded-xl border-2 ${
                    suggestion.status === 'Accepted' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className="text-sm font-semibold text-text-primary mb-2">
                      {suggestion.status === 'Accepted' ? '✅ Coach Response:' : '❌ Coach Response:'}
                    </p>
                    <p className="text-sm text-text-secondary">{suggestion.coachFeedback}</p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setExpandedId(expandedId === suggestion.id ? null : suggestion.id)}
              className="mt-4 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
            >
              {expandedId === suggestion.id ? '▲ Hide Details' : '▼ View Details'}
            </button>
          </div>
        ))}
      </div>

      {/* Edit Suggestion Modal */}
      {editingSuggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Suggestion</h2>
              <button
                onClick={() => setEditingSuggestion(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Course</span>
                  <p className="font-semibold text-text-primary">{editingSuggestion.course}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-text-muted">Reference</span>
                  <p className="font-semibold text-text-primary">{editingSuggestion.reference}</p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                <input
                  type="text"
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Brief summary of your suggestion..."
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                <textarea
                  rows={6}
                  value={editedDetails}
                  onChange={(e) => setEditedDetails(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Detailed description of your suggestion..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingSuggestion(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Save Changes
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Suggestion?</h2>
              <p className="text-sm text-text-muted">
                Are you sure you want to delete this suggestion? This action cannot be undone.
              </p>
              <p className="text-sm font-medium text-text-primary mt-2">"{showDeleteConfirm.summary}"</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default ContentSuggestionsList;
