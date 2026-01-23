export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  short_description?: string;
  long_description?: string;
  tags?: string;
  language?: string;
  visibility?: "public" | "unlisted" | "private";
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
  role: "student" | "coach" | "admin";
}

export interface Enrollment {
  profile_id: string;
  course_id: string;
  enrolled_at: string;
}

// Chat & Messaging Types
export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  course_id?: string;
  content: string;
  read_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MessageWithProfiles extends Message {
  sender_profile?: Profile;
  recipient_profile?: Profile;
  course?: Course;
}

export interface Conversation {
  user1_id: string;
  user2_id: string;
  course_id?: string;
  last_message: string;
  last_message_at: string;
  last_sender_id: string;
  other_user_id: string;
  other_user_profile?: Profile;
  unread_count?: number;
}
