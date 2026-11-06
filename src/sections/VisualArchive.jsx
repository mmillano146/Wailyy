import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "../components/ui/Container";
import { FilmImage } from "../components/ui/FilmImage";
import { SectionHeading } from "../components/ui/SectionHeading";
import { archiveImages } from "../data/film";

export function VisualArchive() {
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const activeImage = archiveImages[activeIndex ?? 0];

  const closeLightbox = () => setActiveIndex(null);
  const showPrevious = () =>
    setActiveIndex((current) =>
      current === null ? 0 : (current - 1 + archiveImages.length) % archiveImages.length,
    );
  const showNext = () =>
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % archiveImages.length,
    );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (activeIndex === null && dialog.open) {
      dialog.close();
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }

    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeys = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeys);
    return () => {
      window.removeEventListener("keydown", handleKeys);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  return (
    <section className="archive" id="archive" aria-labelledby="archive-title">
      <Container>
        <SectionHeading number="IV" title="Visual archive" />
        <div className="archive-intro">
          <h2 id="archive-title">Images from the film</h2>
          <p>
            A compact visual record of pattern, process, and contemporary
            expression. Select an image to view it without cropping.
          </p>
        </div>

        <div className="archive-grid">
          {archiveImages.map((image, index) => (
            <button
              className={`archive-item archive-item--${index + 1}`}
              type="button"
              key={image.src}
              aria-haspopup="dialog"
              aria-label={`Open image ${index + 1} of ${archiveImages.length}: ${image.title}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
            >
              <FilmImage
                {...image}
                sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 36vw, 100vw"}
              />
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </Container>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-labelledby="lightbox-title"
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onClose={closeLightbox}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
      >
        <div className="lightbox-panel">
          <div className="lightbox-topbar">
            <p id="lightbox-title">{activeImage.title}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="lightbox-image">
            <FilmImage {...activeImage} sizes="100vw" />
          </div>

          <div className="lightbox-controls">
            <button type="button" onClick={showPrevious} aria-label="View previous image">
              <ChevronLeft aria-hidden="true" />
              Previous
            </button>
            <p aria-live="polite">
              {(activeIndex ?? 0) + 1} / {archiveImages.length}
            </p>
            <button type="button" onClick={showNext} aria-label="View next image">
              Next
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
