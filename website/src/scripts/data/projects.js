/**
 * Danh sách công trình tiêu biểu (trang Khách hàng) — lấy từ Figma "Khách hàng — Dự án tiêu biểu".
 * Thêm công trình: thêm 1 dòng vào PROJECTS + ảnh vào /public/assets/images/projects/list/.
 * Số lượng trên các tab được TỰ ĐỘNG đếm từ danh sách này.
 */
import { asset } from '../modules/asset.js';

export const TYPES = ['Tất cả', 'Resort', 'Nhà hàng', 'Office', 'Khách sạn', 'Biệt thự', 'Coffee Shop', 'Công trình'];

const D8 = 'Keo chống nứt D8 Filler';
const VASA = 'Vữa hiệu ứng VASA';

export const PROJECTS = [
  { name: 'Lotte Mall Tây Hồ', type: 'Công trình', loc: 'Tây Hồ — Hà Nội', product: D8, img: asset('assets/images/projects/list/lotte-mall-tay-ho.webp') },
  { name: 'DeMont Cafe', type: 'Coffee Shop', loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/demont-cafe.webp') },
  { name: 'Vlasta Sầm Sơn', type: 'Resort', loc: 'Sầm Sơn — Văn Phú', product: D8, img: asset('assets/images/projects/list/vlasta-sam-son.webp') },
  { name: 'Somerset West Point Hồ Tây', type: 'Khách sạn', loc: 'Tây Hồ — Hà Nội', product: VASA, img: asset('assets/images/projects/list/somerset-west-point.webp') },
  { name: 'HUD Tower', type: 'Office', loc: 'Lê Văn Lương — Hà Nội', product: D8, img: asset('assets/images/projects/list/hud-tower.webp') },
  { name: 'Wine Tapas 99/81', type: 'Nhà hàng', loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/wine-tapas-99-81.webp') },
  { name: 'The View Phú Quý', type: 'Resort', loc: 'Đảo Phú Quý', product: VASA, img: asset('assets/images/projects/list/the-view-phu-quy.webp') },
  { name: 'Masteri Ocean Park', type: 'Công trình', loc: 'Ocean Park Gia Lâm — Hà Nội', product: D8, img: asset('assets/images/projects/list/masteri-ocean-park.webp') },
  { name: 'Alida Kafe', type: 'Coffee Shop', loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/alida-kafe.webp') },
  { name: 'Toà T — Place Tower', type: 'Office', loc: 'Lý Thường Kiệt — Hà Nội', product: D8, img: asset('assets/images/projects/list/place-tower.webp') },
  { name: 'Moco Long Hải Coffee', type: 'Coffee Shop', loc: 'Long Hải', product: VASA, img: asset('assets/images/projects/list/moco-long-hai.webp') },
  { name: 'Trung tâm Hành chính – Chính trị TP Hải Phòng', type: 'Công trình', loc: 'Hải Phòng', product: D8, img: asset('assets/images/projects/list/trung-tam-hanh-chinh-hai-phong.webp') },
  { name: 'Time Coffee Vĩnh Lại', type: 'Coffee Shop', loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/time-coffee-vinh-lai.webp') },
  { name: 'Nhà công vụ – Học viện Quốc Phòng', type: 'Công trình', loc: 'Cầu Giấy — Hà Nội', product: D8, img: asset('assets/images/projects/list/nha-cong-vu-hoc-vien-quoc-phong.webp') },
  { name: 'Thúng Mơ Homestay', type: 'Resort', loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/thung-mo-homestay.webp') },
  { name: 'Trụ sở Đoàn Nghi lễ Quân đội', type: 'Công trình', loc: 'Khương Đình — Hà Nội', product: D8, img: asset('assets/images/projects/list/doan-nghi-le-quan-doi.webp') },
];
