/* La Bear theme: adds the bears. Homepage: the six-bear crew under the welcome text.
   Other pages: one bear sticker beside the page title (each page always gets the same bear). */
(function () {
  if (window.__lbTheme) return; window.__lbTheme = 1;
  var BEARS = { S: ['#DAE7C6', 'Supper Kaki Bear'], I: ['#D5DFF3', '47 Tabs Bear'], A: ['#FBD0D0', 'Class Shirt Bear'],
    C: ['#D7ECD7', 'Group Chat Admin Bear'], E: ['#FCDCCE', 'Pasar Malam Bear'], R: ['#F9E4C3', 'No Manual Bear'] };
  var ORDER = ['S', 'I', 'A', 'C', 'E', 'R'];
  function bear(t, cls) {
    var d = document.createElement('span'); d.className = 'lb-bear ' + (cls || '');
    d.style.background = BEARS[t][0];
    var i = document.createElement('img'); i.src = 'labear/art/' + t + '.webp'; i.alt = BEARS[t][1]; i.loading = 'lazy';
    d.appendChild(i); return d;
  }
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var home = page === '' || page === 'index.html' || page === 'home.html';
  var tries = 0, iv = setInterval(function () {
    var h1 = document.querySelector('h1');
    if (!h1 && tries > 15) { // some pages style their title without an <h1>: take the first big hand-lettered line
      h1 = [].slice.call(document.querySelectorAll('div,h2,span')).filter(function (e) {
        var c = getComputedStyle(e); return /Gaegu/.test(c.fontFamily) && parseFloat(c.fontSize) >= 28 && e.children.length === 0;
      })[0] || null;
    }
    if (!h1) { if (++tries > 100) clearInterval(iv); return; }
    clearInterval(iv);
    if (document.querySelector('.lb-bear')) return;
    if (home) {
      var crew = document.createElement('div'); crew.className = 'lb-crew'; crew.setAttribute('aria-hidden', 'true');
      ORDER.forEach(function (t) { crew.appendChild(bear(t)); });
      h1.parentNode.appendChild(crew);
    } else {
      var n = 0; for (var k = 0; k < page.length; k++) n = (n * 31 + page.charCodeAt(k)) >>> 0;
      var b = bear(ORDER[n % 6], 'lb-peek'); b.setAttribute('aria-hidden', 'true');
      h1.parentNode.insertBefore(b, h1);
    }
  }, 100);
})();
