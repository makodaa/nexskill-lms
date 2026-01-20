import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoachAppLayout from '../../layouts/CoachAppLayout';
import CourseTable from '../../components/coach/CourseTable';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../lib/supabaseClient';
import type { Course } from '../../types/db';

const CourseList: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!profile) return;

      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('coach_id', profile.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          // Verify if we need to map the status or other fields.
          // The dummy data had 'status', 'enrolledStudents', 'rating', 'lastUpdated'.
          // real data has 'created_at', 'updated_at', etc.
          // We might need to adapt the data for CourseTable or update CourseTable.
          // For now let's map what we have.
          const mappedCourses = data.map((course: Course) => ({
            id: course.id,
            title: course.title,
            status: 'draft', // Default to draft as we don't have status in DB schema provided yet, or assume draft.
            enrolledStudents: 0, // Need to count enrollments
            rating: 0, // Need to calculate ratings
            lastUpdated: new Date(course.updated_at).toLocaleDateString(),
          }));
          setCourses(mappedCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [profile]);

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
        <div className="bg-white border-b border-slate-200 dark:border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">My courses</h1>
              <p className="text-slate-600 dark:text-dark-text-secondary">Manage your published and draft courses</p>
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
            <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 p-5">
              <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-1">Total courses</p>
              <p className="text-3xl font-bold text-[#304DB5]">{courses.length}</p>
            </div>
            <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 p-5">
              <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-1">Published</p>
              <p className="text-3xl font-bold text-green-600">
                {courses.filter((c) => c.status === 'published').length}
              </p>
            </div>
            <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 p-5">
              <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-1">Drafts</p>
              <p className="text-3xl font-bold text-slate-600 dark:text-dark-text-secondary">
                {courses.filter((c) => c.status === 'draft').length}
              </p>
            </div>
            <div className="bg-white dark:bg-dark-background-card rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 p-5">
              <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-1">Total students</p>
              <p className="text-3xl font-bold text-purple-600">
                {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
              </p>
            </div>
          </div>

          {/* Course Table */}
          {loading ? (
            <div className="text-center py-8">Loading courses...</div>
          ) : (
            <CourseTable courses={courses} onEdit={handleEdit} onPreview={handlePreview} />
          )}
        </div>
      </div>
    </CoachAppLayout>
  );
};

export default CourseList;
