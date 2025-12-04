import React, { useState } from 'react';

const AIExplainSimplyCard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleExplain = () => {
    if (inputText.trim()) {
      // Generate a canned simplified explanation
      const simplified = `In simpler terms, this concept is about making complex ideas easier to understand. Think of it like breaking down a big puzzle into smaller, manageable pieces.

Here's what you need to know:
• The core idea focuses on simplification and clarity
• It's commonly used to help learners grasp difficult topics
• You can apply this by breaking concepts into steps

Try thinking about it this way: if you had to explain this to a friend who's never heard of it, you'd naturally use simpler words and relatable examples. That's exactly what we're doing here!`;

      setOutputText(simplified);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Explain this simply</h3>
        <p className="text-sm text-slate-600">Paste a concept and get a beginner-friendly explanation.</p>
      </div>

      {/* Input area */}
      <div className="mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste a paragraph or a concept you're struggling with…"
          rows={4}
          className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none text-slate-900 placeholder:text-slate-400"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleExplain}
          disabled={!inputText.trim()}
          className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
            inputText.trim()
              ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Explain
        </button>
        {outputText && (
          <button
            onClick={handleClear}
            className="px-6 py-2.5 rounded-full font-semibold text-slate-600 border-2 border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Output area */}
      {outputText && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[#304DB5] mb-2">AI Explanation</h4>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{outputText}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIExplainSimplyCard;
