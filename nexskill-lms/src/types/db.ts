export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at?: string;
}

export interface Topic {
    id: number;
    name: string;
}

export interface Course {
    id: string;
    title: string;
    subtitle?: string;
    short_description?: string;
    long_description?: string;
    language?: string;
    visibility?: 'public' | 'unlisted' | 'private';
    level: CourseLevel;
    duration_hours: number;
    price: number;
    category_id?: number;
    coach_id?: string;
    created_at: string;
    updated_at: string;
}

export interface Profile {
    id: string;
    updated_at: string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    role: 'student' | 'coach' | 'admin';
}
