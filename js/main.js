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
     4. Projects carousel: arrows, draggable scrollbar, mouse drag,
        touch swipe + snap, position dots
     ------------------------------------------------------------------ */
  (function initCarousel() {
    var track = document.querySelector('[data-carousel]');
    var prev = document.querySelector('[data-carousel-prev]');
    var next = document.querySelector('[data-carousel-next]');
    var dotsWrap = document.querySelector('[data-carousel-dots]');
    var scrub = document.querySelector('[data-carousel-scrub]');
    var scrubTrack = scrub && scrub.querySelector('[data-scrub-track]');
    var thumb = scrub && scrub.querySelector('.scrub__thumb');
    if (!track) return;

    var items = Array.prototype.slice.call(track.querySelectorAll('.project'));
    var dots = [];
    var active = -1;
    var ticking = false;

    function gutter() { return parseFloat(getComputedStyle(track).paddingLeft) || 0; }
    function maxScroll() { return Math.max(0, track.scrollWidth - track.clientWidth); }
    function targetLeft(i) { return items[i].offsetLeft - gutter(); }
    function behavior() { return reduceMotion ? 'auto' : 'smooth'; }

    function nearestIndex() {
      if (track.scrollLeft <= 2) return 0;
      if (track.scrollLeft >= maxScroll() - 2) return items.length - 1;
      var best = 0, bestDist = Infinity;
      items.forEach(function (el, i) {
        var d = Math.abs(targetLeft(i) - track.scrollLeft);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    /* The cards near the end can never reach the left edge (nothing to scroll),
       so "previous / next" is decided from the current scroll position, not from the active card. */
    function prevIndex() {
      for (var i = items.length - 1; i >= 0; i--) if (targetLeft(i) < track.scrollLeft - 4) return i;
      return 0;
    }
    function nextIndex() {
      for (var i = 0; i < items.length; i++) if (targetLeft(i) > track.scrollLeft + 4) return i;
      return items.length - 1;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      track.scrollTo({ left: Math.min(targetLeft(i), maxScroll()), behavior: behavior() });
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

    function updateScrub() {
      if (!scrub) return;
      var max = maxScroll();
      scrub.hidden = max <= 2;
      if (max <= 2) return;
      var tw = scrubTrack.clientWidth;
      var w = Math.max(56, tw * track.clientWidth / track.scrollWidth);
      var x = (tw - w) * Math.min(1, track.scrollLeft / max);
      thumb.style.width = w + 'px';
      thumb.style.transform = 'translateX(' + x + 'px)';
      thumb.setAttribute('aria-valuenow', String(Math.round(track.scrollLeft / max * 100)));
    }

    function update() {
      ticking = false;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= maxScroll() - 2;
      setActive(nearestIndex());
      updateScrub();
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    /* dots */
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

    /* arrows + keyboard */
    if (prev) prev.addEventListener('click', function () { goTo(prevIndex()); });
    if (next) next.addEventListener('click', function () { goTo(nextIndex()); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(nextIndex()); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(prevIndex()); }
    });

    /* mouse drag on the cards (touch already scrolls natively) */
    (function () {
      var down = false, moved = false, startX = 0, startLeft = 0;
      track.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      });
      window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
        if (moved) track.scrollLeft = startLeft - dx;
      });
      function end() {
        if (!down) return;
        down = false;
        if (moved) {
          track.classList.remove('is-dragging');
          goTo(nearestIndex());
        }
      }
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    })();

    /* draggable scrollbar */
    if (scrub) {
      var dragging = false, startX = 0, startLeft = 0;
      thumb.addEventListener('pointerdown', function (e) {
        dragging = true; startX = e.clientX; startLeft = track.scrollLeft;
        thumb.setPointerCapture(e.pointerId);
        thumb.classList.add('is-dragging');
        track.classList.add('is-dragging');
        e.preventDefault();
      });
      thumb.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var room = scrubTrack.clientWidth - thumb.offsetWidth;
        if (room <= 0) return;
        track.scrollLeft = startLeft + (e.clientX - startX) * (maxScroll() / room);
      });
      function endDrag() {
        if (!dragging) return;
        dragging = false;
        thumb.classList.remove('is-dragging');
        track.classList.remove('is-dragging');
      }
      thumb.addEventListener('pointerup', endDrag);
      thumb.addEventListener('pointercancel', endDrag);
      // click on the rail: jump there
      scrubTrack.addEventListener('pointerdown', function (e) {
        if (e.target === thumb) return;
        var rect = scrubTrack.getBoundingClientRect();
        var room = rect.width - thumb.offsetWidth;
        var ratio = room > 0 ? (e.clientX - rect.left - thumb.offsetWidth / 2) / room : 0;
        track.scrollTo({ left: Math.max(0, Math.min(1, ratio)) * maxScroll(), behavior: behavior() });
      });
      thumb.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(nextIndex()); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(prevIndex()); }
        if (e.key === 'Home') { e.preventDefault(); goTo(0); }
        if (e.key === 'End') { e.preventDefault(); goTo(items.length - 1); }
      });
    }

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
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
     5b. Hero photo shape. The L-shaped cut-out (white notches for the text)
         is drawn as an SVG mask sized to the real element, so the rounded
         corners keep their true radius at every screen width.
     ------------------------------------------------------------------ */
  (function initHeroMask() {
    var stage = document.querySelector('.hero__stage');
    var media = document.querySelector('.hero__media');
    var desc = document.querySelector('.hero__desc');
    if (!stage || !media || !desc) return;
    var desktop = window.matchMedia('(min-width: 1100px)');
    var frame = 0;

    function setMask(path, w, h) {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '"><path d="' + path + '"/></svg>';
      var url = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
      media.style.setProperty('-webkit-mask-image', url);
      media.style.setProperty('mask-image', url);
      media.style.setProperty('-webkit-mask-size', '100% 100%');
      media.style.setProperty('mask-size', '100% 100%');
    }

    function arc(r, sweep, x, y) { return 'A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + x + ' ' + y; }

    function build() {
      frame = 0;
      var w, h, d;
      if (desktop.matches) {
        stage.style.removeProperty('--notch-h');
        w = media.offsetWidth; h = media.offsetHeight;
        if (!w || !h) return;
        var r = 32, k = w / 1280, y0 = 318, y2 = 563, x1 = 702 * k, x3 = 717 * k;
        d = 'M' + r + ' ' + y0 + 'H' + (x1 - r) + arc(r, 0, x1, y0 - r) + 'V' + r + arc(r, 1, x1 + r, 0) +
            'H' + (w - r) + arc(r, 1, w, r) + 'V' + (y2 - r) + arc(r, 1, w - r, y2) +
            'H' + (x3 + r) + arc(r, 0, x3, y2 + r) + 'V' + (h - r) + arc(r, 1, x3 - r, h) +
            'H' + r + arc(r, 1, 0, h - r) + 'V' + (y0 + r) + arc(r, 1, r, y0) + 'Z';
      } else {
        // text notch grows with the paragraph; the photo band below keeps a fixed height
        stage.style.setProperty('--notch-h', Math.round(desc.offsetHeight + 13) + 'px');
        w = media.offsetWidth; h = media.offsetHeight;
        if (!w || !h) return;
        var rr = 24, nh = Math.round(desc.offsetHeight + 13), nw = Math.min(w - rr * 2 - 8, desc.offsetWidth + 15);
        d = 'M' + rr + ' ' + nh + 'H' + (nw - rr) + arc(rr, 0, nw, nh - rr) + 'V' + rr + arc(rr, 1, nw + rr, 0) +
            'H' + (w - rr) + arc(rr, 1, w, rr) + 'V' + (h - rr) + arc(rr, 1, w - rr, h) +
            'H' + rr + arc(rr, 1, 0, h - rr) + 'V' + (nh + rr) + arc(rr, 1, rr, nh) + 'Z';
      }
      setMask(d, w, h);
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(build); }

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(schedule);
      ro.observe(stage); ro.observe(desc); ro.observe(media);
    }
    window.addEventListener('resize', schedule);
    desktop.addEventListener('change', schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    build();
  })();

  /* ------------------------------------------------------------------
     5c. Custom dropdown (Công việc/Dự án) – keyboard + screen-reader friendly
     ------------------------------------------------------------------ */
  (function initDropdown() {
    var root = document.querySelector('[data-dropdown]');
    if (!root) return;
    var btn = root.querySelector('.dropdown__trigger');
    var list = root.querySelector('.dropdown__list');
    var label = root.querySelector('.dropdown__value');
    var opts = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));
    var placeholder = label.getAttribute('data-placeholder');
    var current = -1;

    function setActive(i) {
      current = i;
      opts.forEach(function (o, n) { o.classList.toggle('is-active', n === i); });
      if (i >= 0) {
        btn.setAttribute('aria-activedescendant', opts[i].id);
        opts[i].scrollIntoView({ block: 'nearest' });
      } else {
        btn.removeAttribute('aria-activedescendant');
      }
    }

    function isOpen() { return !list.hidden; }

    function open() {
      if (isOpen()) return;
      list.hidden = false;
      root.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      // flip upwards when there is no room below
      var rect = btn.getBoundingClientRect();
      var need = list.offsetHeight + 16;
      root.classList.toggle('is-up', rect.bottom + need > window.innerHeight && rect.top > need);
      var selected = opts.findIndex(function (o) { return o.getAttribute('aria-selected') === 'true'; });
      setActive(selected >= 0 ? selected : 0);
    }

    function close() {
      list.hidden = true;
      root.classList.remove('is-open', 'is-up');
      btn.setAttribute('aria-expanded', 'false');
      setActive(-1);
    }

    function choose(i) {
      var o = opts[i];
      opts.forEach(function (x) { x.setAttribute('aria-selected', x === o ? 'true' : 'false'); });
      btn.value = o.getAttribute('data-value');
      label.textContent = o.textContent;
      root.classList.add('has-value');
      close();
      btn.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function reset() {
      btn.value = '';
      label.textContent = placeholder;
      root.classList.remove('has-value');
      opts.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      close();
    }

    btn.addEventListener('click', function () { if (isOpen()) close(); else open(); });
    // keep focus on the trigger while clicking options (avoids a premature blur validation)
    list.addEventListener('mousedown', function (e) { e.preventDefault(); });
    list.addEventListener('click', function (e) {
      var li = e.target.closest('[role="option"]');
      if (li) choose(opts.indexOf(li));
    });
    list.addEventListener('mousemove', function (e) {
      var li = e.target.closest('[role="option"]');
      if (li) setActive(opts.indexOf(li));
    });

    btn.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen()) { open(); return; }
        setActive(k === 'ArrowDown' ? Math.min(opts.length - 1, current + 1) : Math.max(0, current - 1));
      } else if (k === 'Home' && isOpen()) { e.preventDefault(); setActive(0); }
      else if (k === 'End' && isOpen()) { e.preventDefault(); setActive(opts.length - 1); }
      else if (k === 'Enter' || k === ' ') {
        e.preventDefault();
        if (isOpen() && current >= 0) choose(current); else open();
      } else if (k === 'Escape' && isOpen()) { e.preventDefault(); e.stopPropagation(); close(); }
      else if (k === 'Tab' && isOpen()) { close(); }
      else if (k.length === 1) {
        var hit = opts.findIndex(function (o) { return o.textContent.trim().toLowerCase().indexOf(k.toLowerCase()) === 0; });
        if (hit >= 0) { if (!isOpen()) open(); setActive(hit); }
      }
    });

    document.addEventListener('click', function (e) { if (isOpen() && !root.contains(e.target)) close(); });
    var form = root.closest('form');
    if (form) form.addEventListener('reset', reset);
  })();

  /* ------------------------------------------------------------------
     5d. Back-to-top button
     ------------------------------------------------------------------ */
  (function initToTop() {
    var btn = document.querySelector('[data-to-top]');
    if (!btn) return;
    var ticking = false;
    function update() {
      ticking = false;
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    update();
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
      job: function (v) { return v ? '' : 'Vui lòng chọn công việc hiện tại của bạn.'; }
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
