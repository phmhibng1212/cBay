/**
 * Header: dropdown "Sản phẩm - Giải pháp" (hover / click), menu di động, đánh dấu trang hiện tại.
 * Logic theo code thiết kế: dropdown mở khi rê chuột hoặc bấm; menu di động khoá cuộn trang.
 */
const MQ_DESKTOP = window.matchMedia('(min-width: 1100px)');

export function initHeader() {
  markCurrentPage();
  initDropdown();
  initMobileMenu();
}

function markCurrentPage() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach((el) => {
    el.setAttribute('aria-current', 'page');
    // Trang sản phẩm -> tô sáng cả nút nhóm "Sản phẩm - Giải pháp"
    if (el.closest('.nav-dropdown')) {
      document.querySelector('[data-nav-group="products"]')?.setAttribute('aria-current', 'page');
    }
  });
}

function initDropdown() {
  const root = document.querySelector('[data-dropdown]');
  if (!root) return;
  const toggle = root.querySelector('[data-dropdown-toggle]');
  const panel = root.querySelector('.nav-dropdown__panel');
  let timer;

  const set = (open) => {
    clearTimeout(timer);
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => set(!isOpen()));
  root.addEventListener('mouseenter', () => { if (MQ_DESKTOP.matches) set(true); });
  root.addEventListener('mouseleave', () => { timer = setTimeout(() => set(false), 120); });
  root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) { set(false); toggle.focus(); } });
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) set(false); });
}

function initMobileMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    menu.hidden = !open;
    document.body.classList.toggle('is-locked', open);
  };

  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) set(false); });
  MQ_DESKTOP.addEventListener('change', (e) => { if (e.matches) set(false); });

  const sub = menu.querySelector('[data-submenu-toggle]');
  const subList = document.getElementById('mobile-sub');
  sub?.addEventListener('click', () => {
    const open = sub.getAttribute('aria-expanded') !== 'true';
    sub.setAttribute('aria-expanded', String(open));
    subList.hidden = !open;
  });
  // Nút "Liên hệ ngay" mở popup -> đóng menu trước
  document.addEventListener('modal:opened', () => { if (!menu.hidden) set(false); });
}
