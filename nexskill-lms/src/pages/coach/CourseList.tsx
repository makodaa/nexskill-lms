import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoachAppLayout from '../../layouts/CoachAppLayout';
import CourseTable from '../../components/coach/CourseTable';

// Dummy courses data
const dummyCourses = [
  {
    id: 'course-1',
    title: 'UI Design Fundamentals',
    status: 'published' as const,
    enrolledStudents: 48,
    rating: 4.9,
    lastUpdated: 'Nov 28, 2025',
  },
  {
    id: 'course-2',
    title: 'JavaScript Mastery',
    status: 'published' as const,
    enrolledStudents: 56,
    rating: 4.7,
    lastUpdated: 'Nov 25, 2025',
  },
  {
    id: 'course-3',
    title: 'Product Management Excellence',
    status: 'draft' as const,
    enrolledStudents: 0,
    rating: 0,
    lastUpdated: 'Dec 2, 2025',
  },
  {
    id: 'course-4',
    title: 'Data Analytics with Python',
    status: 'published' as const,
    enrolledStudents: 42,
    rating: 4.6,
    lastUpdated: 'Nov 20, 2025',
  },
];

const CourseList: React.FC = () => {
  const navigate = useNavigate();

  const handleEdit = (courseId: string) => {
    navigate(`/coach/courses/${courseId}/edit`);
  };

  const handlePreview = (courseId: string) => {
    navigate(`/coach/courses/${courseId}/edit`, { state: { activeSection: 'preview' } });
  };

  const handleCreateNew = () => {
    navigate('/coach/courses/new');
  };

  return (
    <CoachAppLayout>
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">My courses</h1>
              <p className="text-slate-600">Manage your published and draft courses</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create new course
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-600 mb-1">Total courses</p>
              <p className="text-3xl font-bold text-[#304DB5]">{dummyCourses.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-600 mb-1">Published</p>
              <p className="text-3xl font-bold text-green-600">
                {dummyCourses.filter((c) => c.status === 'published').length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-600 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-slate-600">
                {dummyCourses.filter((c) => c.status === 'draft').length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <p className="text-sm text-slate-600 mb-1">Total students</p>
              <p className="text-3xl font-bold text-purple-600">
                {dummyCourses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
              </p>
            </div>
          </div>

          {/* Course Table */}
          <CourseTable courses={dummyCourses} onEdit={handleEdit} onPreview={handlePreview} />
        </div>
      </div>
    </CoachAppLayout>
  );
};

export default CourseList;
