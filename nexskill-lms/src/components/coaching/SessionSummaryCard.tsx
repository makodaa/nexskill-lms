import React, { useState } from 'react';

interface Coach {
  name: string;
  avatar?: string;
}

interface Session {
  id: string;
  type: 'upcoming' | 'past';
  coach: Coach;
  datetime: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  topic?: string;
  notes?: string;
  summary?: string;
}

interface SessionSummaryCardProps {
  session: Session;
  onViewNotes?: (id: string) => void;
  onReschedule?: (id: string) => void;
}

const SessionSummaryCard: React.FC<SessionSummaryCardProps> = ({
  session,
  onViewNotes,
  onReschedule,
}) => {
  const [showFullNotes, setShowFullNotes] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const handleViewNotes = () => {
    if (onViewNotes) {
      onViewNotes(session.id);
    }
    setShowFullNotes(!showFullNotes);
  };

  const handleReschedule = () => {
    if (onReschedule) {
      onReschedule(session.id);
    } else {
      console.log('Reschedule session:', session.id);
      alert('Reschedule feature coming soon!');
    }
  };

  const handleDownloadSummary = () => {
    console.log('Download summary:', session.id);
    alert('Download feature coming soon!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-lg font-semibold text-slate-900 mb-1">{session.datetime}</div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
            {session.status}
          </span>
        </div>
      </div>

      {/* Coach info */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-bold">
          {session.coach.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-slate-900">{session.coach.name}</div>
          <div className="text-sm text-slate-600">Your coach</div>
        </div>
      </div>

      {/* Content based on type */}
      {session.type === 'upcoming' && session.topic && (
        <div className="mb-4">
          <div className="text-sm text-slate-600 mb-1">Session topic</div>
          <div className="text-slate-900">{session.topic}</div>
        </div>
      )}

      {session.type === 'past' && (
        <div className="mb-4">
          {session.summary && (
            <div className="mb-3">
              <div className="text-sm font-medium text-slate-700 mb-1">Session summary</div>
              <p className="text-sm text-slate-600">{session.summary}</p>
            </div>
          )}
          {session.notes && (
            <div>
              <div className="text-sm font-medium text-slate-700 mb-1">Coach notes</div>
              <div className={`text-sm text-slate-600 ${!showFullNotes && 'line-clamp-2'}`}>
                {session.notes}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
        {session.type === 'upcoming' && (
          <>
            <button className="flex-1 py-2 px-4 rounded-full font-medium text-sm text-[#304DB5] border-2 border-[#304DB5] hover:bg-blue-50 transition-all">
              View details
            </button>
            <button
              onClick={handleReschedule}
              className="flex-1 py-2 px-4 rounded-full font-medium text-sm text-slate-600 border-2 border-slate-300 hover:bg-slate-50 transition-all"
            >
              Reschedule
            </button>
          </>
        )}

        {session.type === 'past' && (
          <>
            {session.notes && (
              <button
                onClick={handleViewNotes}
                className="flex-1 py-2 px-4 rounded-full font-medium text-sm text-[#304DB5] border-2 border-[#304DB5] hover:bg-blue-50 transition-all"
              >
                {showFullNotes ? 'Hide notes' : 'View full notes'}
              </button>
            )}
            <button
              onClick={handleDownloadSummary}
              className="flex-1 py-2 px-4 rounded-full font-medium text-sm text-slate-600 border-2 border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionSummaryCard;
