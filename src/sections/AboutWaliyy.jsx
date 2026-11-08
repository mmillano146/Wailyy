import { motion, useReducedMotion } from "motion/react";
import { Container } from "../components/ui/Container";
import { FilmImage } from "../components/ui/FilmImage";
import { SectionHeading } from "../components/ui/SectionHeading";
import { creatorBio, film } from "../data/film";

export function AboutWaliyy() {
  const prefersReducedMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section className="about-waliyy" id="about" aria-labelledby="about-title">
      <Container>
        <SectionHeading number="VI" title="About Waliyy" />
        <div className="about-layout">
          <motion.figure className="about-portrait" {...reveal()}>
            <span className="about-portrait-mark" aria-hidden="true">
              W
            </span>
            <FilmImage
              {...film.media.portrait}
              sizes="(min-width: 64rem) 34vw, 88vw"
            />
            <figcaption>Waliyy — writer and multidisciplinary artist</figcaption>
          </motion.figure>

          <motion.div className="about-copy" {...reveal(0.12)}>
            <h2 id="about-title">Writing, image, and cultural memory</h2>
            <p className="about-lede">{creatorBio.introduction}</p>
            {creatorBio.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
