import { Check, Copy, Mail, Play } from "lucide-react";
import { useState } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { film, pressFacts } from "../data/film";

export function PressContact() {
  const [copied, setCopied] = useState(false);

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText(film.contact);
    } catch {
      const field = document.createElement("textarea");
      field.value = film.contact;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="press-contact" id="press" aria-labelledby="press-title">
      <Container>
        <SectionHeading number="VII" title="Press & contact" tone="light" />
        <div className="press-heading">
          <h2 id="press-title">For press, programming, and collaboration</h2>
          <p>
            For enquiries about the film or Waliyy’s work, contact him directly.
          </p>
        </div>

        <div className="press-layout">
          <dl className="press-facts">
            {pressFacts.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="contact-panel">
            <p>Press contact</p>
            <a href={`mailto:${film.contact}`}>{film.contact}</a>
            <div className="contact-actions">
              <a href={`mailto:${film.contact}`}>
                <Mail aria-hidden="true" />
                Email Waliyy
              </a>
              <button type="button" onClick={copyContact}>
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? "Copied" : "Copy email"}
              </button>
              <a href="#watch">
                <Play aria-hidden="true" />
                Watch the film
              </a>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard." : ""}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
