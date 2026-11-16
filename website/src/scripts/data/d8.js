/**
 * Dữ liệu trang D8 Filler — lấy từ Figma "Giải pháp — Keo chống nứt D8" (284:440) và code thiết kế (D8.dc.html).
 */
import { asset } from '../modules/asset.js';

/** Carousel "Những dự án nổi bật sử dụng D8 Filler" (thứ tự theo Figma) */
export const D8_PROJECTS = [
  { name: 'Lotte Mall Tây Hồ', tag: 'Trung tâm thương mại', loc: 'Tây Hồ — Hà Nội', img: asset('assets/images/d8/proj-lotte-mall-tay-ho.webp') },
  { name: 'Vlasta Sầm Sơn', tag: 'Khu nghỉ dưỡng', loc: 'Sầm Sơn — Văn Phú', img: asset('assets/images/d8/proj-vlasta-sam-son.webp') },
  { name: 'Masteri Ocean Park', tag: 'Chung cư', loc: 'Ocean Park Gia Lâm — Hà Nội', img: asset('assets/images/d8/proj-masteri-ocean-park.webp') },
  { name: 'Học viện Quốc Phòng', tag: 'Toà nhà công vụ', loc: 'Cầu Giấy — Hà Nội', img: asset('assets/images/d8/proj-hoc-vien-quoc-phong.webp') },
  { name: 'HUD Tower', tag: 'Toà nhà', loc: 'Lê Văn Lương — Hà Nội', img: asset('assets/images/d8/proj-hud-tower.webp') },
  { name: 'Toà T — Place Tower', tag: 'Toà nhà', loc: 'Lý Thường Kiệt — Hà Nội', img: asset('assets/images/d8/proj-place-tower.webp') },
  { name: 'Trụ sở đoàn Nghi Lễ Quân Đội', tag: 'Bộ tổng tham mưu', loc: 'Khương Đình — Hà Nội', img: asset('assets/images/d8/proj-doan-nghi-le-quan-doi.webp') },
];

/** 4 lợi thế (tab + ảnh). Ảnh 1 từ Figma; ảnh 2–4 Figma không vẽ → dùng ảnh hero + ảnh công trình (như code thiết kế). */
export const D8_FEATURES = [
  {
    title: 'Xử lý vết nứt mối nối vượt trội',
    desc: 'Chuyên biệt cho vết nứt phi kết cấu tại mối nối vật liệu lắp ghép. Hấp thụ, hạn chế vết nứt hình thành và tái xuất hiện.',
    img: asset('assets/images/d8/feature-1.webp'), alt: 'D8 Filler trên tấm xi măng tại công trình', pos: '50% 60%',
  },
  {
    title: 'Độ bám dính cao',
    desc: 'Công thức polymer cải tiến tăng liên kết với nhiều loại bề mặt, giúp lớp keo bám chắc và ổn định trong suốt quá trình sử dụng.',
    img: asset('assets/images/d8/hero.webp'), alt: 'Thùng keo D8 Filler tại công trình', pos: '50% 60%',
  },
  {
    title: 'Thích ứng đa dạng vật liệu',
    desc: 'Tương thích Cemboard, bê tông đúc sẵn, bê tông nhẹ EPS, ALC, Acotec, panel lõi thép và tấm sợi Cellulose, dăm gỗ.',
    img: asset('assets/images/d8/proj-masteri-ocean-park.webp'), alt: 'Công trình Masteri Ocean Park sử dụng D8 Filler', pos: '50% 50%',
  },
  {
    title: 'Dễ thi công và hoàn thiện',
    desc: 'Tạo phẳng tốt, dễ kết hợp với lớp bả matit và sơn hoàn thiện, nâng cao tính thẩm mỹ cho bề mặt công trình.',
    img: asset('assets/images/d8/proj-hud-tower.webp'), alt: 'Công trình HUD Tower hoàn thiện', pos: '50% 30%',
  },
];
