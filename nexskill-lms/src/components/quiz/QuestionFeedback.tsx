import React from 'react';

interface QuestionFeedbackProps {
  question: {
    id: string;
    questionText: string;
    type: 'multiple-choice' | 'true-false' | 'image-choice';
    options?: { id: string; label: string }[];
    correctOptionId?: string;
    correctAnswer?: boolean;
    explanation: string;
  };
  userAnswer: {
    optionId?: string;
    value?: boolean;
    isCorrect: boolean;
  };
}

const QuestionFeedback: React.FC<QuestionFeedbackProps> = ({ question, userAnswer }) => {
  const getUserAnswerText = () => {
    if (question.type === 'true-false') {
      return userAnswer.value !== undefined ? (userAnswer.value ? 'True' : 'False') : 'Not answered';
    }
    if (question.type === 'multiple-choice' || question.type === 'image-choice') {
      const option = question.options?.find((opt) => opt.id === userAnswer.optionId);
      return option ? option.label : 'Not answered';
    }
    return 'Not answered';
  };

  const getCorrectAnswerText = () => {
    if (question.type === 'true-false') {
      return question.correctAnswer ? 'True' : 'False';
    }
    if (question.type === 'multiple-choice' || question.type === 'image-choice') {
      const option = question.options?.find((opt) => opt.id === question.correctOptionId);
      return option ? option.label : 'N/A';
    }
    return 'N/A';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold text-slate-900 flex-1">
          {question.questionText}
        </h4>
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4
            ${
              userAnswer.isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }
          `}
        >
          {userAnswer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-slate-600 min-w-[120px]">Your answer:</span>
          <span
            className={`text-sm font-medium ${
              userAnswer.isCorrect ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {getUserAnswerText()}
          </span>
        </div>
        {!userAnswer.isCorrect && (
          <div className="flex gap-2">
            <span className="text-sm font-medium text-slate-600 min-w-[120px]">Correct answer:</span>
            <span className="text-sm font-medium text-green-700">
              {getCorrectAnswerText()}
            </span>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex gap-2 mb-2">
          <svg
            className="w-5 h-5 text-[#304DB5] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <div className="text-sm font-semibold text-[#304DB5] mb-1">Explanation</div>
            <p className="text-sm text-slate-700">{question.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionFeedback;
