/**
 * Dữ liệu trang Vữa hiệu ứng VASA — Figma "Giải pháp — Vữa hiệu ứng VASA" (286:538) + code thiết kế (Vasa.dc.html).
 */
import { asset } from '../modules/asset.js';

/** 2 dòng vữa. Phần `desc/pros/…` dùng cho popup "Xem chi tiết" (chỉ có trong code thiết kế). */
export const VASA_PRODUCTS = [
  {
    code: 'VASA DPC-100', name: 'Vữa thô DPC-100', kind: 'Vữa thô', img: asset('assets/images/vasa/bag-dpc-100.webp'),
    short: 'Vữa trắng chất cảm vô cơ cao cấp, bám dính tốt, dễ thi công, tạo bề mặt nhẵn mịn với hiệu ứng trang trí thẩm mỹ cao.',
    desc: 'VASA DPC-100 là vữa trắng chất cảm vô cơ cao cấp, được sản xuất từ cát chọn lọc, xi măng vô cơ màu trắng, chất độn mịn và phụ gia hiệu suất cao. Sản phẩm có độ bám dính tốt, dễ thi công, tạo bề mặt nhẵn mịn, mang lại hiệu ứng trang trí thẩm mỹ cao cho công trình.',
    pros: ['Dễ thi công, không chảy rơi khi san lấp lớp dày.', 'Chống ẩm, thoáng khí, ngăn ngừa nấm mốc.', 'Thân thiện môi trường, carbon thấp.', 'Ứng dụng đa dạng, phù hợp với nhiều bề mặt.'],
  },
  {
    code: 'VASA DPX-200', name: 'Vữa mịn DPX-200', kind: 'Vữa mịn', img: asset('assets/images/vasa/bag-dpx-200.webp'),
    short: 'Vữa trắng chất cảm vô cơ cao cấp cho bề mặt nhẵn mịn, tạo hiệu ứng trang trí đa dạng, phù hợp nhiều bề mặt.',
    desc: 'VASA DPX-200 là vữa trắng chất cảm vô cơ cao cấp, được sản xuất từ cát chọn lọc, xi măng vô cơ màu trắng, chất độn mịn và phụ gia hiệu suất cao. Sản phẩm có độ bám dính tốt, dễ thi công, tạo bề mặt nhẵn mịn, mang lại hiệu ứng trang trí thẩm mỹ cao cho công trình.',
    pros: ['Dễ thi công, không chảy rơi, bám dính tốt.', 'Chống ẩm, thoáng khí, ngăn ngừa nấm mốc.', 'Thân thiện môi trường, carbon thấp.', 'Tạo hiệu ứng trang trí đa dạng, phù hợp với nhiều bề mặt.'],
  },
];

/** Thông số kỹ thuật (tab trong popup chi tiết) */
export const VASA_SPECS = [
  ['Trạng thái', 'Đồng đều, không vón cục, không có tạp chất'],
  ['Tỷ lệ giữ nước', '≥ 88%'],
  ['Thời gian đông cứng', '3 – 12 giờ'],
  ['Tỷ lệ độ đặc tổn thất sau 2 giờ', '≤ 30%'],
  ['Cường độ kéo dãn bám dính sau 14 ngày', '≥ 0.20 MPa'],
  ['Tỷ lệ co ngót sau 28 ngày', '≤ 0.20%'],
  ['Cường độ chịu nén sau 28 ngày', '≥ 10 MPa'],
  ['Tính chống băng giá — tỷ lệ cường độ tổn thất', '≤ 25%'],
  ['Tính chống băng giá — tỷ lệ chất lượng tổn thất', '≤ 5%'],
];

export const VASA_STORAGE = [
  'Tránh dính mưa, va đập trong quá trình vận chuyển để tránh làm hỏng bao bì.',
  'Cần bảo quản trong kho khô ráo, thoáng mát, tránh ẩm ướt, không được để tiếp xúc với ánh nắng trực tiếp và với nước.',
  'Trong điều kiện vận chuyển và bảo quản thông thường, thời gian bảo quản sản phẩm là 6 tháng.',
  'Sản phẩm này nên được bảo quản ngoài tầm với của trẻ em để tránh vô tình ăn phải.',
];

export const VASA_SAFETY = [
  ['Quy định an toàn', 'Sản phẩm này có chứa các thành phần hóa học gây kích ứng mắt và da, vui lòng mang các dụng cụ bảo hộ cần thiết trong quá trình thi công. Nếu nó vô tình bắn vào mắt, bạn hãy rửa ngay bằng nước sạch và tìm cách điều trị y tế kịp thời.'],
  ['Lưu ý', 'Màng quấn palletizer và pallet đáy do nhà máy trang bị sẽ có lợi hơn cho việc chống thấm sản phẩm, chống bụi, chống ẩm và bảo vệ bao bì sản phẩm, vì vậy vui lòng không làm hỏng nó trước khi sử dụng! (Không cung cấp màng và pallet khi số lượng [...])'],
];

/**
 * 8 hiệu ứng trong quạt mẫu — thứ tự và tên nhãn theo Figma (từ trái sang phải).
 * Mẫu "Vân hoa" là mẫu đang chọn trong Figma. `room` = ảnh phòng khách có bức tường hoàn thiện (do user cung cấp, 4 mẫu: Vân hoa, Vân khối, Vân nhám, Vân đá);
 * mẫu chưa có `room` tạm hiện ảnh texture của mẫu.
 */
export const VASA_EFFECTS = [
  { name: 'Vân hoa', tex: asset('assets/images/vasa/fx-van-hoa.webp'), room: asset('assets/images/vasa/room-van-hoa.webp') },
  { name: 'Vân xước', tex: asset('assets/images/vasa/fx-van-xuoc.webp') },
  { name: 'Vân khối', tex: asset('assets/images/vasa/fx-van-khoi.webp'), room: asset('assets/images/vasa/room-van-khoi.webp') },
  { name: 'Vân nhám', tex: asset('assets/images/vasa/fx-van-nham.webp'), room: asset('assets/images/vasa/room-van-nham.webp') },
  { name: 'Travertine', tex: asset('assets/images/vasa/fx-travertine.webp') },
  { name: 'Vân đá', tex: asset('assets/images/vasa/fx-van-da.webp'), room: asset('assets/images/vasa/room-van-da.webp') },
  { name: 'Tường đất', tex: asset('assets/images/vasa/fx-tuong-dat.webp') },
  { name: 'Rơm trấu', tex: asset('assets/images/vasa/fx-rom-tru.webp') },
];
