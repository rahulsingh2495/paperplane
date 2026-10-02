import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Paperplane — how we collect, handle, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto font-sans text-[#191510]">
      <header className="mb-12 border-b border-[#191510]/10 pb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[#6b6155] font-semibold mb-3">Legal</p>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight uppercase font-[var(--font-space)]">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#867c6d] mt-2">Effective date: October 2, 2026</p>
      </header>

      <div className="space-y-8 text-base leading-relaxed text-[#191510]/90">
        <p>
          This privacy policy describes how {site.name} (&quot;we&quot;, &quot;us&quot;) handles information
          collected through {site.domain} (the &quot;Site&quot;).
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Information we collect</h2>
          <p>
            <strong>Information you give us.</strong> When you submit a form on the Site (for example, the contact
            form), we receive the details you enter — typically your name, email address, phone
            number, and message. Form submissions are transmitted and processed on our behalf by our
            website service provider, Pixelotech (https://pixelotech.com), and delivered to us so we
            can respond to you.
          </p>
          <p>
            <strong>Information collected automatically.</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <em>Analytics.</em> We use Google Analytics 4, a service of Google LLC, to understand how
              visitors use the Site (pages viewed, approximate location, device type, how you found
              us). Google Analytics sets cookies (such as <code className="bg-black/5 px-1 py-0.5 rounded text-sm">_ga</code>) for this purpose. This data is
              aggregated and does not directly identify you. You can learn how Google processes this
              data at https://policies.google.com/technologies/partner-sites and opt out via
              https://tools.google.com/dlpage/gaoptout.
            </li>
            <li>
              <em>Hosting logs.</em> The Site is served by Cloudflare, which processes technical data such
              as IP addresses in server logs for security and delivery purposes.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">How we use information</h2>
          <p>
            We use the information above to respond to your enquiries, provide our services,
            understand how the Site is used, and keep the Site secure. We do <strong>not</strong> sell your
            personal information, and we do not use it for third-party advertising.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Sharing</h2>
          <p>
            We share information only with the service providers named above (Pixelotech for form
            handling, Google for analytics, Cloudflare for hosting), each acting on our behalf, or
            where required by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Data retention</h2>
          <p>
            Form submissions are retained for as long as needed to handle your enquiry and maintain
            our business records. Analytics data is retained per Google Analytics&apos; standard retention
            settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of the personal information we hold
            about you by contacting us using the details below. Depending on where you live, you may
            have additional rights under local privacy law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Children</h2>
          <p>
            The Site is not directed at children under 13, and we do not knowingly collect their
            personal information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Changes</h2>
          <p>
            If we change this policy, we will post the updated version on this page with a new
            effective date.
          </p>
        </section>

        <section className="space-y-2 border-t border-[#191510]/10 pt-6">
          <h2 className="text-xl font-semibold text-[#191510] uppercase tracking-wide">Contact</h2>
          <p className="font-medium">{site.name}</p>
          <p>{site.address.streetAddress}, {site.address.addressLocality}, {site.address.addressRegion}, {site.address.addressCountry}</p>
          <p>Email: <a href={`mailto:${site.email}`} className="underline text-[#e0451b]">{site.email}</a></p>
          <p>Phone: <a href={`tel:${site.phone}`} className="underline">{site.phone}</a></p>
        </section>
      </div>
    </main>
  );
}
