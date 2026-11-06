import { Mail } from "lucide-react";
import { useRef, useState } from "react";
import { film } from "../data/film";
import { Container } from "../components/ui/Container";
import { PrimaryAction } from "../components/ui/PrimaryAction";
import { SectionHeading } from "../components/ui/SectionHeading";

// The full documentary is not yet approved for public distribution, so the
// player is gated off for the preview. Once Waliyy approves distribution,
// restore Trailer.mp4 to public/assets/ and set this flag to true — the
// original lazy-loaded player below is preserved untouched.
const FILM_PUBLICLY_AVAILABLE = false;

const VIEWING_REQUEST_SUBJECT = encodeURIComponent(
  "Viewing request — Adire: People & Process",
);

export function FilmViewer() {
  const [watching, setWatching] = useState(false);
  const videoRef = useRef(null);

  const beginFilm = () => {
    setWatching(true);
    window.requestAnimationFrame(() => videoRef.current?.focus());
  };

  return (
    <section className="film-viewer" id="watch" aria-labelledby="watch-title">
      <Container>
        <SectionHeading number="III" title="Watch" tone="light" />
        <div className="viewer-heading">
          <h2 id="watch-title">Watch the full documentary</h2>
          <p>
            {FILM_PUBLICLY_AVAILABLE
              ? `${film.runtime} runtime. The video begins only when you choose to watch.`
              : `${film.runtime} runtime. The complete film will be available here once public screening is confirmed.`}
          </p>
        </div>

        <div className={`video-frame ${FILM_PUBLICLY_AVAILABLE ? "" : "video-frame--pending"}`}>
          {FILM_PUBLICLY_AVAILABLE ? (
            watching ? (
              <video
                ref={videoRef}
                className="video-element"
                src={film.media.video}
                poster={film.media.poster}
                controls
                autoPlay
                playsInline
                preload="none"
                aria-label={`Play ${film.title}, the full documentary`}
                tabIndex="-1"
              >
                Your browser does not support HTML5 video. You can
                {" "}
                <a href={film.media.video}>open the film directly</a>.
              </video>
            ) : (
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
                  <span>{film.runtime}</span>
                </div>
                <div className="poster-overlay">
                  <p>Adire: People &amp; Process</p>
                  <PrimaryAction className="screening-play" onClick={beginFilm}>
                    Watch the film
                  </PrimaryAction>
                </div>
              </div>
            )
          ) : (
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
                <span>{film.runtime}</span>
              </div>
              <div className="poster-overlay">
                <p>Adire: People &amp; Process</p>
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
              </div>
            </div>
          )}
        </div>
        {FILM_PUBLICLY_AVAILABLE ? (
          <noscript>
            <p className="noscript-film">
              JavaScript is required for the lazy-loaded player. You can
              {" "}
              <a href={film.media.video}>open the film directly</a>.
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
