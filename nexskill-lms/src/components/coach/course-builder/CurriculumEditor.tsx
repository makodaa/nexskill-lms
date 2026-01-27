import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { Lesson } from '../../../types/lesson';

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  is_published?: boolean;
}

interface CurriculumEditorProps {
  curriculum: Module[];
  onChange: (updatedCurriculum: Module[]) => void;
  onEditLesson: (moduleId: string, lessonId: string) => void;
  onAddLesson?: (moduleId: string, newLesson: Lesson) => Promise<void>;
  onDeleteLesson?: (moduleId: string, lessonId: string) => Promise<void>;
  onMoveLesson?: (moduleId: string, lessonId: string, direction: 'up' | 'down') => Promise<void>;
  onToggleModulePublish?: (moduleId: string, isPublished: boolean) => Promise<void>;
}

const CurriculumEditor: React.FC<CurriculumEditorProps> = ({ curriculum, onChange, onEditLesson, onAddLesson, onDeleteLesson, onMoveLesson, onToggleModulePublish }) => {
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

  const handleToggleModulePublish = async (moduleId: string, currentStatus: boolean) => {
    if (onToggleModulePublish) {
      await onToggleModulePublish(moduleId, !currentStatus);
    }
    // Update local state
    const updatedCurriculum = curriculum.map((module) =>
      module.id === moduleId ? { ...module, is_published: !currentStatus } : module
    );
    onChange(updatedCurriculum);
  };

  const handleAddModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: `Module ${curriculum.length + 1}`,
      lessons: [],
    };
    onChange([...curriculum, newModule]);
  };

  const handleAddLesson = async (moduleId: string) => {
    // Find the module to get the lesson count
    const module = curriculum.find(m => m.id === moduleId);

    // Create a temporary lesson object with a placeholder ID
    // The actual ID will be generated in the CourseBuilder when saving to DB
    const newLesson: Lesson = {
      id: '', // Will be replaced with UUID in CourseBuilder
      title: `Lesson ${module?.lessons.length + 1 || 1}`,
      type: 'text',
      duration: '0 min',
      summary: '',
      content_blocks: [],
      is_published: false
    };

    // If onAddLesson callback is provided, use it to create the lesson in the database
    if (onAddLesson) {
      await onAddLesson(moduleId, newLesson);
    } else {
      // Fallback to local state update only
      // Generate a temporary ID for local use only
      const lessonWithTempId = { ...newLesson, id: `lesson-${Date.now()}` };
      const updatedCurriculum = curriculum.map((module) => {
        if (module.id === moduleId) {
          return { ...module, lessons: [...module.lessons, lessonWithTempId] };
        }
        return module;
      });
      onChange(updatedCurriculum);
    }
  };

  const handleModuleTitleChange = (moduleId: string, newTitle: string) => {
    const updatedCurriculum = curriculum.map((module) =>
      module.id === moduleId ? { ...module, title: newTitle } : module
    );
    onChange(updatedCurriculum);
  };

  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    // If onDeleteLesson callback is provided, use it to delete the lesson from the database
    if (onDeleteLesson) {
      await onDeleteLesson(moduleId, lessonId);
    } else {
      // Fallback to local state update only
      const updatedCurriculum = curriculum.map((module) => {
        if (module.id === moduleId) {
          return { ...module, lessons: module.lessons.filter((l) => l.id !== lessonId) };
        }
        return module;
      });
      onChange(updatedCurriculum);
    }
  };

  const handleMoveLesson = async (moduleId: string, lessonId: string, direction: 'up' | 'down') => {
    // If onMoveLesson callback is provided, use it to update positions in the database
    if (onMoveLesson) {
      await onMoveLesson(moduleId, lessonId, direction);
    } else {
      // Fallback to local state update only
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
    }
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
                />
                <button
                  onClick={() => handleToggleModulePublish(module.id, module.is_published ?? false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    module.is_published 
                      ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  title={module.is_published ? 'Module is published (visible to students)' : 'Module is unpublished (hidden from students)'}
                >
                  {module.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {module.is_published ? 'Published' : 'Unpublished'}
                </button>
                <button
                  onClick={() => handleAddLesson(module.id)}
                  className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  + Add lesson
                </button>
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
                        <p className="text-xs text-slate-600">{lesson.duration || `${lesson.estimated_duration_minutes || 0} min`}</p>
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
