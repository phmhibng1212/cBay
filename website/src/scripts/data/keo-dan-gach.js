/**
 * Dữ liệu trang Keo dán gạch chống thấm — Figma "Giải pháp — Keo dán gạch chống thấm" (287:592)
 * + khối "Product detail · Keo dán gạch" (358:1904) và code thiết kế (Kdg.dc.html).
 */
import { asset } from '../modules/asset.js';

/** 3 sản phẩm. `cmp` = số liệu dùng cho cả bảng so sánh lẫn tab "Chỉ tiêu kỹ thuật"; `tiles` = [vị trí, rộng mm, cao mm, ghi chú]. */
export const KDG_PRODUCTS = [
  {
    code: 'TA-S100', standard: 'Chuẩn C1T · TCVN · ISO 13007', short: 'Siêu dính thông dụng', name: 'Keo dán gạch loại siêu dính thông dụng TA-S100 VASA',
    img: asset('assets/images/keo-dan-gach/bag-ta-s100.webp'), powder: 'bột màu xám',
    desc: 'Keo dán gạch siêu dính TA-S100 VASA được pha chế bằng xi măng chất lượng cao làm chất kết dính vô cơ, với cốt lõi là cát đã được phân loại tinh chế, đồng thời bổ sung nhiều loại phụ gia polymer chức năng. Loại keo này có tính ứng dụng cao, phù hợp với nhiều loại gạch. Sản phẩm phù hợp để sử dụng trên các bề mặt vững chắc như vữa, bê tông, xi măng, tường gạch,...',
    pros: ['Tính thông dùng cao', 'Độ bám dính cao', 'Có thể chống rơi gạch trong quá trình thi công', 'Thi công trơn tru, dễ nhào', 'Bảo vệ môi trường'],
    tiles: [['Nội thất', 600, 600, 'Độ hút nước của gạch > 3%'], ['Nội thất', 300, 600, 'Độ hút nước của gạch 0.2 – 3%'], ['Ngoại thất', 300, 300, 'Độ hút nước của gạch > 3%'], ['Ngoại thất', 100, 200, 'Độ hút nước của gạch 0.2 – 3%']],
    cmp: { use: 'Đa dụng, nhiều loại gạch', in: '600 × 600mm', out: '300 × 300mm', bond: '≥ 0.5 MPa', std: 'C1T' },
  },
  {
    code: 'TA-S101', standard: 'Chuẩn GB/T25181-2019 · loại I', short: 'Tiết kiệm', name: 'Keo dán gạch tiết kiệm TA-S101 VASA',
    img: asset('assets/images/keo-dan-gach/bag-ta-s101.webp'), powder: 'bột xám hoặc trắng',
    desc: 'Keo dán gạch tiết kiệm TA-S101 VASA được pha chế bằng xi măng chất lượng cao làm vật liệu kết dính vô cơ, cát phân loại tinh chế làm cốt liệu, và bổ sung nhiều loại phụ gia chức năng khác nhau, chỉ cần thêm nước và khuấy đều là có thể sử dụng. Sản phẩm có ưu điểm so với các sản phẩm truyền thống khi là vật liệu kết dính có thể sử dụng trực tiếp mà không cần ngâm nước trước. Loại keo này đặc biệt chuyên sử dụng để dán các loại gạch men thông thường trong nhà.',
    pros: ['Độ bám dính cao', 'Miếng dán mỏng giúp tiết kiệm không gian', 'Cấu trúc mịn và dễ nhào trộn', 'Thân thiện với môi trường'],
    tiles: [['Nội thất', 600, 600, 'Gạch men hút nước cao (≥ 6%)']],
    cmp: { use: 'Gạch men thông thường trong nhà', in: '600 × 600mm', out: '—', bond: '≥ 0.5 MPa', std: 'GB/T25181 loại I' },
  },
  {
    code: 'TA-S106', standard: 'Chuẩn C1T · TCVN · ISO 13007', short: 'Dành cho gạch nặng', name: 'Keo dán gạch loại gạch nặng TA-S106 VASA',
    img: asset('assets/images/keo-dan-gach/bag-ta-s106.webp'), powder: 'bột màu xám',
    desc: 'Keo dán gạch loại gạch nặng TA-S106 VASA được pha chế bằng xi măng chất lượng cao làm chất kết dính vô cơ, với cốt liệu là cát đã được phân loại tinh chế, đồng thời bổ sung nhiều loại phụ gia polymer chức năng. Sản phẩm có thể được sử dụng trực tiếp luôn sau khi thêm nước, phù hợp trên các bề mặt vững chắc như vữa, bê tông, xi măng, tường gạch,...',
    pros: ['Độ bám dính siêu cao', 'Có thể chống rơi gạch trong quá trình thi công', 'Thi công trơn tru, dễ nhấn ép', 'Bảo vệ môi trường'],
    tiles: [['Nội thất', 800, 800, 'Độ hút nước của gạch 0.2 – 0.5%'], ['Nội thất', 300, 600, 'Độ hút nước của gạch < 0.2%'], ['Ngoại thất', 300, 300, 'Độ hút nước của gạch 0.2 – 0.5%'], ['Ngoại thất', 100, 200, 'Độ hút nước của gạch < 0.2%']],
    cmp: { use: 'Gạch khổ lớn, gạch nặng', in: '800 × 800mm', out: '300 × 300mm', bond: '≥ 1.0 MPa', std: 'C1T' },
  },
];

/** Hàng của bảng so sánh: [nhãn, khoá trong cmp (null = cố định), cỡ chữ lớn?] */
export const KDG_ROWS = [
  ['Phù hợp', 'use', false],
  ['Tiêu chuẩn', 'std', false],
  ['Bám dính ban đầu', 'bond', true],
  ['Khổ gạch nội thất tối đa', 'in', true],
  ['Khổ gạch ngoại thất tối đa', 'out', true],
  ['Quy cách', null, false],
];

/** Tab "Chỉ tiêu kỹ thuật": [nhãn, khoá trong cmp] */
export const KDG_SPEC_ROWS = [
  ['Tiêu chuẩn', 'std'],
  ['Cường độ bám dính ban đầu', 'bond'],
  ['Khổ gạch nội thất tối đa', 'in'],
  ['Khổ gạch ngoại thất tối đa', 'out'],
  ['Phù hợp', 'use'],
  ['Quy cách đóng gói', null],
];

export const KDG_SUBTABS = ['Tổng quan', 'Khổ gạch phù hợp', 'Chỉ tiêu kỹ thuật', 'Bảo quản & an toàn'];

/** Tab "Bảo quản & an toàn" (giống nhau cho cả 3 sản phẩm) */
export const KDG_CARE = [
  { icon: 'care-umbrella', title: 'Tránh mưa, va đập', text: 'Trong quá trình vận chuyển để tránh làm hỏng bao bì.' },
  { icon: 'care-warehouse', title: 'Kho khô ráo, thoáng mát', text: 'Chống ẩm, nghiêm cấm tiếp xúc với nước.' },
  { icon: 'care-clock', title: 'Bảo quản 12 tháng', text: 'Trong điều kiện vận chuyển và bảo quản thông thường.' },
  { icon: 'care-shield', title: 'An toàn khi thi công', text: 'Có thành phần gây kích ứng mắt và da — mang đồ bảo hộ. Nếu bắn vào mắt, rửa ngay bằng nước sạch và đi khám kịp thời.' },
];
