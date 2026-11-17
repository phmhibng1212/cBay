# cBay Website (nhiều trang)

Website cBay bản mới, nhiều trang, dựng từ design Figma `[CBAy] Website`.
Công nghệ: **Vite + HTML / CSS / JS thuần** (không framework). Bản landing 1 trang cũ vẫn nằm nguyên ở gốc repo (nhánh `dev`), **không bị đụng tới**.

## Chạy

```bash
cd website
npm install
npm run dev        # http://localhost:5173
npm run build      # xuất ra website/dist (chạy được ở mọi đường dẫn, base './')
npm run preview    # xem thử bản build
npm run build:preview   # gộp các trang đã dựng thành 1 file xem thử: dist-preview/cbay-preview.html
```

`cbay-preview.html` là 1 file duy nhất (ảnh, font, CSS, JS nhúng sẵn): bấm đúp để mở, các trang chuyển qua lại bằng menu. Chỉ dùng để xem/gửi duyệt, **bản giao dev là site nhiều trang** (`npm run build`).

Cần Node 18+.

## Cấu trúc thư mục

```
website/
├── index.html                # Trang chủ
├── neo-floor.html            # Trang Neo Floor (sàn đá SPC)
├── khach-hang.html           # Khách hàng — Dự án tiêu biểu (lọc theo loại dự án)
├── ve-chung-toi.html         # Về chúng tôi
├── d8-filler.html            # Keo chống nứt D8 Filler
├── vua-hieu-ung.html         # Vữa hiệu ứng VASA (có quạt mẫu hiệu ứng + popup chi tiết sản phẩm)
├── blog.html                 # Blog (tổng): tin nổi bật · tin tức (lọc + xem thêm) · dự án tiêu biểu
├── bai-viet.html             # Blog — bài viết chi tiết (mục lục tự tô sáng, bài liên quan)
├── keo-dan-gach.html         # Keo dán gạch chống thấm VASA (bảng so sánh 3 loại + chi tiết 4 tab; dữ liệu ở data/keo-dan-gach.js)
├── (trang mới: chỉ cần thêm file .html ở đây, Vite tự nhận)
├── partials/                 # Khối dùng chung, chèn bằng  <!-- @include header.html -->
│   ├── head.html  header.html  footer.html  contact-cta.html  floating.html  modals.html
├── src/
│   ├── styles/
│   │   ├── tokens.css        # ★ Design tokens lấy từ Figma (màu, font, cỡ chữ, bo góc, đổ bóng)
│   │   ├── base.css  animations.css  fonts.css  main.css
│   │   ├── components/       # buttons, header, footer(+CTA), forms, modal, floating, post-card (thẻ bài viết), related-products (Sản phẩm liên quan)
│   │   └── pages/            # CSS riêng từng trang: home.css, neo-floor.css, blog.css, bai-viet.css …
│   └── scripts/
│       ├── main.js           # khởi tạo phần dùng chung
│       ├── modules/          # reveal (animation), header, modal, forms, lead (gửi form)
│       ├── data/             # dữ liệu (neo-floor.js: mã màu · projects.js: công trình · blog.js: bài viết, dự án nổi bật · d8.js · vasa.js · keo-dan-gach.js: 3 sản phẩm, bảng so sánh, chỉ tiêu)
│       └── pages/            # logic riêng từng trang: home.js, neo-floor.js, blog.js, bai-viet.js …
└── public/assets/            # ảnh (webp) + icon (svg) xuất từ Figma
```

## Thêm một trang mới

1. Copy `neo-floor.html` → `ten-trang.html`, sửa `<title>`, `data-page="ten-trang"`, nội dung `<main>`.
2. Tạo `src/styles/pages/ten-trang.css` và `src/scripts/pages/ten-trang.js` (import `../main.js` + css), rồi gắn `<script type="module">` trong `<head>` như các trang hiện có.
3. Header/footer/popup tự có nhờ `<!-- @include … -->`. Menu tự tô sáng theo `data-page` khớp với `data-nav` trong `header.html`.

## Quy ước

- **Tokens**: không hard-code màu/cỡ chữ trong CSS trang — dùng biến ở `tokens.css` (tên theo Figma: `--green-600`, `--ink-500`, `--fs-h3`…).
- **Responsive**: desktop thiết kế 1440, mobile 390. Breakpoint: `≥1100` desktop · `561–1099` tablet · `≤560` mobile (bottom sheet cho popup, sticky bar thay side-tab).
- **Animation xuất hiện**: thêm `data-anim="fade-up | fade | slide-left | slide-right | zoom"` (+ `style="--d:120ms"` để trễ). Thẻ cha có `data-anim-stagger` sẽ tự so le các con. Tự tắt khi người dùng bật *giảm chuyển động*.
- **Popup**: mở bằng `data-modal-open="trial|contact|detail"`, đóng bằng `data-modal-close` / Esc / bấm nền. Popup dùng thử có thể chọn sẵn sản phẩm: `data-product="d8|vasa|both"`.
- **Font**: Manrope + Sora, tự host qua `@fontsource` (không phụ thuộc Google Fonts).

## Những chỗ dev cần nối tiếp (TODO)

- **Gửi form**: `src/scripts/modules/lead.js` → điền `LEAD_ENDPOINT`. Hiện chưa gửi dữ liệu đi đâu (giống landing cũ).
- **Ảnh Marble Plus**: thiết kế chưa có ảnh, đang hiện khung giữ chỗ (`src/scripts/data/neo-floor.js`).
- **Bài viết Blog**: dữ liệu ở `src/scripts/data/blog.js`. Hiện chỉ có **1 trang chi tiết mẫu** (`bai-viet.html`, bài DeMont Cafe) nên mọi thẻ bài viết đều trỏ về trang này (`POST_URL`). Khi có CMS/nhiều bài: sinh trang theo bài (hoặc đọc `?bai=`) và thay `POST_URL` bằng đường dẫn từng bài.
- **Bản xem thử gộp** (`npm run build:preview`): ảnh webp lớn được thu nhỏ nhẹ (cần ImageMagick `convert`, nếu thiếu thì dùng ảnh gốc) để file < 16MB. Chỉ ảnh hưởng bản xem thử.
- **File tài liệu PDF** (trang D8): link đang để `#` (`data-doc`) — dev gắn đường dẫn file thật. Video hướng dẫn D8 mở link Google Drive trong code thiết kế.
