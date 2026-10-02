import type { Metadata } from "next";
import { IndiaMapSection } from "@/components/sections/india-map-section";

export const metadata: Metadata = {
  title: "Painted Across India",
  description:
    "Interactive map of Paperplane's walls: 63 projects across 15 Indian cities and 4,35,000+ sq ft painted. Click a city to explore the work.",
};

export default function MapPage() {
  return <IndiaMapSection />;
}
