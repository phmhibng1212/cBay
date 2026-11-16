# CLAUDE.md — Bộ nhớ dự án cBay Website (multi-page)

> File này là "memory" của dự án. Đọc kỹ trước khi làm bất cứ việc gì. Khi người dùng đưa yêu cầu mới ảnh hưởng quy tắc chung, cập nhật file này.

## Người dùng
- Là **product designer / UI-UX designer**, đang học **thạc sĩ Mỹ thuật ứng dụng**. Build website/product từ chính design của mình.
- Có thể nhờ viết **luận văn đạt chuẩn luận văn Việt Nam bậc đại học/thạc sĩ**. Khi đó áp dụng văn phong học thuật, bố cục chuẩn (mở đầu, tổng quan, cơ sở lý luận, phương pháp, kết quả, kết luận, tài liệu tham khảo).
- Giao tiếp bằng **tiếng Việt**. Giải thích ngắn gọn, dễ hiểu theo góc nhìn designer.

## Mục tiêu
Build website **cBay** mới, **nhiều trang con (tổng cộng 9 trang)** từ design Figma. Design được gửi **từng trang một**; xây dần theo từng đợt.
- Figma file: `https://www.figma.com/design/mtjL40VkIV6yM3ZlvOdYUh/-CBAy--Website` (fileKey `mtjL40VkIV6yM3ZlvOdYUh`).
- Mỗi trang có bản **desktop (1440)** và **mobile (390)**, kèm form/popup/menu và component biến thể.
- Kèm file code export từ công cụ design (`*.dc.html`, "Design Component") để tham chiếu **logic + tương tác**.

## Quy tắc làm việc (BẮT BUỘC)
1. **Giao diện (UI) theo Figma là chuẩn.** Ưu tiên đúng chuẩn design Figma: màu, font, cỡ chữ, khoảng cách, bo góc, đổ bóng, bố cục, asset. Dùng Figma MCP (`get_design_context`, `get_screenshot`) để lấy giá trị thật.
2. **Chỗ Figma chưa có design** thì làm theo file code export (`*.dc.html`).
3. **Logic và tương tác của trang** (tab, accordion, carousel, popup, form, menu...) làm **theo file code export**.
4. **Bổ sung animation xuất hiện** hợp lý (khi cuộn tới, vào trang, hover). Phải tôn trọng `prefers-reduced-motion`.
5. **Khi có thắc mắc hoặc phân vân giữa các lựa chọn → HỎI người dùng, không tự đoán.**
6. **Không huỷ bản hiện tại.** Bản landing 1 trang đang nằm ở nhánh `dev` (file ở gốc repo: `index.html`, `css/`, `js/`, `assets/`). Không sửa, không xoá, không di chuyển các file này.
7. **Không code trên `main`.** `main` là production, chỉ merge từ `dev` sau khi được duyệt.
8. Source phải **sắp xếp gọn để người dùng gửi cho dev**: thư mục rõ ràng, README hướng dẫn chạy, tokens tách riêng, component dùng chung (header/footer/form/popup) viết một lần.
9. Giữ nguyên nội dung tiếng Việt như design (không tự sửa copy). Dùng sẵn mã SĐT/Zalo/Facebook trong design hoặc trong landing cũ.

## Quyết định đã chốt
| Hạng mục | Quyết định |
| --- | --- |
| Công nghệ | **Vite + HTML/CSS/JS thuần, nhiều trang** (multi-page, partials dùng chung) |
| Thư mục site mới | `website/` (landing cũ ở gốc repo giữ nguyên) |
| Branch | `website/v2-multipage`, tạo từ `origin/dev` (để giữ nguyên landing). Commit + push lên branch này. **Không push vào `dev`/`main`** |
| Chạy dự án | `cd website && npm install && npm run dev` — xem `website/README.md` |
| Ngôn ngữ trang | `lang="vi"` |
| Font | Sora, Manrope (Google Fonts) — theo design |

