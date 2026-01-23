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
export interface Lesson {
    id: number;
    title: string;
    duration: string; // e.g., '15:30'
    module_id: number;
    video_url?: string;
    content?: string;
    is_preview?: boolean;
    order_index?: number;
    created_at?: string;
}
export interface Module {
    id: number;
    title: string;
    course_id: string;
    order_index?: number;
    lessons?: Lesson[];
    created_at?: string;
}
export interface Course {
    id: string;
    title: string;
    coach_id?: string;
    created_at: string;
    updated_at: string;
    modules?: Module[]; // Relation
}
export interface CoachProfile {
    id: string; // References Profile.id
    job_title?: string;
    bio?: string;
    experience_level?: 'Beginner' | 'Intermediate' | 'Expert';
    content_areas?: string[];
    tools?: string[];
    linkedin_url?: string;
    portfolio_url?: string;
    verification_status: 'pending' | 'verified' | 'rejected';
    created_at?: string;
    updated_at?: string;
}
export type UserRole = 'student' | 'coach' | 'admin' | 'unassigned';
export const defaultLandingRouteByRole: Record<UserRole, string> = {
    student: '/student/dashboard',
    coach: '/coach/dashboard',
    admin: '/admin/dashboard',
    unassigned: '/verification-pending'
};
export interface Profile {
    id: string;
    updated_at: string;
    username?: string;
    email?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    name_extension?: string;
    role: UserRole;
}
