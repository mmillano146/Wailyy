import { motion, useReducedMotion } from "motion/react";
import { Container } from "../components/ui/Container";
import { FilmImage } from "../components/ui/FilmImage";
import { SectionHeading } from "../components/ui/SectionHeading";
import { storyThemes } from "../data/film";

export function Story() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="story" id="story" aria-labelledby="story-title">
      <Container>
        <SectionHeading number="II" title="The story" tone="light" />
        <div className="story-intro">
          <h2 id="story-title">A story held in cloth</h2>
          <p>
            Four connected themes trace the film’s movement through history,
            making, and cultural identity — threads of one ongoing
            exploration.
          </p>
        </div>

        <div className="story-sequence">
          {storyThemes.map((theme, index) => (
            <motion.article
              className={`story-movement ${index % 2 ? "story-movement--reverse" : ""}`}
              key={theme.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <figure>
                <FilmImage
                  {...theme.image}
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
              </figure>
              <div className="story-copy">
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
