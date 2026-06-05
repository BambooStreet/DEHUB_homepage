import { getNews } from "@/lib/db/queries";
import PhotoSliderClient, { type Slide } from "./PhotoSliderClient";

const MAX_SLIDES = 6;

export default async function PhotoSlider() {
  const all = await getNews();
  const slides: Slide[] = all
    .filter((n) => n.category !== "announcement" && !!n.image)
    .slice(0, MAX_SLIDES)
    .map((n) => ({
      id: n.id,
      title: n.title,
      date: n.date,
      image: n.image!,
      category: n.category,
    }));

  return <PhotoSliderClient slides={slides} />;
}
