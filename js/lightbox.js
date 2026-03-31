/* ─────────────────────────────────────────────────────────────
   Portfolio Lightbox — click any img to open full-screen
   Inject <div id="lightbox-overlay"> into body on first use.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var overlay, lbImg, lbClose, lbCaption;

  function buildOverlay () {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';

    lbClose = document.createElement('span');
    lbClose.className = 'lb-close';
    lbClose.innerHTML = '&times;';
    overlay.appendChild(lbClose);

    lbImg = document.createElement('img');
    overlay.appendChild(lbImg);

    lbCaption = document.createElement('div');
    lbCaption.className = 'lb-caption';
    overlay.appendChild(lbCaption);

    document.body.appendChild(overlay);

    /* Close on backdrop click */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === lbClose) close();
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function open (src, alt) {
    if (!overlay) buildOverlay();
    lbImg.src = src;
    lbCaption.textContent = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close () {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function init () {
    /* All regular images on the page */
    document.querySelectorAll('img').forEach(function (img) {
      /* Skip tiny icons, logos, etc. (width < 60px in markup) */
      var w = parseInt(img.getAttribute('width') || '0', 10);
      if (w && w < 60) return;
      /* Skip elements that already have a parent <a> opening a URL */
      if (img.closest('a[href]:not([href="#"])')) return;

      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        var caption = img.getAttribute('alt') || '';
        /* Look for a sibling .fig-caption or .lb-caption element */
        var capEl = img.parentElement && img.parentElement.querySelector('.fig-caption, .lb-caption');
        if (capEl) caption = capEl.textContent || caption;
        open(img.src, caption);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
