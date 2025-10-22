import CourseCard from "../CourseCard";
import webDevThumb from "@assets/generated_images/Web_development_course_thumbnail_31223265.png";

export default function CourseCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <CourseCard
        id="1"
        title="Complete Web Development Bootcamp"
        description="Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course"
        thumbnail={webDevThumb}
        duration="40 hours"
        level="Beginner"
        onClick={() => console.log("Course clicked")}
      />
    </div>
  );
}
