import type { Metadata } from "next";
import { IndiaMapSection } from "@/components/sections/india-map-section";

export const metadata: Metadata = {
  title: {
    absolute: "Painted Across India | Paperplane Mural Map",
  },
  description:
    "Interactive map of Paperplane's walls: 63 projects across 15 Indian cities and 4,35,000+ sq ft painted. Click a city to explore the work.",
  openGraph: {
    type: "website",
    siteName: "Paperplane",
    title: "Painted Across India | Paperplane",
    description:
      "An interactive map of every wall Paperplane has painted across India. Tap a city to see the work.",
    url: "https://paperplane-psi.vercel.app/map/",
    images: [
      {
        url: "/img/share.jpg",
        width: 1200,
        height: 630,
        alt: "Paperplane's hand-painted mural on the Dynamatic Technologies building, Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function MapPage() {
  return <IndiaMapSection />;
}
