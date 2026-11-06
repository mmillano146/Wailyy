import { film } from "../data/film";
import { Container } from "../components/ui/Container";
import { FilmImage } from "../components/ui/FilmImage";
import { SectionHeading } from "../components/ui/SectionHeading";

export function FilmOverview() {
  return (
    <section className="overview" id="overview" aria-labelledby="overview-title">
      <Container>
        <SectionHeading number="I" title="The film" />
        <div className="overview-grid">
          <div className="overview-title-wrap">
            <h2 id="overview-title">
              Cloth as archive.
              <br />
              Process as memory.
            </h2>
          </div>

          <div className="overview-copy">
            <p className="overview-lede">{film.description}</p>
            {film.synopsis.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <figure className="overview-figure">
            <FilmImage
              {...film.media.overview}
              sizes="(min-width: 1000px) 62vw, 100vw"
            />
            <figcaption>Detail from the film’s visual archive</figcaption>
          </figure>

          <dl className="overview-meta" aria-label="Film information">
            <div>
              <dt>Runtime</dt>
              <dd>{film.runtime}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{film.format}</dd>
            </div>
            <div>
              <dt>Creator</dt>
              <dd>{film.creator}</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
