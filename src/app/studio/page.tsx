import type { Metadata } from "next";
import { StudioView } from "@/components/sections/studio-view";

export const metadata: Metadata = {
  title: {
    absolute: "The Studio | Paperplane Mural Art Studio",
  },
  description:
    "Paperplane is a multidisciplinary art studio at the intersection of art, space and technology: murals, sculptures, AR and CGI. Meet the people behind the plane.",
  openGraph: {
    type: "website",
    siteName: "Paperplane",
    title: "The Studio | Paperplane",
    description:
      "A multidisciplinary art studio where art, space and technology meet. Meet the people behind the plane.",
    url: "https://paperplane-psi.vercel.app/studio/",
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

export default function StudioPage() {
  return <StudioView />;
}
