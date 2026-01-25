import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface CourseDisplay {
  id: string;
  title: string;
  category: string;
  level: string;
  rating: number;
  reviewCount: number;
  studentsCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  description: string;
  whatYouLearn?: string[];
  tools?: string[];
  includes?: string[];
}

export const useCourse = (courseId: string | undefined) => {
  const [course, setCourse] = useState<CourseDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("courses")
          .select("*")
          .eq("id", courseId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          const mappedCourse: CourseDisplay = {
            id: data.id,
            title: data.title,
            category: "General", // TODO: Join with categories
            level: data.level,
            rating: 0, // TODO: Calculate from reviews
            reviewCount: 0,
            studentsCount: 0, // TODO: Count from enrollments
            duration: `${data.duration_hours}h`,
            price: data.price,
            description:
              data.long_description ||
              data.short_description ||
              "No description available",
            whatYouLearn: [],
            tools: [],
            includes: [],
          };

          setCourse(mappedCourse);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return { course, loading, error };
};
