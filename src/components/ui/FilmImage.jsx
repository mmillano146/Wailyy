import { useState } from "react";

export function FilmImage({
  src,
  srcSet,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  className = "",
  sizes = "100vw",
  position = "center",
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`film-image-fallback ${className}`.trim()}
        role="img"
        aria-label={`${alt} Image unavailable.`}
      >
        <span>Documentary still unavailable</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      sizes={sizes}
      style={{ objectPosition: position }}
      onError={() => setFailed(true)}
    />
  );
}
