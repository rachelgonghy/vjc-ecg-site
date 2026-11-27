/* La Bear theme script.
   Every page: cards ease in as they scroll into view (IntersectionObserver: no scroll listeners, no layout work).
   Homepage only: marks <html class="lb-home"> for the full look and adds the six-bear crew under the welcome text.
   Nothing is hidden before it animates, so content never waits on this script. */
(function () {
  if (window.__lbTheme) return; window.__lbTheme = 1;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var home = page === '' || page === 'index.html' || page === 'home.html';
  if (home) document.documentElement.classList.add('lb-home');

  var BEARS = { S: ['#DAE7C6', 'Supper Kaki Bear'], I: ['#D5DFF3', '47 Tabs Bear'], A: ['#FBD0D0', 'Class Shirt Bear'],
    C: ['#D7ECD7', 'Group Chat Admin Bear'], E: ['#FCDCCE', 'Pasar Malam Bear'], R: ['#F9E4C3', 'No Manual Bear'] };
  function bear(t) {
    var d = document.createElement('span'); d.className = 'lb-bear'; d.style.background = BEARS[t][0];
    var i = document.createElement('img'); i.src = 'labear/art/' + t + '.webp'; i.alt = BEARS[t][1]; i.decoding = 'async';
    d.appendChild(i); return d;
  }

  // Cards below the first screen ease in when they arrive. Cards already on screen are left alone.
  var io = (!reduce && 'IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('lb-reveal'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -40px 0px' }) : null;
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  function watchCards() {
    if (!io || !seen) return;
    var cards = document.querySelectorAll('[style*="display: grid"] > *');
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i]; if (seen.has(c)) continue; seen.add(c);
      if (c.getBoundingClientRect().top > innerHeight) io.observe(c);
    }
  }

  var tries = 0, iv = setInterval(function () {
    var h1 = document.querySelector('h1');
    // A few pages write their title as a big serif <div> instead of <h1>: mark the first one so it gets the gold highlight too.
    var alt = h1 ? null : document.querySelector('div[style*="var(--font-serif-display)"][style*="font-size: 2.25rem"]');
    tries++;
    if (!h1 && !alt && tries < 60) return;
    clearInterval(iv);
    var title = h1 || alt; if (title) title.classList.add('lb-title'); // only the first title on the page gets the gold highlight
    watchCards(); setTimeout(watchCards, 1500); // pages that load their lists a little later
    if (home && h1 && !document.querySelector('.lb-crew')) {
      var crew = document.createElement('div'); crew.className = 'lb-crew'; crew.setAttribute('aria-hidden', 'true');
      ['S', 'I', 'A', 'C', 'E', 'R'].forEach(function (t) { crew.appendChild(bear(t)); });
      h1.parentNode.appendChild(crew);
    }
  }, 100);
})();
