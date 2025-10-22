import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getAllCourses } from "@/lib/courses";
import type { Database } from "@/lib/supabase";

import webDevThumb from "@assets/generated_images/Web_development_course_thumbnail_31223265.png";
import businessThumb from "@assets/generated_images/Business_analytics_course_thumbnail_693d28ea.png";
import designThumb from "@assets/generated_images/Design_course_thumbnail_image_8f806633.png";
import dataThumb from "@assets/generated_images/Data_science_course_thumbnail_d091618a.png";
import marketingThumb from "@assets/generated_images/Marketing_course_thumbnail_image_85e8014b.png";
import mobileThumb from "@assets/generated_images/Mobile_development_course_thumbnail_d544d377.png";

type Course = Database['public']['Tables']['courses']['Row'];

const fallbackThumbnails = [
  webDevThumb,
  businessThumb,
  designThumb,
  dataThumb,
  marketingThumb,
  mobileThumb,
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      const data = await getAllCourses();
      setCourses(data.slice(0, 6));
      setIsLoading(false);
    }
    fetchCourses();
  }, []);

  const handleShowMore = () => {
    if (user) {
      setLocation("/courses");
    } else {
      setLocation("/login");
    }
  };

  const handleCourseClick = (courseId: string) => {
    if (user) {
      setLocation(`/course/${courseId}`);
    } else {
      setLocation("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 md:pt-20">
        <Hero
          onGetStarted={() => setLocation("/register")}
          onBrowseCourses={() => setLocation("/courses")}
        />

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-heading">
                Featured Courses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our most popular courses and start your learning journey today
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Loading courses...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {courses.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      thumbnail={fallbackThumbnails[index % fallbackThumbnails.length]}
                      duration={course.duration}
                      level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                      onClick={() => handleCourseClick(course.id)}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-64"
                    onClick={handleShowMore}
                    data-testid="button-show-more"
                  >
                    Show More Courses
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>

        <footer className="py-12 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About LearnHub</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering learners worldwide with quality online education. Learn new skills and advance your career.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover-elevate active-elevate-2 rounded px-1 py-0.5 inline-block">About Us</a></li>
                  <li><a href="#" className="hover-elevate active-elevate-2 rounded px-1 py-0.5 inline-block">Contact</a></li>
                  <li><a href="#" className="hover-elevate active-elevate-2 rounded px-1 py-0.5 inline-block">Privacy Policy</a></li>
                  <li><a href="#" className="hover-elevate active-elevate-2 rounded px-1 py-0.5 inline-block">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-sm text-muted-foreground">
                  Email: support@learnhub.com<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
              © 2025 LearnHub. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
