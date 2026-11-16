/** Đường dẫn tới file trong /public (đúng cả khi site đặt ở thư mục con hoặc build gộp 1 file). */
export const asset = (path) => (path.startsWith('data:') ? path : `${import.meta.env.BASE_URL}${path}`);
