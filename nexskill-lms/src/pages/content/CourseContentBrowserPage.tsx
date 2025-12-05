import React, { useState } from 'react';
import ContentEditorLayout from '../../layouts/ContentEditorLayout';
import CourseContentTree from '../../components/content/CourseContentTree';

const CourseContentBrowserPage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [lessonContent, setLessonContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Dummy lesson detail
  const dummyLessonDetail = {
    id: 1,
    title: 'Introduction to React Hooks',
    description: 'Learn the basics of React Hooks including useState and useEffect.',
    duration: '15 min',
    content: 'React Hooks allow you to use state and other React features without writing a class component. In this lesson, we will cover useState for managing component state and useEffect for handling side effects.',
    videoUrl: 'https://example.com/video.mp4',
    resources: ['React Hooks Cheatsheet.pdf', 'Code Examples.zip'],
  };

  const handleSelectLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setLessonContent(dummyLessonDetail.content);
    setIsEditing(false);
  };

  const handleSaveEdits = () => {
    console.log('Saving edits:', lessonContent);
    setIsEditing(false);
    // In real app, would save to backend
  };

  return (
    <ContentEditorLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Course Content Browser</h1>
            <p className="text-sm text-text-secondary">
              Browse courses and edit lesson content
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left: Tree View */}
        <div className="w-1/3 border-r border-[#EDF0FB] overflow-y-auto p-6">
          <h3 className="text-base font-bold text-text-primary mb-4">Course Structure</h3>
          <CourseContentTree onSelectLesson={handleSelectLesson} />
        </div>

        {/* Right: Detail Panel */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedLesson ? (
            <div className="h-full flex items-center justify-center text-center">
              <div className="max-w-md">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">
                  📚
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Select a Lesson</h3>
                <p className="text-sm text-text-secondary">
                  Choose a lesson from the course tree on the left to view and edit its content
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Lesson Header */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-text-primary mb-2">
                      {dummyLessonDetail.title}
                    </h2>
                    <p className="text-sm text-text-secondary mb-3">{dummyLessonDetail.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                        ⏱️ {dummyLessonDetail.duration}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                        🎥 Video
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
                      >
                        ✏️ Edit Lesson
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setLessonContent(dummyLessonDetail.content);
                          }}
                          className="px-4 py-2 bg-white border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdits}
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
                        >
                          💾 Save Changes
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-base font-bold text-text-primary mb-4">Lesson Content</h3>
                {isEditing ? (
                  <textarea
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono resize-none"
                    placeholder="Enter lesson content..."
                  />
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                      {lessonContent}
                    </p>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-base font-bold text-text-primary mb-4">Attached Resources</h3>
                <div className="space-y-3">
                  {dummyLessonDetail.resources.map((resource, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl">📄</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{resource}</p>
                      </div>
                      <button className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium">
                        Replace
                      </button>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm text-text-muted hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 transition-all font-medium">
                    + Add Resource
                  </button>
                </div>
              </div>

              {/* Video Section */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-base font-bold text-text-primary mb-4">Video Content</h3>
                <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">🎬</span>
                    <p className="text-sm text-text-muted">Video player would appear here</p>
                    <p className="text-xs text-text-muted mt-1">{dummyLessonDetail.videoUrl}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold">
                  🎥 Replace Video
                </button>
              </div>

              {/* Metadata */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-base font-bold text-text-primary mb-4">Lesson Metadata</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-text-secondary mb-1 block">Duration (minutes)</label>
                    <input
                      type="text"
                      defaultValue="15"
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:bg-gray-50 disabled:text-text-muted"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary mb-1 block">Difficulty</label>
                    <select
                      defaultValue="beginner"
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:bg-gray-50 disabled:text-text-muted"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentEditorLayout>
  );
};

export default CourseContentBrowserPage;
