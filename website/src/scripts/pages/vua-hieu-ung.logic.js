import { VASA_PRODUCTS, VASA_SPECS, VASA_STORAGE, VASA_SAFETY, VASA_EFFECTS } from '../data/vasa.js';
import { openModal } from '../modules/modal.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** Khối "Hai dòng vữa VASA": 2 thẻ sản phẩm; "Xem chi tiết" mở popup, "Nhận bản mẫu" mở form dùng thử. */
function initProducts() {
  const grid = document.querySelector('[data-prod-grid]');
  if (!grid) return;
  grid.innerHTML = VASA_PRODUCTS.map(
    (p, i) => `<article class="vs-prod" data-anim="fade-up" style="--d:${i * 100}ms">
      <div class="vs-prod__media"><img class="vs-prod__ripple" src="/assets/icons/vasa-ripple.svg" alt="" width="262" height="262"><img class="vs-prod__bag" src="${p.img}" alt="Bao vữa ${esc(p.code)}" loading="lazy"></div>
      <div class="vs-prod__content">
        <div class="vs-prod__text">
          <p class="vs-prod__kind">${esc(p.kind)}</p>
          <h3 class="vs-prod__code">${esc(p.code)}</h3>
          <p class="vs-prod__short">${esc(p.short)}</p>
          <div class="vs-prod__chips"><span>25kg/bao</span><span>GB/T 25181-2019</span></div>
        </div>
        <div class="vs-prod__actions">
          <button type="button" class="btn btn--light btn--bold" data-product-open="${i}">Xem chi tiết <img src="/assets/icons/arrow-right-16-dark.svg" alt="" width="16" height="16"></button>
          <button type="button" class="btn btn--ghost" data-modal-open="trial" data-product="vasa">Nhận bản mẫu</button>
        </div>
      </div></article>`,
  ).join('');
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-product-open]');
    if (b) showProduct(Number(b.dataset.productOpen), b);
  });
}

