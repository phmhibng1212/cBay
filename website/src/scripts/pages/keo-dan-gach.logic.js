import { KDG_PRODUCTS, KDG_ROWS, KDG_SPEC_ROWS, KDG_SUBTABS, KDG_CARE } from '../data/keo-dan-gach.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const SCALE = 0.25; // khổ gạch vẽ theo tỷ lệ: 100mm = 25px
const CHECK = '/assets/icons/check-20-mint.svg';

/**
 * Trang Keo dán gạch: chọn sản phẩm bằng cột của bảng so sánh hoặc pill trong khối chi tiết (dùng chung 1 trạng thái);
 * đổi sản phẩm -> quay về tab "Tổng quan" (theo ghi chú prototype trong Figma); 4 tab nội dung.
 */
export function initKeoDanGach() {
  const table = document.querySelector('[data-kdg-table]');
  const detail = document.querySelector('[data-kdg-detail]');
  if (!table || !detail) return;
  const ptabs = detail.querySelector('[data-kdg-ptabs]');
  const subtabs = detail.querySelector('[data-kdg-subtabs]');
  const panel = detail.querySelector('[data-kdg-panel]');
  const bag = detail.querySelector('[data-kdg-bag]');
  const chip = detail.querySelector('[data-kdg-chip]');
  const std = detail.querySelector('[data-kdg-std]');
  const name = detail.querySelector('[data-kdg-name]');
  let sel = 0;
  let sub = 0;

  /* ---------- Bảng so sánh ---------- */
  const renderTable = () => {
    const head = `<div class="kg-cmp__row kg-cmp__row--head" role="row"><div class="kg-cmp__corner" role="columnheader"></div>${KDG_PRODUCTS.map(
      (p, i) => `<div class="kg-cmp__col" role="columnheader"><button type="button" class="kg-cmp__prod" aria-pressed="${i === sel}" data-pick="${i}">
        <img src="${p.img}" alt="Bao keo ${esc(p.code)}" width="110" height="150" loading="lazy">
        <span class="kg-cmp__name"><strong>${esc(p.code)}</strong><span>${esc(p.short)}</span></span></button></div>`,
    ).join('')}</div>`;
    const rows = KDG_ROWS.map(
      ([label, key, big]) => `<div class="kg-cmp__row" role="row"><div class="kg-cmp__label" role="rowheader">${esc(label)}</div>${KDG_PRODUCTS.map(
        (p, i) => `<div class="kg-cmp__cell${i === sel ? ' is-sel' : ''}${big ? ' is-big' : ''}" role="cell">${esc(key ? p.cmp[key] : '25kg/bao')}</div>`,
      ).join('')}</div>`,
    ).join('');
    table.innerHTML = head + rows;
  };

  /* ---------- Chi tiết sản phẩm ---------- */
  const tilesHTML = (p) => {
    const maxH = Math.max(...p.tiles.map(([, a, b]) => Math.max(a, b) * SCALE));
    return `<div class="kg-pane"><p class="kg-pane__note">Khổ gạch tối đa · vẽ theo tỷ lệ (mỗi ô lưới = 100mm)</p>
      <div class="kg-tiles">${p.tiles
        .map(([where, a, b, note]) => {
          const w = Math.round(a * SCALE);
          const h = Math.round(b * SCALE);
          return `<div class="kg-tile"><div class="kg-tile__scale" style="width:${w}px;height:${maxH}px"><span class="kg-tile__sq kg-tile__sq--${where === 'Nội thất' ? 'in' : 'out'}" style="width:${w}px;height:${h}px"></span></div>
            <div class="kg-tile__text"><span>${esc(where)}</span><strong>≤ ${a} × ${b}mm</strong><span>${esc(note)}</span></div></div>`;
        })
        .join('')}</div></div>`;
  };
  const panelHTML = () => {
    const p = KDG_PRODUCTS[sel];
    if (sub === 0) {
      return `<div class="kg-pane"><p class="kg-pane__lead">${esc(p.desc)}</p>
        <div class="kg-pros"><p>Ưu điểm nổi bật</p><ul>${p.pros.map((x) => `<li><img src="${CHECK}" alt="" width="20" height="20"><span>${esc(x)}</span></li>`).join('')}</ul></div></div>`;
    }
    if (sub === 1) return tilesHTML(p);
    if (sub === 2) {
      return `<div class="kg-pane"><p class="kg-pane__lead">${esc(p.code)} đạt tiêu chuẩn <strong>${esc(p.cmp.std)}</strong>, với các chỉ tiêu kỹ thuật sau:</p>
        <dl class="kg-specs">${KDG_SPEC_ROWS.map(([k, key]) => `<div><dt>${esc(k)}</dt><dd>${esc(key ? p.cmp[key] : '25kg/bao')}</dd></div>`).join('')}</dl></div>`;
    }
    return `<div class="kg-care">${KDG_CARE.map(
      (c) => `<div class="kg-care__card"><img src="/assets/icons/${c.icon}.svg" alt="" width="24" height="24"><div><strong>${esc(c.title)}</strong><p>${esc(c.text)}</p></div></div>`,
    ).join('')}</div>`;
  };
  const renderDetail = () => {
    const p = KDG_PRODUCTS[sel];
    ptabs.innerHTML = KDG_PRODUCTS.map(
      (x, i) => `<button type="button" class="kg-ptab" role="tab" aria-selected="${i === sel}" data-pick="${i}">${esc(x.code)}</button>`,
    ).join('');
    subtabs.innerHTML = KDG_SUBTABS.map(
      (t, i) => `<button type="button" class="kg-subtab" role="tab" aria-selected="${i === sub}" data-sub="${i}">${esc(t)}</button>`,
    ).join('');
    bag.src = p.img;
    bag.alt = `Bao keo ${p.code}`;
    chip.textContent = `25kg/bao · ${p.powder}`;
    if (std) std.textContent = p.standard;
    name.textContent = p.name;
    panel.innerHTML = panelHTML();
  };

  const pick = (i) => {
    if (i === sel && sub === 0) return;
    sel = i;
    sub = 0;
    renderTable();
    renderDetail();
  };
  const pickSub = (i) => {
    sub = i;
    renderDetail();
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-pick]');
    if (a && (table.contains(a) || detail.contains(a))) return pick(Number(a.dataset.pick));
    const s = e.target.closest('[data-sub]');
    if (s && detail.contains(s)) pickSub(Number(s.dataset.sub));
  });

  renderTable();
  renderDetail();
}