## Tiến độ trang (cập nhật mỗi đợt)
| # | Trang | Trạng thái |
| --- | --- | --- |
| 1 | Trang chủ (`index.html`) | ✅ Đã dựng (desktop + mobile, khớp Figma 1440/390) |
| 2 | Neo Floor (`neo-floor.html`) | ✅ Đã dựng (desktop + mobile) |
| 3 | Về chúng tôi (`ve-chung-toi.html`) | ✅ Đã dựng (desktop + mobile) — Figma `277:199` / mobile `376:841` |
| 4 | Khách hàng — Dự án tiêu biểu (`khach-hang.html`) | ✅ Đã dựng (desktop + mobile) — Figma `279:231` / mobile `376:842` |
| 5 | Blog — tổng (`blog.html`) + bài viết chi tiết (`bai-viet.html`) | ✅ Đã dựng (desktop + mobile) — Figma `281:338` / `282:396`, mobile `376:843` / `376:844` |
| 6 | D8 Filler (`d8-filler.html`) | ✅ Đã dựng (desktop + mobile) — Figma `284:440` / mobile `376:846` |
| 7 | Vữa hiệu ứng VASA (`vua-hieu-ung.html`) | ✅ Đã dựng (desktop + mobile) — Figma `286:538` / mobile `376:847` |
| 8–9 | Keo dán gạch, Tài liệu (tên dự kiến) | Chờ design |

### Tên file trang dự kiến (CHƯA user xác nhận — link trong header/footer đang trỏ tới các tên này)
`d8-filler.html` · `vua-hieu-ung.html` · `keo-dan-gach.html` · `neo-floor.html` · `khach-hang.html` · `ve-chung-toi.html` · `blog.html` · `bai-viet.html` (chi tiết Blog) · `tai-lieu.html`

