/**
 * Điểm vào dùng chung cho MỌI trang: nạp CSS chung + khởi tạo các thành phần dùng chung.
 * Mỗi trang có file riêng trong ./pages/ (import file này rồi thêm logic của trang).
 */
import '../styles/main.css';
import { initReveal } from './modules/reveal.js';
import { initHeader } from './modules/header.js';
import { initModals } from './modules/modal.js';
import { initForms } from './modules/forms.js';
import { initMarquee } from './modules/marquee.js';
import { initSelects } from './modules/select.js';

export function initSite() {
  initHeader();
  initModals();
  initSelects();
  initForms();
  initReveal();
  initMarquee();
}
