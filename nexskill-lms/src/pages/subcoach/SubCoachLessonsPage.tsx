import React, { useState } from 'react';
import SubCoachAppLayout from '../../layouts/SubCoachAppLayout';
import AssignedLessonsList from '../../components/subcoach/AssignedLessonsList';

const SubCoachLessonsPage: React.FC = () => {
  const [filterCourse, setFilterCourse] = useState('all');

  // Dummy lessons data
  const allLessons = [
    {
      id: '1',
      courseName: 'UI Design Fundamentals',
      moduleName: 'Module 1: Design Fundamentals',
      lessonTitle: 'Introduction to Color Theory',
      type: 'Video' as const,
      status: 'Published' as const,
    },
    {
      id: '2',
      courseName: 'UI Design Fundamentals',
      moduleName: 'Module 1: Design Fundamentals',
      lessonTitle: 'Typography Best Practices',
      type: 'Video' as const,
      status: 'Published' as const,
    },
    {
      id: '3',
      courseName: 'UI Design Fundamentals',
      moduleName: 'Module 2: Layout',
      lessonTitle: 'Layout and Composition',
      type: 'Assignment' as const,
      status: 'Published' as const,
    },
    {
      id: '4',
      courseName: 'JavaScript Mastery',
      moduleName: 'Module 1: JavaScript Basics',
      lessonTitle: 'Variables and Data Types',
      type: 'Video' as const,
      status: 'Published' as const,
    },
    {
      id: '5',
      courseName: 'JavaScript Mastery',
      moduleName: 'Module 2: Functions',
      lessonTitle: 'Functions and Scope',
      type: 'Video' as const,
      status: 'Published' as const,
    },
    {
      id: '6',
      courseName: 'JavaScript Mastery',
      moduleName: 'Module 3: Async',
      lessonTitle: 'Async JavaScript',
      type: 'Video' as const,
      status: 'Draft' as const,
    },
    {
      id: '7',
      courseName: 'Product Management',
      moduleName: 'Module 1: Discovery',
      lessonTitle: 'Product Discovery Workshop',
      type: 'PDF' as const,
      status: 'Published' as const,
    },
    {
      id: '8',
      courseName: 'Product Management',
      moduleName: 'Module 2: Planning',
      lessonTitle: 'User Story Mapping',
      type: 'Quiz' as const,
      status: 'Published' as const,
    },
  ];

  // Filter lessons
  const filteredLessons = allLessons.filter((lesson) => {
    const matchesCourse = filterCourse === 'all' || lesson.courseName === filterCourse;
    return matchesCourse;
  });

  // Get unique courses
  const courses = Array.from(new Set(allLessons.map((l) => l.courseName)));

  // Statistics
  const totalLessons = allLessons.length;
  const publishedLessons = allLessons.filter((l) => l.status === 'Published').length;
  const draftLessons = allLessons.filter((l) => l.status === 'Draft').length;

  return (
    <SubCoachAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-2">My Lessons</h1>
          <p className="text-sm text-text-secondary">
            Lessons you're supporting across {courses.length} courses
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[#EDF0FB]">
              <div className="text-2xl font-bold text-text-primary">{totalLessons}</div>
              <div className="text-xs text-text-secondary mt-1">Total Lessons</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
              <div className="text-2xl font-bold text-green-700">{publishedLessons}</div>
              <div className="text-xs text-green-600 mt-1">Published</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-5 border border-gray-200">
              <div className="text-2xl font-bold text-gray-700">{draftLessons}</div>
              <div className="text-xs text-gray-600 mt-1">Draft (Read-Only)</div>
            </div>
          </div>

          {/* Filter by Course */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Filter by Course
                </label>
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="w-full md:w-80 px-4 py-2 border border-[#EDF0FB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                >
                  <option value="all">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-text-secondary">
                Showing {filteredLessons.length} of {totalLessons} lessons
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="bg-white rounded-2xl p-6 border border-[#EDF0FB]">
            <h3 className="text-lg font-bold text-text-primary mb-4">Lesson Content</h3>
            <AssignedLessonsList
              lessons={filteredLessons}
              onLessonClick={(id: string) => console.log('View lesson:', id)}
            />
          </div>

          {/* Access Restrictions Notice */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-dashed border-amber-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">
                🔒
              </div>
              <div>
                <h4 className="text-base font-bold text-text-primary mb-2">View-Only Access</h4>
                <p className="text-sm text-text-secondary mb-3">
                  You have read-only access to lesson content. You cannot modify, publish, or delete lessons.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>View lesson content and materials</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Download resources to help students</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>See lesson structure and quiz questions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Check student progress on lessons</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Cannot edit lesson text or videos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Cannot publish or unpublish lessons</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Cannot delete or reorder lessons</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Cannot upload new videos or resources</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <p className="text-xs text-amber-800 font-medium">
                    💬 Need to suggest changes? Contact your supervising coach with feedback or content recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubCoachAppLayout>
  );
};

export default SubCoachLessonsPage;
