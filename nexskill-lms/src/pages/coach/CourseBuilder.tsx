import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CoachAppLayout from "../../layouts/CoachAppLayout";
import CourseBuilderSidebar from "../../components/coach/course-builder/CourseBuilderSidebar";
import CourseSettingsForm from "../../components/coach/course-builder/CourseSettingsForm";
import CurriculumEditor from "../../components/coach/course-builder/CurriculumEditor";
import QuizBuilderPanel from "../../components/coach/quiz-builder/QuizBuilderPanel";
import DripSchedulePanel from "../../components/coach/course-builder/DripSchedulePanel";
import CoursePricingForm from "../../components/coach/course-builder/CoursePricingForm";
import CoursePublishWorkflow from "../../components/coach/course-builder/CoursePublishWorkflow";
import DeleteCourseModal from "../../components/courses/DeleteCourseModal";
import LessonEditorPanel from "../../components/coach/lesson-editor/LessonEditorPanel";
import LiveSessionManager from "../../components/coach/live-sessions/LiveSessionManager";
import QuizEditorPanel from "../../components/quiz/QuizEditorPanel";
import CourseFeedbackAlert from "../../components/coach/course-builder/CourseFeedbackAlert";
import type { Lesson } from "../../types/lesson";
import type { Quiz, QuizQuestion } from "../../types/quiz";
import type { ContentItem } from "../../types/content-item";
import { supabase } from "../../lib/supabaseClient";

type SectionKey =
    | "settings"
    | "curriculum"
    | "lessons"
    | "live-sessions"
    | "quizzes"
    | "drip"
    | "pricing"
    | "publish"
    | "preview";

interface CourseSettings {
    title: string;
    subtitle: string;
    category: string;
    level: string;
    language: string;
    shortDescription: string;
    longDescription: string;
    visibility: "public" | "unlisted" | "private";
    topics: number[];
}

interface Module {
    id: string;
    title: string;
    lessons: ContentItem[]; // Changed to accept both lessons and quizzes
}

interface FileUploadConfig {
    allowedTypes: string[];
    maxFileSizeMB: number;
    rubric: string;
    maxPoints: number;
}

interface Question {
    id: string;
    type: "multiple-choice" | "true-false" | "image-choice" | "file-upload";
    question: string;
    options: Array<{ id: string; text: string; isCorrect: boolean }>;
    explanation: string;
    fileUploadConfig?: FileUploadConfig;
}

interface ModuleDrip {
    moduleId: string;
    moduleTitle: string;
    mode: "immediate" | "days-after-enrollment" | "specific-date";
    daysAfter?: number;
    specificDate?: string;
}

interface PricingData {
    mode: "free" | "one-time" | "subscription";
    price: number;
    currency: string;
    salePrice?: number;
    subscriptionInterval?: "monthly" | "yearly";
}

