import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "../components/ui/Container";

const patternImages = [
  "/assets/Adire-pattern-grid.jpeg",
  "/assets/Adire-textile-detail.jpeg",
  "/assets/Adire-pattern-grid.jpeg",
];

export function TextileTransition() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <section
      className="textile-transition"
      ref={sectionRef}
      aria-labelledby="textile-transition-title"
    >
      <motion.div
        className="textile-track"
        style={{ x: prefersReducedMotion ? 0 : trackX }}
        aria-hidden="true"
      >
        {patternImages.map((src, index) => (
          <img
            src={src}
            alt=""
            width={index === 1 ? 937 : 932}
            height={index === 1 ? 509 : 474}
            loading="lazy"
            decoding="async"
            key={`${src}-${index}`}
          />
        ))}
      </motion.div>
      <div className="textile-shade" aria-hidden="true" />
      <Container className="textile-transition-copy">
        <p>Pattern carries memory.</p>
        <h2 id="textile-transition-title">Meaning endures.</h2>
      </Container>
    </section>
  );
}
