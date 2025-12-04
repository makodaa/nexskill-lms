import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  duration: string;
  course: string;
  completed: boolean;
}

const AIRevisionTasks: React.FC = () => {
  const taskSets = {
    set1: [
      { id: 't1', title: 'Re-watch Lesson 3: Color theory basics', duration: '15 min', course: 'UI Design', completed: false },
      { id: 't2', title: 'Do 5 practice questions from JavaScript Fundamentals', duration: '10 min', course: 'JavaScript', completed: false },
      { id: 't3', title: 'Review your notes on responsive layouts', duration: '8 min', course: 'CSS', completed: false },
      { id: 't4', title: 'Complete the React Hooks quiz', duration: '20 min', course: 'React', completed: false },
      { id: 't5', title: 'Practice Figma prototyping exercises', duration: '25 min', course: 'UI Design', completed: false },
    ],
    set2: [
      { id: 't6', title: 'Revisit TypeScript generics lesson', duration: '18 min', course: 'TypeScript', completed: false },
      { id: 't7', title: 'Practice CSS Grid layout challenges', duration: '12 min', course: 'CSS', completed: false },
      { id: 't8', title: 'Review state management patterns', duration: '15 min', course: 'React', completed: false },
      { id: 't9', title: 'Complete accessibility best practices quiz', duration: '10 min', course: 'UI Design', completed: false },
      { id: 't10', title: 'Study API integration examples', duration: '20 min', course: 'JavaScript', completed: false },
    ],
  };

  const [currentSet, setCurrentSet] = useState<'set1' | 'set2'>('set1');
  const [tasks, setTasks] = useState<Task[]>(taskSets.set1);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleRegenerate = () => {
    const newSet = currentSet === 'set1' ? 'set2' : 'set1';
    setCurrentSet(newSet);
    setTasks(taskSets[newSet]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Revision tasks</h3>
        <p className="text-sm text-slate-600">Smart to-do list for your next study block</p>
      </div>

      {/* Progress indicator */}
      {completedCount > 0 && (
        <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-green-700">
              {completedCount} of {tasks.length} tasks completed
            </span>
          </div>
        </div>
      )}

      {/* Tasks list */}
      <div className="space-y-2 mb-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all ${
              task.completed
                ? 'bg-slate-50 border-slate-200'
                : 'bg-white border-slate-200 hover:border-[#304DB5] hover:bg-blue-50'
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              className="mt-0.5 w-5 h-5 text-[#304DB5] rounded focus:ring-[#304DB5] cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium mb-1 ${
                  task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                }`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {task.duration}
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {task.course}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        onClick={handleRegenerate}
        className="w-full py-2.5 rounded-full font-medium text-[#304DB5] border-2 border-[#304DB5] hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Regenerate tasks
      </button>
    </div>
  );
};

export default AIRevisionTasks;
