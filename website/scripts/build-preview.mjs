/**
 * Build BẢN XEM THỬ GỘP 1 FILE:  npm run build:preview
 *
 * Gộp các trang đã dựng thành 1 tài liệu, nhúng sẵn CSS, JS, font, ảnh (base64) nên:
 *  - mở thẳng bằng cách bấm đúp file, không cần server, không cần mạng;
 *  - đăng lên Artifact / gửi qua chat được;
 *  - các trang chuyển qua lại bằng menu (hash #trang-chu, #san-da-spc, #khach-hang, #ve-chung-toi, #blog, #bai-viet, #d8-filler, #vua-hieu-ung) như site thật.
 *
 * Kết quả (thư mục dist-preview/):
 *   cbay-preview.html           tài liệu đầy đủ, mở trực tiếp
 *   cbay-preview.fragment.html  bản bỏ <html>/<head>/<body> (dùng cho Artifact)
 * Đây là bản để XEM; bản giao dev vẫn là site nhiều trang (npm run build).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');

// ---- 1. Ghép partial ----
const render = (html) =>
  html.replace(/<!--\s*@include\s+([\w./-]+)\s*-->/g, (_, f) => render(read(`partials/${f}`)));

const mainOf = (html) => html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
const home = render(read('index.html'));
const neo = render(read('neo-floor.html'));
const khach = render(read('khach-hang.html'));
const about = render(read('ve-chung-toi.html'));
const blog = render(read('blog.html'));
const post = render(read('bai-viet.html'));
const d8 = render(read('d8-filler.html'));
const vasa = render(read('vua-hieu-ung.html'));
const detailModal = neo.match(/(<!-- =+ POPUP · CHI TIẾT MẪU SÀN[\s\S]*?)<\/body>/)[1];
const certModal = d8.match(/(<!-- =+ POPUP · CHỨNG NHẬN[\s\S]*?)<\/body>/)[1];
const productModal = vasa.match(/(<!-- =+ POPUP · CHI TIẾT SẢN PHẨM VASA[\s\S]*?)<\/body>/)[1];

let doc = `<!doctype html>
<html lang="vi">
<head>
${read('partials/head.html')}
<title>cBay Website</title>
<script type="module" src="/src/scripts/pages/preview.js"></script>
</head>
<body data-page="home">
${render('<!-- @include header.html -->')}
<main id="main" data-view="home">${mainOf(home)}</main>
<main data-view="neo-floor" hidden>${mainOf(neo)}</main>
<main data-view="khach-hang" hidden>${mainOf(khach)}</main>
<main data-view="ve-chung-toi" hidden>${mainOf(about)}</main>
<main data-view="blog" hidden>${mainOf(blog)}</main>
<main data-view="bai-viet" hidden>${mainOf(post)}</main>
<main data-view="d8-filler" hidden>${mainOf(d8)}</main>
<main data-view="vua-hieu-ung" hidden>${mainOf(vasa)}</main>
${render('<!-- @include contact-cta.html -->\n<!-- @include footer.html -->\n<!-- @include floating.html -->\n<!-- @include modals.html -->')}
${detailModal}
${certModal}
${productModal}
</body>
</html>
`;

// ---- 2. Viết lại link giữa các trang ----
const SOON = ['keo-dan-gach', 'tai-lieu'];
doc = doc
  .replace(/href="\.\/index\.html"/g, 'href="#trang-chu"')
  .replace(/href="\.\/neo-floor\.html#([\w-]+)"/g, 'href="#$1"')
  .replace(/href="\.\/neo-floor\.html"/g, 'href="#san-da-spc"')
  .replace(/href="\.\/khach-hang\.html"/g, 'href="#khach-hang"')
  .replace(/href="\.\/ve-chung-toi\.html"/g, 'href="#ve-chung-toi"')
  .replace(/href="\.\/blog\.html#([\w-]+)"/g, 'href="#$1"')
  .replace(/href="\.\/blog\.html"/g, 'href="#blog"')
  .replace(/href="\.\/bai-viet\.html"/g, 'href="#bai-viet"')
  .replace(/href="\.\/d8-filler\.html"/g, 'href="#d8-filler"')
  .replace(/href="\.\/vua-hieu-ung\.html"/g, 'href="#vua-hieu-ung"')
  .replace(new RegExp(`href="\\./(${SOON.join('|')})\\.html"`, 'g'), 'href="#" data-soon');
writeFileSync(resolve(root, 'preview.html'), doc);

// ---- 3. Build bằng Vite (1 JS + 1 CSS, font nhúng) ----
await build({ root, configFile: resolve(root, 'vite.preview.config.js'), logLevel: 'warn' });

// ---- 4. Nhúng mọi thứ vào 1 file ----
const out = (p) => resolve(root, 'dist-preview', p);
let html = readFileSync(out('preview.html'), 'utf8');

const MIME = { '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
// Bản xem thử bị giới hạn ~16MB (Artifact) -> ảnh webp lớn được thu nhỏ nhẹ (chỉ bản xem thử, ảnh trong public/ giữ nguyên).
const SHRINK = { maxWidth: 1000, quality: 66, minBytes: 60_000 };
const cacheDir = resolve(root, 'dist-preview-cache');
mkdirSync(cacheDir, { recursive: true });
const shrink = (file) => {
  if (extname(file) !== '.webp' || readFileSync(file).length < SHRINK.minBytes) return file;
  const out = resolve(cacheDir, file.replace(/[^A-Za-z0-9]+/g, '_') + '.webp');
  if (!existsSync(out)) {
    try {
      execFileSync('convert', [file, '-resize', `${SHRINK.maxWidth}x>`, '-quality', String(SHRINK.quality), out], { stdio: 'ignore' });
    } catch { return file; } // không có ImageMagick -> dùng ảnh gốc
  }
  return readFileSync(out).length < readFileSync(file).length ? out : file;
};
const uriCache = new Map();
const dataUri = (rel) => {
  if (uriCache.has(rel)) return uriCache.get(rel);
  const file = resolve(root, 'public', rel);
  if (!existsSync(file)) throw new Error(`Thiếu file: public/${rel}`);
  const uri = `data:${MIME[extname(file)]};base64,${readFileSync(shrink(file)).toString('base64')}`;
  uriCache.set(rel, uri);
  return uri;
};
const ASSET_RE = /(?:\.\/|\/)?(assets\/(?:icons|images)\/[A-Za-z0-9_\-./]+\.(?:webp|svg|png|jpg))/g;
const inlineAssets = (text) => text.replace(ASSET_RE, (_, rel) => dataUri(rel));
// Trong JS: mỗi ảnh chỉ nhúng 1 lần (bảng __IMG), các chỗ dùng tham chiếu tới bảng -> nhẹ hơn nhiều.
// Chỉ áp dụng cho chuỗi đứng sau ( [ , : (vd. asset('...')); chuỗi trong template HTML (src="...") vẫn nhúng trực tiếp.
const inlineAssetsJs = (text) => {
  const list = [];
  const index = new Map();
  const body = text.replace(/(?<=[(\[,:]\s*)(["'])(?:\.\/|\/)?(assets\/(?:icons|images)\/[A-Za-z0-9_\-./]+\.(?:webp|svg|png|jpg))\1/g, (_, __, rel) => {
    if (!index.has(rel)) { index.set(rel, list.length); list.push(dataUri(rel)); }
    return `__IMG[${index.get(rel)}]`;
  });
  return `const __IMG=${JSON.stringify(list)};\n${inlineAssets(body)}`;
};

const assetsDir = out('assets');
const files = readdirSync(assetsDir);
const jsFile = files.find((f) => f.endsWith('.js'));
const cssFile = files.find((f) => f.endsWith('.css'));

// link bài viết nằm trong dữ liệu JS (src/scripts/data/blog.js) -> đổi sang hash của bản xem thử
let js = inlineAssetsJs(readFileSync(resolve(assetsDir, jsFile), 'utf8'))
  .replaceAll('./bai-viet.html', '#bai-viet')
  .replace(/<\/script/gi, '<\\/script');
let css = readFileSync(resolve(assetsDir, cssFile), 'utf8')
  // bỏ bản font .woff dự phòng (đã có .woff2) để file nhẹ hơn
  .replace(/,\s*url\(data:font\/woff;base64,[^)]*\)\s*format\(["']woff["']\)/g, '');
css = inlineAssets(css);

html = inlineAssets(html)
  .replace(/<script type="module"[^>]*src="[^"]*"[^>]*><\/script>\s*/, '')
  .replace(/<link rel="stylesheet"[^>]*href="[^"]*"[^>]*>\s*/, '')
  .replace('</head>', `<style>\n${css}\n</style>\n</head>`)
  .replace('</body>', `<script type="module">\n${js}\n</script>\n</body>`);

writeFileSync(out('cbay-preview.html'), html);

// ---- 5. Bản fragment cho Artifact ----
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
const bodyAttrs = html.match(/<body([^>]*)>/)[1];
const title = head.match(/<title>[\s\S]*?<\/title>/)[0];
const style = head.match(/<style>[\s\S]*?<\/style>/)[0];
const preHead = (head.match(/<script>[\s\S]*?<\/script>/g) || []).join('\n'); // chỉ giữ script thêm class .js
const fragment = `${title}\n${preHead}\n${style}\n<div id="cbay-root"${bodyAttrs}>${body}</div>\n`;
writeFileSync(out('cbay-preview.fragment.html'), fragment);

const mb = (f) => (readFileSync(out(f)).length / 1048576).toFixed(2);
console.log(`✓ dist-preview/cbay-preview.html (${mb('cbay-preview.html')} MB)`);
console.log(`✓ dist-preview/cbay-preview.fragment.html (${mb('cbay-preview.fragment.html')} MB)`);