### Quyết định tạm (đã làm theo code/Figma, CHỜ user xác nhận)
- Nút "Liên hệ ngay" (header + khối CTA) → mở popup **Form liên hệ ngay** (Figma có form, code thiết kế thì mở Zalo).
- Popup dùng thử mặc định chọn "Nhận cả 2" (code); Figma bản chính hiển thị "Keo chống nứt D8".
- Nút "Nhận bản mẫu" ở trang Neo Floor mở form dùng thử (chỉ có lựa chọn D8/Vữa) — chưa có lựa chọn "Sàn SPC".
- Form: có `required` cho Tên + SĐT (code thiết kế không validate). Chưa gửi dữ liệu đi đâu.
- Popup tự bật sau 10s: **tắt** (code thiết kế mặc định `popupMode = tab`).
- Figma accordion D8 lặp chữ "Filler" 2 lần → đã bỏ lần lặp. Số thứ tự 01–04 chỉ có ở mục D8 trong Figma → đang hiện cho mục đang mở.
- Slide hero 2 trong Figma có nút "trước" màu xanh (khác slide 1,3) → dùng thống nhất: trước = trắng, sau = xanh.
- Ảnh mẫu **Marble Plus** chưa có → khung giữ chỗ.
- Trang Khách hàng: tab "Resort" Figma ghi 4 nhưng chỉ có 3 card Resort (và tổng 16) → số trên tab được TỰ ĐẾM từ danh sách (Resort = 3). Code thiết kế có thêm "Homestay Phố đi bộ Mộc Châu" (Resort) — Figma không có nên chưa đưa vào.
- Trang Khách hàng/Về chúng tôi: Figma header ghi "Sản phẩm – Giải pháp", "Tài liệu – Catalogue" (gạch dài); Trang chủ ghi "- Catalog" → đang dùng bản Trang chủ cho thống nhất.
- Nút "Tư vấn cho công trình của bạn" (hero Khách hàng) → mở form liên hệ. "Xem dự án" → cuộn tới danh sách.
- **Blog (đợt 4)**: tab lọc "Tin tức" theo Figma = Tất cả / Dự án tiêu biểu / Sự kiện / Tin tức (code thiết kế dùng chủ đề khác: Kiến thức vật liệu/Hướng dẫn thi công/Tin cBay → các nhãn này vẫn hiện trên thẻ). 6 thẻ Figma xếp vào nhóm "Tin tức"; 4 bài nổi bật (DeMont, Workshop, Neo Floor Marble Plus, Moco) cũng là bài thường → hiện khi bấm "Xem thêm bài viết" hoặc lọc theo nhóm.
- **Blog**: mọi thẻ bài viết đều dẫn tới 1 trang chi tiết mẫu `bai-viet.html` (bài DeMont Cafe) vì mới có 1 design chi tiết (code thiết kế cũng làm vậy). Tên file `bai-viet.html` CHƯA user xác nhận.
- **Blog tổng**: ảnh bài "Workshop" và "Neo Floor Marble Plus" (tab nổi bật) Figma không có → lấy từ zip code thiết kế. Ảnh 4 dự án phụ (Moco, The View, Thúng Mơ, Time Coffee) dùng ảnh từ trang Khách hàng. Tự chuyển bài nổi bật sau 7s (code), dừng khi rê chuột/focus và khi bật giảm chuyển động; thanh tiến trình trên tab (code) KHÔNG làm vì Figma tab active là đường xanh đặc.
- **Blog chi tiết**: Figma desktop không có cột "Chia sẻ" (code có) → không làm. Mục lục: tô sáng theo vị trí cuộn + bấm để cuộn (code).
- **Blog chi tiết mobile**: Figma mobile bị CẮT do frame cố định chiều cao (tiêu đề 3 dòng bị cụt, khối meta "Đăng bởi/Ngày đăng…" ẩn, 3 ô thống kê bị nén 95px) → ĐÃ hiển thị đầy đủ theo ý đồ (meta như desktop, ô thống kê đủ padding, nên trang dài hơn Figma ~250px). Cần user xác nhận.
- Blog mobile: thumbnail dự án (5 ảnh) Figma không vẽ trạng thái chọn → giữ như desktop (mờ 55% + viền xanh cho ảnh đang chọn).
- **D8 (đợt 5)**: thứ tự mục theo Figma (Hero → Dự án → Tính năng → Video → Thông số → Tài liệu → Liên quan; code thiết kế xếp khác). Số liệu theo Figma ("1L & 5L", 1 tài liệu PDF) thay vì code ("5L ~4,5 kg", 2 tài liệu). Chấm tròn "Chứng nhận" trong pill Figma để trống (nền green-100) — code có ảnh chứng nhận nhỏ.
- **D8**: popup "Chứng nhận Bộ Xây Dựng" (bấm pill) Figma chưa có → làm theo code (ảnh chứng nhận + chú thích). Video: bấm mở link Google Drive tab mới (code). Tài liệu PDF: link `#` chờ file thật.
- **D8 Tính năng**: thanh tiến trình chạy 5s rồi tự sang mục kế, dừng khi rê chuột (code). Figma không có số 01–04 và không có bộ đếm trên ảnh → không làm. Ảnh mục 2–4 Figma không vẽ → ảnh hero + ảnh Masteri, HUD (như code).
- **D8 carousel**: mỗi lần đi 1 thẻ; nhãn "01 / 05" cố định tổng 5 (Figma) cả trên mobile.
- **VASA (đợt 5)**: Figma "quạt mẫu" dùng nhãn Vân hoa / Vân xước / Vân khối / Vân nhám / Travertine / Vân đá / Tường đất / Rơm trấu (khác tên trong code: Nhám đặc, Giả gạch, Vỏ cây…) → theo Figma, kèm ảnh texture Figma. Mặc định chọn "Vân hoa".
- **VASA — CẦN HỎI USER**: (1) Figma có 2 nút "Xoay nhà" góc trên trái và dòng "kéo ngang để xoay 360°" nhưng không có ảnh/asset xoay → tạm cho 2 nút này chuyển mẫu hiệu ứng trước/sau (giống nút ở thanh chú thích), chưa có kéo xoay. (2) Ảnh phòng khách (do user gửi) đã có cho 4 mẫu: Vân hoa, Vân khối, Vân nhám, Vân đá (thay ảnh phòng khách trong Figma của Vân hoa bằng ảnh user gửi để cùng bộ). 4 mẫu còn lại (Vân xước, Travertine, Tường đất, Rơm trấu) tạm hiện ảnh texture — chờ ảnh phòng khách.
- **VASA**: popup "Xem chi tiết" (4 tab: Tổng quan / Thông số / Vận chuyển & bảo quản / An toàn) Figma chưa có → làm theo code, dùng khung popup chi tiết có sẵn. "Nhận bản mẫu" mở form dùng thử, chọn sẵn Vữa hiệu ứng.
- **Related (D8, VASA)**: thẻ liên quan = Vữa VASA/D8 + Neo Floor + Keo dán gạch (Figma). Trên mobile cuộn ngang, thẻ Neo Floor cao hơn (Figma).
- Header: nhóm "Sản phẩm – Giải pháp" không tô nền ở trang sản phẩm (Figma không tô), nút trang hiện tại khác (Blog…) tô nền ink/100.
- Header: nút trang hiện tại có nền `ink/100` (theo Figma "Blog" ở trang Blog) → thêm style cho mọi trang.
- Tên menu: Figma footer "Vữa hiệu ứng / Giải pháp chống thấm", code "Vữa trắng phong cách / Keo dán gạch chống thấm" → dùng Figma ở footer, code ở dropdown.

