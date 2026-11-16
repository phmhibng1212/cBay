import { submitLead } from './lead.js';

/**
 * Form dùng thử + form liên hệ.
 * - Chip "Bạn muốn dùng thử sản phẩm nào" đổi ảnh bên trái (D8 / Vữa / Cả 2) — theo Figma 346:732/733/784.
 * - Mở từ nút có data-product="d8|vasa|both" thì chọn sẵn sản phẩm đó; mặc định "both" (theo code thiết kế).
 * - Gửi xong hiện trạng thái "thành công" (theo code); đóng popup thì form được đặt lại.
 */
export function initForms() {
  document.querySelectorAll('form[data-form]').forEach(setupForm);

  document.addEventListener('modal:opened', (e) => {
    if (e.detail.name !== 'trial') return;
    const want = e.detail.trigger?.dataset?.product || 'both';
    const radio = document.querySelector(`#modal-trial input[name="product"][value="${want}"]`);
    if (radio) { radio.checked = true; syncTrialImage(); }
  });

  document.addEventListener('modal:closed', (e) => {
    const modal = document.querySelector(`[data-modal="${e.detail.name}"]`);
    const form = modal?.querySelector('form[data-form]');
    if (!form) return;
    form.hidden = false;
    modal.querySelector('[data-form-success]').hidden = true;
    form.reset();
    form.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
    if (e.detail.name === 'trial') syncTrialImage();
  });
}

function setupForm(form) {
  const type = form.dataset.form;
  const modal = form.closest('.modal');
  const success = modal.querySelector('[data-form-success]');
  const submit = form.querySelector('.form__submit');

  if (type === 'trial') {
    form.querySelectorAll('input[name="product"]').forEach((r) => r.addEventListener('change', syncTrialImage));
  }
  form.addEventListener('input', (e) => e.target.removeAttribute?.('aria-invalid'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = [...form.elements].filter((el) => el.willValidate && !el.checkValidity());
    form.querySelectorAll('.field__input').forEach((i) => i.toggleAttribute('aria-invalid', invalid.includes(i)));
    if (invalid.length) { invalid[0].focus(); return; }

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Đang gửi…';
    try {
      await submitLead({ form: type, ...Object.fromEntries(new FormData(form)) });
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('role', 'status');
    } catch (err) {
      console.error(err);
      alert('Gửi thông tin chưa thành công, vui lòng thử lại hoặc gọi hotline 0795 363 888.');
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}

function syncTrialImage() {
  const val = document.querySelector('#modal-trial input[name="product"]:checked')?.value || 'both';
  document.querySelectorAll('#modal-trial [data-form-img]').forEach((img) => {
    img.dataset.active = String(img.dataset.formImg === val);
  });
}
