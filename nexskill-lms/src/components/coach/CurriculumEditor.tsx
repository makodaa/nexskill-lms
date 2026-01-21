import React, { useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'live';
  duration: string;
  summary: string;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

interface CurriculumEditorProps {
  curriculum: Module[];
  onChange: (updatedCurriculum: Module[]) => void;
  onEditLesson: (moduleId: string, lessonId: string) => void;
}

const CurriculumEditor: React.FC<CurriculumEditorProps> = ({ curriculum, onChange, onEditLesson }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(curriculum.map((m) => m.id)));

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const handleAddModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: `Module ${curriculum.length + 1}`,
      lessons: [],
    };
    onChange([...curriculum, newModule]);
  };

  const handleAddLesson = (moduleId: string) => {
    const updatedCurriculum = curriculum.map((module) => {
      if (module.id === moduleId) {
        const newLesson: Lesson = {
          id: `lesson-${Date.now()}`,
          title: `Lesson ${module.lessons.length + 1}`,
          type: 'video',
          duration: '0 min',
          summary: '',
        };
        return { ...module, lessons: [...module.lessons, newLesson] };
      }
      return module;
    });
    onChange(updatedCurriculum);
  };

  const handleModuleTitleChange = (moduleId: string, newTitle: string) => {
    const updatedCurriculum = curriculum.map((module) =>
      module.id === moduleId ? { ...module, title: newTitle } : module
    );
    onChange(updatedCurriculum);
  };

  const handleModuleDescriptionChange = (moduleId: string, newDescription: string) => {
    const updatedCurriculum = curriculum.map((module) =>
      module.id === moduleId ? { ...module, description: newDescription } : module
    );
    onChange(updatedCurriculum);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      const updatedCurriculum = curriculum.filter((module) => module.id !== moduleId);
      onChange(updatedCurriculum);
    }
  };

  const handleMoveModule = (moduleId: string, direction: 'up' | 'down') => {
    const updatedCurriculum = [...curriculum];
    const index = updatedCurriculum.findIndex((m) => m.id === moduleId);
    
    if (direction === 'up' && index > 0) {
      [updatedCurriculum[index], updatedCurriculum[index - 1]] = [updatedCurriculum[index - 1], updatedCurriculum[index]];
      onChange(updatedCurriculum);
    } else if (direction === 'down' && index < updatedCurriculum.length - 1) {
      [updatedCurriculum[index], updatedCurriculum[index + 1]] = [updatedCurriculum[index + 1], updatedCurriculum[index]];
      onChange(updatedCurriculum);
    }
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    const updatedCurriculum = curriculum.map((module) => {
      if (module.id === moduleId) {
        return { ...module, lessons: module.lessons.filter((l) => l.id !== lessonId) };
      }
      return module;
    });
    onChange(updatedCurriculum);
  };

  const handleMoveLesson = (moduleId: string, lessonId: string, direction: 'up' | 'down') => {
    const updatedCurriculum = curriculum.map((module) => {
      if (module.id === moduleId) {
        const lessons = [...module.lessons];
        const index = lessons.findIndex((l) => l.id === lessonId);
        if (direction === 'up' && index > 0) {
          [lessons[index], lessons[index - 1]] = [lessons[index - 1], lessons[index]];
        } else if (direction === 'down' && index < lessons.length - 1) {
          [lessons[index], lessons[index + 1]] = [lessons[index + 1], lessons[index]];
        }
        return { ...module, lessons };
      }
      return module;
    });
    onChange(updatedCurriculum);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'pdf':
        return '📄';
      case 'quiz':
        return '📝';
      case 'live':
        return '🎥';
      default:
        return '📖';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Curriculum</h2>
        <button
          onClick={handleAddModule}
          className="px-5 py-2 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add module
        </button>
      </div>

      <div className="space-y-4">
        {curriculum.map((module, moduleIndex) => (
          <div key={module.id} className="border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {/* Module Header */}
            <div className="bg-slate-50 dark:bg-gray-800 p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="text-slate-600 dark:text-dark-text-secondary hover:text-slate-900 dark:text-dark-text-primary transition-colors"
                  >
                    <svg
                      className={`w-5 h-5 transition-transform ${expandedModules.has(module.id) ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-slate-600">Module {moduleIndex + 1}</span>
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => handleModuleTitleChange(module.id, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-dark-background-card rounded-lg border border-slate-200 dark:border-gray-700 font-semibold text-slate-900 dark:text-dark-text-primary focus:border-[#304DB5] focus:outline-none"
                    placeholder="Module Title"
                  />
                  
                  {/* Module Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveModule(module.id, 'up')}
                      disabled={moduleIndex === 0}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-dark-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded"
                      title="Move Up"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMoveModule(module.id, 'down')}
                      disabled={moduleIndex === curriculum.length - 1}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-dark-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 rounded"
                      title="Move Down"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="w-px h-4 bg-slate-300 mx-1"></div>
                    <button
                      onClick={() => handleDeleteModule(module.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete Module"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {expandedModules.has(module.id) && (
                   <div className="pl-8 pr-12">
                     <textarea
                       value={module.description || ''}
                       onChange={(e) => handleModuleDescriptionChange(module.id, e.target.value)}
                       className="w-full px-3 py-2 bg-white dark:bg-dark-background-card rounded-lg border border-slate-200 dark:border-gray-700 text-sm text-slate-600 dark:text-dark-text-secondary focus:border-[#304DB5] focus:outline-none resize-none"
                       placeholder="Add a description for this module..."
                       rows={2}
                     />
                     <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => handleAddLesson(module.id)}
                          className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add lesson
                        </button>
                     </div>
                   </div>
                )}
              </div>
            </div>

            {/* Lessons List */}
            {expandedModules.has(module.id) && (
              <div className="p-4 space-y-2">
                {module.lessons.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-dark-text-muted text-center py-4">No lessons yet. Click"Add lesson" to start.</p>
                ) : (
                  module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-800 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 dark:bg-gray-800 transition-colors">
                      {/* Drag Handle */}
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleMoveLesson(module.id, lesson.id, 'up')}
                          disabled={lessonIndex === 0}
                          className="text-slate-400 hover:text-slate-600 dark:text-dark-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleMoveLesson(module.id, lesson.id, 'down')}
                          disabled={lessonIndex === module.lessons.length - 1}
                          className="text-slate-400 hover:text-slate-600 dark:text-dark-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Lesson Info */}
                      <span className="text-lg">{getTypeIcon(lesson.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{lesson.title}</p>
                        <p className="text-xs text-slate-600">{lesson.duration}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium text-slate-600 dark:text-dark-text-secondary bg-white dark:bg-dark-background-card rounded border border-slate-200 dark:border-gray-700 capitalize">
                        {lesson.type}
                      </span>

                      {/* Actions */}
                      <button
                        onClick={() => onEditLesson(module.id, lesson.id)}
                        className="px-3 py-1.5 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(module.id, lesson.id)}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}

        {curriculum.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-lg text-slate-600 dark:text-dark-text-secondary mb-2">No modules yet</p>
            <p className="text-sm text-slate-500">Start building your course by adding a module</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumEditor;
