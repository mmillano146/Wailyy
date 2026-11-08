import { ExternalLink, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { film } from "../data/film";
import { fullFilm, isDevPreviewOnly } from "../data/publication";
import { Container } from "../components/ui/Container";
import { PrimaryAction } from "../components/ui/PrimaryAction";
import { SectionHeading } from "../components/ui/SectionHeading";

// The complete documentary is hosted on YouTube (unlisted). Whether it can be
// linked or embedded is controlled by FULL_FILM_APPROVED in
// src/data/publication.js. `fullFilm` is null unless approved (or in local
// development), in which case the pending panel is shown and the YouTube URL
// is not part of the production bundle.
//
// The short silent loop in the hero is promotional trailer footage and is
// unrelated to this section.

const VIEWING_REQUEST_SUBJECT = encodeURIComponent(
  "Viewing request — Adire: People & Process",
);

function Poster({ children, meta }) {
  return (
    <div className="video-poster">
      <img
        src={film.media.poster}
        alt=""
        width="930"
        height="526"
        loading="lazy"
        decoding="async"
      />
      <div className="screening-meta" aria-hidden="true">
        <span>Full documentary</span>
        <span>{meta}</span>
      </div>
      <div className="poster-overlay">
        <p>Adire: People &amp; Process</p>
        {children}
      </div>
    </div>
  );
}

export function FilmViewer() {
  const [embedded, setEmbedded] = useState(false);
  const frameRef = useRef(null);

  const loadEmbed = () => {
    setEmbedded(true);
    window.requestAnimationFrame(() => frameRef.current?.focus());
  };

  return (
    <section className="film-viewer" id="watch" aria-labelledby="watch-title">
      <Container>
        <SectionHeading number="III" title="Watch" tone="light" />
        <div className="viewer-heading">
          <h2 id="watch-title">Watch the full documentary</h2>
          <p>
            {fullFilm
              ? `${film.runtime} runtime, hosted on YouTube. The short loop at the top of this page is promotional footage; the complete film is here.`
              : `${film.runtime} runtime. The complete film will be available here once public screening is confirmed.`}
          </p>
        </div>

        <div
          className={`video-frame ${fullFilm && embedded ? "" : "video-frame--pending"}`}
        >
          {fullFilm && embedded ? (
            <iframe
              ref={frameRef}
              className="video-element"
              src={fullFilm.embedUrl}
              title={`${film.title} — full documentary (${film.runtime}) on YouTube`}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
            />
          ) : fullFilm ? (
            <Poster meta={`${film.runtime} · YouTube`}>
              <div className="screening-actions">
                <a
                  className="primary-action screening-play"
                  href={fullFilm.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink aria-hidden="true" size={17} strokeWidth={1.8} />
                </a>
                <button
                  className="screening-secondary"
                  type="button"
                  onClick={loadEmbed}
                >
                  Play here
                </button>
              </div>
              <p className="screening-note">
                Nothing loads from YouTube until you choose to play. The
                embedded player uses YouTube&rsquo;s privacy-enhanced mode.
              </p>
            </Poster>
          ) : (
            <Poster meta={film.runtime}>
              <p className="screening-note">
                The complete film is being prepared for public screening and
                will be available here soon.
              </p>
              <a
                className="primary-action screening-play"
                href={`mailto:${film.contact}?subject=${VIEWING_REQUEST_SUBJECT}`}
              >
                <span>Request a viewing</span>
                <Mail aria-hidden="true" size={17} strokeWidth={1.8} />
              </a>
            </Poster>
          )}
        </div>

        {isDevPreviewOnly ? (
          <p className="dev-preview-note">
            Developer preview: the YouTube action is enabled locally only.
            Production stays disabled until FULL_FILM_APPROVED is set in
            src/data/publication.js.
          </p>
        ) : null}

        {fullFilm ? (
          <noscript>
            <p className="noscript-film">
              JavaScript is required for the player. You can
              {" "}
              <a href={fullFilm.watchUrl}>watch the film on YouTube</a>.
            </p>
          </noscript>
        ) : (
          <noscript>
            <p className="noscript-film">
              The film is not yet available for public viewing. For viewing
              requests, email
              {" "}
              <a href={`mailto:${film.contact}`}>{film.contact}</a>.
            </p>
          </noscript>
        )}
      </Container>
    </section>
  );
}
