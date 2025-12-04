import React from 'react';

interface QuestionTrueFalseProps {
  question: {
    id: string;
    questionText: string;
  };
  value: boolean | null;
  onChange: (value: boolean) => void;
}

const QuestionTrueFalse: React.FC<QuestionTrueFalseProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          {question.questionText}
        </h3>
        <p className="text-slate-600">Select whether this statement is true or false.</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onChange(true)}
          className={`
            flex-1 py-4 px-8 rounded-full font-semibold text-lg transition-all
            ${
              value === true
                ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }
          `}
        >
          True
        </button>
        <button
          onClick={() => onChange(false)}
          className={`
            flex-1 py-4 px-8 rounded-full font-semibold text-lg transition-all
            ${
              value === false
                ? 'bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }
          `}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default QuestionTrueFalse;
