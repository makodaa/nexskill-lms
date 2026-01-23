import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentAppLayout from "../../layouts/StudentAppLayout";
import CourseFilterBar from "../../components/courses/CourseFilterBar";
import CourseCategorySidebar from "../../components/courses/CourseCategorySidebar";
import CourseGridItem from "../../components/courses/CourseGridItem";
import { useCourses } from '../../hooks/useCourses';

// Categories for the filter sidebar
const categories = [
  "All",
  "Design",
  "Development",
  "Marketing",
  "Data & Analytics",
  "Business",
];

// Helper to format duration from hours (number) to string
const formatDuration = (hours: number) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const CourseCatalog: React.FC = () => {
  const navigate = useNavigate();
  const { courses: dbCourses, loading, error } = useCourses();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortOption, setSortOption] = useState("Most popular");

  // Map DB courses to UI format
  const allCourses = useMemo(() => {
    return dbCourses.map(course => ({
      id: course.id,
      title: course.title,
      category: (course as any).category?.name || 'Uncategorized', // Handle joined data
      level: course.level || 'Beginner',
      rating: 0, // Not in DB yet
      studentsCount: 0, // Not in DB yet
      duration: formatDuration(course.duration_hours || 0),
      price: course.price || 0,
      originalPrice: undefined,
      isBestseller: false,
      isNew: new Date(course.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000, // New if < 7 days
      thumbnail: 'gradient-blue-purple', // Placeholder or add logic to vary
      shortDescription: course.short_description || '',
    }));
  }, [dbCourses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.shortDescription.toLowerCase().includes(query),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    // Filter by level
    if (selectedLevel !== "All") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Sort courses
    switch (sortOption) {
      case "Most popular":
        filtered.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case "Highest rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "Price: low to high":
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortOption, allCourses]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <StudentAppLayout>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#EDF0FB] dark:border-gray-700">
        <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
          Course Catalog
        </h1>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          Discover courses tailored to your learning goals
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <CourseCategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <CourseFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "course" : "courses"} found
              </p>
              {loading && <p className="text-sm text-brand-primary">Loading courses...</p>}
            </div>

            {/* Course Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-text-secondary">Loading courses...</p>
                </div>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseGridItem
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-background-card rounded-3xl shadow-card dark:bg-dark-background-card p-12 text-center transition-colors">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  No courses found
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default CourseCatalog;
