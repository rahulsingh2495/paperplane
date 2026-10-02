import { site } from "@/lib/site";

export function ProofStats() {
  return (
    <section className="proof" id="studio" data-rail="Studio">
      <div className="proof__lead">
        <p className="eyebrow">The studio</p>
        <h2 className="proof__title">
          We turn blank walls into <em>landmarks.</em>
        </h2>
        <div className="proof__copy">
          <p>
            Hand-painted murals, sculptures, augmented reality and CGI for brands, cities and public
            spaces. We take a wall from first sketch to finished landmark.
          </p>
          <p>
            From a single café wall to a two-lakh-square-foot mural at the Kumbh Mela, the craft is the
            same: bold ideas, painted by hand, built to be remembered.
          </p>
        </div>
      </div>

      <div className="proof__stats">
        <div className="stat">
          <b>{site.stats.projects}</b>
          <span>Projects</span>
        </div>
        <div className="stat">
          <b>{site.stats.cities}</b>
          <span>Cities across India</span>
        </div>
        <div className="stat">
          <b>{site.stats.countries}</b>
          <span>Countries</span>
        </div>
        <div className="stat stat--wide">
          <b>
            {site.stats.sqft.toLocaleString("en-IN")}
            <sup>+</sup>
          </b>
          <span>Sq ft painted</span>
        </div>
      </div>
    </section>
  );
}
