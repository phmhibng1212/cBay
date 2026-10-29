/* cBay landing page – vanilla JS, no dependencies, no network requests. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Scroll-reveal animations ([data-anim] → .is-visible)
     ------------------------------------------------------------------ */
  (function initReveal() {
    var items = document.querySelectorAll('[data-anim]');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ------------------------------------------------------------------
     2. Mobile / tablet navigation menu
     ------------------------------------------------------------------ */
  (function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      menu.hidden = !open;
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', function (e) {
      if (menu.hidden) return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
    });

    window.matchMedia('(min-width: 1100px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  })();

  /* ------------------------------------------------------------------
     3. FAQ accordion
     ------------------------------------------------------------------ */
  (function initFaq() {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var button = item.querySelector('.faq__q');
      if (!button) return;
      button.addEventListener('click', function () {
        var open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
      });
    });
  })();

  /* ------------------------------------------------------------------
     4. Projects carousel: arrows (desktop), swipe + snap + dots (touch)
     ------------------------------------------------------------------ */
  (function initCarousel() {
    var track = document.querySelector('[data-carousel]');
    var prev = document.querySelector('[data-carousel-prev]');
    var next = document.querySelector('[data-carousel-next]');
    var dotsWrap = document.querySelector('[data-carousel-dots]');
    if (!track) return;

    var items = Array.prototype.slice.call(track.querySelectorAll('.project'));
    var dots = [];
    var active = -1;
    var ticking = false;

    function gutter() { return parseFloat(getComputedStyle(track).paddingLeft) || 0; }
    function targetLeft(i) { return items[i].offsetLeft - gutter(); }
    function behavior() { return reduceMotion ? 'auto' : 'smooth'; }

    function nearestIndex() {
      var max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft <= 2) return 0;
      if (track.scrollLeft >= max - 2) return items.length - 1;
      var best = 0, bestDist = Infinity;
      items.forEach(function (el, i) {
        var d = Math.abs(targetLeft(i) - track.scrollLeft);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function setActive(i) {
      if (i === active) return;
      active = i;
      items.forEach(function (el, n) { el.classList.toggle('is-active', n === i); });
      dots.forEach(function (d, n) {
        d.classList.toggle('is-active', n === i);
        if (n === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }

    function update() {
      ticking = false;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      setActive(nearestIndex());
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    function goTo(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      track.scrollTo({ left: targetLeft(i), behavior: behavior() });
    }

    if (dotsWrap) {
      items.forEach(function (el, i) {
        var name = el.querySelector('.project__name');
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Dự án ' + (i + 1) + (name ? ': ' + name.textContent.trim() : ''));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    if (prev) prev.addEventListener('click', function () { goTo(nearestIndex() - 1); });
    if (next) next.addEventListener('click', function () { goTo(nearestIndex() + 1); });
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(nearestIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(nearestIndex() - 1); }
    });
    update();
  })();

  /* ------------------------------------------------------------------
     5. Modal – VIBM test report
     ------------------------------------------------------------------ */
  (function initModal() {
    var openers = document.querySelectorAll('[data-open-modal]');
    var lastFocus = null;

    function focusables(modal) {
      return modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    }

    function open(modal, trigger) {
      lastFocus = trigger || document.activeElement;
      modal.hidden = false;
      document.body.classList.add('is-locked');
      // next frame so the opacity/transform transition runs
      requestAnimationFrame(function () {
        modal.classList.add('is-open');
        var panel = modal.querySelector('.modal__panel');
        if (panel) panel.focus();
      });
    }

    function close(modal) {
      modal.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      var done = function () { modal.hidden = true; };
      if (reduceMotion) { done(); } else { setTimeout(done, 260); }
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    openers.forEach(function (btn) {
      var modal = document.getElementById(btn.getAttribute('data-open-modal'));
      if (!modal) return;

      btn.addEventListener('click', function () { open(modal, btn); });

      modal.addEventListener('click', function (e) {
        if (e.target.closest('[data-close-modal]')) close(modal);
      });

      modal.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(modal); return; }
        if (e.key !== 'Tab') return;
        var items = focusables(modal);
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === modal.querySelector('.modal__panel'))) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });
    });
  })();

  /* ------------------------------------------------------------------
     6. Trial form – client-side validation only. Nothing is sent anywhere.
     ------------------------------------------------------------------ */
  (function initForm() {
    var form = document.getElementById('trial-form');
    var success = document.getElementById('form-success');
    var again = document.getElementById('form-again');
    if (!form || !success) return;

    var submit = form.querySelector('.form__submit');
    var submitLabel = submit.querySelector('.btn__label');
    var defaultLabel = submitLabel.textContent;

    var rules = {
      name: function (v) {
        if (!v.trim()) return 'Vui lòng nhập tên của bạn.';
        if (v.trim().length < 2) return 'Tên cần có ít nhất 2 ký tự.';
        return '';
      },
      phone: function (v) {
        var digits = v.replace(/\s+/g, '');
        if (!digits) return 'Vui lòng nhập số điện thoại.';
        if (!/^\d+$/.test(digits)) return 'Số điện thoại chỉ gồm chữ số.';
        if (digits.length < 10 || digits.length > 11) return 'Số điện thoại cần có 10–11 chữ số.';
        return '';
      },
      area: function (v) { return v.trim() ? '' : 'Vui lòng nhập khu vực của bạn.'; },
      job: function (v) { return v.trim() ? '' : 'Vui lòng cho biết công việc hoặc dự án của bạn.'; }
    };

    function showError(input, message) {
      var field = input.closest('.field');
      var out = document.getElementById(input.id + '-err');
      field.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (out) out.textContent = message;
    }

    function validate(input) {
      var rule = rules[input.name];
      var message = rule ? rule(input.value) : '';
      showError(input, message);
      return !message;
    }

    var inputs = Array.prototype.slice.call(form.querySelectorAll('.field__input'));

    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { validate(input); });
      input.addEventListener('input', function () {
        if (input.name === 'phone') input.value = input.value.replace(/\D/g, '').slice(0, 11);
        if (input.closest('.field').classList.contains('is-invalid')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // never submit/fetch anywhere

      var firstInvalid = null;
      inputs.forEach(function (input) {
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      // short fake "sending" state so the interaction feels real
      submit.disabled = true;
      submit.classList.add('is-loading');
      submitLabel.textContent = 'Đang gửi…';

      setTimeout(function () {
        form.hidden = true;
        success.hidden = false;
        submit.disabled = false;
        submit.classList.remove('is-loading');
        submitLabel.textContent = defaultLabel;
        form.reset();
        inputs.forEach(function (input) { showError(input, ''); });
        success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      }, 900);
    });

    if (again) {
      again.addEventListener('click', function () {
        success.hidden = true;
        form.hidden = false;
        var first = form.querySelector('.field__input');
        if (first) first.focus();
      });
    }
  })();
})();
