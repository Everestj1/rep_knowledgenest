import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Hero_image_students_learning_ba1a013c.png";

interface HeroProps {
  onGetStarted?: () => void;
  onBrowseCourses?: () => void;
}

export default function Hero({ onGetStarted, onBrowseCourses }: HeroProps) {
  return (
    <div className="relative min-h-[500px] md:min-h-[600px] bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-10" />
      <img
        src={heroImage}
        alt="Students learning together"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full min-h-[500px] md:min-h-[600px]">
        <div className="grid md:grid-cols-2 gap-12 items-center h-full py-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
              Learn Without Limits
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-hero-subtitle">
              Discover thousands of online courses from expert instructors. Master new skills at your own pace, anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-base"
                onClick={onGetStarted}
                data-testid="button-get-started"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base"
                onClick={onBrowseCourses}
                data-testid="button-browse-courses"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
