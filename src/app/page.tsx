import Hero from "@/components/home/Hero";
import PhotoSlider from "@/components/home/PhotoSlider";
import RecentNews from "@/components/home/RecentNews";

export default function Home() {
  return (
    <>
      <PhotoSlider />
      <Hero />
      <RecentNews />
    </>
  );
}
