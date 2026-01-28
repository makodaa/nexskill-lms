import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'scheduled' | 'pending' | 'changes_requested' | 'rejected';
  enrolledStudents: number;
  rating: number;
  lastUpdated: string;
}

interface CourseTableProps {
  courses: Course[];
  onEdit: (courseId: string) => void;
  onPreview: (courseId: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onEdit, onPreview }) => {
  const navigate = useNavigate();
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200'; // User requested Amber for "Pending Review"
      case 'changes_requested':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'draft':
        return 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-dark-text-primary border-slate-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-dark-text-primary border-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-dark-text-primary">Course</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-dark-text-primary">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-dark-text-primary">Students</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-dark-text-primary">Rating</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-dark-text-primary">Last updated</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-700 dark:text-dark-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-gray-800 dark:bg-gray-800 transition-colors">
                <td className="py-4 px-6">
                  <p className="font-semibold text-slate-900">{course.title}</p>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-slate-700">{course.enrolledStudents}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium text-slate-700">{course.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-slate-600">{course.lastUpdated}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(course.id)}
                      className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onPreview(course.id)}
                      className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-dark-text-secondary hover:bg-slate-100 dark:hover:bg-gray-700 dark:bg-gray-800 rounded-lg transition-colors"
                    >
                      Preview
                    </button>
                    {course.status === 'published' && course.enrolledStudents > 0 && (
                      <button
                        onClick={() => navigate(`/coach/courses/${course.id}/students`)}
                        className="px-4 py-2 text-sm font-medium text-[#304DB5] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        View students
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-200">
        {courses.map((course) => (
          <div key={course.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-dark-text-primary mb-2">{course.title}</h3>
                <span
                  className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                    course.status
                  )}`}
                >
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
              <div>
                <p className="text-slate-600 dark:text-dark-text-secondary text-xs mb-1">Students</p>
                <p className="font-medium text-slate-900">{course.enrolledStudents}</p>
              </div>
              <div>
                <p className="text-slate-600 dark:text-dark-text-secondary text-xs mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium text-slate-900">{course.rating.toFixed(1)}</span>
                </div>
              </div>
              <div>
                <p className="text-slate-600 dark:text-dark-text-secondary text-xs mb-1">Updated</p>
                <p className="font-medium text-slate-900 dark:text-dark-text-primary text-xs">{course.lastUpdated}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(course.id)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] rounded-full"
              >
                Edit
              </button>
              <button
                onClick={() => onPreview(course.id)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-dark-text-primary border border-slate-300 dark:border-gray-600 rounded-full"
              >
                Preview
              </button>
              {course.status === 'published' && course.enrolledStudents > 0 && (
                <button
                  onClick={() => navigate(`/coach/courses/${course.id}/students`)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-[#304DB5] border border-[#304DB5] rounded-full hover:bg-blue-50 transition-colors"
                >
                  Students
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="py-12 text-center">
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
          <p className="text-lg text-slate-600 dark:text-dark-text-secondary mb-2">No courses yet</p>
          <p className="text-sm text-slate-500">Create your first course to get started</p>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
