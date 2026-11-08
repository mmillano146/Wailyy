// ─────────────────────────────────────────────────────────────────────────────
// PUBLICATION APPROVAL
//
// "Adire: People & Process" (6:52) is hosted on YouTube as an UNLISTED video.
// Public distribution has not yet been approved by Waliyy.
//
// FULL_FILM_APPROVED controls every link to, and embed of, the full film.
//   false (default) → production builds show a "being prepared" panel with a
//                     "Request a viewing" email action. The YouTube URL is
//                     compiled out of the bundle entirely.
//   true            → production builds show "Watch on YouTube" and the
//                     click-to-load privacy-enhanced embed.
//
// To publish: set FULL_FILM_APPROVED to true ONLY after Waliyy has explicitly
// authorised public release, then rebuild and redeploy.
//
// `vite dev` always enables the interaction for local testing; that does not
// change the production state above.
// ─────────────────────────────────────────────────────────────────────────────
export const FULL_FILM_APPROVED = false;

const YOUTUBE_ID = "3v882irbXg8";

const interactionEnabled = FULL_FILM_APPROVED || import.meta.env.DEV;

export const fullFilm = interactionEnabled
  ? {
      watchUrl: `https://youtu.be/${YOUTUBE_ID}`,
      // Privacy-enhanced domain: no cookies are set until the viewer plays.
      embedUrl: `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&playsinline=1&autoplay=1`,
    }
  : null;

// True only in local development while production approval is still pending.
export const isDevPreviewOnly = import.meta.env.DEV && !FULL_FILM_APPROVED;
