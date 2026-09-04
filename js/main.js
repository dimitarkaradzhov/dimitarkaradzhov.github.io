// Mobile nav toggle
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
})();

// Delayed, low-obtrusion newsletter pop-up.
// Shows only once per browser session, and only once BOTH conditions are met:
//   - visitor has scrolled past ~35% of the page
//   - at least ~25 seconds have passed since page load
(function () {
  var overlay = document.getElementById('popupOverlay');
  var closeBtn = document.getElementById('popupClose');
  if (!overlay) return; // this page has no popup markup (shouldn't happen, but safe)

  var STORAGE_KEY = 'dhs_popup_shown';
  var MIN_SECONDS = 25;
  var SCROLL_FRACTION = 0.35;

  if (sessionStorage.getItem(STORAGE_KEY)) return;

  var timeOk = false;
  var scrollOk = false;
  var shown = false;

  function maybeShow() {
    if (shown || !timeOk || !scrollOk) return;
    shown = true;
    overlay.classList.add('visible');
    sessionStorage.setItem(STORAGE_KEY, '1');
    window.removeEventListener('scroll', onScroll);
  }

  setTimeout(function () {
    timeOk = true;
    maybeShow();
  }, MIN_SECONDS * 1000);

  function onScroll() {
    var scrolled = window.scrollY;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    if (scrolled / maxScroll >= SCROLL_FRACTION) {
      scrollOk = true;
      maybeShow();
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  function closePopup() {
    overlay.classList.remove('visible');
  }
  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });
})();

// Tap-to-flip cards (book sneak peek)
(function () {
  var cards = document.querySelectorAll('.flip-card');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });
  });
})();
