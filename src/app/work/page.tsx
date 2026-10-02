import type { Metadata } from "next";
import { WorkGallery } from "@/components/sections/work-gallery";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "Every wall Paperplane has painted: murals, sculptures and collaborations across India and beyond. Kumbh Mela, Pepsi, Oppo, RBI, Breitling and more.",
};

export default function WorkPage() {
  return <WorkGallery />;
}
