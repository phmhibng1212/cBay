/**
 * Danh sách công trình tiêu biểu (trang Khách hàng) — lấy từ Figma "Khách hàng — Dự án tiêu biểu".
 * Thêm công trình: thêm 1 dòng vào PROJECTS + ảnh vào /public/assets/images/projects/list/.
 * Số lượng trên các tab được TỰ ĐỘNG đếm từ danh sách này.
 */
import { asset } from '../modules/asset.js';

/** Nhóm lọc (tab). Một dự án có thể thuộc nhiều nhóm (tags). Nhãn nhỏ trên thẻ là `type`. */
export const TYPES = ['Tất cả', 'Công trình trọng điểm', 'Khu đô thị', 'Office', 'Nghỉ dưỡng', 'F&B'];

const KEY = 'Công trình trọng điểm';
const URB = 'Khu đô thị';
const OFF = 'Office';
const RES = 'Nghỉ dưỡng';
const FNB = 'F&B';

const D8 = 'Keo chống nứt D8 Filler';
const VASA = 'Vữa hiệu ứng VASA';

export const PROJECTS = [
  { name: 'Trống Đồng Palace Cảnh Hồ', type: 'Nhà hàng', tags: [KEY, FNB], loc: 'Trường Trinh — Hà Nội', product: D8, img: asset('assets/images/projects/list/trong-dong-canh-ho.webp') },
  { name: 'Lotte Mall Tây Hồ', type: 'Công trình', tags: [KEY], loc: 'Tây Hồ — Hà Nội', product: D8, img: asset('assets/images/projects/list/lotte-mall-tay-ho.webp') },
  { name: 'DeMont Cafe', type: 'Coffee Shop', tags: [FNB], loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/demont-cafe.webp') },
  { name: 'Vlasta Sầm Sơn', type: 'Resort', tags: [RES], loc: 'Sầm Sơn — Văn Phú', product: D8, img: asset('assets/images/projects/list/vlasta-sam-son.webp') },
  { name: 'Somerset West Point Hồ Tây', type: 'Khách sạn', tags: [RES], loc: 'Tây Hồ — Hà Nội', product: VASA, img: asset('assets/images/projects/list/somerset-west-point.webp') },
  { name: 'HUD Tower', type: 'Office', tags: [OFF], loc: 'Lê Văn Lương — Hà Nội', product: D8, img: asset('assets/images/projects/list/hud-tower.webp') },
  { name: 'Wine Tapas 99/81', type: 'Nhà hàng', tags: [FNB], loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/wine-tapas-99-81.webp') },
  { name: 'The View Phú Quý', type: 'Resort', tags: [RES], loc: 'Đảo Phú Quý', product: VASA, img: asset('assets/images/projects/list/the-view-phu-quy.webp') },
  { name: 'Ciputra Hà Nội', type: 'Khu đô thị', tags: [KEY, URB], loc: 'Tây Hồ — Hà Nội', product: D8, img: asset('assets/images/projects/list/ciputra-ha-noi.webp') },
  { name: 'Masteri Ocean Park', type: 'Công trình', tags: [KEY, URB], loc: 'Ocean Park Gia Lâm — Hà Nội', product: D8, img: asset('assets/images/projects/list/masteri-ocean-park.webp') },
  { name: 'Alida Kafe', type: 'Coffee Shop', tags: [FNB], loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/alida-kafe.webp') },
  { name: 'Toà T — Place Tower', type: 'Office', tags: [OFF], loc: 'Lý Thường Kiệt — Hà Nội', product: D8, img: asset('assets/images/projects/list/place-tower.webp') },
  { name: 'Moco Long Hải Coffee', type: 'Coffee Shop', tags: [FNB], loc: 'Long Hải', product: VASA, img: asset('assets/images/projects/list/moco-long-hai.webp') },
  { name: 'Trung tâm Hành chính – Chính trị TP Hải Phòng', type: 'Công trình', tags: [KEY], loc: 'Hải Phòng', product: D8, img: asset('assets/images/projects/list/trung-tam-hanh-chinh-hai-phong.webp') },
  { name: 'Time Coffee Vĩnh Lại', type: 'Coffee Shop', tags: [FNB], loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/time-coffee-vinh-lai.webp') },
  { name: 'Nhà công vụ – Học viện Quốc Phòng', type: 'Công trình', tags: [KEY], loc: 'Cầu Giấy — Hà Nội', product: D8, img: asset('assets/images/projects/list/nha-cong-vu-hoc-vien-quoc-phong.webp') },
  { name: 'Thúng Mơ Homestay', type: 'Resort', tags: [RES], loc: 'Việt Nam', product: VASA, img: asset('assets/images/projects/list/thung-mo-homestay.webp') },
  { name: 'Trụ sở Đoàn Nghi lễ Quân đội', type: 'Công trình', tags: [KEY], loc: 'Khương Đình — Hà Nội', product: D8, img: asset('assets/images/projects/list/doan-nghi-le-quan-doi.webp') },
];
