import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  onClick?: () => void;
}

export default function CourseCard({
  title,
  description,
  thumbnail,
  duration,
  level,
  onClick,
}: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-transform duration-200"
      onClick={onClick}
      data-testid="card-course"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold line-clamp-2 mb-2" data-testid="text-course-title">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4" data-testid="text-course-description">
          {description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <Badge className={levelColors[level]} data-testid="badge-course-level">
            <BarChart className="h-3 w-3 mr-1" />
            {level}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
