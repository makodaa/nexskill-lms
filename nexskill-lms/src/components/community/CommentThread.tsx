import React, { useState } from 'react';
import ReactionBar from './ReactionBar';
import PostComposer from './PostComposer';

interface Comment {
  id: string;
  authorName: string;
  avatarUrl?: string;
  createdAt: string;
  body: string;
  reactions: { type: string; count: number; emoji?: string }[];
  replies?: Comment[];
}

interface CommentThreadProps {
  comments: Comment[];
  onReply: (commentId: string, content: string) => void;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comments, onReply }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReact = (commentId: string, type: string) => {
    console.log(`Reacted to comment ${commentId} with ${type}`);
  };

  const handleReplySubmit = (commentId: string, content: string) => {
    onReply(commentId, content);
    setReplyingTo(null);
  };

  const renderComment = (comment: Comment, isNested = false) => (
    <div key={comment.id} className={isNested ? 'ml-12 mt-4' : ''}>
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        {/* Comment header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-semibold flex-shrink-0">
            {comment.authorName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-900">{comment.authorName}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-500">{comment.createdAt}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{comment.body}</p>
          </div>
        </div>

        {/* Reactions and actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <ReactionBar
            reactions={comment.reactions}
            onReact={(type) => handleReact(comment.id, type)}
          />
          <button
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="text-sm font-medium text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
          >
            {replyingTo === comment.id ? 'Cancel' : 'Reply'}
          </button>
        </div>

        {/* Inline reply composer */}
        {replyingTo === comment.id && (
          <div className="mt-4">
            <PostComposer
              mode="reply"
              onSubmit={(content) => handleReplySubmit(comment.id, content)}
              onCancel={() => setReplyingTo(null)}
              placeholder={`Reply to ${comment.authorName}...`}
            />
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 mt-4">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {comments.map((comment) => renderComment(comment))}
    </div>
  );
};

export default CommentThread;
