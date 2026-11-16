import { TOPICS, POSTS, FEATURED, SHOWCASE } from '../data/blog.js';
import { esc, postCardHTML } from '../modules/post-card.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAGE_SIZE = 6;

/** Khối "Tin nổi bật": ảnh lớn đổi theo tab, tự chuyển sau 7s (dừng khi rê chuột/focus hoặc bật giảm chuyển động). */
function initFeatured() {
  const root = document.querySelector('[data-featured]');
  if (!root) return;
  const stage = root.querySelector('[data-feat-stage]');
  const tabsEl = root.querySelector('[data-feat-tabs]');
  const chip = root.querySelector('[data-feat-chip]');
  const excerpt = root.querySelector('[data-feat-excerpt]');
  const caption = root.querySelector('.bl-feat__text');
  let cur = 0;
  let timer = null;
  let paused = false;

  stage.insertAdjacentHTML(
    'afterbegin',
    FEATURED.map((f, i) => `<img class="bl-feat__img${i === 0 ? ' is-on' : ''}" src="${f.img}" alt="" ${i ? 'loading="lazy"' : ''}>`).join(''),
  );
  const imgs = [...stage.querySelectorAll('.bl-feat__img')];

  tabsEl.innerHTML = FEATURED.map(
    (f, i) => `<button type="button" class="bl-tab" role="tab" aria-selected="${i === 0}" data-i="${i}">
      <span class="bl-tab__meta"><span class="bl-tab__cat">${esc(f.tag)}</span><span>${esc(f.date)}</span></span>
      <span class="bl-tab__title">${esc(f.title)}</span></button>`,
  ).join('');
  const tabs = [...tabsEl.children];

  const show = (i) => {
    cur = i;
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
    tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i)));
    chip.textContent = FEATURED[i].tag;
    excerpt.textContent = FEATURED[i].excerpt;
    stage.setAttribute('aria-label', `Đọc bài: ${FEATURED[i].title}`);
    if (!reduceMotion()) {
      caption.style.animation = 'none';
      void caption.offsetWidth; // chạy lại hiệu ứng fadeIn
      caption.style.animation = '';
    }
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (reduceMotion()) return;
    timer = setInterval(() => !paused && show((cur + 1) % FEATURED.length), 7000);
  };

  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) { show(Number(b.dataset.i)); start(); }
  });
  const hold = (v) => () => { paused = v; if (!v) start(); };
  root.querySelector('.bl-feat').addEventListener('mouseenter', hold(true));
  root.querySelector('.bl-feat').addEventListener('mouseleave', hold(false));
  root.querySelector('.bl-feat').addEventListener('focusin', hold(true));
  root.querySelector('.bl-feat').addEventListener('focusout', hold(false));
  show(0);
  start();
}

/** Khối "Tin tức": lọc theo chủ đề + "Xem thêm bài viết" (mỗi lần thêm 6 bài). */
function initNews() {
  const root = document.querySelector('[data-news]');
  if (!root) return;
  const tabsEl = root.querySelector('[data-news-tabs]');
  const grid = root.querySelector('[data-news-grid]');
  const more = root.querySelector('[data-news-more]');
  let topic = 0;
  let shown = PAGE_SIZE;

  const list = () => (topic === 0 ? POSTS : POSTS.filter((p) => p.type === TOPICS[topic]));
  const renderTabs = () => {
    tabsEl.innerHTML = TOPICS.map(
      (t, i) => `<button type="button" class="bl-topic" role="tab" aria-selected="${i === topic}" data-t="${i}">${esc(t)}</button>`,
    ).join('');
  };
  const render = (from = 0) => {
    const items = list();
    grid.innerHTML = items.slice(0, shown).map((p, i) => postCardHTML(p, { delay: Math.max(0, i - from) * 60 })).join('');
    more.hidden = items.length <= shown;
  };

  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-t]');
    if (!b || Number(b.dataset.t) === topic) return;
    topic = Number(b.dataset.t);
    shown = PAGE_SIZE;
    renderTabs();
    render();
    b.scrollIntoView?.({ block: 'nearest', inline: 'center' });
    tabsEl.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  });
  root.querySelector('[data-news-more-btn]').addEventListener('click', () => {
    const from = shown;
    shown += PAGE_SIZE;
    render(from);
  });
  renderTabs();
  render();
}

/** Khối "Dự án tiêu biểu": chọn dự án bằng ảnh nhỏ. */
function initShowcase() {
  const root = document.querySelector('[data-showcase]');
  if (!root) return;
  const media = root.querySelector('[data-proj-media]');
  const info = root.querySelector('[data-proj-info]');
  const thumbs = root.querySelector('[data-proj-thumbs]');

  media.innerHTML = SHOWCASE.map((p, i) => `<img class="cover${i === 0 ? ' is-on' : ''}" src="${p.img}" alt="${esc(p.name)}" ${i ? 'loading="lazy"' : ''}>`).join('');
  thumbs.innerHTML = SHOWCASE.map(
    (p, i) => `<button type="button" class="bl-thumb" role="tab" aria-selected="${i === 0}" aria-label="${esc(p.name)}" data-i="${i}"><img class="cover" src="${p.img}" alt="" loading="lazy"></button>`,
  ).join('');
  const imgs = [...media.children];
  const tabs = [...thumbs.children];

  const show = (i) => {
    const p = SHOWCASE[i];
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
    tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i)));
    info.innerHTML = `<p class="bl-proj__tag">${esc(p.tag)}</p>
      <h3 class="bl-proj__name">${esc(p.name)}</h3>
      <p class="bl-proj__story">${esc(p.story)}</p>
      <div class="bl-proj__used">${p.used.map((u) => `<span class="bl-chip">${esc(u)}${u === 'Keo chống nứt D8' ? '<span class="bl-chip__m"> Filler</span>' : ''}</span>`).join('')}</div>`;
    if (!reduceMotion()) {
      info.style.animation = 'none';
      void info.offsetWidth;
      info.style.animation = '';
    }
  };
  thumbs.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) show(Number(b.dataset.i));
  });
  show(0);
}

export function initBlog() {
  initFeatured();
  initNews();
  initShowcase();
}
