import { TYPES, PROJECTS } from '../data/projects.js';

/** Trang Khách hàng: lọc dự án theo loại (tab), đếm số lượng, trạng thái "đang cập nhật". */
export function initKhachHang() {
  const root = document.querySelector('[data-projects]');
  if (!root) return;
  const tabsEl = root.querySelector('[data-type-tabs]');
  const grid = root.querySelector('[data-project-grid]');
  const empty = root.querySelector('[data-project-empty]');
  const result = root.querySelector('[data-project-count]');
  let current = 0;

  const countOf = (i) => (i === 0 ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(TYPES[i])).length);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  const renderTabs = () => {
    tabsEl.innerHTML = TYPES.map(
      (t, i) => `<button type="button" class="type-tab" role="tab" aria-selected="${i === current}" data-type="${i}">
        <span class="type-tab__label">${esc(t)}</span><span class="type-tab__count">${countOf(i)}</span></button>`,
    ).join('');
  };

  const render = () => {
    const list = current === 0 ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(TYPES[current]));
    result.textContent = `${list.length} dự án`;
    grid.hidden = list.length === 0;
    empty.hidden = list.length > 0;
    grid.innerHTML = list
      .map(
        (p, i) => `<li><article class="project-card" style="--d:${Math.min(i, 8) * 40}ms">
          <div class="project-card__media"><img class="cover" src="${p.img}" alt="${esc(p.name)}" loading="lazy"></div>
          <div class="project-card__caption">
            <p class="project-card__type">${esc(p.type)}</p>
            <h3 class="project-card__name">${esc(p.name)}</h3>
            <p class="project-card__meta">${esc(p.loc)} · ${esc(p.product)}</p>
          </div></article></li>`,
      )
      .join('');
  };

  const select = (i) => {
    current = i;
    renderTabs();
    render();
    tabsEl.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  };

  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-type]');
    if (b && Number(b.dataset.type) !== current) select(Number(b.dataset.type));
  });
  root.querySelector('[data-project-reset]').addEventListener('click', () => select(0));

  // Nút trong hero: cuộn tới danh sách
  renderTabs();
  render();
}