/** Popup chi tiết sản phẩm (4 tab: Tổng quan · Thông số kỹ thuật · Vận chuyển & bảo quản · An toàn). */
const TABS = ['Tổng quan', 'Thông số kỹ thuật', 'Vận chuyển & bảo quản', 'An toàn'];
let current = 0;
let tab = 0;
function renderProduct() {
  const modal = document.querySelector('[data-modal="product"]');
  if (!modal) return;
  const p = VASA_PRODUCTS[current];
  const $ = (k) => modal.querySelector(`[data-product="${k}"]`);
  $('img').src = p.img; $('img').alt = `Bao vữa ${p.name}`;
  $('kind').textContent = p.kind;
  $('name').textContent = p.name;
  modal.querySelector('[data-product-tabs]').innerHTML = TABS.map(
    (t, i) => `<button type="button" class="product__tab" role="tab" aria-selected="${i === tab}" data-tab="${i}">${esc(t)}</button>`,
  ).join('');
  const body = $('body');
  const check = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#45734D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>';
  if (tab === 0) {
    body.innerHTML = `<div class="product__pane"><p>${esc(p.desc)}</p>
      <h3>Ưu điểm nổi bật</h3><ul class="product__pros">${p.pros.map((x) => `<li>${check}${esc(x)}</li>`).join('')}</ul>
      <div class="product__row"><span>Quy cách đóng gói</span><strong>25kg/bao</strong></div></div>`;
  } else if (tab === 1) {
    body.innerHTML = `<div class="product__pane"><p>${esc(p.code)} đạt tiêu chuẩn <strong>GB/T 25181-2019</strong> — Vữa trộn sẵn, với các thông số kỹ thuật sau:</p>
      <dl class="product__specs">${VASA_SPECS.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>`;
  } else if (tab === 2) {
    body.innerHTML = `<ol class="product__steps">${VASA_STORAGE.map((x, i) => `<li><span>${pad(i + 1)}</span>${esc(x)}</li>`).join('')}</ol>`;
  } else {
    body.innerHTML = `<div class="product__pane">${VASA_SAFETY.map(([h, t], i) => `<div class="product__note${i ? ' product__note--line' : ''}"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}</div>`;
  }
  body.scrollTop = 0;
}
const pad = (n) => String(n).padStart(2, '0');
function showProduct(i, trigger) {
  current = i; tab = 0;
  renderProduct();
  openModal('product', trigger);
}
function initProductModal() {
  const modal = document.querySelector('[data-modal="product"]');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    const t = e.target.closest('[data-tab]');
    if (t) { tab = Number(t.dataset.tab); renderProduct(); }
  });
}

/** Quạt mẫu hiệu ứng: chọn mẫu -> đổi ảnh (hiệu ứng quét chéo), tự chuyển sau 6s, dừng khi rê chuột / giảm chuyển động. */
function initFx() {
  const root = document.querySelector('[data-fx]');
  if (!root) return;
  const stage = root.querySelector('[data-stage]');
  const room = root.querySelector('[data-fx-room]');
  const fan = root.querySelector('[data-fx-fan]');
  const strip = root.querySelector('[data-fx-strip]');
  const nameEl = root.querySelector('[data-fx-name]');
  const N = VASA_EFFECTS.length;
  let cur = 0;
  let timer = null;
  let paused = false;

  room.innerHTML = VASA_EFFECTS.map((e, i) => `<img class="cover${i === 0 ? ' is-on' : ''}" src="${e.room || e.tex}" alt="Bề mặt ${esc(e.name)}" ${i ? 'loading="lazy"' : ''}>`).join('');
  const imgs = [...room.children];

  fan.innerHTML =
    VASA_EFFECTS.map(
      (e, i) => `<button type="button" class="vs-chip" role="tab" aria-selected="false" aria-label="${esc(e.name)}" data-i="${i}">
        <span class="vs-chip__label"><span class="vs-chip__dot" aria-hidden="true"></span><span class="vs-chip__name">${esc(e.name)}</span></span>
        <span class="vs-chip__tex"><img class="cover" src="${e.tex}" alt="" loading="lazy"></span></button>`,
    ).join('') + '<span class="vs-fan__pin" aria-hidden="true"><img src="/assets/icons/fan-pin.svg" alt=""></span>';
  const chips = [...fan.querySelectorAll('.vs-chip')];

  strip.innerHTML = VASA_EFFECTS.map(
    (e, i) => `<button type="button" class="vs-sw" role="tab" aria-selected="false" aria-label="${esc(e.name)}" data-i="${i}">
      <span class="vs-sw__tex"><img class="cover" src="${e.tex}" alt="" loading="lazy"></span><span class="vs-sw__name">${esc(e.name)}</span></button>`,
  ).join('');
  const sws = [...strip.children];

  const layout = () => {
    // góc xòe: 8° giữa các mẫu, mẫu đang chọn tách ra 8° so với hai bên (như code thiết kế)
    const raw = VASA_EFFECTS.map((_, i) => (i - (N - 1) / 2) * 8 + (i < cur ? -8 : i > cur ? 8 : 0));
    const mid = (raw[0] + raw[N - 1]) / 2;
    chips.forEach((c, i) => {
      c.style.setProperty('--a', `${(raw[i] - mid).toFixed(1)}deg`);
      c.style.setProperty('--z', i === cur ? 10 : i + 1);
    });
  };
  const select = (i, { user = false } = {}) => {
    const prev = cur;
    cur = (i + N) % N;
    imgs.forEach((im, k) => {
      im.classList.toggle('was', k === prev && prev !== cur);
      im.classList.toggle('is-on', k === cur);
    });
    // ảnh cũ nằm dưới, ảnh mới quét chéo đè lên
    setTimeout(() => imgs.forEach((im) => im.classList.remove('was')), 1200);
    chips.forEach((c, k) => c.setAttribute('aria-selected', String(k === cur)));
    sws.forEach((s, k) => s.setAttribute('aria-selected', String(k === cur)));
    nameEl.textContent = VASA_EFFECTS[cur].name;
    layout();
    sws[cur]?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    if (user) start();
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (reduceMotion()) return;
    timer = setInterval(() => !paused && select(cur + 1), 6000);
  };

  root.addEventListener('click', (e) => {
    const c = e.target.closest('.vs-chip, .vs-sw');
    if (c) return select(Number(c.dataset.i), { user: true });
    if (e.target.closest('[data-fx-prev]')) select(cur - 1, { user: true });
    if (e.target.closest('[data-fx-next]')) select(cur + 1, { user: true });
  });
  stage.addEventListener('mouseenter', () => { paused = true; });
  stage.addEventListener('mouseleave', () => { paused = false; });
  select(0);
  start();
}

export function initVasa() {
  initProducts();
  initProductModal();
  initFx();
}
