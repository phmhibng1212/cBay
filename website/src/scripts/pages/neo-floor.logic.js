import { openModal, closeModal } from '../modules/modal.js';
import { LINES, WARRANTY } from '../data/neo-floor.js';

/** Logic riêng của trang Neo Floor. Dùng chung cho trang thật và bản xem thử gộp. */
export function initNeoFloor() {
  initLayers();
  initCollection();
}

/* ---------- Cấu trúc đa lớp: chọn lớp (hover/bấm) -> mặt phẳng tương ứng nổi lên ---------- */
function initLayers() {
  const root = document.querySelector('[data-layers]');
  if (!root) return;
  const planes = [...root.querySelectorAll('[data-plane]')];
  const tabs = [...root.querySelectorAll('[data-layer]')];
  const BASE = [-168 + 18, -72, 0, 76, 154]; // vị trí Y của 5 lớp (px), khớp Figma
  let active = -1;

  const select = (i) => {
    if (i === active) return;
    active = i;
    planes.forEach((p) => {
      const n = Number(p.dataset.plane);
      p.style.setProperty('--y', `${BASE[n] + (n === i ? -18 : 0)}px`);
      p.style.setProperty('--z', String(10 - n));
      p.classList.toggle('is-active', n === i);
    });
    tabs.forEach((t) => t.setAttribute('aria-selected', String(Number(t.dataset.layer) === i)));
  };

  tabs.forEach((t) => {
    const i = Number(t.dataset.layer);
    t.addEventListener('click', () => select(i));
    t.addEventListener('mouseenter', () => select(i));
    t.addEventListener('focus', () => select(i));
  });
  select(0);
}

/* ---------- Bộ sưu tập: tab dòng sản phẩm + lưới mã màu + popup chi tiết ---------- */
function initCollection() {
  const root = document.querySelector('[data-collection]');
  if (!root) return;
  const tabsEl = root.querySelector('[data-line-tabs]');
  const grid = root.querySelector('[data-swatch-grid]');
  const modal = document.getElementById('modal-detail');
  let lineIndex = 0;

  const renderTabs = () => {
    tabsEl.innerHTML = LINES.map(
      (l, i) => `<button type="button" class="line-tab" role="tab" aria-selected="${i === lineIndex}" data-line="${i}">
        ${l.label}<span class="line-tab__count">${l.skus.length}</span></button>`,
    ).join('');
  };

  const renderGrid = () => {
    const line = LINES[lineIndex];
    grid.innerHTML = line.skus
      .map((s, i) => {
        const media = s.img
          ? `<img class="cover" src="${s.img}" alt="Mẫu sàn ${s.code} — ${s.color}" loading="lazy">`
          : `<span class="swatch__placeholder"><span>[Ảnh mẫu ${s.code}]</span></span>`;
        return `<li><button type="button" class="swatch" style="--d:${i * 50}ms" data-sku="${s.code}" aria-label="Xem chi tiết ${s.code}">
          <span class="swatch__media">${media}<span class="swatch__code">${s.code}</span></span>
          <span class="swatch__info"><span class="swatch__name">${s.color}</span><span class="swatch__pattern">${s.pattern}</span></span>
        </button></li>`;
      })
      .join('');
  };

  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-line]');
    if (!b || Number(b.dataset.line) === lineIndex) return;
    lineIndex = Number(b.dataset.line);
    renderTabs();
    renderGrid();
  });

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sku]');
    if (!b) return;
    const sku = LINES[lineIndex].skus.find((s) => s.code === b.dataset.sku);
    fillDetail(modal, LINES[lineIndex], sku);
    openModal('detail', b);
  });

  // Popup chi tiết -> "Nhận bản mẫu" mở form dùng thử
  modal.querySelector('[data-detail-trial]').addEventListener('click', () => {
    closeModal();
    openModal('trial');
  });

  renderTabs();
  renderGrid();
}

function fillDetail(modal, line, sku) {
  const set = (key, text) => (modal.querySelector(`[data-detail="${key}"]`).textContent = text);
  set('line', line.name);
  set('code', sku.code);
  set('name', sku.color);
  set('pattern', `Họa tiết ${sku.pattern.toLowerCase()}`);

  const media = modal.querySelector('.detail__media');
  const img = modal.querySelector('[data-detail="img"]');
  media.querySelector('.swatch__placeholder')?.remove();
  if (sku.img) {
    img.hidden = false;
    img.src = sku.img;
    img.alt = `Mẫu sàn ${sku.code} — ${sku.color}`;
  } else {
    img.hidden = true;
    media.insertAdjacentHTML('afterbegin', `<span class="swatch__placeholder"><span>[Ảnh mẫu ${sku.code}]</span></span>`);
  }

  const rows = [
    ['Mã sản phẩm', line.name],
    ['Phân khúc', line.segment],
    ['Kích thước', sku.size || line.size],
    ['Tổng độ dày', line.thickness],
    ['Wear layer chống mài mòn', line.wear],
    ['Quy cách đóng gói', line.pack],
    ['Khối lượng', line.weight],
    ['Bảo hành', WARRANTY],
  ];
  modal.querySelector('[data-detail="rows"]').innerHTML = rows
    .map(([k, v]) => `<div class="spec-row"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join('');
  modal.querySelector('.detail__body').scrollTop = 0;
}
