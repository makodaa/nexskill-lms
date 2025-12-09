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
  const [items, setItems] = useState<TranslationItem[]>([
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
  const [corrections, setCorrections] = useState('');
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [editedTranslation, setEditedTranslation] = useState('');

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

  const openForReview = (item: TranslationItem) => {
    setSelectedItem(item);
    setEditedTranslation(item.targetText);
    setCorrections('');
    setReviewerNotes('');
    
    // Update status to In Review if Pending
    if (item.status === 'Pending') {
      setItems(items.map(i => 
        i.id === item.id ? { ...i, status: 'In Review' as const } : i
      ));
    }
  };

  const handleApprove = () => {
    if (selectedItem) {
      setItems(items.map(i => 
        i.id === selectedItem.id 
          ? { ...i, status: 'Approved' as const, targetText: editedTranslation }
          : i
      ));
      setSelectedItem(null);
    }
  };

  const handleSaveCorrections = () => {
    if (selectedItem) {
      setItems(items.map(i => 
        i.id === selectedItem.id 
          ? { ...i, targetText: editedTranslation, status: 'In Review' as const }
          : i
      ));
      setSelectedItem(null);
    }
  };

  const handleSkip = (item: TranslationItem) => {
    // Move item to end of list
    setItems([...items.filter(i => i.id !== item.id), item]);
  };

  const handleReject = () => {
    if (selectedItem) {
      setItems(items.map(i => 
        i.id === selectedItem.id 
          ? { ...i, status: 'Pending' as const }
          : i
      ));
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 ${item.status === 'Approved' ? 'opacity-70' : ''}`}>
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
                    openForReview(item);
                  }
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  item.status === 'Approved'
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-md'
                }`}
              >
                {item.status === 'Approved' ? 'View' : 'Open for Review'}
              </button>
              {item.status === 'Pending' && (
                <button 
                  onClick={() => handleSkip(item)}
                  className="px-4 py-2 border border-gray-200 text-text-primary text-sm font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Skip for Now
                </button>
              )}
              {item.status === 'Approved' && (
                <button 
                  onClick={() => {
                    if (confirm('Re-open this translation for review?')) {
                      setItems(items.map(i => 
                        i.id === item.id ? { ...i, status: 'In Review' as const } : i
                      ));
                    }
                  }}
                  className="px-4 py-2 border border-orange-200 text-orange-600 text-sm font-medium rounded-lg hover:bg-orange-50 transition-all"
                >
                  Re-open
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getLanguageFlag(selectedItem.sourceLanguage)}</span>
                <span className="text-2xl">→</span>
                <span className="text-3xl">{getLanguageFlag(selectedItem.targetLanguage)}</span>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Translation Review</h2>
                  <p className="text-sm text-text-muted">{selectedItem.course} • {selectedItem.lesson}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Source Text */}
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

              {/* Editable Translation */}
              <div>
                <label className="block text-sm font-semibold text-text-secondary uppercase mb-2">
                  Translation ({selectedItem.targetLanguage})
                  {selectedItem.status !== 'Approved' && (
                    <span className="ml-2 text-xs text-amber-600 font-normal">(Editable)</span>
                  )}
                </label>
                <textarea
                  rows={4}
                  value={editedTranslation}
                  onChange={(e) => setEditedTranslation(e.target.value)}
                  disabled={selectedItem.status === 'Approved'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-50 disabled:text-text-muted"
                />
              </div>

              {/* Quick Actions */}
              {selectedItem.status !== 'Approved' && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <label className="block text-sm font-semibold text-blue-800 mb-3">Quick Actions</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setEditedTranslation(editedTranslation.trim())}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      Trim Whitespace
                    </button>
                    <button
                      onClick={() => {
                        const wordCount = editedTranslation.split(/\s+/).filter(Boolean).length;
                        const sourceWordCount = selectedItem.sourceText.split(/\s+/).filter(Boolean).length;
                        alert(`Translation: ${wordCount} words\nSource: ${sourceWordCount} words\nDifference: ${wordCount - sourceWordCount}`);
                      }}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      📊 Compare Word Count
                    </button>
                    <button
                      onClick={() => setEditedTranslation(selectedItem.targetText)}
                      className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      ↩️ Reset to Original
                    </button>
                  </div>
                </div>
              )}

              {/* Corrections */}
              {selectedItem.status !== 'Approved' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Corrections / Improvements
                  </label>
                  <textarea
                    rows={3}
                    value={corrections}
                    onChange={(e) => setCorrections(e.target.value)}
                    placeholder="Enter your corrections or suggestions here..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              {/* Reviewer Notes */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Reviewer Notes
                </label>
                <textarea
                  rows={2}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  disabled={selectedItem.status === 'Approved'}
                  placeholder="Add any additional notes or context..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-3 border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all font-medium"
                >
                  Close
                </button>
                {selectedItem.status !== 'Approved' && (
                  <>
                    <button
                      onClick={handleReject}
                      className="px-4 py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all font-medium"
                    >
                      ❌ Needs Revision
                    </button>
                    <button
                      onClick={handleSaveCorrections}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      💾 Save Corrections
                    </button>
                    <button
                      onClick={handleApprove}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      ✅ Approve
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TranslationReviewList;
