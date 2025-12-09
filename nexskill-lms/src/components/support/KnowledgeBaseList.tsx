import { useState } from 'react';
import { Search, BookOpen, Eye, ThumbsUp, Link2, Share2, Bookmark, BookmarkCheck, Edit, Clock, X, Copy, Mail, MessageSquare } from 'lucide-react';

interface KBArticle {
  id: string;
  title: string;
  category: string;
  views: number;
  helpful: number;
  lastUpdated: string;
  excerpt: string;
}

interface KnowledgeBaseListProps {
  onViewArticle?: (articleId: string) => void;
  onBookmark?: (articleId: string) => void;
}

const KnowledgeBaseList = ({ onViewArticle, onBookmark }: KnowledgeBaseListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<KBArticle | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(['KB-001', 'KB-004']);
  const [helpfulMarked, setHelpfulMarked] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [shareModal, setShareModal] = useState<KBArticle | null>(null);
  const [suggestEditModal, setSuggestEditModal] = useState<KBArticle | null>(null);
  const [editSuggestion, setEditSuggestion] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Mock full content for articles
  const articleContent: Record<string, { sections: { title: string; content: string }[]; relatedArticles: string[] }> = {
    'KB-001': {
      sections: [
        { title: 'Prerequisites', content: 'Before resetting a password, verify the student\'s identity by asking for their registered email and student ID.' },
        { title: 'Step 1: Access Admin Panel', content: 'Navigate to Admin > Users > Student Management section.' },
        { title: 'Step 2: Search for Student', content: 'Use the search bar to find the student by email or student ID.' },
        { title: 'Step 3: Reset Password', content: 'Click the "Reset Password" button and choose either: Send reset link via email, or Generate temporary password.' },
        { title: 'Important Notes', content: 'Temporary passwords expire after 24 hours. Students should be advised to change their password immediately after logging in.' },
      ],
      relatedArticles: ['KB-002', 'KB-006'],
    },
    'KB-002': {
      sections: [
        { title: 'Common Causes', content: 'Video playback issues are often caused by browser compatibility, slow internet, or ad blockers.' },
        { title: 'Browser Check', content: 'Recommend Chrome, Firefox, or Safari. Ensure browser is updated to latest version.' },
        { title: 'Clear Cache', content: 'Guide user to clear browser cache and cookies, then refresh the page.' },
        { title: 'Disable Extensions', content: 'Ask user to temporarily disable ad blockers and other extensions that may interfere with video playback.' },
      ],
      relatedArticles: ['KB-005'],
    },
  };

  const articles: KBArticle[] = [
    { id: 'KB-001', title: 'How to reset student password', category: 'Account', views: 1245, helpful: 342, lastUpdated: 'Nov 20, 2024', excerpt: 'Step-by-step guide to resetting passwords for students...' },
    { id: 'KB-002', title: 'Troubleshooting video playback issues', category: 'Technical', views: 987, helpful: 289, lastUpdated: 'Nov 18, 2024', excerpt: 'Common solutions for video player problems and errors...' },
    { id: 'KB-003', title: 'Processing refund requests', category: 'Billing', views: 654, helpful: 201, lastUpdated: 'Nov 15, 2024', excerpt: 'Guidelines and procedures for handling refund requests...' },
    { id: 'KB-004', title: 'Certificate generation process', category: 'Certificates', views: 1456, helpful: 421, lastUpdated: 'Nov 22, 2024', excerpt: 'Understanding how certificates are generated and issued...' },
    { id: 'KB-005', title: 'Handling quiz submission errors', category: 'Technical', views: 789, helpful: 234, lastUpdated: 'Nov 10, 2024', excerpt: 'Common quiz-related issues and their solutions...' },
    { id: 'KB-006', title: 'Course enrollment troubleshooting', category: 'Course Access', views: 1123, helpful: 378, lastUpdated: 'Nov 25, 2024', excerpt: 'Resolving issues with course access and enrollment...' },
  ];

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search knowledge base articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-gray-50 rounded-2xl p-5 hover:bg-blue-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-mono text-xs font-semibold text-gray-600">{article.id}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                  <p className="text-sm text-gray-700 mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views} views</span>
                    </div>
                    <div>
                      <span>{article.helpful} found helpful</span>
                    </div>
                    <div>
                      <span>Updated: {article.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex gap-2">
                  <button
                    onClick={() => {
                      if (bookmarkedArticles.includes(article.id)) {
                        setBookmarkedArticles(prev => prev.filter(id => id !== article.id));
                        showToast('Bookmark removed');
                      } else {
                        setBookmarkedArticles(prev => [...prev, article.id]);
                        showToast('✓ Article bookmarked');
                        onBookmark?.(article.id);
                      }
                    }}
                    className={`p-2 rounded-xl transition-all ${
                      bookmarkedArticles.includes(article.id) 
                        ? 'bg-amber-100 text-amber-600' 
                        : 'bg-white border-2 border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                    title={bookmarkedArticles.includes(article.id) ? 'Remove Bookmark' : 'Bookmark'}
                  >
                    {bookmarkedArticles.includes(article.id) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => {
                      if (!helpfulMarked.includes(article.id)) {
                        setHelpfulMarked(prev => [...prev, article.id]);
                        showToast('✓ Marked as helpful');
                      } else {
                        showToast('Already marked as helpful');
                      }
                    }}
                    className={`p-2 rounded-xl transition-all ${
                      helpfulMarked.includes(article.id)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-white border-2 border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                    title="Mark as Helpful"
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://nexskill.com/kb/${article.id}`);
                      showToast('✓ Link copied to clipboard');
                    }}
                    className="p-2 bg-white border-2 border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-all"
                    title="Copy Link"
                  >
                    <Link2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShareModal(article)}
                    className="p-2 bg-white border-2 border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-all"
                    title="Share Article"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onViewArticle ? onViewArticle(article.id) : setSelectedArticle(article)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    View Article
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShareModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Share Article</h3>
              <button onClick={() => setShareModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4 font-medium">{shareModal.title}</p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://nexskill.com/kb/${shareModal.id}`);
                  showToast('✓ Link copied to clipboard');
                  setShareModal(null);
                }}
                className="w-full p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <Copy className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Copy Link</span>
              </button>
              <button
                onClick={() => {
                  showToast('✓ Opening email client...');
                  setShareModal(null);
                }}
                className="w-full p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Share via Email</span>
              </button>
              <button
                onClick={() => {
                  showToast('✓ Inserted into ticket reply...');
                  setShareModal(null);
                }}
                className="w-full p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Insert into Ticket Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggest Edit Modal */}
      {suggestEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSuggestEditModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Suggest Edit</h3>
              <button onClick={() => setSuggestEditModal(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Suggest improvements for: <span className="font-medium">{suggestEditModal.title}</span></p>
            <textarea
              value={editSuggestion}
              onChange={(e) => setEditSuggestion(e.target.value)}
              placeholder="Describe your suggested changes or improvements..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setSuggestEditModal(null)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('✓ Edit suggestion submitted for review');
                  setSuggestEditModal(null);
                  setEditSuggestion('');
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg"
              >
                Submit Suggestion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {selectedArticle.views} views</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {selectedArticle.helpful + (helpfulMarked.includes(selectedArticle.id) ? 1 : 0)} helpful</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedArticle.lastUpdated}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedArticle(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{selectedArticle.excerpt}</p>
                
                {/* Article Sections */}
                {articleContent[selectedArticle.id]?.sections.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      {section.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed pl-8">{section.content}</p>
                  </div>
                )) || (
                  <p className="text-gray-700 leading-relaxed">
                    This is a placeholder for the full article content. In a production environment, this would contain
                    detailed step-by-step instructions, screenshots, videos, and troubleshooting tips.
                  </p>
                )}

                {/* Related Articles */}
                {articleContent[selectedArticle.id]?.relatedArticles && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Related Articles</h4>
                    <div className="flex flex-wrap gap-2">
                      {articleContent[selectedArticle.id].relatedArticles.map((relId) => (
                        <button
                          key={relId}
                          onClick={() => showToast(`Opening ${relId}...`)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          {relId}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://nexskill.com/kb/${selectedArticle.id}`);
                    showToast('✓ Link copied to clipboard');
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy Link
                </button>
                <button
                  onClick={() => {
                    if (!helpfulMarked.includes(selectedArticle.id)) {
                      setHelpfulMarked(prev => [...prev, selectedArticle.id]);
                      showToast('✓ Marked as helpful');
                    }
                  }}
                  className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 ${
                    helpfulMarked.includes(selectedArticle.id)
                      ? 'bg-green-100 text-green-700 border-2 border-green-200'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> {helpfulMarked.includes(selectedArticle.id) ? 'Marked Helpful' : 'Helpful'}
                </button>
                <button
                  onClick={() => {
                    setSuggestEditModal(selectedArticle);
                    setSelectedArticle(null);
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Suggest Edit
                </button>
                <button
                  onClick={() => {
                    setShareModal(selectedArticle);
                    setSelectedArticle(null);
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KnowledgeBaseList;
