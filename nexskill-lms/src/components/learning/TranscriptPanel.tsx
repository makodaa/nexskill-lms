import React, { useState } from 'react';

interface TranscriptLine {
  time: string;
  text: string;
}

interface TranscriptPanelProps {
  transcript: TranscriptLine[];
}

const TranscriptPanel: React.FC<TranscriptPanelProps> = ({ transcript }) => {
  const [filter, setFilter] = useState<'full' | 'highlights'>('full');

  const handleTimeClick = (time: string) => {
    console.log('Jump to time:', time);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-primary">Transcript</h4>
        
        <div className="flex gap-1">
          <button
            onClick={() => setFilter('full')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'full'
                ? 'bg-brand-primary text-white'
                : 'bg-[#F5F7FF] text-text-secondary hover:bg-brand-primary-soft'
            }`}
          >
            Full
          </button>
          <button
            onClick={() => setFilter('highlights')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'highlights'
                ? 'bg-brand-primary text-white'
                : 'bg-[#F5F7FF] text-text-secondary hover:bg-brand-primary-soft'
            }`}
          >
            Highlights
          </button>
        </div>
      </div>

      <div className="max-h-[260px] overflow-y-auto space-y-3">
        {transcript.length > 0 ? (
          transcript.map((line, index) => (
            <div
              key={index}
              className={`flex gap-3 p-2 rounded-lg hover:bg-[#F5F7FF] transition-colors cursor-pointer ${
                index === 0 ? 'bg-brand-primary-soft' : ''
              }`}
              onClick={() => handleTimeClick(line.time)}
            >
              <span className="text-xs font-mono text-brand-primary flex-shrink-0 mt-0.5">
                {line.time}
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">{line.text}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-muted text-center py-4">
            No transcript available for this lesson
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptPanel;
