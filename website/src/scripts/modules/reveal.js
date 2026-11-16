/**
 * Hiệu ứng xuất hiện khi cuộn (xem src/styles/animations.css).
 *   <div data-anim="fade-up" style="--d:120ms">  →  thêm class .is-in khi vào khung nhìn
 *   <ul data-anim-stagger>…</ul>                  →  các con có data-anim tự so le 90ms
 */
export function initReveal() {
  const items = [...document.querySelectorAll('[data-anim]')];
  if (!items.length) return;

  document.querySelectorAll('[data-anim-stagger]').forEach((parent) => {
    parent.querySelectorAll(':scope > [data-anim]').forEach((el, i) => {
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${i * 90}ms`);
    });
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  items.forEach((el) => io.observe(el));
}
