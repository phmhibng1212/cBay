/**
 * Ô chọn (dropdown) tự vẽ cho form — giao diện theo Figma, vẫn dùng bàn phím + đọc màn hình được:
 *   <div data-select> <input type="hidden" name=...> <button data-select-btn> <span data-select-value> </button> <ul role="listbox" data-select-list> <li role="option" data-value> </div>
 * Phím: Enter/Space/↓ mở · ↑↓ di chuyển · Enter chọn · Esc đóng (không đóng cả popup) · Tab đóng.
 */
export function initSelects() {
  document.querySelectorAll('[data-select]').forEach(setup);
}

function setup(root) {
  const input = root.querySelector('input[type="hidden"]');
  const btn = root.querySelector('[data-select-btn]');
  const valueEl = root.querySelector('[data-select-value]');
  const list = root.querySelector('[data-select-list]');
  const opts = [...list.querySelectorAll('[role="option"]')];
  let active = -1;

  opts.forEach((o, i) => { o.id ||= `${btn.id}-opt-${i}`; o.setAttribute('aria-selected', 'false'); });

  const setActive = (i) => {
    active = i;
    opts.forEach((o, k) => o.classList.toggle('is-active', k === i));
    if (i >= 0) { btn.setAttribute('aria-activedescendant', opts[i].id); opts[i].scrollIntoView({ block: 'nearest' }); }
    else btn.removeAttribute('aria-activedescendant');
  };
  const open = () => {
    list.hidden = false;
    root.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    setActive(Math.max(0, opts.findIndex((o) => o.getAttribute('aria-selected') === 'true')));
  };
  const close = () => {
    list.hidden = true;
    root.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    setActive(-1);
  };
  const choose = (i) => {
    opts.forEach((o, k) => o.setAttribute('aria-selected', String(k === i)));
    input.value = opts[i].dataset.value;
    valueEl.textContent = opts[i].textContent.trim();
    root.classList.add('has-value');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    close();
    btn.focus();
  };
  const reset = () => {
    opts.forEach((o) => o.setAttribute('aria-selected', 'false'));
    input.value = '';
    valueEl.textContent = valueEl.dataset.placeholder;
    root.classList.remove('has-value');
    close();
  };

  btn.addEventListener('click', () => (list.hidden ? open() : close()));
  btn.addEventListener('keydown', (e) => {
    const isOpen = !list.hidden;
    if (e.key === 'Escape' && isOpen) { e.stopPropagation(); close(); return; }
    if (e.key === 'Tab') { if (isOpen) close(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) { open(); return; }
      setActive((active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length);
    } else if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
      e.preventDefault();
      if (active >= 0) choose(active);
    } else if (e.key === 'Home' && isOpen) { e.preventDefault(); setActive(0); }
    else if (e.key === 'End' && isOpen) { e.preventDefault(); setActive(opts.length - 1); }
  });
  list.addEventListener('mousedown', (e) => e.preventDefault()); // giữ focus ở nút
  list.addEventListener('click', (e) => {
    const i = opts.indexOf(e.target.closest('[role="option"]'));
    if (i >= 0) choose(i);
  });
  list.addEventListener('mousemove', (e) => {
    const i = opts.indexOf(e.target.closest('[role="option"]'));
    if (i >= 0 && i !== active) setActive(i);
  });
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) close(); });
  btn.addEventListener('blur', () => setTimeout(() => { if (!root.contains(document.activeElement)) close(); }, 0));
  input.form?.addEventListener('reset', () => setTimeout(reset, 0));
}
