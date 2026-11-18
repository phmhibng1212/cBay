/**
 * Dữ liệu bộ sưu tập sàn Neo Floor (lấy từ code thiết kế).
 * Thêm mã màu mới: thêm 1 object vào mảng `skus` của dòng tương ứng + ảnh vào /public/assets/images/swatches/.
 */
import { asset } from '../modules/asset.js';

export const LINES = [
  {
    id: 'eco-plus',
    label: 'Eco Plus',
    name: 'NEO ECO PLUS',
    segment: 'Hàng thông thường – Gỗ WOODEN',
    thickness: '5.0mm (lớp cốt 4.0mm + đế lót IXPE 1.0mm)',
    size: '915mm × 152mm × 5.0mm',
    wear: '0.3mm',
    pack: '15 tấm/hộp (2.08 m²/hộp)',
    weight: '18 kg/hộp',
    skus: [
      { code: 'P0002', color: 'Gỗ Sồi Xám', pattern: 'Gỗ Nhám Tự nhiên', size: '915mm × 152mm × 4.0mm', img: asset('assets/images/swatches/p0002.webp') },
      { code: 'P0006', color: 'Gỗ Sồi', pattern: 'Gỗ Sáng mịn', img: asset('assets/images/swatches/p0006.webp') },
      { code: 'P0007', color: 'Gỗ Óc Chó', pattern: 'Gỗ Vân nổi', img: asset('assets/images/swatches/p0007.webp') },
      { code: 'P0010', color: 'Gỗ Trầm Hương', pattern: 'Gỗ Mờ Tinh tế', img: asset('assets/images/swatches/p0010.webp') },
      { code: 'P0012', color: 'Gỗ Sồi Trắng', pattern: 'Gỗ Chạm khắc', img: asset('assets/images/swatches/p0012.webp') },
      { code: 'P0017', color: 'Gỗ Xám Sáng', pattern: 'Gỗ Mờ Tinh tế', img: asset('assets/images/swatches/p0017.webp') },
      { code: 'P0018', color: 'Gỗ Óc Chó', pattern: 'Gỗ Tự nhiên', img: asset('assets/images/swatches/p0018.webp') },
      { code: 'P0037', color: 'Gỗ Lim', pattern: 'Gỗ Chạm khắc', img: asset('assets/images/swatches/p0037.webp') },
      { code: 'P0064', color: 'Gỗ Óc Chó Sậm', pattern: 'Gỗ Vân nổi', img: asset('assets/images/swatches/p0064.webp') },
    ],
  },
  {
    id: 'marble-plus',
    label: 'Marble Plus',
    name: 'NEO MARBLE PLUS',
    segment: 'Hàng vân đá – Gỗ WOODEN',
    thickness: '6.0mm (lớp cốt 5.0mm + đế lót IXPE 1.0mm)',
    size: '915mm × 152mm × 6.0mm',
    wear: '0.5mm',
    pack: '12 tấm/hộp (1,6692 m²/hộp)',
    weight: '17,50 kg/hộp',
    skus: [
      { code: 'P0368', color: 'Đá Sồi Khói', pattern: 'Vân đá gỗ tự nhiên nhám', img: asset('assets/images/swatches/p0368.webp') },
      { code: 'P0369', color: 'Đá Vôi Tự nhiên', pattern: 'Vân đá tự nhiên nhám mềm', img: asset('assets/images/swatches/p0369.webp') },
      { code: 'P0370', color: 'Đá Sa Thạch Khói', pattern: 'Vân đá tự nhiên nhám mờ', img: asset('assets/images/swatches/p0370.webp') },
    ],
  },
];

export const WARRANTY = '02 năm nhà ở dân dụng\n01 năm công trình thương mại\nLớp cốt: 10 năm';
