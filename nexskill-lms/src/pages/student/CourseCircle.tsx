import React from 'react';
import { useParams } from 'react-router-dom';
import StudentAppLayout from '../../layouts/StudentAppLayout';
import CircleChat from '../../components/community/CircleChat';

const CourseCircle: React.FC = () => {
  const { courseId } = useParams();

  // In a real app, you'd fetch course details based on courseId
  const courseName = 'Advanced React Patterns';

  return (
    <StudentAppLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#E7F0FF] via-[#F9F0FF] to-[#E3F4FF] py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Course Circle</h1>
            <p className="text-slate-600">
              Connect with fellow learners, share insights, and get real-time help.
            </p>
          </div>
          
          <CircleChat courseId={courseId} courseName={courseName} />
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default CourseCircle;
