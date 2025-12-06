import React, { useState } from 'react';

interface PostComposerProps {
  mode: 'newThread' | 'reply';
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

const PostComposer: React.FC<PostComposerProps> = ({
  mode,
  onSubmit,
  onCancel,
  placeholder ="What would you like to share?",
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  const handleCancel = () => {
    setContent('');
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-semibold">
          U
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {mode === 'newThread' ? 'Start a discussion' : 'Reply to thread'}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={mode === 'newThread' ? 4 : 3}
        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-600 focus:border-[#304DB5] dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
      />

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        {/* Course tags (static for now) */}
        {mode === 'newThread' && (
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-[#304DB5] dark:text-blue-400 text-xs font-medium rounded-full">
              UI Design
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 text-xs font-medium rounded-full">
              React
            </span>
          </div>
        )}
        {mode === 'reply' && <div />}

        {/* Action buttons */}
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={handleCancel}
              className="px-5 py-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all font-medium"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              content.trim()
                ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
