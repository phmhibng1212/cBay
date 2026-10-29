# cBay

Landing page cBay — nhà phân phối chính thức keo xử lý mối nối **D8 Filler**.

HTML + CSS thuần + Vanilla JS, không build step, không dependency.

## Chạy local

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

Hoặc dùng Live Server của VS Code trên `index.html`.

## Cấu trúc

```
├── index.html
├── css/style.css        # design tokens (:root), layout, responsive
├── js/main.js           # animation, menu, FAQ, carousel, popup, form
└── assets/
    ├── images/          # ảnh (webp/png)
    └── icons/           # logo, icon SVG
```

## Chức năng

| Thành phần | Hành vi |
| --- | --- |
| Mọi nút/link **Liên hệ**, icon **Zalo** | Mở `https://zalo.me/0795363888` (tab mới) |
| Icon **Facebook** | Mở `https://www.facebook.com/cBayvn/` (tab mới) |
| Mọi nút **Nhận sản phẩm dùng thử** | Cuộn mượt tới `#dang-ky` |
| **Xem kết quả kiểm nghiệm →** | Mở popup phiếu VIBM (đóng bằng ✕, click nền hoặc `Esc`) |
| **Form đăng ký** | Validate client-side (bắt buộc, SĐT 10–11 số), loading ~0.9s, hiện thẻ thành công. **Không gửi dữ liệu đi đâu.** |
| **FAQ** | Accordion mở/đóng mượt |
| **Dự án nổi bật** | Carousel: nút ← →, vuốt trên mobile |

## Responsive

Desktop ≥ 1280 · Laptop 1100–1279 · Tablet 768–1099 · Mobile < 768 (thiết kế Figma: 1440 và 375).

## Animation

Hiệu ứng xuất hiện khi cuộn qua `data-anim="fade-up | slide-left | slide-right | zoom | fade"` (+ `style="--d:120ms"` để trễ).
Tự tắt khi người dùng bật `prefers-reduced-motion`.

## Git

- `main`: production — chỉ merge từ `dev` khi đã duyệt.
- `dev`: nhánh phát triển chính.
