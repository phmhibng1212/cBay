/**
 * Marquee tự chạy: nhân đôi các phần tử con của [data-marquee] (bản sao ẩn với trình đọc màn hình)
 * để CSS chạy vòng liền mạch. CSS quyết định breakpoint nào bật (xem .ab-strip__row ở ve-chung-toi.css);
 * khi tắt/giảm chuyển động thì bản sao bị ẩn và vùng cuộn tay vẫn dùng được.
 */
export function initMarquee() {
  document.querySelectorAll('[data-marquee]').forEach((row) => {
    if (row.dataset.marqueeReady) return;
    row.dataset.marqueeReady = '1';
    [...row.children].forEach((el) => {
      const clone = el.cloneNode(true);
      clone.classList.add('is-clone');
      clone.setAttribute('aria-hidden', 'true');
      clone.removeAttribute('data-anim');
      clone.removeAttribute('data-anim-stagger');
      clone.querySelectorAll('img').forEach((i) => { i.alt = ''; i.removeAttribute('loading'); });
      if (clone.tagName === 'IMG') { clone.alt = ''; clone.removeAttribute('loading'); }
      row.append(clone);
    });
  });
}
