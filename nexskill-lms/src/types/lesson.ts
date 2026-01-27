export interface LessonContentBlock {
    id: string;
    type:
        | "text"
        | "image"
        | "video"
        | "code"
        | "heading"
        | "list"
        | "quote"
        | "divider"
        | "embed";
    content: string; // HTML content for text blocks, URL for media
    attributes?: {
        // Common attributes
        caption?: string;
        // Heading-specific
        level?: number;
        // Code-specific
        language?: string;
        // Image-specific
        alt?: string;
        // Media metadata
        media_metadata?: {
            cloudinary_id: string;
            public_id: string;
            url: string;
            resource_type: "image" | "video";
            format: string;
            bytes?: number;
            original_filename?: string;
            width?: number;
            height?: number;
            duration?: number;
            thumbnail_url?: string;
            bit_rate?: number;
            frame_rate?: number;
            codec?: string;
        };
        // Video-specific attributes
        external_url?: string; // For YouTube/Vimeo URLs
        is_external?: boolean; // Flag for external videos
        autoplay?: boolean;
        controls?: boolean;
        loop?: boolean;
        muted?: boolean;
        [key: string]: any; // Allow additional custom attributes
    };
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
    type?: "video" | "pdf" | "quiz" | "live" | "text"; // Added type to match existing
    duration?: string; // For backward compatibility
    summary?: string; // For backward compatibility
    video?: { filename: string; duration: string }; // For backward compatibility
    resources?: Array<{ name: string; type: string; size: string }>; // For backward compatibility
}

// Force the file to be treated as a module
export {};
