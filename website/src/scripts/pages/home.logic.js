/** Logic riêng của Trang chủ (hero, accordion). Dùng chung cho trang thật và bản xem thử gộp. */
export function initHome() {
  initHero();
  initAccordion();
}

/* ---------- Hero: 3 slide, tự chạy 6s, nút trước/sau, tab, vuốt trên mobile ---------- */
function initHero() {
  const root = document.querySelector('[data-hero]');
  if (!root) return;
  const card = root.querySelector('.hero__card');
  const copies = [...root.querySelectorAll('.hero-copy')];
  const imgs = [...root.querySelectorAll('[data-slide-img]')];
  const tabs = [...root.querySelectorAll('[data-hero-tab]')];
  const total = copies.length;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;

  const go = (i) => {
    index = (i + total) % total;
    copies.forEach((c, n) => (c.hidden = n !== index));
    imgs.forEach((m, n) => (m.hidden = n !== index));
    tabs.forEach((t, n) => {
      const on = n === index;
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', String(on));
      if (on) { void t.offsetWidth; t.classList.add('is-active'); } // chạy lại thanh tiến trình
    });
  };

  root.querySelector('[data-hero-prev]').addEventListener('click', () => go(index - 1));
  root.querySelector('[data-hero-next]').addEventListener('click', () => go(index + 1));
  tabs.forEach((t, n) => t.addEventListener('click', () => go(n)));

  // Thanh tiến trình CSS chạy xong -> sang slide kế (tạm dừng khi rê chuột/focus để người dùng đọc)
  if (!reduce) {
    root.addEventListener('animationend', (e) => {
      if (e.target.classList.contains('hero-tab__bar') && e.animationName === 'progress') go(index + 1);
    });
    const pause = (v) => card.classList.toggle('is-paused', v);
    card.addEventListener('mouseenter', () => pause(true));
    card.addEventListener('mouseleave', () => pause(false));
    card.addEventListener('focusin', () => pause(true));
    card.addEventListener('focusout', () => pause(false));
  } else {
    tabs.forEach((t) => t.querySelector('.hero-tab__bar').style.setProperty('animation', 'none'));
  }

  // Vuốt ngang trên ảnh (mobile)
  let x0 = null;
  const media = root.querySelector('.hero__media');
  media.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  media.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
  });
  media.addEventListener('pointercancel', () => { x0 = null; });

  go(0);
}

/* ---------- Accordion sản phẩm: rê chuột (desktop) hoặc bấm/chạm để mở ---------- */
function initAccordion() {
  const root = document.querySelector('[data-accordion]');
  if (!root) return;
  const items = [...root.querySelectorAll('[data-acc-item]')];
  const canHover = window.matchMedia('(hover: hover) and (min-width: 768px)');

  const activate = (item) => {
    items.forEach((it) => {
      const on = it === item;
      it.classList.toggle('is-active', on);
      it.querySelector('[data-acc-toggle]').setAttribute('aria-expanded', String(on));
    });
  };

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => { if (canHover.matches) activate(item); });
    item.querySelector('[data-acc-toggle]').addEventListener('click', () => activate(item));
    item.addEventListener('focusin', () => activate(item));
  });
}
