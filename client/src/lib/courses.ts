import { supabase } from './supabase';
import type { Database } from './supabase';

type Course = Database['public']['Tables']['courses']['Row'];
type Enrollment = Database['public']['Tables']['enrollments']['Row'];

export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data || [];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  return data;
}

export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }

  return data || [];
}

export async function isEnrolled(userId: string, courseId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking enrollment:', error);
    return false;
  }

  return !!data;
}

export async function enrollInCourse(userId: string, courseId: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('enrollments')
    .insert({ user_id: userId, course_id: courseId });

  if (error) {
    console.error('Error enrolling in course:', error);
    return { success: false, error: error.message };
  }

  const { error: updateError } = await supabase.rpc('increment_course_students', { course_id: courseId });

  if (updateError) {
    console.error('Error updating student count:', updateError);
  }

  return { success: true };
}

export async function unenrollFromCourse(userId: string, courseId: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('enrollments')
    .delete()
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (error) {
    console.error('Error unenrolling from course:', error);
    return { success: false, error: error.message };
  }

  const { error: updateError } = await supabase.rpc('decrement_course_students', { course_id: courseId });

  if (updateError) {
    console.error('Error updating student count:', updateError);
  }

  return { success: true };
}
