import type { Metadata } from "next";
import { WorkGallery } from "@/components/sections/work-gallery";

export const metadata: Metadata = {
  title: {
    absolute: "All Projects | Paperplane Mural Art Studio",
  },
  description:
    "Every wall Paperplane has painted: murals, sculptures and collaborations across India and beyond. Kumbh Mela, Pepsi, Oppo, RBI, Breitling and more.",
  openGraph: {
    type: "website",
    siteName: "Paperplane",
    title: "All Projects | Paperplane",
    description:
      "Every wall Paperplane has painted: murals, sculptures and brand spaces in India and abroad.",
    url: "https://paperplane-psi.vercel.app/work/",
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

export default function WorkPage() {
  return <WorkGallery />;
}
