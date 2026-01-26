import React from 'react';

type QuestionType = 'multiple-choice' | 'true-false' | 'image-choice' | 'file-upload';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface FileUploadConfig {
  allowedTypes: string[];
  maxFileSizeMB: number;
  rubric: string;
  maxPoints: number;
}

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: Option[];
  explanation: string;
  fileUploadConfig?: FileUploadConfig;
}

interface QuizBuilderPanelProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
}

const QuizBuilderPanel: React.FC<QuizBuilderPanelProps> = ({ questions, onChange }) => {


  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      type: 'multiple-choice',
      question: '',
      options: [
        { id: 'opt-1', text: '', isCorrect: true },
        { id: 'opt-2', text: '', isCorrect: false },
        { id: 'opt-3', text: '', isCorrect: false },
        { id: 'opt-4', text: '', isCorrect: false },
      ],
      explanation: '',
    };
    onChange([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    onChange(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    onChange(questions.filter((q) => q.id !== id));
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.map((opt) =>
      opt.id === optionId ? { ...opt, text } : opt
    );
    updateQuestion(questionId, { options: updatedOptions });
  };

  const setCorrectAnswer = (questionId: string, optionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.map((opt) => ({
      ...opt,
      isCorrect: opt.id === optionId,
    }));
    updateQuestion(questionId, { options: updatedOptions });
  };

  const getTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'multiple-choice':
        return '✓';
      case 'true-false':
        return '⊤⊥';
      case 'image-choice':
        return '🖼️';
      case 'file-upload':
        return '📎';
      default:
        return '?';
    }
  };

  const handleTypeChange = (questionId: string, newType: QuestionType) => {
    const updates: Partial<Question> = { type: newType };
    
    // Add default file upload config when switching to file-upload type
    if (newType === 'file-upload') {
      updates.fileUploadConfig = {
        allowedTypes: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png'],
        maxFileSizeMB: 10,
        rubric: '',
        maxPoints: 10,
      };
    }
    
    updateQuestion(questionId, updates);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Quiz Builder</h2>
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add question
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl font-semibold text-slate-900 dark:text-dark-text-primary mb-2">No questions yet</p>
          <p className="text-slate-600 dark:text-dark-text-secondary mb-6">Create your first quiz question</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-dark-background-card rounded-2xl border-2 border-slate-200 dark:border-gray-700 p-6 hover:border-slate-300 dark:border-gray-600 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-bold text-slate-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <select
                      value={question.type}
                      onChange={(e) => handleTypeChange(question.id, e.target.value as QuestionType)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-slate-700 dark:text-dark-text-primary border-none"
                    >
                      <option value="multiple-choice">Multiple choice</option>
                      <option value="true-false">True / False</option>
                      <option value="image-choice">Image choice</option>
                      <option value="file-upload">📎 File Upload (Manual Grading)</option>
                    </select>
                    <span className="text-lg">{getTypeIcon(question.type)}</span>
                    {question.type === 'file-upload' && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        Requires Manual Grading
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                    placeholder="Enter your question here..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 mb-4"
                  />

                  {/* File Upload Configuration */}
                  {question.type === 'file-upload' && (
                    <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start gap-2 mb-3">
                        <span className="text-amber-600 text-lg">⚠️</span>
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Manual Grading Required
                          </p>
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            File upload answers cannot be auto-graded. Quiz scores will be marked as "Tentative" until you review and grade submissions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-dark-text-secondary mb-1">
                            Max Points
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={question.fileUploadConfig?.maxPoints || 10}
                            onChange={(e) => updateQuestion(question.id, {
                              fileUploadConfig: {
                                ...question.fileUploadConfig!,
                                maxPoints: parseInt(e.target.value) || 10,
                              }
                            })}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-dark-text-secondary mb-1">
                            Max File Size (MB)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={question.fileUploadConfig?.maxFileSizeMB || 10}
                            onChange={(e) => updateQuestion(question.id, {
                              fileUploadConfig: {
                                ...question.fileUploadConfig!,
                                maxFileSizeMB: parseInt(e.target.value) || 10,
                              }
                            })}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-medium text-slate-700 dark:text-dark-text-secondary mb-1">
                          Allowed File Types
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'zip'].map((fileType) => {
                            const isSelected = question.fileUploadConfig?.allowedTypes?.includes(fileType);
                            return (
                              <button
                                key={fileType}
                                type="button"
                                onClick={() => {
                                  const currentTypes = question.fileUploadConfig?.allowedTypes || [];
                                  const newTypes = isSelected
                                    ? currentTypes.filter(t => t !== fileType)
                                    : [...currentTypes, fileType];
                                  updateQuestion(question.id, {
                                    fileUploadConfig: {
                                      ...question.fileUploadConfig!,
                                      allowedTypes: newTypes,
                                    }
                                  });
                                }}
                                className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                                  isSelected
                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                    : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                .{fileType}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-dark-text-secondary mb-1">
                          Grading Rubric / Instructions
                        </label>
                        <textarea
                          value={question.fileUploadConfig?.rubric || ''}
                          onChange={(e) => updateQuestion(question.id, {
                            fileUploadConfig: {
                              ...question.fileUploadConfig!,
                              rubric: e.target.value,
                            }
                          })}
                          placeholder="Describe what you're looking for in the submission (e.g., 'Code should be clean, well-commented, and follow best practices...')"
                          rows={3}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none text-sm resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Options - Only show for non-file-upload types */}
                  {question.type !== 'file-upload' && (
                    <div className="space-y-2 mb-4">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked={option.isCorrect}
                            onChange={() => setCorrectAnswer(question.id, option.id)}
                            className="w-5 h-5 text-[#304DB5] cursor-pointer"
                          />
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                            placeholder={`Option ${question.options.indexOf(option) + 1}`}
                            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Explanation */}
                  <textarea
                    value={question.explanation}
                    onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                    placeholder="Explanation (shown after answer)"
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:border-[#304DB5] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none text-sm"
                  />
                </div>

                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizBuilderPanel;
