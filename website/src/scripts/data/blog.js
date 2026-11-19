/**
 * Dữ liệu trang Blog — lấy từ Figma "Blog — Trang tổng" (281:338) và code thiết kế (Blog.dc.html).
 * Thêm bài viết: thêm 1 dòng vào POSTS (+ ảnh vào /public/assets/images/blog/).
 * Khi có backend/CMS: thay mảng này bằng dữ liệu API cùng cấu trúc.
 */
import { asset } from '../modules/asset.js';

// Ảnh dùng nhiều lần: khai báo 1 lần (bản xem thử gộp nhúng ảnh theo từng chỗ gọi asset())
const IMG_DEMONT = asset('assets/images/blog/demont-cafe.webp');
const IMG_MOCO = asset('assets/images/projects/list/moco-long-hai.webp');

/** Link tới trang chi tiết. Hiện mới có 1 bài mẫu (DeMont Cafe) nên mọi bài đều trỏ về trang này. */
export const POST_URL = './bai-viet.html';

/** Tab lọc trong khối "Tin tức" (Figma: Tất cả / Dự án tiêu biểu / Sự kiện / Tin tức) */
export const TOPICS = ['Tất cả', 'Dự án tiêu biểu', 'Sự kiện', 'Tin tức'];

/**
 * Mọi bài viết. `type` = nhóm dùng cho tab lọc; `cat` = nhãn nhỏ hiện trên thẻ.
 * 6 bài đầu là 6 thẻ trong Figma; 4 bài sau là 4 bài nổi bật (hiện khi bấm "Xem thêm bài viết" hoặc lọc theo nhóm).
 */
export const POSTS = [
  {
    type: 'Tin tức', cat: 'Hướng dẫn thi công',
    title: 'Vì sao mối nối tấm thạch cao bị nứt và cách xử lý dứt điểm',
    excerpt: 'Ba nguyên nhân phổ biến khiến mối nối nứt sau vài tháng, và quy trình xử lý với keo chống nứt D8.',
    excerptM: 'Ba nguyên nhân phổ biến khiến mối nối nứt sau vài tháng, và quy trình xử lý với keo chống nứt D8 Filler.', // Figma mobile ghi "D8 Filler"
    meta: '20/10/2026 · 5 phút đọc', img: asset('assets/images/blog/post-thach-cao.webp'),
  },
  {
    type: 'Tin tức', cat: 'Kiến thức vật liệu',
    title: 'Vữa hiệu ứng là gì? 6 bề mặt phổ biến cho nội thất hiện đại',
    excerpt: 'Từ nhám đặc, giả gạch đến bóng sứ — chọn hiệu ứng phù hợp với phong cách không gian.',
    meta: '14/10/2026 · 6 phút đọc', img: asset('assets/images/blog/post-vua-hieu-ung.webp'),
  },
  {
    type: 'Tin tức', cat: 'Kiến thức vật liệu',
    title: 'Chọn keo dán gạch theo khổ gạch: TA-S100, S101 hay S106?',
    excerpt: 'Bảng tra nhanh khổ gạch tối đa và độ bám dính để chọn đúng loại keo ngay từ đầu.',
    meta: '08/10/2026 · 4 phút đọc', img: asset('assets/images/blog/post-keo-dan-gach.webp'),
  },
  {
    type: 'Tin tức', cat: 'Kiến thức vật liệu',
    title: 'Sàn đá SPC có thực sự chống nước? Hiểu đúng về lõi đá',
    excerpt: 'Cấu tạo nhiều lớp của sàn SPC và những khu vực nên – không nên lắp đặt.',
    meta: '30/09/2026 · 5 phút đọc', img: asset('assets/images/blog/post-san-spc.webp'),
  },
  {
    type: 'Tin tức', cat: 'Hướng dẫn thi công',
    title: 'Quy trình chống thấm mái bê tông với WM-102 trong 5 bước',
    excerpt: 'Chuẩn bị bề mặt, trộn hai thành phần, thi công lớp lót và lớp phủ — làm đúng một lần.',
    meta: '22/09/2026 · 7 phút đọc', img: asset('assets/images/blog/post-chong-tham.webp'),
  },
  {
    type: 'Tin tức', cat: 'Tin cBay',
    title: 'cBay mở rộng mạng lưới đại lý phân phối khu vực phía Nam',
    excerpt: 'Thêm điểm phân phối giúp nhà thầu nhận hàng nhanh hơn và được hỗ trợ kỹ thuật tại chỗ.',
    meta: '15/09/2026 · 3 phút đọc', img: asset('assets/images/blog/post-dai-ly.webp'),
  },
  // ---- 4 bài nổi bật (cũng là bài viết thường, hiện thêm khi "Xem thêm") ----
  {
    type: 'Dự án tiêu biểu', cat: 'Dự án tiêu biểu',
    title: 'DeMont Cafe: khi bức tường kể chuyện bằng chất liệu',
    excerpt: 'Vữa hiệu ứng VASA tạo bề mặt thô mộc, ấm áp cho quán cà phê — thi công nhanh, không bụi, không đục phá.',
    meta: '12/10/2026 · 6 phút đọc', img: IMG_DEMONT,
  },
  {
    type: 'Sự kiện', cat: 'Sự kiện',
    title: 'Workshop “Hoàn thiện tường không mối nối” cùng D8 Filler',
    excerpt: 'Buổi thực hành xử lý mối nối tấm thạch cao trực tiếp cùng kỹ thuật viên cBay.',
    meta: '22/11/2026', img: asset('assets/images/blog/event-workshop.webp'),
  },
  {
    type: 'Tin tức', cat: 'Tin tức',
    title: 'Neo Floor ra mắt bộ sưu tập Marble Plus vân đá cẩm thạch',
    excerpt: 'Ba mẫu vân đá mới cho sàn SPC — sang trọng như đá tự nhiên, nhẹ và chống nước.',
    meta: '28/10/2026', img: asset('assets/images/blog/news-marble-plus.webp'),
  },
  {
    type: 'Dự án tiêu biểu', cat: 'Dự án tiêu biểu',
    title: 'Moco Long Hải: vữa hiệu ứng giữa gió biển và nắng gắt',
    excerpt: 'Bề mặt giữ màu ổn định trong môi trường biển, tạo chiều sâu cho mảng tường lớn.',
    meta: '05/10/2026 · 5 phút đọc', img: IMG_MOCO,
  },
];