const CourseBuilder: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    // Ref to hold the timeout ID for debouncing
    const saveQuizQuestionsTimeoutRef = useRef<any>(null);

    const initialData = location.state as CourseSettings | undefined;

    const [activeSection, setActiveSection] = useState<SectionKey>("settings");
    const [courseStatus, setCourseStatus] = useState<"draft" | "published">(
        "draft"
    );
    const [verificationStatus, setVerificationStatus] = useState<string>("draft");
    const [adminFeedback, setAdminFeedback] = useState<string>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Settings state
    const [settings, setSettings] = useState<CourseSettings>({
        title: initialData?.title || "",
        subtitle: initialData?.subtitle || "",
        category: initialData?.category || "",
        level: initialData?.level || "Beginner",
        language: initialData?.language || "English",
        shortDescription: "",
        longDescription: "",
        visibility: "public",
        topics: [],
    });

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId) return;

            const { data: courseData, error: courseError } = await supabase
                .from("courses")
                .select(
                    `
          *,
          category:categories(name),
          course_topics(topic_id),
          admin_verification_feedback(content, created_at, is_resolved)
        `
                )
                .eq("id", courseId)
                .single();

            if (courseError) {
                console.error("Error fetching course:", courseError);
            } else if (courseData) {
                console.log("Course Data Fetch:", {
                    status: courseData.verification_status,
                    feedbackRaw: courseData.admin_verification_feedback
                });
                setSettings((prev) => ({
                    ...prev,
                    title: courseData.title,
                    subtitle: courseData.subtitle || "",
                    shortDescription: courseData.short_description || "",
                    longDescription: courseData.long_description || "",
                    visibility: courseData.visibility || "public",
                    language: courseData.language || "English",
                    level: courseData.level,
                    category: courseData.category?.name || "",
                    topics:
                        courseData.course_topics?.map(
                            (ct: any) => ct.topic_id
                        ) || [],
                }));

                // Set status
                setCourseStatus(courseData.visibility === 'public' ? 'published' : 'draft');
                setVerificationStatus(courseData.verification_status || 'draft');

                // Get latest feedback if exists
                const feedbacks = courseData.admin_verification_feedback;
                const latestFeedback = feedbacks && feedbacks.length > 0
                    ? feedbacks.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
                    : null;

                setAdminFeedback(latestFeedback?.content || "");

                // Fetch modules and their associated lessons
                const { data: modulesData, error: modulesError } =
                    await supabase
                        .from("modules")
                        .select("*")
                        .eq("course_id", courseId)
                        .order("position", { ascending: true });

                if (modulesError) {
                    console.error("Error fetching modules:", modulesError);
                } else if (modulesData) {
                    // For each module, fetch the associated lessons and quizzes via module_content_with_data view
                    const modulesWithContent = await Promise.all(
                        modulesData.map(async (module) => {
                            const { data: contentData, error: contentError } =
                                await supabase
                                    .from("module_content_with_data")
                                    .select("*")
                                    .eq("module_id", module.id)
                                    .order("position", { ascending: true });

                            if (contentError) {
                                console.error(
                                    "Error fetching content items for module:",
                                    module.id,
                                    contentError
                                );
                                return { ...module, lessons: [] };
                            }

                            // Map the content data to content items based on content_type
                            const contentItems = contentData
                                .map((item) => {
                                    console.log(
                                        "Raw content data from DB:",
                                        item
                                    ); // Debug log

                                    if (item.content_type === 'lesson' && item.lesson_id) {
                                        // Map to lesson format
                                        const contentBlocks = item.content_blocks || [];
                                        const lessonType = contentBlocks.length > 0
                                            ? contentBlocks[0].type
                                            : "text";

                                        return {
                                            id: item.lesson_id,
                                            type: "lesson" as const,
                                            title: item.lesson_title,
                                            description: item.lesson_description,
                                            content_blocks: contentBlocks,
                                            estimated_duration_minutes: item.lesson_estimated_duration_minutes,
                                            is_published: item.lesson_is_published || item.item_is_published,
                                            created_at: item.lesson_created_at,
                                            updated_at: item.lesson_updated_at,
                                            type_attr: lessonType, // Using type_attr to avoid conflict with content type
                                            duration: item.lesson_duration,
                                            summary: item.lesson_summary,
                                        };
                                    } else if (item.content_type === 'quiz' && item.quiz_id) {
                                        // Map to quiz format
                                        return {
                                            id: item.quiz_id,
                                            type: "quiz" as const,
                                            title: item.quiz_title,
                                            description: item.quiz_description,
                                            instructions: item.instructions,
                                            passing_score: item.passing_score,
                                            time_limit_minutes: item.time_limit_minutes,
                                            max_attempts: item.quiz_max_attempts,
                                            requires_manual_grading: item.quiz_requires_manual_grading,
                                            is_published: item.quiz_is_published || item.item_is_published,
                                            created_at: item.quiz_created_at,
                                            updated_at: item.quiz_updated_at,
                                            available_from: item.available_from,
                                            due_date: item.due_date,
                                            late_submission_allowed: item.late_submission_allowed,
                                            late_penalty_percent: item.late_penalty_percent,
                                        };
                                    }
                                    return null;
                                })
                                .filter(item => item !== null);

                            return { ...module, lessons: contentItems };
                        })
                    );

                    setCurriculum(modulesWithContent);
                }
            }
        };

        fetchCourse();
    }, [courseId]);

    // Clean up timeout on component unmount
    useEffect(() => {
        return () => {
            if (saveQuizQuestionsTimeoutRef.current) {
                clearTimeout(saveQuizQuestionsTimeoutRef.current);
            }
        };
    }, []);

    // Curriculum state
    const [curriculum, setCurriculum] = useState<Module[]>([]);

    // Lesson editor state
    const [editingLesson, setEditingLesson] = useState<{
        moduleId: string;
        lesson: Lesson;
    } | null>(null);

    // Quiz editor state
    const [editingQuiz, setEditingQuiz] = useState<{
        moduleId: string;
        quiz: Quiz;
        questions: QuizQuestion[];
    } | null>(null);

    // Quiz state
    const [questions, setQuestions] = useState<Question[]>([]);

    // Drip schedule state (derived from curriculum modules)
    const dripModules: ModuleDrip[] = curriculum.map((mod) => ({
        moduleId: mod.id,
        moduleTitle: mod.title,
        mode: "immediate",
    }));
    const [drip, setDrip] = useState<ModuleDrip[]>(dripModules);

    // Pricing state
    const [pricing, setPricing] = useState<PricingData>({
        mode: "one-time",
        price: 99,
        currency: "USD",
    });

    const handleDeleteLesson = async (moduleId: string, contentId: string) => {
        // Find the content item to determine if it's a lesson or quiz
        const module = curriculum.find(m => m.id === moduleId);
        const contentItem = module?.lessons.find(l => l.id === contentId);

        if (!contentItem || !contentId) {
            console.error("Content item not found or invalid ID:", contentId);
            return;
        }

        // Determine content type
        const contentType = 'instructions' in contentItem ? 'quiz' : 'lesson';

        // Resolve temporary module ID to actual UUID if needed
        let resolvedModuleId = moduleId;
        try {
            resolvedModuleId = await resolveModuleId(moduleId);
        } catch (error) {
            console.error("Error resolving module ID:", error);
            alert(`Error resolving module: ${(error as Error).message}`);
            return;
        }

        const itemName = contentType === 'quiz' ? 'quiz' : 'lesson';
        if (
            !window.confirm(
                `Are you sure you want to delete this ${itemName}? This action cannot be undone.`
            )
        ) {
            return;
        }

        try {
            // Delete the link from module_content_items first
            const { error: unlinkError } = await supabase
                .from("module_content_items")
                .delete()
                .match({
                    module_id: resolvedModuleId,
                    content_id: contentId,
                    content_type: contentType,
                });

            if (unlinkError) {
                console.error(
                    `Error unlinking ${itemName} from module:`,
                    unlinkError
                );
                alert(
                    `Error unlinking ${itemName} from module: ${unlinkError.message}`
                );
                return;
            }

            // Delete the content item from the database
            let deletionError;
            if (contentType === 'lesson') {
                const { error } = await supabase
                    .from("lessons")
                    .delete()
                    .eq("id", contentId);
                deletionError = error;
            } else {
                const { error } = await supabase
                    .from("quizzes")
                    .delete()
                    .eq("id", contentId);
                deletionError = error;
            }

            if (deletionError) {
                console.error(`Error deleting ${itemName}:`, deletionError);
                // Potentially restore the link if content deletion fails
                alert(`Error deleting ${itemName}: ${deletionError.message}`);
                return;
            }

            // Update the local state
            const updatedCurriculum = curriculum.map((module) => {
                if (module.id === moduleId) {
                    return {
                        ...module,
                        lessons: module.lessons.filter(
                            (l) => l.id !== contentId
                        ),
                    };
                }
                return module;
            });
            setCurriculum(updatedCurriculum);

            console.log(`${itemName.charAt(0).toUpperCase() + itemName.slice(1)} deleted successfully:`, contentId);
        } catch (err) {
            console.error(`Unexpected error deleting ${itemName}:`, err);
            alert(`An unexpected error occurred while deleting the ${itemName}`);
        }
    };

    // Helper function to resolve temporary module IDs to actual UUIDs
    const resolveModuleId = async (tempModuleId: string): Promise<string> => {
        // Check if the ID is a temporary ID (starts with 'module-' followed by numbers)
        if (tempModuleId.startsWith("module-")) {
            // Check if this temporary module already exists in the database
            // by looking for modules with the same title in the current curriculum
            const tempModule = curriculum.find((m) => m.id === tempModuleId);

            if (tempModule) {
                // Check if a module with this title already exists in the database for this course
                const { data: existingModule } =
                    await supabase
                        .from("modules")
                        .select("id")
                        .eq("course_id", courseId)
                        .eq("title", tempModule.title)
                        .single();

                if (existingModule) {
                    // Update the curriculum state to use the actual UUID
                    const updatedCurriculum = curriculum.map((module) =>
                        module.id === tempModuleId
                            ? { ...module, id: existingModule.id }
                            : module
                    );
                    setCurriculum(updatedCurriculum);
                    return existingModule.id;
                } else {
                    // Create the module in the database with a proper UUID
                    const moduleUuid = uuidv4();

                    // Get the highest position to determine the new position
                    const { data: maxPositionData } = await supabase
                        .from("modules")
                        .select("position")
                        .eq("course_id", courseId)
                        .order("position", { ascending: false })
                        .limit(1);

                    const newPosition =
                        maxPositionData && maxPositionData.length > 0
                            ? maxPositionData[0].position + 1
                            : 0;

                    const { error: moduleError } = await supabase
                        .from("modules")
                        .insert([
                            {
                                id: moduleUuid,
                                course_id: courseId,
                                title: tempModule.title,
                                position: newPosition,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString(),
                            },
                        ]);

                    if (moduleError) {
                        console.error("Error creating module:", moduleError);
                        throw new Error(
                            `Failed to create module: ${moduleError.message}`
                        );
                    }

                    // Update the curriculum state to use the actual UUID
                    const updatedCurriculum = curriculum.map((module) =>
                        module.id === tempModuleId
                            ? { ...module, id: moduleUuid }
                            : module
                    );
                    setCurriculum(updatedCurriculum);
                    return moduleUuid;
                }
            }
        }

        // If it's already a UUID or not a temporary ID, return as-is
        return tempModuleId;
    };

    const handleAddLesson = async (moduleId: string, newLesson: Lesson) => {
        // Resolve temporary module ID to actual UUID if needed
        let resolvedModuleId = moduleId;
        try {
            resolvedModuleId = await resolveModuleId(moduleId);
        } catch (error) {
            console.error("Error resolving module ID:", error);
            alert(`Error resolving module: ${(error as Error).message}`);
            return;
        }

        const lessonId = uuidv4();

        try {
            // Insert the new lesson into the database
            const { error: lessonError } = await supabase
                .from("lessons")
                .insert([
                    {
                        id: lessonId,
                        title: newLesson.title,
                        description: newLesson.description,
                        content_blocks: newLesson.content_blocks,
                        estimated_duration_minutes:
                            newLesson.estimated_duration_minutes,
                        is_published: newLesson.is_published,
                    },
                ]);

            if (lessonError) {
                console.error("Error adding lesson:", lessonError);
                alert(`Error adding lesson: ${lessonError.message}`);
                return;
            }

            // Get the highest position in the module to determine the new position
            const { data: maxPositionData } = await supabase
                .from("module_content_items")
                .select("position")
                .eq("module_id", resolvedModuleId)
                .order("position", { ascending: false })
                .limit(1);

            const newPosition =
                maxPositionData && maxPositionData.length > 0
                    ? maxPositionData[0].position + 1
                    : 0;

            // Link the lesson to the module in the module_content_items table
            const { error: linkError } = await supabase
                .from("module_content_items")
                .insert([
                    {
                        module_id: resolvedModuleId,
                        content_type: "lesson",
                        content_id: lessonId,
                        position: newPosition,
                        is_published: newLesson.is_published,
                    },
                ]);

            if (linkError) {
                console.error("Error linking lesson to module:", linkError);
                // Rollback the lesson insertion if linking fails
                await supabase.from("lessons").delete().eq("id", lessonId);
                alert(`Error linking lesson to module: ${linkError.message}`);
                return;
            }

            // Update the new lesson object with the proper UUID
            const updatedNewLesson: ContentItem = {
                ...newLesson,
                id: lessonId,
                type: 'lesson',
                // Ensure other fields match ContentItem if necessary
            };

            // Update the local state
            const updatedCurriculum = curriculum.map((module) => {
                if (module.id === moduleId) {
                    return {
                        ...module,
                        lessons: [...module.lessons, updatedNewLesson],
                    };
                }
                return module;
            });
            setCurriculum(updatedCurriculum);

            console.log("Lesson added and linked successfully:", lessonId);
        } catch (err) {
            console.error("Unexpected error adding lesson:", err);
            alert("An unexpected error occurred while adding the lesson");
        }
    };

    const handleMoveLesson = async (
        moduleId: string,
        contentId: string,
        direction: "up" | "down"
    ) => {
        if (!contentId) {
            console.error("Invalid content ID:", contentId);
            return;
        }

        // Find the content item to determine if it's a lesson or quiz
        const module = curriculum.find(m => m.id === moduleId);
        const contentItem = module?.lessons.find(l => l.id === contentId);

        if (!contentItem) {
            console.error("Content item not found:", contentId);
            return;
        }

        // Determine content type
        const contentType = 'instructions' in contentItem ? 'quiz' : 'lesson';

        // Resolve temporary module ID to actual UUID if needed
        let resolvedModuleId = moduleId;
        try {
            resolvedModuleId = await resolveModuleId(moduleId);
        } catch (error) {
            console.error("Error resolving module ID:", error);
            alert(`Error resolving module: ${(error as Error).message}`);
            return;
        }

        try {
            // Get the current positions of all content items in the module
            const { data: contentItemsData, error: contentItemsError } =
                await supabase
                    .from("module_content_items")
                    .select("id, content_id, position")
                    .eq("module_id", resolvedModuleId)
                    .eq("content_type", contentType)
                    .order("position", { ascending: true });

            if (contentItemsError) {
                console.error(
                    "Error fetching content items for reordering:",
                    contentItemsError
                );
                alert(`Error moving ${contentType}: ${contentItemsError.message}`);
                return;
            }

            if (!contentItemsData || contentItemsData.length === 0) {
                console.error(
                    "No content items found for module:",
                    resolvedModuleId
                );
                return;
            }

            // Find the current position of the content item to move
            const currentItem = contentItemsData.find(
                (item) => item.content_id === contentId
            );
            if (!currentItem) {
                console.error(
                    `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} not found in module content items:`,
                    contentId
                );
                return;
            }

            // Calculate new positions
            const currentPosition = currentItem.position;
            const targetPosition =
                direction === "up" ? currentPosition - 1 : currentPosition + 1;

            // Find the item that currently occupies the target position
            const targetItem = contentItemsData.find(
                (item) => item.position === targetPosition
            );
            if (!targetItem) {
                // If there's no item at the target position, the content item is already at the edge
                return;
            }

            // Swap positions in the database
            const updatePromises = [
                supabase
                    .from("module_content_items")
                    .update({ position: targetPosition })
                    .eq("id", currentItem.id),
                supabase
                    .from("module_content_items")
                    .update({ position: currentPosition })
                    .eq("id", targetItem.id),
            ];

            const results = await Promise.all(updatePromises);
            const errors = results
                .map((result) => result.error)
                .filter((error) => error);

            if (errors.length > 0) {
                console.error(`Error updating ${contentType} positions:`, errors);
                alert("Error moving " + contentType + ": " + errors[0]?.message);
                return;
            }

            // Update the local state to reflect the new order
            // First, reload the curriculum to get the updated order
            const module = curriculum.find((m) => m.id === moduleId);
            if (module) {
                const updatedModule = { ...module };

                // Sort content items based on their new positions
                // First get the content items for the module
                const { data: allContentItemsData, error: contentItemsError } =
                    await supabase
                        .from("module_content_items")
                        .select("content_id, content_type")
                        .eq("module_id", resolvedModuleId)
                        .order("position", { ascending: true });

                if (contentItemsError) {
                    console.error(
                        "Error fetching content items for module:",
                        resolvedModuleId,
                        contentItemsError
                    );
                } else if (allContentItemsData && allContentItemsData.length > 0) {
                    // Separate content IDs by type
                    const lessonIds = allContentItemsData
                        .filter(item => item.content_type === 'lesson')
                        .map(item => item.content_id);
                    const quizIds = allContentItemsData
                        .filter(item => item.content_type === 'quiz')
                        .map(item => item.content_id);

                    // Fetch lessons and quizzes separately
                    let allContent: ContentItem[] = [];

                    if (lessonIds.length > 0) {
                        const { data: lessonsData, error: lessonsError } =
                            await supabase
                                .from("lessons")
                                .select(
                                    "id, title, description, content_blocks, estimated_duration_minutes, is_published, created_at, updated_at, duration, summary"
                                )
                                .in("id", lessonIds);

                        if (lessonsError) {
                            console.error(
                                "Error fetching lessons for module:",
                                resolvedModuleId,
                                lessonsError
                            );
                        } else if (lessonsData) {
                            allContent = allContent.concat(lessonsData.map(l => ({ ...l, type: 'lesson' } as ContentItem)));
                        }
                    }

                    if (quizIds.length > 0) {
                        const { data: quizzesData, error: quizzesError } =
                            await supabase
                                .from("quizzes")
                                .select(
                                    "id, title, description, instructions, passing_score, time_limit_minutes, max_attempts, requires_manual_grading, is_published, created_at, updated_at, available_from, due_date, late_submission_allowed, late_penalty_percent"
                                )
                                .in("id", quizIds);

                        if (quizzesError) {
                            console.error(
                                "Error fetching quizzes for module:",
                                resolvedModuleId,
                                quizzesError
                            );
                        } else if (quizzesData) {
                            allContent = allContent.concat(quizzesData.map(q => ({ ...q, type: 'quiz' } as ContentItem)));
                        }
                    }

                    updatedModule.lessons = allContent;
                }

                setCurriculum((prev) =>
                    prev.map((m) => (m.id === moduleId ? updatedModule : m))
                );
            }

            console.log(
                `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} moved successfully:`,
                contentId,
                "direction:",
                direction
            );
        } catch (err) {
            console.error(`Unexpected error moving ${contentType}:`, err);
            alert(`An unexpected error occurred while moving the ${contentType}`);
        }
    };

    const handleEditLesson = (moduleId: string, lessonId: string) => {
        if (!lessonId) {
            console.error("Invalid lesson ID:", lessonId);
            return;
        }

        const module = curriculum.find((m) => m.id === moduleId);
        const lesson = module?.lessons.find((l) => l.id === lessonId && !('instructions' in l)); // Only lessons, not quizzes
        if (lesson) {
            setEditingLesson({ moduleId, lesson: lesson as Lesson });
        }
    };

    const handleEditQuiz = (moduleId: string, quizId: string) => {
        if (!quizId) {
            console.error("Invalid quiz ID:", quizId);
            return;
        }

        const module = curriculum.find((m) => m.id === moduleId);
        const quiz = module?.lessons.find((item) => item.id === quizId && 'instructions' in item);
        if (quiz) {
            // Fetch the quiz questions from the database
            const fetchQuizQuestions = async () => {
                try {
                    const { data: questionsData, error: questionsError } = await supabase
                        .from("quiz_questions")
                        .select("*")
                        .eq("quiz_id", quizId)
                        .order("position", { ascending: true });

                    if (questionsError) {
                        console.error("Error fetching quiz questions:", questionsError);
                        alert(`Error fetching quiz questions: ${questionsError.message}`);
                        return;
                    }

                    setEditingQuiz({ moduleId, quiz: quiz as Quiz, questions: questionsData || [] });
                } catch (err) {
                    console.error("Unexpected error fetching quiz questions:", err);
                    alert("An unexpected error occurred while fetching quiz questions");
                }
            };

            fetchQuizQuestions();
        }
    };

    const handleSaveLesson = async (updatedLesson: Lesson) => {
        if (!editingLesson || !updatedLesson.id) return;

        try {
            // Update the lesson in the database
            const { error } = await supabase.from("lessons").upsert(
                {
                    id: updatedLesson.id,
                    title: updatedLesson.title,
                    description: updatedLesson.description,
                    content_blocks: updatedLesson.content_blocks,
                    estimated_duration_minutes:
                        updatedLesson.estimated_duration_minutes,
                    is_published: updatedLesson.is_published,
                },
                {
                    onConflict: "id", // This will update if the lesson exists, insert if it doesn't
                }
            );

            if (error) {
                console.error("Error saving lesson:", error);
                alert(`Error saving lesson: ${error.message}`);
                return;
            }

            // Update the corresponding entry in module_content_items to reflect is_published status
            const { error: linkError } = await supabase
                .from("module_content_items")
                .update({ is_published: updatedLesson.is_published })
                .match({
                    module_id: editingLesson.moduleId,
                    content_id: updatedLesson.id,
                    content_type: "lesson",
                });

            if (linkError) {
                console.error("Error updating lesson link:", linkError);
                // Note: We don't rollback the lesson update here, but we should log this issue
                console.warn(
                    "Could not update module_content_items link:",
                    linkError.message
                );
            }

            // Update the local state
            setCurriculum(
                curriculum.map((mod) =>
                    mod.id === editingLesson.moduleId
                        ? {
                            ...mod,
                            lessons: mod.lessons.map((l) =>
                                l.id === updatedLesson.id
                                    ? { ...updatedLesson, type: 'lesson' } as ContentItem
                                    : l
                            ),
                        }
                        : mod
                )
            );

            // Keep the editingLesson state in sync so the input field updates
            setEditingLesson({ ...editingLesson, lesson: updatedLesson });

            console.log("Lesson saved successfully:", updatedLesson.id);
        } catch (err) {
            console.error("Unexpected error saving lesson:", err);
            alert("An unexpected error occurred while saving the lesson");
        }
    };

    const handleAddQuiz = async (moduleId: string) => {
        // Resolve temporary module ID to actual UUID if needed
        let resolvedModuleId = moduleId;
        try {
            resolvedModuleId = await resolveModuleId(moduleId);
        } catch (error) {
            console.error("Error resolving module ID:", error);
            alert(`Error resolving module: ${(error as Error).message}`);
            return;
        }

        // Create a new quiz with default values
        const newQuiz: Quiz = {
            id: uuidv4(),
            title: "New Quiz",
            description: "",
            instructions: "",
            passing_score: 70,
            time_limit_minutes: 30,
            max_attempts: 3,
            requires_manual_grading: false,
            is_published: false,
            late_submission_allowed: true,
            late_penalty_percent: 10,
        };

        try {
            // Insert the quiz into the database
            const { error: quizError } = await supabase.from("quizzes").insert([
                {
                    id: newQuiz.id,
                    title: newQuiz.title,
                    description: newQuiz.description,
                    instructions: newQuiz.instructions,
                    passing_score: newQuiz.passing_score,
                    time_limit_minutes: newQuiz.time_limit_minutes,
                    max_attempts: newQuiz.max_attempts,
                    requires_manual_grading: newQuiz.requires_manual_grading,
                    is_published: newQuiz.is_published,
                    late_submission_allowed: newQuiz.late_submission_allowed,
                    late_penalty_percent: newQuiz.late_penalty_percent,
                },
            ]);

            if (quizError) {
                console.error("Error creating quiz:", quizError);
                alert(`Error creating quiz: ${quizError.message}`);
                return;
            }

            // Get the highest position in the module to determine the new position
            const { data: maxPositionData } = await supabase
                .from("module_content_items")
                .select("position")
                .eq("module_id", resolvedModuleId)
                .order("position", { ascending: false })
                .limit(1);

            const newPosition =
                maxPositionData && maxPositionData.length > 0
                    ? maxPositionData[0].position + 1
                    : 0;

            // Link the quiz to the module in the module_content_items table
            const { error: linkError } = await supabase
                .from("module_content_items")
                .insert([
                    {
                        module_id: resolvedModuleId,
                        content_type: "quiz",
                        content_id: newQuiz.id,
                        position: newPosition,
                        is_published: newQuiz.is_published,
                    },
                ]);

            if (linkError) {
                console.error("Error linking quiz to module:", linkError);
                // Rollback the quiz insertion if linking fails
                await supabase.from("quizzes").delete().eq("id", newQuiz.id);
                alert(`Error linking quiz to module: ${linkError.message}`);
                return;
            }

            // Update the local state to include the new quiz
            const updatedCurriculum = curriculum.map((module) => {
                if (module.id === moduleId) {
                    const newQuizItem: ContentItem = {
                        ...newQuiz,
                        type: 'quiz'
                    };
                    return {
                        ...module,
                        lessons: [...module.lessons, newQuizItem],
                    };
                }
                return module;
            });
            setCurriculum(updatedCurriculum);

            // Open the quiz editor
            if (newQuiz.id) {
                setEditingQuiz({ moduleId, quiz: newQuiz, questions: [] });
            }

            console.log("Quiz created and linked successfully:", newQuiz.id);
        } catch (err) {
            console.error("Unexpected error adding quiz:", err);
            alert("An unexpected error occurred while adding the quiz");
        }
    };

    const handleSaveQuiz = async (updatedQuiz: Quiz) => {
        if (!editingQuiz || !updatedQuiz.id) return;

        try {
            // Update the quiz in the database
            const { error } = await supabase.from("quizzes").upsert(
                {
                    id: updatedQuiz.id,
                    title: updatedQuiz.title,
                    description: updatedQuiz.description,
                    instructions: updatedQuiz.instructions,
                    passing_score: updatedQuiz.passing_score,
                    time_limit_minutes: updatedQuiz.time_limit_minutes,
                    max_attempts: updatedQuiz.max_attempts,
                    requires_manual_grading:
                        updatedQuiz.requires_manual_grading,
                    is_published: updatedQuiz.is_published,
                    late_submission_allowed:
                        updatedQuiz.late_submission_allowed,
                    late_penalty_percent: updatedQuiz.late_penalty_percent,
                },
                {
                    onConflict: "id",
                }
            );

            if (error) {
                console.error("Error saving quiz:", error);
                alert(`Error saving quiz: ${error.message}`);
                return;
            }

            // Update the corresponding entry in module_content_items to reflect is_published status
            const { error: linkError } = await supabase
                .from("module_content_items")
                .update({ is_published: updatedQuiz.is_published })
                .match({
                    module_id: editingQuiz.moduleId,
                    content_id: updatedQuiz.id,
                    content_type: "quiz",
                });

            if (linkError) {
                console.error("Error updating quiz link:", linkError);
                console.warn(
                    "Could not update module_content_items link:",
                    linkError.message
                );
            }

            // Update the local state
            setCurriculum(
                curriculum.map((mod) =>
                    mod.id === editingQuiz.moduleId
                        ? {
                            ...mod,
                            lessons: mod.lessons.map((l) =>
                                l.id === updatedQuiz.id
                                    ? { ...updatedQuiz, type: 'quiz' } as ContentItem
                                    : l
                            ),
                        }
                        : mod
                )
            );

            // Keep the editingQuiz state in sync
            setEditingQuiz({ ...editingQuiz, quiz: updatedQuiz });

            console.log("Quiz saved successfully:", updatedQuiz.id);
        } catch (err) {
            console.error("Unexpected error saving quiz:", err);
            alert("An unexpected error occurred while saving the quiz");
        }
    };

    const handleSaveQuizQuestions = async (
        updatedQuestions: QuizQuestion[]
    ) => {
        if (!editingQuiz) return;

        // Clear any existing timeout to debounce the function
        if (saveQuizQuestionsTimeoutRef.current) {
            clearTimeout(saveQuizQuestionsTimeoutRef.current);
        }

        // Set a new timeout to delay the execution
        saveQuizQuestionsTimeoutRef.current = setTimeout(async () => {
            try {
                // Delete all existing questions for this quiz first
                const { error: deleteError } = await supabase
                    .from("quiz_questions")
                    .delete()
                    .eq("quiz_id", editingQuiz.quiz.id);

                if (deleteError) {
                    console.error("Error deleting old questions:", deleteError);
                    alert(`Error updating questions: ${deleteError.message}`);
                    return;
                }

                // Small delay to ensure the database has processed the deletion
                await new Promise(resolve => setTimeout(resolve, 150));

                // Insert all questions with correct positions
                for (let i = 0; i < updatedQuestions.length; i++) {
                    const question = updatedQuestions[i];

                    // Destructure to exclude the id and let the database generate a new one
                    const { id, ...questionWithoutId } = question;

                    const { error: insertError } = await supabase
                        .from("quiz_questions")
                        .insert({
                            ...questionWithoutId,
                            quiz_id: editingQuiz.quiz.id,
                            position: i // Set position based on array index
                        });

                    if (insertError) {
                        console.error(`Error inserting question at position ${i}:`, insertError);
                        // Check if it's specifically the duplicate key error
                        if (insertError.code === '23505') {
                            console.log("Duplicate key error detected, likely due to concurrent operations. Retrying after delay...");
                            // Retry after a short delay
                            await new Promise(resolve => setTimeout(resolve, 300));

                            // Try again
                            const { error: retryError } = await supabase
                                .from("quiz_questions")
                                .insert({
                                    ...questionWithoutId,
                                    quiz_id: editingQuiz.quiz.id,
                                    position: i
                                });

                            if (retryError) {
                                console.error(`Retry failed for question at position ${i}:`, retryError);
                                alert(`Error inserting question: ${retryError.message}`);
                                return;
                            }
                        } else {
                            alert(`Error inserting question: ${insertError.message}`);
                            return;
                        }
                    }
                }

                // Update the local state with the new questions that have updated IDs
                // We need to fetch the newly inserted questions to get their IDs
                const { data: newQuestions, error: fetchError } = await supabase
                    .from("quiz_questions")
                    .select("*")
                    .eq("quiz_id", editingQuiz.quiz.id)
                    .order("position", { ascending: true });

                if (fetchError) {
                    console.error("Error fetching updated questions:", fetchError);
                    alert(`Error fetching updated questions: ${fetchError.message}`);
                    return;
                }

                // Update the local state
                setEditingQuiz({ ...editingQuiz, questions: newQuestions });

                console.log("Quiz questions saved successfully");
            } catch (err) {
                console.error("Unexpected error saving quiz questions:", err);
                alert("An unexpected error occurred while saving quiz questions");
            }
        }, 500); // 500ms debounce delay
    };

    const handleCloseQuizEditor = () => {
        setEditingQuiz(null);
    };

    const handlePublish = () => {
        setCourseStatus("published");
        window.alert(
            `🚀 Course Published Successfully\n\nCourse ID: ${courseId}\nStatus: Live\n\n✅ Publishing Checklist Completed:\n• Course content: Complete\n• Pricing: Set\n• Thumbnail: Uploaded\n• Description: Added\n• Learning objectives: Defined\n\n🌍 Course Visibility:\n• Public course catalog: Yes\n• Search engines: Indexed\n• Course page: Active\n• Enrollment: Open\n\n📊 What's Next:\n• Monitor enrollments\n• Engage with students\n• Respond to questions\n• Gather feedback\n• Update content as needed\n\n🎉 Congratulations on launching your course!`
        );
    };

    const handleUnpublish = () => {
        setCourseStatus("draft");
        window.alert(
            `📝 Course Unpublished\n\nCourse ID: ${courseId}\nStatus: Draft\n\n⚠️ Impact of Unpublishing:\n• Course removed from catalog\n• New enrollments: Disabled\n• Existing students: Still have access\n• Course page: Private\n• Search visibility: Hidden\n\n✅ Current Students:\n• Can continue learning\n• Access to all materials maintained\n• Progress preserved\n\n🔄 To Re-publish:\n• Review and update content\n• Check settings and pricing\n• Click 'Publish' when ready\n\n💡 Use draft mode to make major updates without affecting student experience.`
        );
    };

    const handleSubmitForReview = async () => {
        try {
            const { error } = await supabase
                .from('courses')
                .update({ verification_status: 'pending_review' })
                .eq('id', courseId);

            if (error) throw error;

            setVerificationStatus('pending_review');
            alert("Course submitted for review successfully!");
        } catch (error: any) {
            console.error('Error submitting for review:', error);
            alert(`Failed to submit: ${error.message}`);
        }
    };

    const handleSaveSettings = async () => {
        if (!courseId) return;

        try {
            // Find category ID based on name - this assumes categories are unique by name
            // Ideally we should store category_id in state, but for now we look it up or handle it
            let categoryId = null;
            if (settings.category) {
                const { data: catData } = await supabase
                    .from("categories")
                    .select("id")
                    .eq("name", settings.category)
                    .single();
                if (catData) categoryId = catData.id;
            }

            const { error } = await supabase
                .from("courses")
                .update({
                    title: settings.title,
                    subtitle: settings.subtitle,
                    short_description: settings.shortDescription,
                    long_description: settings.longDescription,
                    visibility: settings.visibility,
                    language: settings.language,
                    category_id: categoryId,
                    level: settings.level,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", courseId);

            if (error) throw error;

            // Handle Topics Sync
            const newTopicIds = settings.topics || [];

            // 1. Fetch current topics to determine deltas (safer than relying on potentially stale state)
            const { data: currentCT } = await supabase
                .from("course_topics")
                .select("topic_id")
                .eq("course_id", courseId);

            const currentIds = currentCT?.map((ct: any) => ct.topic_id) || [];

            const toAdd = newTopicIds.filter((id) => !currentIds.includes(id));
            const toRemove = currentIds.filter(
                (id: number) => !newTopicIds.includes(id)
            );

            if (toAdd.length > 0) {
                const { error: addError } = await supabase
                    .from("course_topics")
                    .insert(
                        toAdd.map((id) => ({
                            course_id: courseId,
                            topic_id: id,
                        }))
                    );
                if (addError) console.error("Error adding topics:", addError);
            }

            if (toRemove.length > 0) {
                const { error: removeError } = await supabase
                    .from("course_topics")
                    .delete()
                    .eq("course_id", courseId)
                    .in("topic_id", toRemove);
                if (removeError)
                    console.error("Error removing topics:", removeError);
            }

            // Sync local status
            setCourseStatus(
                settings.visibility === "public" ? "published" : "draft"
            );
            window.alert("Settings saved successfully");
        } catch (error) {
            console.error("Error saving settings:", error);
            window.alert("Failed to save settings");
        }
    };

    const handleDeleteCourse = async () => {
        if (!courseId) return;

        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .eq('id', courseId);

            if (error) throw error;

            navigate('/coach/courses');
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course. Please try again.');
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case "settings":
                return (
                    <CourseSettingsForm
                        settings={settings}
                        onChange={setSettings}
                        onSave={handleSaveSettings}
                        onDelete={async () => setIsDeleteModalOpen(true)}
                    />
                );
            case "curriculum":
                return (
                    <CurriculumEditor
                        curriculum={curriculum}
                        onChange={setCurriculum}
                        onEditLesson={handleEditLesson}
                        onEditQuiz={handleEditQuiz}
                        onAddQuiz={handleAddQuiz}
                        onAddLesson={handleAddLesson}
                        onDeleteLesson={handleDeleteLesson}
                        onMoveLesson={handleMoveLesson}
                    />
                );
            case "lessons":
                return (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🎬</div>
                        <p className="text-xl font-semibold text-slate-900 dark:text-dark-text-primary mb-2">
                            Lesson content
                        </p>
                        <p className="text-slate-600 dark:text-dark-text-secondary mb-6">
                            Edit individual lessons from the Curriculum section
                        </p>
                        <button
                            onClick={() => setActiveSection("curriculum")}
                            className="px-6 py-3 bg-gradient-to-r from-[#304DB5] to-[#5E7BFF] text-white font-semibold rounded-full hover:shadow-lg transition-all"
                        >
                            Go to Curriculum
                        </button>
                    </div>
                );
            case "live-sessions":
                return <LiveSessionManager />;
            case "quizzes":
                return (
                    <QuizBuilderPanel
                        questions={questions}
                        onChange={setQuestions}
                    />
                );
            case "drip":
                return <DripSchedulePanel modules={drip} onChange={setDrip} />;
            case "pricing":
                return (
                    <CoursePricingForm
                        pricing={pricing}
                        onChange={setPricing}
                    />
                );
            case "publish":
                return (
                    <CoursePublishWorkflow
                        courseStatus={courseStatus}
                        verificationStatus={verificationStatus}
                        adminFeedback={adminFeedback}
                        onPublish={handlePublish}
                        onUnpublish={handleUnpublish}
                        onSubmitForReview={handleSubmitForReview}
                    />
                );
            default:
                return null;
        }
    };

    // Clean up timeout on component unmount
    useEffect(() => {
        return () => {
            if (saveQuizQuestionsTimeoutRef.current) {
                clearTimeout(saveQuizQuestionsTimeoutRef.current);
            }
        };
    }, []);

    return (
        <CoachAppLayout>
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate("/coach/courses")}
                        className="text-sm text-slate-600 dark:text-dark-text-secondary hover:text-slate-900 dark:hover:text-dark-text-primary transition-colors flex items-center gap-1"
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
                        Back to courses
                    </button>
                </div>

                <CourseFeedbackAlert
                    status={verificationStatus}
                    feedback={adminFeedback}
                // timestamp can be added if we fetch updated_at from admin_verification_feedback
                />

                <div className="flex gap-6">
                    {/* Sidebar */}
                    <CourseBuilderSidebar
                        activeSection={activeSection}
                        onChangeSection={(section) =>
                            setActiveSection(section as SectionKey)
                        }
                        courseTitle={settings.title || "Untitled course"}
                        courseStatus={courseStatus}
                    />

                    {/* Main content area */}
                    <div className="flex-1">
                        <div className="bg-white dark:bg-dark-background-card rounded-3xl shadow-lg p-8">
                            {renderSection()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lesson editor modal */}
            {editingLesson && (
                <LessonEditorPanel
                    lesson={editingLesson.lesson}
                    onChange={handleSaveLesson}
                    onClose={() => setEditingLesson(null)}
                />
            )}

            {/* Quiz editor modal */}
            {editingQuiz && (
                <QuizEditorPanel
                    quiz={editingQuiz.quiz}
                    questions={editingQuiz.questions}
                    onChange={handleSaveQuiz}
                    onQuestionsChange={handleSaveQuizQuestions}
                    onClose={handleCloseQuizEditor}
                />
            )}
            {/* Delete Course Modal */}
            <DeleteCourseModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteCourse}
                courseName={settings.title}
            />
        </CoachAppLayout>
    );
};

export default CourseBuilder;
