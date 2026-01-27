import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentAppLayout from "../../layouts/StudentAppLayout";
import { useCourse } from "../../hooks/useCourse";
import { useEnrollment } from "../../hooks/useEnrollment";
import CourseDetailContent from "../../components/courses/CourseDetailContent";
import CourseEnrollmentCard from "../../components/courses/CourseEnrollmentCard";

/**
 * CourseDetail Page - Clean component focused on presentation
 *
 * Responsibilities:
 * - Page layout and structure
 * - Coordinating child components
 * - User feedback (alerts, navigation)
 *
 * NOT responsible for:
 * - Data fetching (delegated to hooks)
 * - Business logic (delegated to hooks)
 * - Complex state management
 */
const CourseDetailRefactored: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // Custom hooks handle all data and business logic
  const { course, loading: loadingCourse } = useCourse(courseId);
  const {
    isEnrolled,
    checking,
    loading: enrolling,
    enroll,
    unenroll,
  } = useEnrollment(courseId);

  // Simple event handlers that delegate to hooks
  const handleEnroll = async () => {
    const result = await enroll();

    if (result.success) {
      alert(
        `✅ Successfully enrolled in ${course?.title}!\n\n🎉 Welcome to the course! You can now access the course circle and connect with other students.`,
      );
    } else {
      alert(`❌ Failed to enroll: ${result.error}`);
    }
  };

  const handleUnenroll = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to leave ${course?.title}?\n\n` +
      "You will lose access to:\n" +
      "• Course circle discussions\n" +
      "• Progress tracking\n" +
      "• Community features\n\n" +
      "You can re-enroll at any time.",
    );

    if (!confirmed) return;

    const result = await unenroll();

    if (result.success) {
      alert(
        `✓ You have been unenrolled from ${course?.title}\n\nYou can re-enroll at any time from the course catalog.`,
      );
    } else {
      alert(`❌ Failed to unenroll: ${result.error}`);
    }
  };

  const handleAddToWishlist = () => {
    alert(
      `❤️ Added to wishlist!\n\n${course?.title} has been saved to your wishlist.`,
    );
  };

  // Loading state
  if (loadingCourse) {
    return (
      <StudentAppLayout>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading course...</p>
          </div>
        </div>
      </StudentAppLayout>
    );
  }

  // Not found state
  if (!course) {
    return (
      <StudentAppLayout>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
              Course not found
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
              The course you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/student/courses")}
              className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-primary-light text-white font-medium rounded-full hover:shadow-lg transition-all"
            >
              Browse courses
            </button>
          </div>
        </div>
      </StudentAppLayout>
    );
  }

  // Main render - clean and focused
  return (
    <StudentAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB] dark:border-gray-700">
        <button
          onClick={() => navigate("/student/courses")}
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-primary mb-4 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to catalog
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {course.title}
              </h1>
              <span className="px-3 py-1 bg-brand-primary-soft text-brand-primary rounded-full text-xs font-medium">
                {course.level}
              </span>
            </div>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3">
              {course.category}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">
                  {course.rating}
                </span>
                <span className="text-text-muted dark:text-dark-text-muted">
                  ({course.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary dark:text-dark-text-secondary">
                <span>👥</span>
                <span>{course.studentsCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary dark:text-dark-text-secondary">
                <span>⏱️</span>
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex gap-6">
          {/* Left: Course Content */}
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 mb-6 border-b border-[#EDF0FB] dark:border-gray-700">
              <button className="px-6 py-3 text-sm font-medium capitalize text-brand-primary border-b-2 border-brand-primary">
                Overview
              </button>
              <div className="flex-1 flex items-center justify-end gap-2 text-sm pb-3">
                {isEnrolled ? (
                  <button
                    onClick={() => navigate(`/student/courses/${courseId}/curriculum`)}
                    className="px-4 py-2 bg-brand-primary text-white rounded-full text-sm font-medium hover:bg-brand-primary-dark transition-colors flex items-center gap-2"
                  >
                    📚 View Curriculum
                  </button>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-text-muted dark:text-dark-text-muted rounded-full text-xs">
                    Enroll to access curriculum
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-background-card rounded-3xl shadow-card p-8">
              <CourseDetailContent
                description={course.description}
                whatYouLearn={course.whatYouLearn}
                tools={course.tools}
                isEnrolled={isEnrolled}
              />
            </div>
          </div>

          {/* Right: Enrollment Card */}
          <div className="w-80 flex-shrink-0">
            <CourseEnrollmentCard
              courseId={course.id}
              price={course.price}
              originalPrice={course.originalPrice}
              includes={course.includes}
              isEnrolled={isEnrolled}
              checking={checking}
              enrolling={enrolling}
              onEnroll={handleEnroll}
              onUnenroll={handleUnenroll}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default CourseDetailRefactored;
