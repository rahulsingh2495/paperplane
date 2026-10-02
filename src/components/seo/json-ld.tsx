import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: "Paper Plane",
    url: site.domain,
    logo: `${site.domain}/img/brand/plane-icon-512.png`,
    image: `${site.domain}/og-image.jpg`,
    description: site.description,
    founder: {
      "@type": "Person",
      name: site.founder,
    },
    email: site.email,
    telephone: site.phone,
    areaServed: "IN",
    knowsAbout: ["Murals", "Sculpture", "Public art", "Augmented reality", "CGI"],
    sameAs: [site.social.instagram, site.social.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
