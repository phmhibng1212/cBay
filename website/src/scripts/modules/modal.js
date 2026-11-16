/**
 * Modal / popup dùng chung.
 *   Mở :  <button data-modal-open="trial">   (tên = data-modal của popup)
 *   Đóng: <button data-modal-close> · bấm nền · phím Esc
 * Sự kiện: 'modal:opened' / 'modal:closed' (detail: { name, trigger }) để module khác lắng nghe.
 */
let current = null; // { el, name, trigger }
let lastFocus = null;

export function openModal(name, trigger = null) {
  const el = document.querySelector(`[data-modal="${name}"]`);
  if (!el) return;
  if (current) closeModal();
  lastFocus = document.activeElement;
  current = { el, name, trigger };
  el.hidden = false;
  document.body.classList.add('is-locked');
  document.dispatchEvent(new CustomEvent('modal:opened', { detail: { name, trigger } }));
  // đưa focus vào popup
  requestAnimationFrame(() => {
    const first = el.querySelector('input, button:not([data-modal-close]), [href]') || el.querySelector('[data-modal-close]');
    first?.focus({ preventScroll: true });
  });
}

export function closeModal() {
  if (!current) return;
  const { el, name } = current;
  el.hidden = true;
  current = null;
  document.body.classList.remove('is-locked');
  document.dispatchEvent(new CustomEvent('modal:closed', { detail: { name } }));
  lastFocus?.focus?.({ preventScroll: true });
}

export function initModals() {
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      openModal(opener.dataset.modalOpen, opener);
      return;
    }
    if (e.target.closest('[data-modal-close]')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!current) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    // bẫy focus trong popup
    const f = [...current.el.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((n) => n.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
