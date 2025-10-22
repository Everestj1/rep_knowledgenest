-- LearnHub Database Schema Setup
-- Run this SQL in your Supabase SQL Editor

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  instructor TEXT NOT NULL,
  students INTEGER DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Courses policies: Everyone can read, only authenticated users can see all
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

-- Enrollments policies: Users can only see their own enrollments
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own enrollments" ON enrollments
  FOR DELETE USING (auth.uid() = user_id);

-- Insert sample courses
INSERT INTO courses (title, description, thumbnail_url, duration, level, instructor, students, price) VALUES
  ('Complete Web Development Bootcamp', 'Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', '40 hours', 'Beginner', 'Sarah Johnson', 12450, 49.99),
  ('Business Analytics & Intelligence', 'Master data analysis, visualization, and business intelligence tools. Make data-driven decisions confidently.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', '25 hours', 'Intermediate', 'Michael Chen', 8320, 39.99),
  ('UI/UX Design Masterclass', 'Learn user interface and user experience design principles. Create stunning, user-friendly digital products.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', '30 hours', 'Beginner', 'Emma Davis', 9870, 44.99),
  ('Data Science with Python', 'Explore machine learning, data analysis, and visualization with Python. Work with real datasets and build models.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', '50 hours', 'Advanced', 'David Rodriguez', 6540, 59.99),
  ('Digital Marketing Strategy', 'Learn SEO, social media marketing, content strategy, and analytics. Grow your online presence effectively.', 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c3b0', '20 hours', 'Beginner', 'Lisa Anderson', 11250, 34.99),
  ('Mobile App Development', 'Build iOS and Android apps with React Native. Learn mobile development from scratch to deployment.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', '45 hours', 'Intermediate', 'James Wilson', 7890, 54.99)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
