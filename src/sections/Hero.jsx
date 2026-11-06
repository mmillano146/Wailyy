import { motion, useReducedMotion } from "motion/react";
import { film } from "../data/film";
import { Container } from "../components/ui/Container";
import { FilmImage } from "../components/ui/FilmImage";
import { PrimaryAction } from "../components/ui/PrimaryAction";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reveal = prefersReducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section className="hero" id="top" aria-labelledby="film-title">
      <div className="hero-image">
        <FilmImage
          {...film.media.hero}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 800px) 56vw, 100vw"
        />
        <span className="hero-image-credit">From the documentary</span>
      </div>

      <Container className="hero-inner">
        <motion.div className="hero-copy" {...reveal}>
          <p className="film-byline">A film by {film.creator}</p>
          <h1 id="film-title">
            <span>Adire:</span>
            <span>People &amp;</span>
            <span>Process</span>
          </h1>
          <p className="hero-description">{film.description}</p>

          <div className="hero-footer">
            <PrimaryAction href="#watch">Watch the film</PrimaryAction>
            <dl className="film-meta" aria-label="Film details">
              <div>
                <dt>Runtime</dt>
                <dd>{film.runtime}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{film.format}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
