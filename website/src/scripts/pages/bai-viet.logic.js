import { RELATED } from '../data/blog.js';
import { postCardHTML } from '../modules/post-card.js';

/** Trang bài viết: mục lục tự tô sáng theo đoạn đang đọc + bấm để cuộn mượt; render "Bài viết liên quan". */
export function initBaiViet() {
  const grid = document.querySelector('[data-related-grid]');
  if (grid) grid.innerHTML = RELATED.map((p, i) => postCardHTML(p, { excerpt: false, delay: i * 80 })).join('');

  const toc = document.querySelector('[data-toc]');
  if (!toc) return;
  // Thu vào / mở ra mục lục
  const toggle = toc.querySelector('[data-toc-toggle]');
  const panel = toc.querySelector('[data-toc-panel]');
  toggle?.addEventListener('click', () => {
    const collapsed = toc.dataset.collapsed !== 'true';
    toc.dataset.collapsed = String(collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Mở rộng mục lục' : 'Thu gọn mục lục');
    panel.inert = collapsed; // ẩn khỏi bàn phím / trình đọc màn hình khi đã thu
  });
  const links = [...toc.querySelectorAll('.ps-toc__item')];
  const targets = links.map((a) => document.getElementById(a.hash.slice(1)));
  const mark = (i) => links.forEach((a, k) => (k === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));

  links.forEach((a, i) => a.addEventListener('click', () => mark(i)));

  // Mục đang đọc = đề mục cuối cùng đã cuộn qua 1/3 màn hình
  const onScroll = () => {
    if (!toc.offsetParent) return; // trang đang ẩn (bản xem thử gộp) -> bỏ qua
    const line = window.innerHeight * 0.33;
    let idx = 0;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= line) idx = i; });
    mark(idx);
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener('hashchange', () => requestAnimationFrame(onScroll));
  onScroll();
}
