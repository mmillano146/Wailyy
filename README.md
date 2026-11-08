# Wailyy


## Full film publication approval

The complete documentary is an unlisted YouTube video. Links to it and the
embed are controlled by `FULL_FILM_APPROVED` in `src/data/publication.js`
(default `false`: production shows a "Request a viewing" panel and the YouTube
URL is compiled out). `vite dev` always enables the YouTube actions for local
testing. Set the flag to `true` only after Waliyy approves public release.

The hero loop (`public/assets/adire-hero-loop.mp4`, 8s, silent) is a short
excerpt of the trailer. The trailer itself lives outside the repo and is never
deployed.
