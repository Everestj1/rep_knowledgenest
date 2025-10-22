import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zlubrnrwobqtihiopekr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWJybnJ3b2JxdGloaW9wZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTQwODgsImV4cCI6MjA3NjczMDA4OH0.Rm3e5DAwLkU7fTqiOa_5uzssk7d4SJSYaLg7PCjR0kE";


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          thumbnail_url: string;
          duration: string;
          level: 'Beginner' | 'Intermediate' | 'Advanced';
          instructor: string;
          students: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          thumbnail_url: string;
          duration: string;
          level: 'Beginner' | 'Intermediate' | 'Advanced';
          instructor: string;
          students?: number;
          price: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
        };
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
    };
  };
};
