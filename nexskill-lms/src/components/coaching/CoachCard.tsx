import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Coach {
  id: string;
  name: string;
  title: string;
  rating: number;
  sessionsCount: number;
  tags: string[];
  avatarUrl?: string;
}

interface CoachCardProps {
  coach: Coach;
  onViewProfile?: (coachId: string) => void;
  onBook?: (coachId: string) => void;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, onViewProfile, onBook }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(coach.id);
    } else {
      navigate(`/student/coaching/coaches/${coach.id}`);
    }
  };

  const handleBook = () => {
    if (onBook) {
      onBook(coach.id);
    } else {
      navigate(`/student/coaching/coaches/${coach.id}/book`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all">
      {/* Header with avatar and info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {coach.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{coach.name}</h3>
          <p className="text-sm text-slate-600 mb-2">{coach.title}</p>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold text-slate-900">{coach.rating}</span>
            </div>
            <div className="text-slate-600">{coach.sessionsCount} sessions</div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {coach.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-[#304DB5] text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleBook}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
        >
          Book session
        </button>
        <button
          onClick={handleViewProfile}
          className="px-4 py-2.5 text-sm font-medium text-[#304DB5] hover:text-[#5E7BFF] transition-colors"
        >
          View profile
        </button>
      </div>
    </div>
  );
};

export default CoachCard;
