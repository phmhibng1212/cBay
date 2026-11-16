import { defineConfig } from 'vite';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const partialsDir = resolve(root, 'partials');

/**
 * Plugin nhỏ: ghép các "partial" dùng chung (header, footer, popup...) vào mọi trang.
 * Cú pháp trong file .html:   <!-- @include header.html -->
 * File partial nằm trong thư mục /partials. Có thể lồng partial trong partial.
 */
function htmlPartials() {
  const render = (html) =>
    html.replace(/<!--\s*@include\s+([\w./-]+)\s*-->/g, (_, file) =>
      render(readFileSync(resolve(partialsDir, file), 'utf8')),
    );

  return {
    name: 'cbay-html-partials',
    transformIndexHtml: { order: 'pre', handler: render },
    handleHotUpdate({ file, server }) {
      // Sửa partial -> tải lại trang ngay khi đang chạy `npm run dev`
      if (file.startsWith(partialsDir)) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

/** Tự nhận mọi file *.html ở thư mục gốc làm 1 trang (multi-page). */
const pages = Object.fromEntries(
  readdirSync(root)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [f.replace(/\.html$/, ''), resolve(root, f)]),
);

export default defineConfig({
  // './' để thư mục build chạy được ở bất kỳ đường dẫn nào (hosting con, GitHub Pages...)
  base: './',
  plugins: [htmlPartials()],
  build: {
    rollupOptions: { input: pages },
  },
  server: { host: true },
});
