import type { Metadata } from "next";
import { Bebas_Neue, Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | Mural Art Studio in India: Murals, Sculptures, AR`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Paperplane | Mural Art Studio, India",
    description: site.description,
    url: site.domain,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paperplane hand-painted mural on the Dynamatic Technologies building, Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/img/brand/plane-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/brand/plane-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/img/brand/plane-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              function kill(){
                try {
                  window.postMessage({ nlHud: 'state', value: 'hidden' }, '*');
                  var sel = '#nl-badge-frame, #nl-hud-frame, iframe[id*="nl-"], iframe[title*="Netlify" i], iframe[src*="netlify" i], a[href*="netlify.com"], [class*="netlify-badge"], [id*="netlify-badge"], [data-netlify-badge], script[data-nf-variant], script[src*="/hud"]';
                  document.querySelectorAll(sel).forEach(function(el){
                    if (el.dataset) delete el.dataset.nfVariant;
                    el.remove();
                  });
                } catch(e){}
              }
              kill();
              if (typeof MutationObserver !== 'undefined') {
                new MutationObserver(kill).observe(document.documentElement, { childList: true, subtree: true });
              }
              document.addEventListener('DOMContentLoaded', kill);
              window.addEventListener('load', kill);
              setInterval(kill, 250);
            })();`,
          }}
        />
        <div className="grain" aria-hidden="true" />
        <Header />
        {children}
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
