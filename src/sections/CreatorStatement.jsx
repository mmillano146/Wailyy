import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { creatorStatement } from "../data/film";

export function CreatorStatement() {
  return (
    <section
      className="creator-statement"
      id="statement"
      aria-labelledby="statement-title"
    >
      <Container>
        <SectionHeading number="V" title="Creator’s statement" tone="light" />
        <div className="statement-layout">
          <div className="statement-title-wrap">
            <h2 id="statement-title">Finding another way to tell the story</h2>
            <p>Waliyy, writer and filmmaker</p>
          </div>
          <blockquote>
            {creatorStatement.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
