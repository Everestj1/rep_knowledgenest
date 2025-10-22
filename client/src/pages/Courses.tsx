import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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

export default function Courses() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      const data = await getAllCourses();
      setCourses(data);
      setIsLoading(false);
    }
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleCourseClick = (courseId: string) => {
    setLocation(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-courses-title">
              All Courses
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our complete catalog of courses
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    onClick={() => setSelectedLevel(level)}
                    data-testid={`button-filter-${level.toLowerCase()}`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading courses...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No courses found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
