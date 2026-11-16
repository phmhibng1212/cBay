import { POST_URL } from '../data/blog.js';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** HTML 1 thẻ bài viết (.post-card). `excerpt: false` để bỏ đoạn tóm tắt (bài liên quan). */
export function postCardHTML(p, { excerpt = true, delay = 0 } = {}) {
  return `<li><a class="post-card" href="${POST_URL}" style="--d:${delay}ms">
    <span class="post-card__media"><img class="cover" src="${p.img}" alt="" loading="lazy"></span>
    <span class="post-card__body">
      <span class="post-card__cat">${esc(p.cat)}</span>
      <span class="post-card__title">${esc(p.title)}</span>
      ${excerpt ? `<span class="post-card__excerpt">${p.excerptM ? `<span class="only-d">${esc(p.excerpt)}</span><span class="only-m">${esc(p.excerptM)}</span>` : esc(p.excerpt)}</span>` : ''}
      <span class="post-card__meta">${esc(p.meta)}</span>
    </span></a></li>`;
}
