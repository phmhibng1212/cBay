import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

/** Cấu hình build bản xem thử gộp 1 file: nhúng sẵn font/ảnh nhỏ, 1 JS, 1 CSS. Xem scripts/build-preview.mjs */
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist-preview',
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: {
      input: resolve(root, 'preview.html'),
      output: { inlineDynamicImports: true },
    },
  },
});
