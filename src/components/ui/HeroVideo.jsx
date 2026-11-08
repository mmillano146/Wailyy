import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Short muted promotional loop (excerpt of the trailer, not the full film).
// The poster <img> in the hero stays underneath at all times, so the hero is
// never blank: the video fades in only once it is actually playing.
//
// Visitor preferences are respected, never overridden:
//   - prefers-reduced-motion, or an explicit Save-Data request, means the video
//     is not requested and does not autoplay.
//   - If the browser blocks autoplay, the poster stays and a "Play motion"
//     button is offered.
// In both cases the visitor can start the loop themselves with that button.
// `data-hero-video-state` on the wrapper records which path was taken
// (playing | blocked | reduced-motion | data-saver | error | idle) for
// diagnostics.

// Only an explicit data-saving request or a genuinely very slow link counts.
// "3g" is deliberately excluded: Chromium derives effectiveType from measured
// round-trip time and commonly reports it on ordinary connections.
function dataSaverRequested() {
  const connection =
    typeof navigator !== "undefined" ? navigator.connection : undefined;
  if (!connection) return false;
  return (
    connection.saveData === true ||
    ["slow-2g", "2g"].includes(connection.effectiveType)
  );
}

export function HeroVideo({ src, poster, onPlayingChange }) {
  const prefersReducedMotion = useReducedMotion();
  const [dataSaver] = useState(dataSaverRequested);
  const [userStarted, setUserStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const visibleRef = useRef(false);

  const optOutReason = prefersReducedMotion
    ? "reduced-motion"
    : dataSaver
      ? "data-saver"
      : null;
  // Mount (and so request) the video only when the visitor has not opted out,
  // or has chosen to start it themselves.
  const mounted = !failed && (!optOutReason || userStarted);

  useEffect(() => {
    onPlayingChange?.(mounted && playing);
  }, [mounted, playing, onPlayingChange]);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch((error) => {
        // AbortError just means a pause() interrupted us (scrolled away).
        if (error?.name !== "AbortError") setBlocked(true);
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return undefined;

    // React does not reliably reflect the `muted` attribute; set the property
    // so autoplay policies treat the clip as silent.
    video.muted = true;
    video.defaultMuted = true;

    // Pause while the hero is off-screen; resume when it is visible again.
    if (!("IntersectionObserver" in window)) {
      visibleRef.current = true;
      tryPlay();
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) tryPlay();
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [mounted, tryPlay]);

  const startManually = () => {
    setBlocked(false);
    if (mounted) {
      tryPlay();
    } else {
      // The video mounts on the next render and the observer effect starts it
      // while this click's user activation is still valid.
      setUserStarted(true);
    }
  };

  const showControl =
    !failed && !playing && ((!mounted && Boolean(optOutReason)) || blocked);

  let state = "idle";
  if (failed) state = "error";
  else if (playing) state = "playing";
  else if (blocked) state = "blocked";
  else if (!mounted && optOutReason) state = optOutReason;

  return (
    <>
      <span hidden data-hero-video-state={state} />
      {mounted ? (
        <video
          ref={videoRef}
          className={`hero-video ${playing ? "is-playing" : ""}`.trim()}
          src={src}
          poster={poster}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            setPlaying(true);
            setBlocked(false);
          }}
          onPause={() => {
            setPlaying(false);
            // Paused while the hero is on-screen and we did not ask for it:
            // the browser stopped it (autoplay policy, power saving). Offer
            // the manual control instead of leaving a dead poster.
            if (visibleRef.current) setBlocked(true);
          }}
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
        />
      ) : null}
      {showControl ? (
        <button
          type="button"
          className="hero-motion-toggle"
          onClick={startManually}
          aria-label="Play hero motion. The clip is silent."
        >
          <Play aria-hidden="true" size={14} strokeWidth={1.8} />
          <span>Play motion</span>
        </button>
      ) : null}
    </>
  );
}
