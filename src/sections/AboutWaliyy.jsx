import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { creatorBio } from "../data/film";

export function AboutWaliyy() {
  return (
    <section className="about-waliyy" id="about" aria-labelledby="about-title">
      <Container>
        <SectionHeading number="VI" title="About Waliyy" />
        <div className="about-layout">
          <div className="creator-mark" aria-hidden="true">
            <span className="creator-monogram">W</span>
            <span className="creator-role">
              Writer
              <br />
              Multidisciplinary artist
            </span>
          </div>
          <div className="about-copy">
            <h2 id="about-title">Writing, image, and cultural memory</h2>
            <p className="about-lede">{creatorBio.introduction}</p>
            {creatorBio.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