### Node Figma đợt 5 — D8 + VASA (4 node)
- Desktop: D8 `284:440`, VASA `286:538` · Mobile: D8 `376:846`, VASA `376:847` (component Feature showcase `339:649`)

### Node Figma đợt 4 — Blog (4 node)
- Desktop: Blog tổng `281:338`, Blog chi tiết `282:396` · Mobile: Blog tổng `376:843`, Blog chi tiết `376:844`

### Node Figma đợt 1 (19 node)
- Desktop: Home `270:319`, Neo floor `270:1209`
- Mobile: Home `376:840`, Neo floor `376:845`, Menu mở `389:2355`
- Form/popup desktop: `346:732` (D8), `346:733` + `346:784` (vữa hiệu ứng), `346:886` (liên hệ ngay), `363:840` (chi tiết mẫu sàn SPC)
- Form/popup mobile: `389:2067`, `389:2117`, `389:2167`, `389:2217`, `389:2272`
- Component/biến thể: `317:1926` (accordion sản phẩm), `317:1752` (hero), `324:2793` (feature showcase), `352:652` (nút tròn + effect swatch vữa hiệu ứng)

## Ghi chú kỹ thuật
- Container desktop `max-width 1440`, padding ngang 64–80. Mobile thiết kế ở 390.
- Landing cũ dùng quy ước animation `data-anim="fade-up | slide-left | slide-right | zoom | fade"` và `--d` (delay). Site mới giữ cùng quy ước để dev quen.
- Ảnh phải lấy từ **Figma** (không dùng ảnh trong zip code vì khác ảnh thật trong design). Icon/SVG tải từ Figma, lưu ở `website/public/assets/`.
- Bản xem thử gộp 1 file (`npm run build:preview` → `website/dist-preview/cbay-preview.html`): chứa cả các trang đã dựng, chuyển trang bằng hash; dùng để đăng Artifact/gửi xem. Khi thêm trang mới phải thêm vào `scripts/build-preview.mjs` + `src/scripts/pages/preview.js`.
- Kiểm tra giao diện: chụp trang bằng Playwright rồi so với `get_screenshot` của Figma (chiều cao trang Home 5287 / Neo 5971 đã khớp).
- Liên hệ: Hotline `0795 363 888`, email `info@sisd.vn`, Zalo `https://zalo.me/0795363888`, Facebook `https://www.facebook.com/cBayvn/`.
