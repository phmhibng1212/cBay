/**
 * BẢN XEM THỬ GỘP 1 FILE (chỉ dùng để xem/gửi duyệt, không phải bản giao dev).
 * Gộp các trang đã dựng vào 1 tài liệu, chuyển trang bằng hash (#trang-chu, #san-da-spc, #khach-hang,
 * #ve-chung-toi, #blog, #bai-viet) nên các link menu / nút giữa các trang hoạt động như site thật.
 * Sinh bằng:  npm run build:preview
 */
import { initSite } from '../main.js';
import '../../styles/pages/home.css';
import '../../styles/pages/neo-floor.css';
import { initHome } from './home.logic.js';
import { initNeoFloor } from './neo-floor.logic.js';
import '../../styles/pages/khach-hang.css';
import '../../styles/pages/ve-chung-toi.css';
import { initKhachHang } from './khach-hang.logic.js';
import '../../styles/pages/blog.css';
import '../../styles/pages/bai-viet.css';
import { initBlog } from './blog.logic.js';
import { initBaiViet } from './bai-viet.logic.js';
import { markCurrentPage } from '../modules/header.js';

const VIEWS = {
  'trang-chu': { page: 'home', title: 'cBay — Your Smart Supplier for a Better Future' },
  'san-da-spc': { page: 'neo-floor', title: 'Sàn đá công nghệ SPC Neo Floor — cBay' },
  'khach-hang': { page: 'khach-hang', title: 'Khách hàng — Dự án tiêu biểu | cBay' },
  've-chung-toi': { page: 've-chung-toi', title: 'Về chúng tôi — cBay' },
  blog: { page: 'blog', title: 'Blog — Câu chuyện từ công trình | cBay' },
  // Bài viết chi tiết: menu vẫn tô sáng "Blog" (nav: 'blog')
  'bai-viet': { page: 'bai-viet', nav: 'blog', title: 'DeMont Cafe: khi bức tường kể chuyện bằng chất liệu | Blog cBay' },
};
const mains = Object.fromEntries(
  Object.keys(VIEWS).map((name) => [name, document.querySelector(`[data-view="${VIEWS[name].page}"]`)]),
);

initSite();
initHome();
initNeoFloor();
initKhachHang();
initBlog();
initBaiViet();

function show(name) {
  Object.entries(mains).forEach(([n, el]) => (el.hidden = n !== name));
  document.body.dataset.page = VIEWS[name].nav ?? VIEWS[name].page;
  document.title = VIEWS[name].title;
  markCurrentPage();
}

function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (VIEWS[id]) { show(id); window.scrollTo(0, 0); return; }
  const target = id && id !== 'main' ? document.getElementById(id) : null;
  const host = target?.closest('[data-view]');
  if (host) {
    const name = Object.keys(VIEWS).find((n) => VIEWS[n].page === host.dataset.view);
    show(name);
    requestAnimationFrame(() => target.scrollIntoView());
    return;
  }
  if (!id) show('trang-chu');
}
window.addEventListener('hashchange', route);
route();

// Trang chưa dựng: báo nhẹ thay vì dẫn tới trang lỗi
let toast;
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-soon]');
  if (!link) return;
  e.preventDefault();
  toast ??= Object.assign(document.createElement('div'), { className: 'preview-toast', role: 'status' });
  toast.textContent = `Trang "${link.textContent.trim().replace(/\s+/g, ' ') || 'này'}" chưa có design nên chưa dựng.`;
  document.body.append(toast);
  toast.classList.remove('is-in'); void toast.offsetWidth; toast.classList.add('is-in');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.remove(), 2600);
});