/** 4 bài ở khối "Tin nổi bật" (thứ tự theo Figma). Mỗi bài trỏ tới 1 bài trong POSTS. */
export const FEATURED = [6, 7, 8, 9].map((i) => ({
  ...POSTS[i],
  tag: POSTS[i].cat,
  date: POSTS[i].meta.slice(0, 10),
}));

/** Khối "Dự án tiêu biểu" (5 dự án, thứ tự theo Figma). Ảnh: DeMont từ Figma Blog; 4 dự án còn lại là ảnh trang Khách hàng. */
const VASA = 'Vữa hiệu ứng VASA';
export const SHOWCASE = [
  {
    name: 'DeMont Cafe', tag: 'Cà phê', used: [VASA],
    img: IMG_DEMONT,
    story: 'Một quán cà phê muốn bề mặt tường thô mộc nhưng vẫn sạch sẽ, dễ bảo trì. Hiệu ứng nhám đặc được thi công trực tiếp trên nền cũ, không bụi, hoàn thiện gọn trong thời gian quán tạm nghỉ.',
  },
  {
    name: 'Moco Long Hải Coffee', tag: 'Cà phê', used: [VASA],
    img: IMG_MOCO,
    story: 'Không gian sát biển cần bề mặt chịu được gió muối và nắng gắt. Vữa hiệu ứng giữ màu ổn định và tạo chiều sâu cho mảng tường lớn.',
  },
  {
    name: 'The View Phú Quý', tag: 'Nghỉ dưỡng', used: [VASA],
    img: asset('assets/images/projects/list/the-view-phu-quy.webp'),
    story: 'Khu nghỉ dưỡng chọn tông trắng ấm và bề mặt thủ công để hoà vào cảnh quan đảo.',
  },
  {
    name: 'Thúng Mơ Homestay', tag: 'Homestay', used: [VASA],
    img: asset('assets/images/projects/list/thung-mo-homestay.webp'),
    story: 'Homestay nhỏ với tinh thần mộc mạc — vữa hiệu ứng thay cho sơn phẳng, tạo cảm giác gần gũi tự nhiên.',
  },
  {
    name: 'Time Coffee Vĩnh Lại', tag: 'Cà phê', used: [VASA],
    img: asset('assets/images/projects/list/time-coffee-vinh-lai.webp'),
    story: 'Bề mặt vữa nhám kết hợp ánh sáng ấm, tạo điểm nhấn thị giác cho quầy bar và khu ngồi chính.',
  },
];

/** Bài viết liên quan (trang chi tiết): 3 bài theo Figma 282:396 */
export const RELATED = [
  { ...POSTS[1], meta: '14/10/2026 · 6 phút đọc' },
  { ...POSTS[0], meta: '20/10/2026 · 5 phút đọc' },
  { ...POSTS[9], cat: 'Dự án tiêu biểu', meta: '05/10/2026 · 5 phút đọc' },
];
