import React, { useState } from 'react';

interface TranslationItem {
  id: number;
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  targetText: string;
  course: string;
  lesson: string;
  status: 'Pending' | 'In Review' | 'Approved';
}

interface TranslationReviewListProps {
  onReviewTranslation?: () => void;
}

const TranslationReviewList: React.FC<TranslationReviewListProps> = ({ onReviewTranslation }) => {
  const [items] = useState<TranslationItem[]>([
    {
      id: 1,
      sourceLanguage: 'EN',
      targetLanguage: 'FIL',
      sourceText: 'Introduction to JavaScript programming and its core concepts',
      targetText: 'Panimula sa JavaScript programming at ang mga pangunahing konsepto nito',
      course: 'JavaScript Mastery',
      lesson: 'Introduction to JavaScript',
      status: 'Pending'
    },
    {
      id: 2,
      sourceLanguage: 'EN',
      targetLanguage: 'ES',
      sourceText: 'User research is essential for product management',
      targetText: 'La investigación de usuarios es esencial para la gestión de productos',
      course: 'Product Management',
      lesson: 'User Research',
      status: 'In Review'
    },
    {
      id: 3,
      sourceLanguage: 'EN',
      targetLanguage: 'FIL',
      sourceText: 'Design systems help maintain consistency across products',
      targetText: 'Ang mga design system ay tumutulong na mapanatili ang pagkakapare-pareho sa mga produkto',
      course: 'UI/UX Design',
      lesson: 'Design Systems',
      status: 'Approved'
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<TranslationItem | null>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-700',
      'In Review': 'bg-blue-100 text-blue-700',
      Approved: 'bg-green-100 text-green-700'
    };
    return styles[status as keyof typeof styles];
  };

  const getLanguageFlag = (lang: string) => {
    const flags: Record<string, string> = {
      EN: '🇺🇸',
      FIL: '🇵🇭',
      ES: '🇪🇸',
      FR: '🇫🇷',
      DE: '🇩🇪'
    };
    return flags[lang] || '🌐';
  };

  return (
    <>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getLanguageFlag(item.sourceLanguage)}</span>
                <span className="text-2xl">→</span>
                <span className="text-2xl">{getLanguageFlag(item.targetLanguage)}</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {item.sourceLanguage} → {item.targetLanguage}
                  </p>
                  <p className="text-xs text-text-muted">{item.course} • {item.lesson}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase mb-2">Source ({item.sourceLanguage})</p>
                <p className="text-sm text-text-primary p-3 bg-gray-50 rounded-lg">
                  {item.sourceText}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase mb-2">Translation ({item.targetLanguage})</p>
                <p className="text-sm text-text-primary p-3 bg-blue-50 rounded-lg">
                  {item.targetText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onReviewTranslation) {
                    onReviewTranslation();
                  } else {
                    setSelectedItem(item);
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all"
              >
                Open for Review
              </button>
              {item.status === 'Pending' && (
                <button className="px-4 py-2 border border-gray-200 text-text-primary text-sm font-medium rounded-lg hover:bg-gray-50 transition-all">
                  Skip
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Translation Review</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getLanguageFlag(selectedItem.sourceLanguage)}</span>
                  <p className="text-sm font-semibold text-text-primary">
                    {selectedItem.course} • {selectedItem.lesson}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary uppercase mb-2">
                    Source Text ({selectedItem.sourceLanguage})
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-text-primary leading-relaxed">
                      {selectedItem.sourceText}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary uppercase mb-2">
                    Current Translation ({selectedItem.targetLanguage})
                  </label>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-text-primary leading-relaxed">
                      {selectedItem.targetText}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Corrections / Improvements
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your corrections or suggestions here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Reviewer Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Add any additional notes or context..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Approve translation:', selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    console.log('Save corrections:', selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Save Corrections
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TranslationReviewList;
