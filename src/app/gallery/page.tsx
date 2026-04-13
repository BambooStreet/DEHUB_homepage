import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Gallery
        </h1>

        <GalleryGrid items={gallery} />
      </div>
    </div>
  );
}
