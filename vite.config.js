import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The complete documentary lives outside the repository and is streamed only
// by the development server at /dev-media/Trailer.mp4. This middleware runs
// exclusively in `vite dev` — production builds and `vite preview` never
// register it, and nothing in the client bundle references the private path.
const PRIVATE_MEDIA_DIR = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../Waliyy-EPK-private",
);
const MEDIA_FILENAME = "Trailer.mp4";

function localDocumentaryMedia() {
  return {
    name: "adire-local-documentary-media",
    configureServer(server) {
      server.middlewares.use("/dev-media", (req, res) => {
        const filePath = resolve(PRIVATE_MEDIA_DIR, MEDIA_FILENAME);
        if (!existsSync(filePath)) {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }

        const { size: total } = statSync(filePath);
        const range = req.headers.range;

        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Accept-Ranges", "bytes");

        const match = range ? /bytes=(\d*)-(\d*)/.exec(range) : null;
        if (match) {
          const start = match[1] ? parseInt(match[1], 10) : 0;
          let end = match[2] ? parseInt(match[2], 10) : total - 1;
          if (Number.isNaN(start) || start >= total) {
            res.statusCode = 416;
            res.setHeader("Content-Range", `bytes */${total}`);
            res.end();
            return;
          }
          if (end >= total) end = total - 1;
          res.statusCode = 206;
          res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`);
          res.setHeader("Content-Length", end - start + 1);
          createReadStream(filePath, { start, end }).pipe(res);
          return;
        }

        res.setHeader("Content-Length", total);
        createReadStream(filePath).pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localDocumentaryMedia()],
});
