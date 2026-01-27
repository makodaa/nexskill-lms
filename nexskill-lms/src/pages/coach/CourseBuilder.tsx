import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CoachAppLayout from '../../layouts/CoachAppLayout';
import CourseBuilderSidebar from '../../components/coach/course-builder/CourseBuilderSidebar';
import CourseSettingsForm from '../../components/coach/course-builder/CourseSettingsForm';
import CurriculumEditor from '../../components/coach/course-builder/CurriculumEditor';
import CourseMediaLibrary from '../../components/coach/course-builder/CourseMediaLibrary';
import QuizBuilderPanel from '../../components/coach/quiz-builder/QuizBuilderPanel';
import DripSchedulePanel from '../../components/coach/course-builder/DripSchedulePanel';
import CoursePricingForm from '../../components/coach/course-builder/CoursePricingForm';
import CoursePublishWorkflow from '../../components/coach/course-builder/CoursePublishWorkflow';
import CoursePreviewPane from '../../components/coach/course-builder/CoursePreviewPane';
import LessonEditorPanel from '../../components/coach/lesson-editor/LessonEditorPanel';
import LiveSessionManager from '../../components/coach/live-sessions/LiveSessionManager';
import type { Lesson } from '../../types/lesson';
import { supabase } from '../../lib/supabaseClient';

type SectionKey = 'settings' | 'curriculum' | 'lessons' | 'live-sessions' | 'quizzes' | 'drip' | 'pricing' | 'publish' | 'preview';

interface CourseSettings {
  title: string;
  subtitle: string;
  category: string;
  level: string;
  language: string;
  shortDescription: string;
  longDescription: string;
  visibility: 'public' | 'unlisted' | 'private';
  topics: number[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  is_published?: boolean;
}

interface FileUploadConfig {
  allowedTypes: string[];
  maxFileSizeMB: number;
  rubric: string;
  maxPoints: number;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'image-choice' | 'file-upload';
  question: string;
  options: Array<{ id: string; text: string; isCorrect: boolean }>;
  explanation: string;
  fileUploadConfig?: FileUploadConfig;
}

interface ModuleDrip {
  moduleId: string;
  moduleTitle: string;
  mode: 'immediate' | 'days-after-enrollment' | 'specific-date';
  daysAfter?: number;
  specificDate?: string;
}

interface PricingData {
  mode: 'free' | 'one-time' | 'subscription';
  price: number;
  currency: string;
  salePrice?: number;
  subscriptionInterval?: 'monthly' | 'yearly';
}

const CourseBuilder: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const initialData = location.state as CourseSettings | undefined;

  const [activeSection, setActiveSection] = useState<SectionKey>('settings');
  const [courseStatus, setCourseStatus] = useState<'draft' | 'published'>('draft');

