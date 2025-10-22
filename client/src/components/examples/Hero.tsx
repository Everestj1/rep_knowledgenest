import Hero from "../Hero";

export default function HeroExample() {
  return (
    <Hero
      onGetStarted={() => console.log("Get Started clicked")}
      onBrowseCourses={() => console.log("Browse Courses clicked")}
    />
  );
}
