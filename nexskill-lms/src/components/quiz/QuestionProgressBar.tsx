import React from 'react';

interface QuestionProgressBarProps {
  currentIndex: number;
  total: number;
}

const QuestionProgressBar: React.FC<QuestionProgressBarProps> = ({ currentIndex, total }) => {
  const progressPercent = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className="text-sm font-medium text-slate-600 whitespace-nowrap">
        Question {currentIndex + 1} of {total}
      </div>
    </div>
  );
};

export default QuestionProgressBar;
