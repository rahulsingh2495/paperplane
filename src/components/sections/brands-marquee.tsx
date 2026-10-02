import Image from "next/image";

const BRAND_LOGOS = [
  { num: 1, name: "Arena Animation" },
  { num: 2, name: "Nexus Westend" },
  { num: 3, name: "Netflix" },
  { num: 4, name: "Pepsi" },
  { num: 5, name: "Jawa" },
  { num: 6, name: "Phoenix Mall of Asia" },
  { num: 7, name: "Breitling" },
  { num: 9, name: "Aditya Birla Group" },
  { num: 10, name: "Dynamatic Technologies" },
  { num: 11, name: "Reserve Bank of India" },
  { num: 12, name: "Panchshil" },
  { num: 13, name: "Sunburn" },
  { num: 14, name: "Bacardi Weekender" },
  { num: 15, name: "CRED" },
  { num: 16, name: "IPL" },
  { num: 17, name: "Pulsar" },
  { num: 18, name: "JW Marriott" },
  { num: 19, name: "Ogilvy" },
  { num: 20, name: "BookMyShow" },
  { num: 21, name: "Hyundai" },
  { num: 22, name: "Oppo" },
  { num: 23, name: "United Colors of Benetton" },
  { num: 24, name: "boAt" },
  { num: 25, name: "Bisleri" },
  { num: 26, name: "ST+ART India Foundation" },
  { num: 27, name: "DNA Networks" },
];

export function BrandsMarquee() {
  return (
    <section className="brands" aria-label="Brands we have worked with">
      <p className="eyebrow brands__label">Brands love us</p>
      <div className="brands__viewport">
        <div className="brands__track" id="brandsTrack">
          {BRAND_LOGOS.map((brand) => (
            <span key={brand.num} className="brand">
              <Image
                src={`/img/brands/logo-${String(brand.num).padStart(2, "0")}.png`}
                alt={brand.name}
                width={160}
                height={44}
                className="h-11 w-auto max-w-[160px] object-contain"
              />
            </span>
          ))}
          {/* Duplicate set for continuous marquee */}
          {BRAND_LOGOS.map((brand) => (
            <span key={`dup-${brand.num}`} className="brand" aria-hidden="true">
              <Image
                src={`/img/brands/logo-${String(brand.num).padStart(2, "0")}.png`}
                alt=""
                width={160}
                height={44}
                className="h-11 w-auto max-w-[160px] object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
