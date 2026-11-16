import { D8_PROJECTS, D8_FEATURES } from '../data/d8.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');

/** Carousel dự án: mũi tên trước/sau, mỗi lần 1 thẻ; trên mobile cuộn ngang bằng tay. */
function initProjects() {
  const root = document.querySelector('[data-d8-projects]');
  if (!root) return;
  const track = root.querySelector('[data-car-track]');
  const viewport = root.querySelector('[data-car-viewport]');
  const prev = root.querySelector('[data-car-prev]');
  const next = root.querySelector('[data-car-next]');
  const count = root.querySelector('[data-car-count]');
  let idx = 0;

  track.innerHTML = D8_PROJECTS.map(
    (p) => `<li class="d8-card"><span class="d8-card__media"><img class="cover" src="${p.img}" alt="${esc(p.name)}" loading="lazy"></span>
      <span class="d8-card__cap"><strong class="d8-card__name">${esc(p.name)}</strong><span class="d8-card__meta">${esc(p.tag)} · ${esc(p.loc)}</span></span></li>`,
  ).join('');
  const cards = [...track.children];

  const perView = () => Math.max(1, Math.round((viewport.clientWidth + 16) / (cards[0].offsetWidth + 16)));
  const maxIdx = () => Math.max(0, cards.length - perView());
  const step = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0);

  const render = () => {
    idx = Math.min(idx, maxIdx());
    track.style.transform = `translateX(${-idx * step()}px)`;
    // Figma ghi "01 / 05" (7 dự án, hiện 3 thẻ/lượt) — giữ nguyên tổng cho cả mobile
    const total = Math.max(1, cards.length - 2);
    count.textContent = `${pad(Math.min(idx + 1, total))} / ${pad(total)}`;
    prev.disabled = idx === 0;
    next.disabled = idx >= maxIdx();
  };
  prev.addEventListener('click', () => { idx = Math.max(0, idx - 1); render(); });
  next.addEventListener('click', () => { idx = Math.min(maxIdx(), idx + 1); render(); });
  window.addEventListener('resize', render);
  render();
  // ảnh lazy làm đổi kích thước sau khi tải -> tính lại
  window.addEventListener('load', render);
}

/** 4 lợi thế: thanh tiến trình tự chạy 5s rồi sang mục kế; dừng khi rê chuột lên ảnh/tab hoặc khi bật giảm chuyển động. */
function initFeatures() {
  const root = document.querySelector('[data-features]');
  if (!root) return;
  const tabsEl = root.querySelector('[data-feat-tabs]');
  const media = root.querySelector('[data-feat-media]');
  const show = root.querySelector('.d8-show');
  const DUR = 5000;
  let cur = 0;
  let timer = null;

  media.insertAdjacentHTML(
    'afterbegin',
    D8_FEATURES.map((f, i) => `<img class="cover${i === 0 ? ' is-on' : ''}" src="${f.img}" alt="${esc(f.alt)}" style="object-position:${f.pos}" ${i ? 'loading="lazy"' : ''}>`).join(''),
  );
  const imgs = [...media.querySelectorAll('.cover')];

  tabsEl.innerHTML = D8_FEATURES.map(
    (f, i) => `<button type="button" class="d8-tab" role="tab" aria-selected="${i === 0}" data-i="${i}">
      <span class="d8-tab__bar" aria-hidden="true"><span class="d8-tab__fill"></span></span>
      <span class="d8-tab__body"><span class="d8-tab__title">${esc(f.title)}</span><span class="d8-tab__desc">${esc(f.desc)}</span></span></button>`,
  ).join('');
  const tabs = [...tabsEl.children];

  const select = (i) => {
    cur = i;
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.classList.toggle('is-done', k < i);
      // chạy lại animation thanh tiến trình
      const fill = t.querySelector('.d8-tab__fill');
      fill.style.animation = 'none';
      void fill.offsetWidth;
      fill.style.animation = '';
    });
    schedule();
  };
  const schedule = () => {
    clearTimeout(timer);
    if (reduceMotion()) return;
    timer = setTimeout(() => select((cur + 1) % D8_FEATURES.length), DUR);
  };
  const pause = (v) => {
    show.style.setProperty('--feat-play', v ? 'paused' : 'running');
    if (v) { clearTimeout(timer); }
    else schedule();
  };

  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b && Number(b.dataset.i) !== cur) select(Number(b.dataset.i));
  });
  show.addEventListener('mouseenter', () => pause(true));
  show.addEventListener('mouseleave', () => pause(false));
  show.addEventListener('focusin', () => pause(true));
  show.addEventListener('focusout', () => pause(false));
  select(0);
}

export function initD8() {
  initProjects();
  initFeatures();
  // File tài liệu chưa có link thật (dev gắn vào sau) -> không nhảy lên đầu trang
  document.querySelectorAll('[data-doc]').forEach((a) => {
    if (a.getAttribute('href') === '#') a.addEventListener('click', (e) => e.preventDefault());
  });
}
