import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, BarChart, CheckCircle2, Users, Award, Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getCourseById, enrollInCourse, unenrollFromCourse, isEnrolled } from "@/lib/courses";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/lib/supabase";

import webDevThumb from "@assets/generated_images/Web_development_course_thumbnail_31223265.png";

type Course = Database['public']['Tables']['courses']['Row'];

const lessonsData = [
  { id: 1, title: "Introduction to the Course", duration: "15 min" },
  { id: 2, title: "Getting Started", duration: "45 min" },
  { id: 3, title: "Core Concepts", duration: "60 min" },
  { id: 4, title: "Advanced Techniques", duration: "90 min" },
  { id: 5, title: "Final Project", duration: "120 min" },
];

const whatYouLearnData = [
  "Build real-world projects from scratch",
  "Master industry-standard tools and techniques",
  "Apply best practices in your work",
  "Deploy projects to production",
  "Work with modern technologies",
  "Understand core principles and concepts",
];

export default function CourseDetail() {
  const [match, params] = useRoute("/course/:id");
  const courseId = match ? params.id : null;
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;
      
      setIsLoading(true);
      const data = await getCourseById(courseId);
      setCourse(data);
      
      if (user && data) {
        const enrollmentStatus = await isEnrolled(user.id, courseId);
        setEnrolled(enrollmentStatus);
      }
      
      setIsLoading(false);
    }
    
    fetchCourse();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user || !courseId) return;

    setIsEnrolling(true);
    
    if (enrolled) {
      const { success, error } = await unenrollFromCourse(user.id, courseId);
      if (success) {
        setEnrolled(false);
        toast({
          title: "Unenrolled successfully",
          description: "You have been removed from this course.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to unenroll",
          description: error,
        });
      }
    } else {
      const { success, error } = await enrollInCourse(user.id, courseId);
      if (success) {
        setEnrolled(true);
        toast({
          title: "Enrolled successfully",
          description: "You are now enrolled in this course!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to enroll",
          description: error,
        });
      }
    }
    
    setIsEnrolling(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
            <p className="text-lg text-muted-foreground text-center">Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
            <p className="text-lg text-muted-foreground text-center">Course not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="text-sm text-muted-foreground mb-4">
                  <a href="/" className="hover-elevate active-elevate-2 rounded px-1 inline-block">Home</a>
                  {" / "}
                  <a href="/courses" className="hover-elevate active-elevate-2 rounded px-1 inline-block">Courses</a>
                  {" / "}
                  <span>{course.title}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-course-title">
                  {course.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={webDevThumb}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum" data-testid="tab-curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor" data-testid="tab-instructor">Instructor</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {whatYouLearnData.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4 mt-6">
                  <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
                  {lessonsData.map((lesson) => (
                    <Card key={lesson.id} className="p-4 hover-elevate cursor-pointer" data-testid={`lesson-${lesson.id}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Play className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">About the Instructor</h2>
                    <Card className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{course.instructor}</h3>
                          <p className="text-muted-foreground mb-4">
                            Expert instructor with 10+ years of experience
                          </p>
                          <p className="text-sm leading-relaxed">
                            Passionate educator dedicated to helping students achieve their goals. 
                            Specializes in making complex topics easy to understand through practical, 
                            real-world examples.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 space-y-6">
                <div>
                  <div className="text-3xl font-bold mb-2" data-testid="text-course-price">
                    ${course.price.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleEnroll}
                  disabled={isEnrolling || !user}
                  data-testid="button-enroll"
                >
                  {isEnrolling ? "Processing..." : enrolled ? "Unenroll" : "Enroll Now"}
                </Button>

                {!user && (
                  <p className="text-sm text-center text-muted-foreground">
                    Please log in to enroll in this course
                  </p>
                )}

                <div className="space-y-3 pt-4 border-t border-border">
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Mobile and desktop access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Downloadable resources</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
