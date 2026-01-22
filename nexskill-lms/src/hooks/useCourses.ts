import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Course } from "../types/db";

interface CourseListItem {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  studentsCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  isBestseller: boolean;
  isNew: boolean;
  thumbnail: string;
  shortDescription: string;
}

interface CourseFilters {
  searchQuery: string;
  category: string;
  level: string;
  sortBy: string;
}

export const useCourses = (filters: CourseFilters) => {
  const [allCourses, setAllCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("courses")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          const mappedCourses = data.map((course: Course) => ({
            id: course.id,
            title: course.title,
            category: "General", // TODO: Join with categories table
            level: course.level,
            rating: 0, // TODO: Calculate from reviews
            studentsCount: 0, // TODO: Count from enrollments
            duration: `${course.duration_hours}h`,
            price: course.price,
            originalPrice: undefined,
            isBestseller: false,
            isNew: false,
            thumbnail: "gradient-blue-purple",
            shortDescription:
              course.short_description || "No description available",
          }));
          setAllCourses(mappedCourses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.shortDescription.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (filters.category !== "All") {
      filtered = filtered.filter(
        (course) => course.category === filters.category,
      );
    }

    // Level filter
    if (filters.level !== "All") {
      filtered = filtered.filter((course) => course.level === filters.level);
    }

    // Sorting
    switch (filters.sortBy) {
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
  }, [allCourses, filters]);

  return {
    courses: filteredCourses,
    loading,
    error,
    totalCount: allCourses.length,
    filteredCount: filteredCourses.length,
  };
};
