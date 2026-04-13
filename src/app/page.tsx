import Hero from "@/components/home/Hero";
import PhotoSlider from "@/components/home/PhotoSlider";
import RecentNews from "@/components/home/RecentNews";
import RecentPublications from "@/components/home/RecentPublications";

export default function Home() {
  return (
    <>
      <Hero />
      <PhotoSlider />
      <RecentNews />
      <RecentPublications />
    </>
  );
}
