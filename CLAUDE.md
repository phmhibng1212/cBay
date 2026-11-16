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
| 3–9 | D8 Filler, Vữa hiệu ứng, Keo dán gạch, Khách hàng, Về chúng tôi, Blog, Tài liệu (tên dự kiến) | Chờ design |

### Tên file trang dự kiến (CHƯA user xác nhận — link trong header/footer đang trỏ tới các tên này)
`d8-filler.html` · `vua-hieu-ung.html` · `keo-dan-gach.html` · `neo-floor.html` · `khach-hang.html` · `ve-chung-toi.html` · `blog.html` · `tai-lieu.html`

### Quyết định tạm (đã làm theo code/Figma, CHỜ user xác nhận)
- Nút "Liên hệ ngay" (header + khối CTA) → mở popup **Form liên hệ ngay** (Figma có form, code thiết kế thì mở Zalo).
- Popup dùng thử mặc định chọn "Nhận cả 2" (code); Figma bản chính hiển thị "Keo chống nứt D8".
- Nút "Nhận bản mẫu" ở trang Neo Floor mở form dùng thử (chỉ có lựa chọn D8/Vữa) — chưa có lựa chọn "Sàn SPC".
- Form: có `required` cho Tên + SĐT (code thiết kế không validate). Chưa gửi dữ liệu đi đâu.
- Popup tự bật sau 10s: **tắt** (code thiết kế mặc định `popupMode = tab`).
- Figma accordion D8 lặp chữ "Filler" 2 lần → đã bỏ lần lặp. Số thứ tự 01–04 chỉ có ở mục D8 trong Figma → đang hiện cho mục đang mở.
- Slide hero 2 trong Figma có nút "trước" màu xanh (khác slide 1,3) → dùng thống nhất: trước = trắng, sau = xanh.
- Ảnh mẫu **Marble Plus** chưa có → khung giữ chỗ.
- Tên menu: Figma footer "Vữa hiệu ứng / Giải pháp chống thấm", code "Vữa trắng phong cách / Keo dán gạch chống thấm" → dùng Figma ở footer, code ở dropdown.

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
- Kiểm tra giao diện: chụp trang bằng Playwright rồi so với `get_screenshot` của Figma (chiều cao trang Home 5287 / Neo 5971 đã khớp).
- Liên hệ: Hotline `0795 363 888`, email `info@sisd.vn`, Zalo `https://zalo.me/0795363888`, Facebook `https://www.facebook.com/cBayvn/`.
