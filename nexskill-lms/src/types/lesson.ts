export interface LessonContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'code' | 'heading' | 'list' | 'quote' | 'divider' | 'embed';
  content: string; // HTML content for text blocks, URL for media
  attributes?: Record<string, any>; // Additional attributes for the block
  position: number;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content_blocks: LessonContentBlock[];
  estimated_duration_minutes?: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  type?: 'video' | 'pdf' | 'quiz' | 'live' | 'text'; // Added type to match existing
  duration?: string; // For backward compatibility
  summary?: string; // For backward compatibility
  video?: { filename: string; duration: string }; // For backward compatibility
  resources?: Array<{ name: string; type: string; size: string }>; // For backward compatibility
}

// Force the file to be treated as a module
export {};