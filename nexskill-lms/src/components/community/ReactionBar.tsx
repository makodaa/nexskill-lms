import React, { useState } from 'react';

interface Reaction {
  type: string;
  count: number;
  emoji?: string;
}

interface ReactionBarProps {
  reactions: Reaction[];
  onReact: (type: string) => void;
}

const ReactionBar: React.FC<ReactionBarProps> = ({ reactions: initialReactions, onReact }) => {
  const [reactions, setReactions] = useState(initialReactions);

  const handleReact = (type: string) => {
    setReactions((prev) =>
      prev.map((r) => (r.type === type ? { ...r, count: r.count + 1 } : r))
    );
    onReact(type);
  };

  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {reactions.map((reaction) => (
        <button
          key={reaction.type}
          onClick={() => handleReact(reaction.type)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
        >
          {reaction.emoji && <span className="text-base">{reaction.emoji}</span>}
          {!reaction.emoji && reaction.type === 'like' && (
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          )}
          <span className="font-medium text-slate-700">{reaction.count}</span>
        </button>
      ))}
      {totalReactions > 0 && (
        <span className="text-xs text-slate-500 ml-1">
          {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
        </span>
      )}
    </div>
  );
};

export default ReactionBar;
