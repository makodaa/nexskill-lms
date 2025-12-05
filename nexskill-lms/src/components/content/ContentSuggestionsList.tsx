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
}

const ContentSuggestionsList: React.FC = () => {
  const [suggestions] = useState<Suggestion[]>([
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
      submittedAt: '1 week ago'
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
      submittedAt: '3 days ago'
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  return (
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
          </div>

          {expandedId === suggestion.id && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-text-primary mb-2">Details:</p>
              <p className="text-sm text-text-secondary leading-relaxed p-4 bg-gray-50 rounded-xl">
                {suggestion.details}
              </p>
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
  );
};

export default ContentSuggestionsList;
