import React from 'react';

interface Coach {
  name: string;
  avatar?: string;
}

interface BookingConfirmationCardProps {
  coach: Coach;
  date: string;
  time: string;
  duration: number;
  format: string;
}

const BookingConfirmationCard: React.FC<BookingConfirmationCardProps> = ({
  coach,
  date,
  time,
  duration,
  format,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Session details</h3>

      {/* Coach info */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#304DB5] to-[#5E7BFF] flex items-center justify-center text-white font-bold text-lg">
          {coach.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{coach.name}</div>
          <div className="text-sm text-slate-600">Your coach</div>
        </div>
      </div>

      {/* Session details */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#304DB5] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div>
            <div className="text-sm text-slate-600">Date & Time</div>
            <div className="font-semibold text-slate-900 text-lg">
              {date} at {time}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#304DB5] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <div className="text-sm text-slate-600">Duration</div>
            <div className="font-semibold text-slate-900">{duration} minutes</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#304DB5] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <div>
            <div className="text-sm text-slate-600">Format</div>
            <div className="font-semibold text-slate-900">{format}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#304DB5] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <div className="text-sm text-slate-600">Timezone</div>
            <div className="font-semibold text-slate-900">Pacific Time (PST)</div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-start gap-2 text-sm text-slate-600">
          <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p>We'll email you the calendar invite and {format} link 24 hours before the session.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationCard;
