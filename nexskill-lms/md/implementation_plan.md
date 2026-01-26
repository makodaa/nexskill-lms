# Implementation Plan: Cloudinary Integration for Lesson Editor

I'll provide a comprehensive plan to integrate Cloudinary for image and video uploads in your Lesson Editor, following strong coding practices.

## Overview

This implementation will add proper media upload functionality using Cloudinary's Upload Widget, store references in Supabase, and display media properly in both edit and preview modes.

## Architecture Components

### 1. **Environment Configuration**
```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

### 2. **Database Schema (Supabase)**
```sql
-- Extend your existing lesson_content_blocks table
ALTER TABLE lesson_content_blocks 
ADD COLUMN IF NOT EXISTS media_metadata JSONB;

-- Store: { cloudinary_id, public_id, format, resource_type, width, height, duration }
```

### 3. **New Files to Create**

```
src/
├── services/
│   └── cloudinary.service.ts         # Cloudinary upload logic
├── hooks/
│   └── useCloudinaryUpload.ts        # Upload hook with state management
├── components/
│   ├── MediaUploader.tsx             # Reusable upload component
│   └── MediaPreview.tsx              # Display component for images/videos
└── types/
    └── media.types.ts                # Media-related TypeScript types
```

## Implementation Steps

### Phase 1: Core Services & Types

**1. Create Type Definitions** (`types/media.types.ts`)
```typescript
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: 'image' | 'video';
  format: string;
  width?: number;
  height?: number;
  duration?: number;
  bytes: number;
  created_at: string;
}

export interface MediaMetadata {
  cloudinary_id: string;
  public_id: string;
  url: string;
  resource_type: 'image' | 'video';
  format: string;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail_url?: string;
}
```

**2. Cloudinary Service** (`services/cloudinary.service.ts`)
```typescript
export class CloudinaryService {
  private static cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  private static uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  static openUploadWidget(
    options: CloudinaryUploadOptions,
    callback: (error: any, result: any) => void
  ): any {
    // Load widget script dynamically
    // Configure upload parameters
    // Handle callbacks
  }

  static generateThumbnail(publicId: string, width = 400): string {
    // Generate Cloudinary transformation URL
  }

  static deleteMedia(publicId: string): Promise<void> {
    // Optional: Server-side deletion via your backend
  }
}
```

**3. Custom Hook** (`hooks/useCloudinaryUpload.ts`)
```typescript
export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadMedia = useCallback(
    async (resourceType: 'image' | 'video'): Promise<MediaMetadata | null> => {
      // Implementation
    },
    []
  );

  return { uploadMedia, isUploading, uploadProgress, error };
}
```

### Phase 2: UI Components

**4. Media Uploader Component** (`components/MediaUploader.tsx`)
```typescript
interface MediaUploaderProps {
  resourceType: 'image' | 'video';
  currentUrl?: string;
  onUploadComplete: (metadata: MediaMetadata) => void;
  onRemove?: () => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  resourceType,
  currentUrl,
  onUploadComplete,
  onRemove
}) => {
  const { uploadMedia, isUploading, uploadProgress, error } = useCloudinaryUpload();

  // Render upload button, progress, preview
}
```

**5. Media Preview Component** (`components/MediaPreview.tsx`)
```typescript
interface MediaPreviewProps {
  url: string;
  resourceType: 'image' | 'video';
  alt?: string;
  caption?: string;
  metadata?: MediaMetadata;
  className?: string;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  url,
  resourceType,
  alt,
  caption,
  metadata,
  className
}) => {
  // Render optimized image or video player
}
```

### Phase 3: Integration with LessonEditorPanel

**6. Update LessonEditorPanel.tsx**

Key changes needed:

```typescript
// Add new state for media uploads
const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);

// Modify handleContentUpdate to include metadata
const handleMediaUpload = useCallback(
  (blockId: string, metadata: MediaMetadata) => {
    const currentBlocks = lesson.content_blocks || [];
    const updatedBlocks = currentBlocks.map((block) =>
      block.id === blockId
        ? {
            ...block,
            content: metadata.url,
            attributes: {
              ...block.attributes,
              media_metadata: metadata,
              alt: block.attributes?.alt,
              caption: block.attributes?.caption,
            },
          }
        : block
    );
    onChange({ ...lesson, content_blocks: updatedBlocks });
  },
  [lesson, onChange]
);

// Replace image/video input fields with MediaUploader
```

**7. Update Block Rendering**

Replace the image block section:
```typescript
{block.type === "image" ? (
  <MediaUploader
    resourceType="image"
    currentUrl={block.content}
    onUploadComplete={(metadata) => handleMediaUpload(block.id, metadata)}
    onRemove={() => handleContentUpdate("", block.id)}
  />
) : null}
```

Add video block support:
```typescript
{block.type === "video" ? (
  <MediaUploader
    resourceType="video"
    currentUrl={block.content}
    onUploadComplete={(metadata) => handleMediaUpload(block.id, metadata)}
    onRemove={() => handleContentUpdate("", block.id)}
  />
) : null}
```

### Phase 4: Supabase Integration

**8. Update Supabase Queries**

```typescript
// When saving lesson
const saveLessonToSupabase = async (lesson: Lesson) => {
  const { data, error } = await supabase
    .from('lessons')
    .upsert({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      // ... other fields
    });

  // Save content blocks with media metadata
  for (const block of lesson.content_blocks || []) {
    await supabase
      .from('lesson_content_blocks')
      .upsert({
        id: block.id,
        lesson_id: lesson.id,
        type: block.type,
        content: block.content,
        position: block.position,
        attributes: block.attributes,
        media_metadata: block.attributes?.media_metadata || null,
      });
  }
};
```

## Best Practices Implementation

### 1. **Error Handling**
```typescript
- Network failure recovery
- Upload retry logic
- User-friendly error messages
- Rollback on failed saves
```

### 2. **Performance Optimization**
```typescript
- Lazy load Cloudinary widget script
- Image lazy loading in preview
- Thumbnail generation for large images
- Progressive video loading
```

### 3. **Security**
```typescript
- Use unsigned upload presets (client-side)
- Implement upload restrictions (file size, type)
- Validate file types on both client and server
- Consider signed uploads for production
```

### 4. **UX Enhancements**
```typescript
- Upload progress indicators
- Drag-and-drop support
- Image cropping/editing options
- Preview before upload
- Undo/redo support
```

### 5. **Accessibility**
```typescript
- Proper ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
```