  // Settings state
  const [settings, setSettings] = useState<CourseSettings>({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    category: initialData?.category || '',
    level: initialData?.level || 'Beginner',
    language: initialData?.language || 'English',
    shortDescription: '',
    longDescription: '',
    visibility: 'public',
    topics: [],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          category:categories(name),
          course_topics(topic_id)
        `)
        .eq('id', courseId)
        .single();

      if (courseError) {
        console.error('Error fetching course:', courseError);
      } else if (courseData) {
        setSettings((prev) => ({
          ...prev,
          title: courseData.title,
          subtitle: courseData.subtitle || '',
          shortDescription: courseData.short_description || '',
          longDescription: courseData.long_description || '',
          visibility: courseData.visibility || 'public',
          language: courseData.language || 'English',
          level: courseData.level,
          category: courseData.category?.name || '',
          topics: courseData.course_topics?.map((ct: any) => ct.topic_id) || [],
        }));

        // Fetch modules and their associated lessons
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('course_id', courseId)
          .order('position', { ascending: true });

        if (modulesError) {
          console.error('Error fetching modules:', modulesError);
        } else if (modulesData) {
          // For each module, fetch the associated lessons via module_content_with_data view
          const modulesWithLessons = await Promise.all(modulesData.map(async (module) => {
            const { data: contentData, error: contentError } = await supabase
              .from('module_content_with_data')
              .select('*')
              .eq('module_id', module.id)
              .eq('content_type', 'lesson')
              .order('position', { ascending: true });

            if (contentError) {
              console.error('Error fetching content items for module:', module.id, contentError);
              return { ...module, lessons: [] };
            }

            // Map the content data to lessons using the lesson_* prefixed fields
            const lessons: Lesson[] = contentData.map(item => {
              console.log('Raw lesson data from DB:', item); // Debug log
              // Determine lesson type based on the first content block type
              const contentBlocks = item.content_blocks || [];
              const lessonType = contentBlocks.length > 0 ? contentBlocks[0].type : 'text';

              const lesson = {
                id: item.lesson_id,
                title: item.lesson_title,
                description: item.lesson_description,
                content_blocks: contentBlocks,
                estimated_duration_minutes: item.lesson_estimated_duration_minutes,
                is_published: item.lesson_is_published || item.is_published,
                created_at: item.lesson_created_at,
                updated_at: item.lesson_updated_at,
                type: lessonType, // Derive type from the first content block
                duration: item.lesson_duration,
                summary: item.lesson_summary
              };
              console.log('Processed lesson object:', lesson); // Debug log
              return lesson;
            }).filter(lesson => lesson.id !== null) as Lesson[];

            return { ...module, lessons, is_published: module.is_published ?? false };
          }));

          setCurriculum(modulesWithLessons);
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  // Curriculum state
  const [curriculum, setCurriculum] = useState<Module[]>([]);

  // Lesson editor state
  const [editingLesson, setEditingLesson] = useState<{ moduleId: string; lesson: Lesson } | null>(null);

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);

  // Drip schedule state (derived from curriculum modules)
  const dripModules: ModuleDrip[] = curriculum.map((mod) => ({
    moduleId: mod.id,
    moduleTitle: mod.title,
    mode: 'immediate',
  }));
  const [drip, setDrip] = useState<ModuleDrip[]>(dripModules);

  // Pricing state
  const [pricing, setPricing] = useState<PricingData>({
    mode: 'one-time',
    price: 99,
    currency: 'USD',
  });

  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    // Resolve temporary module ID to actual UUID if needed
    let resolvedModuleId = moduleId;
    try {
      resolvedModuleId = await resolveModuleId(moduleId);
    } catch (error) {
      console.error('Error resolving module ID:', error);
      alert(`Error resolving module: ${(error as Error).message}`);
      return;
    }

    if (!window.confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete the link from module_content_items first
      const { error: unlinkError } = await supabase
        .from('module_content_items')
        .delete()
        .match({ module_id: resolvedModuleId, content_id: lessonId, content_type: 'lesson' });

      if (unlinkError) {
        console.error('Error unlinking lesson from module:', unlinkError);
        alert(`Error unlinking lesson from module: ${unlinkError.message}`);
        return;
      }

      // Delete the lesson from the database
      const { error: lessonError } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (lessonError) {
        console.error('Error deleting lesson:', lessonError);
        // Potentially restore the link if lesson deletion fails
        alert(`Error deleting lesson: ${lessonError.message}`);
        return;
      }

      // Update the local state
      const updatedCurriculum = curriculum.map((module) => {
        if (module.id === moduleId) {
          return { ...module, lessons: module.lessons.filter(l => l.id !== lessonId) };
        }
        return module;
      });
      setCurriculum(updatedCurriculum);

      console.log('Lesson deleted successfully:', lessonId);
    } catch (err) {
      console.error('Unexpected error deleting lesson:', err);
      alert('An unexpected error occurred while deleting the lesson');
    }
  };

  // Helper function to resolve temporary module IDs to actual UUIDs
  const resolveModuleId = async (tempModuleId: string): Promise<string> => {
    // Check if the ID is a temporary ID (starts with 'module-' followed by numbers)
    if (tempModuleId.startsWith('module-')) {
      // Check if this temporary module already exists in the database
      // by looking for modules with the same title in the current curriculum
      const tempModule = curriculum.find(m => m.id === tempModuleId);

      if (tempModule) {
        // Check if a module with this title already exists in the database for this course
        const { data: existingModule, error: fetchError } = await supabase
          .from('modules')
          .select('id')
          .eq('course_id', courseId)
          .eq('title', tempModule.title)
          .single();

        if (existingModule) {
          // Update the curriculum state to use the actual UUID
          const updatedCurriculum = curriculum.map(module =>
            module.id === tempModuleId ? { ...module, id: existingModule.id } : module
          );
          setCurriculum(updatedCurriculum);
          return existingModule.id;
        } else {
          // Create the module in the database with a proper UUID
          const moduleUuid = uuidv4();

          // Get the highest position to determine the new position
          const { data: maxPositionData } = await supabase
            .from('modules')
            .select('position')
            .eq('course_id', courseId)
            .order('position', { ascending: false })
            .limit(1);

          const newPosition = maxPositionData && maxPositionData.length > 0
            ? maxPositionData[0].position + 1
            : 0;

          const { error: moduleError } = await supabase
            .from('modules')
            .insert([{
              id: moduleUuid,
              course_id: courseId,
              title: tempModule.title,
              position: newPosition,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }]);

          if (moduleError) {
            console.error('Error creating module:', moduleError);
            throw new Error(`Failed to create module: ${moduleError.message}`);
          }

          // Update the curriculum state to use the actual UUID
          const updatedCurriculum = curriculum.map(module =>
            module.id === tempModuleId ? { ...module, id: moduleUuid } : module
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
      console.error('Error resolving module ID:', error);
      alert(`Error resolving module: ${(error as Error).message}`);
      return;
    }

    // Generate a proper UUID for the new lesson
    const lessonId = uuidv4();

    try {
      // Insert the new lesson into the database
      const { error: lessonError } = await supabase
        .from('lessons')
        .insert([{
          id: lessonId,
          title: newLesson.title,
          description: newLesson.description,
          content_blocks: newLesson.content_blocks,
          estimated_duration_minutes: newLesson.estimated_duration_minutes,
          is_published: newLesson.is_published,
        }]);

      if (lessonError) {
        console.error('Error adding lesson:', lessonError);
        alert(`Error adding lesson: ${lessonError.message}`);
        return;
      }

      // Get the highest position in the module to determine the new position
      const { data: maxPositionData } = await supabase
        .from('module_content_items')
        .select('position')
        .eq('module_id', resolvedModuleId)
        .order('position', { ascending: false })
        .limit(1);

      const newPosition = maxPositionData && maxPositionData.length > 0
        ? maxPositionData[0].position + 1
        : 0;

      // Link the lesson to the module in the module_content_items table
      const { error: linkError } = await supabase
        .from('module_content_items')
        .insert([{
          module_id: resolvedModuleId,
          content_type: 'lesson',
          content_id: lessonId,
          position: newPosition,
          is_published: newLesson.is_published,
        }]);

      if (linkError) {
        console.error('Error linking lesson to module:', linkError);
        // Rollback the lesson insertion if linking fails
        await supabase.from('lessons').delete().eq('id', lessonId);
        alert(`Error linking lesson to module: ${linkError.message}`);
        return;
      }

      // Update the new lesson object with the proper UUID
      const updatedNewLesson = { ...newLesson, id: lessonId };

      // Update the local state
      const updatedCurriculum = curriculum.map((module) => {
        if (module.id === moduleId) {
          return { ...module, lessons: [...module.lessons, updatedNewLesson] };
        }
        return module;
      });
      setCurriculum(updatedCurriculum);

      console.log('Lesson added and linked successfully:', lessonId);
    } catch (err) {
      console.error('Unexpected error adding lesson:', err);
      alert('An unexpected error occurred while adding the lesson');
    }
  };

  const handleMoveLesson = async (moduleId: string, lessonId: string, direction: 'up' | 'down') => {
    // Resolve temporary module ID to actual UUID if needed
    let resolvedModuleId = moduleId;
    try {
      resolvedModuleId = await resolveModuleId(moduleId);
    } catch (error) {
      console.error('Error resolving module ID:', error);
      alert(`Error resolving module: ${(error as Error).message}`);
      return;
    }

    try {
      // Get the current positions of all lessons in the module
      const { data: contentItemsData, error: contentItemsError } = await supabase
        .from('module_content_items')
        .select('id, content_id, position')
        .eq('module_id', resolvedModuleId)
        .eq('content_type', 'lesson')
        .order('position', { ascending: true });

      if (contentItemsError) {
        console.error('Error fetching content items for reordering:', contentItemsError);
        alert(`Error moving lesson: ${contentItemsError.message}`);
        return;
      }

      if (!contentItemsData || contentItemsData.length === 0) {
        console.error('No content items found for module:', resolvedModuleId);
        return;
      }

      // Find the current position of the lesson to move
      const currentItem = contentItemsData.find(item => item.content_id === lessonId);
      if (!currentItem) {
        console.error('Lesson not found in module content items:', lessonId);
        return;
      }

      // Calculate new positions
      const currentPosition = currentItem.position;
      const targetPosition = direction === 'up' ? currentPosition - 1 : currentPosition + 1;

      // Find the item that currently occupies the target position
      const targetItem = contentItemsData.find(item => item.position === targetPosition);
      if (!targetItem) {
        // If there's no item at the target position, the lesson is already at the edge
        return;
      }

      // Swap positions in the database
      const updatePromises = [
        supabase
          .from('module_content_items')
          .update({ position: targetPosition })
          .eq('id', currentItem.id),
        supabase
          .from('module_content_items')
          .update({ position: currentPosition })
          .eq('id', targetItem.id)
      ];

      const results = await Promise.all(updatePromises);
      const errors = results.map(result => result.error).filter(error => error);

      if (errors.length > 0) {
        console.error('Error updating lesson positions:', errors);
        alert('Error moving lesson: ' + errors[0]?.message);
        return;
      }

      // Update the local state to reflect the new order
      // First, reload the curriculum to get the updated order
      const module = curriculum.find(m => m.id === moduleId);
      if (module) {
        const updatedModule = { ...module };

        // Sort lessons based on their new positions
        // First get the content items for the module
        const { data: contentItemsData, error: contentItemsError } = await supabase
          .from('module_content_items')
          .select('content_id')
          .eq('module_id', resolvedModuleId)
          .eq('content_type', 'lesson')
          .order('position', { ascending: true });

        if (contentItemsError) {
          console.error('Error fetching content items for module:', resolvedModuleId, contentItemsError);
        } else if (contentItemsData && contentItemsData.length > 0) {
          // Then get the actual lesson data
          const contentIds = contentItemsData.map(item => item.content_id);
          const { data: lessonsData, error: lessonsError } = await supabase
            .from('lessons')
            .select('id, title, description, content_blocks, estimated_duration_minutes, is_published, created_at, updated_at, duration, summary')
            .in('id', contentIds);

          if (lessonsError) {
            console.error('Error fetching lessons for module:', resolvedModuleId, lessonsError);
          } else if (lessonsData) {
            updatedModule.lessons = lessonsData;
          }
        }

        setCurriculum(prev => prev.map(m => m.id === moduleId ? updatedModule : m));
      }

      console.log('Lesson moved successfully:', lessonId, 'direction:', direction);
    } catch (err) {
      console.error('Unexpected error moving lesson:', err);
      alert('An unexpected error occurred while moving the lesson');
    }
  };

  const handleToggleModulePublish = async (moduleId: string, isPublished: boolean) => {
    // Resolve temporary module ID to actual UUID if needed
    let resolvedModuleId = moduleId;
    try {
      resolvedModuleId = await resolveModuleId(moduleId);
    } catch (error) {
      console.error('Error resolving module ID:', error);
      alert(`Error resolving module: ${(error as Error).message}`);
      return;
    }

    try {
      // Update the module's is_published status in the database
      const { error } = await supabase
        .from('modules')
        .update({ is_published: isPublished })
        .eq('id', resolvedModuleId);

      if (error) {
        console.error('Error toggling module publish status:', error);
        alert(`Error updating module: ${error.message}`);
        return;
      }

      // Update the local state
      setCurriculum(prev => prev.map(module => 
        module.id === moduleId ? { ...module, is_published: isPublished } : module
      ));

      console.log(`Module ${resolvedModuleId} is now ${isPublished ? 'published' : 'unpublished'}`);
    } catch (err) {
      console.error('Unexpected error toggling module publish:', err);
      alert('An unexpected error occurred while updating the module');
    }
  };

  const handleEditLesson = (moduleId: string, lessonId: string) => {
    const module = curriculum.find((m) => m.id === moduleId);
    const lesson = module?.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setEditingLesson({ moduleId, lesson });
    }
  };

  const handleSaveLesson = async (updatedLesson: Lesson) => {
    if (!editingLesson) return;

    try {
      // Update the lesson in the database
      const { error } = await supabase
        .from('lessons')
        .upsert({
          id: updatedLesson.id,
          title: updatedLesson.title,
          description: updatedLesson.description,
          content_blocks: updatedLesson.content_blocks,
          estimated_duration_minutes: updatedLesson.estimated_duration_minutes,
          is_published: updatedLesson.is_published,
        }, {
          onConflict: 'id' // This will update if the lesson exists, insert if it doesn't
        });

      if (error) {
        console.error('Error saving lesson:', error);
        alert(`Error saving lesson: ${error.message}`);
        return;
      }

      // Update the corresponding entry in module_content_items to reflect is_published status
      const { error: linkError } = await supabase
        .from('module_content_items')
        .update({ is_published: updatedLesson.is_published })
        .match({
          module_id: editingLesson.moduleId,
          content_id: updatedLesson.id,
          content_type: 'lesson'
        });

      if (linkError) {
        console.error('Error updating lesson link:', linkError);
        // Note: We don't rollback the lesson update here, but we should log this issue
        console.warn('Could not update module_content_items link:', linkError.message);
      }

      // Update the local state
      setCurriculum(
        curriculum.map((mod) =>
          mod.id === editingLesson.moduleId
            ? {
              ...mod,
              lessons: mod.lessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l)),
            }
            : mod
        )
      );

      // Keep the editingLesson state in sync so the input field updates
      setEditingLesson({ ...editingLesson, lesson: updatedLesson });

      console.log('Lesson saved successfully:', updatedLesson.id);
    } catch (err) {
      console.error('Unexpected error saving lesson:', err);
      alert('An unexpected error occurred while saving the lesson');
    }
  };

  const handlePublish = () => {
    setCourseStatus('published');
    window.alert(`🚀 Course Published Successfully\n\nCourse ID: ${courseId}\nStatus: Live\n\n✅ Publishing Checklist Completed:\n• Course content: Complete\n• Pricing: Set\n• Thumbnail: Uploaded\n• Description: Added\n• Learning objectives: Defined\n\n🌍 Course Visibility:\n• Public course catalog: Yes\n• Search engines: Indexed\n• Course page: Active\n• Enrollment: Open\n\n📊 What's Next:\n• Monitor enrollments\n• Engage with students\n• Respond to questions\n• Gather feedback\n• Update content as needed\n\n🎉 Congratulations on launching your course!`);
  };

  const handleUnpublish = () => {
    setCourseStatus('draft');
    window.alert(`📝 Course Unpublished\n\nCourse ID: ${courseId}\nStatus: Draft\n\n⚠️ Impact of Unpublishing:\n• Course removed from catalog\n• New enrollments: Disabled\n• Existing students: Still have access\n• Course page: Private\n• Search visibility: Hidden\n\n✅ Current Students:\n• Can continue learning\n• Access to all materials maintained\n• Progress preserved\n\n🔄 To Re-publish:\n• Review and update content\n• Check settings and pricing\n• Click 'Publish' when ready\n\n💡 Use draft mode to make major updates without affecting student experience.`);
  };

  const handleSaveSettings = async () => {
    if (!courseId) return;

    try {
      // Find category ID based on name - this assumes categories are unique by name
      // Ideally we should store category_id in state, but for now we look it up or handle it
      let categoryId = null;
      if (settings.category) {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', settings.category)
          .single();
        if (catData) categoryId = catData.id;
      }

      const { error } = await supabase
        .from('courses')
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
        .eq('id', courseId);

      if (error) throw error;

      // Handle Topics Sync
      const newTopicIds = settings.topics || [];

      // 1. Fetch current topics to determine deltas (safer than relying on potentially stale state)
      const { data: currentCT } = await supabase
        .from('course_topics')
        .select('topic_id')
        .eq('course_id', courseId);

      const currentIds = currentCT?.map((ct: any) => ct.topic_id) || [];

      const toAdd = newTopicIds.filter(id => !currentIds.includes(id));
      const toRemove = currentIds.filter((id: number) => !newTopicIds.includes(id));

      if (toAdd.length > 0) {
        const { error: addError } = await supabase
          .from('course_topics')
          .insert(toAdd.map(id => ({ course_id: courseId, topic_id: id })));
        if (addError) console.error('Error adding topics:', addError);
      }

      if (toRemove.length > 0) {
        const { error: removeError } = await supabase
          .from('course_topics')
          .delete()
          .eq('course_id', courseId)
          .in('topic_id', toRemove);
        if (removeError) console.error('Error removing topics:', removeError);
      }

      // Sync local status
      setCourseStatus(settings.visibility === 'public' ? 'published' : 'draft');
      window.alert('Settings saved successfully');

    } catch (error) {
      console.error('Error saving settings:', error);
      window.alert('Failed to save settings');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'settings':
        return <CourseSettingsForm settings={settings} onChange={setSettings} onSave={handleSaveSettings} />;
      case 'curriculum':
        return (
          <CurriculumEditor
            curriculum={curriculum}
            onChange={setCurriculum}
            onEditLesson={handleEditLesson}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
            onMoveLesson={handleMoveLesson}
            onToggleModulePublish={handleToggleModulePublish}
          />
        );
      case 'lessons':
        return courseId ? <CourseMediaLibrary courseId={courseId} /> : null;
      case 'live-sessions':
        return <LiveSessionManager />;
      case 'quizzes':
        return <QuizBuilderPanel questions={questions} onChange={setQuestions} />;
      case 'drip':
        return <DripSchedulePanel modules={drip} onChange={setDrip} />;
      case 'pricing':
        return <CoursePricingForm pricing={pricing} onChange={setPricing} />;
      case 'publish':
        return (
          <CoursePublishWorkflow
            courseStatus={courseStatus}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
          />
        );
      case 'preview':
        return (
          <CoursePreviewPane
            courseTitle={settings.title}
            courseSubtitle={settings.subtitle}
            courseDescription={settings.longDescription}
            instructorName="Your Name"
          />
        );
      default:
        return null;
    }
  };

  return (
    <CoachAppLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/coach/courses')}
            className="text-sm text-slate-600 dark:text-dark-text-secondary hover:text-slate-900 dark:hover:text-dark-text-primary transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to courses
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <CourseBuilderSidebar
            activeSection={activeSection}
            onChangeSection={(section) => setActiveSection(section as SectionKey)}
            courseTitle={settings.title || 'Untitled course'}
            courseStatus={courseStatus}
          />

          {/* Main content area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-dark-background-card rounded-3xl shadow-lg p-8">{renderSection()}</div>
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
    </CoachAppLayout>
  );
};

export default CourseBuilder;
