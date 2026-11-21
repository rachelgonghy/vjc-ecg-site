/* ECG @ VJC shared script.
   Builds the shell (top bar, search, breadcrumbs, section nav, jump bar, pager, help card,
   footer, mobile tab bar) around each page's <main>, and wires the shared components.
   A page only needs: <body data-page="<file name without .html>"> and its <main>. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Config ---------- */
  var SITES = 'https://sites.google.com/vjc.edu.sg/ecgvjc/';
  var ICONS = (document.currentScript && document.currentScript.src.replace(/ecg\.js.*$/, '')) + 'icons.svg';
  // Inside the Google Site the pages are iframes, so internal links go to the Google Sites page
  // in a new tab. Opened directly (GitHub Pages or a local file), they go to the sibling .html file.
  var EMBEDDED = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();
  var LINK_TARGET = '_blank';

  /* ---------- Site map ----------
     [file, title, parent, Google Sites path, blurb, search keywords, icon] */
  var MAP = [
    ['index', 'Home', '', 'home', 'Your hub for life after VJC.', 'home main start', 'home'],
    ['opportunity-search-portal', 'Opportunity Search Portal', '', 'opportunity-search-portal', 'Filter scholarships, events, internships and competitions by interest.', 'opportunities internship competition event portfolio programme external tracker', 'search'],
    ['overseas-education-portal', 'Overseas Education Portal', '', 'overseas-education-portal', 'VJC deadlines, tests and scholarships for overseas universities.', 'overseas abroad deadline ucas common app sat act ucat lnat esat tmua ielts japan mext australia europe timeline', 'globe'],
    ['ecg-calendar', 'ECG Calendar', '', 'ecg-calendar', 'What ECG runs each term across JC1 and JC2.', 'calendar term schedule jc1 jc2 checkpoint timeline', 'calendar-days'],
    ['events-and-programmes', 'Events & Programmes', '', 'events-and-programmes', 'ECG events that show you the world of work.', 'events programmes talks', 'calendar'],
    ['learning-journeys', 'Learning Journeys', 'events-and-programmes', 'events-and-programmes/learning-journeys', 'Guided visits to workplaces and institutions.', 'learning journey visit trip workplace', 'route'],
    ['edvantage-fair', 'EdVantage! Fair', 'events-and-programmes', 'events-and-programmes/edvantage-fair', 'VJC’s annual fair with industry partners.', 'edvantage fair career fair booth', 'sparkles'],
    ['partner-organisations', 'Partner Organisations', 'edvantage-fair', 'events-and-programmes/edvantage-fair/partner-organisations', 'The organisations joining this year’s fair.', 'partner organisation company industry booth', 'building-2'],
    ['talk-allocation-portal', 'Talk Allocation Portal', 'edvantage-fair', 'events-and-programmes/edvantage-fair/talk-allocation-portal', 'Find the fair talks you’ve been given.', 'talk allocation sign up session', 'mic'],
    ['interactive-map', 'Interactive Map', 'edvantage-fair', 'events-and-programmes/edvantage-fair/interactive-map', 'Find booths and talk venues at the fair.', 'map floor plan booth venue', 'map-pin'],
    ['local-university-panel-discussion', 'University Panel Discussion', 'events-and-programmes', 'events-and-programmes/local-university-panel-discussion', 'Hear from local university representatives.', 'panel discussion nus ntu smu sutd sit suss fair', 'messages-square'],
    ['project-edvantage', 'Project EdVantage', 'events-and-programmes', 'events-and-programmes/project-edvantage', 'VJC’s in-house mentoring programme.', 'project edvantage mentor mentorship talent development', 'heart-handshake'],
    ['jc1-work-shadowing-programme', 'JC1 Work Shadowing', 'events-and-programmes', 'events-and-programmes/jc1-work-shadowing-programme', 'A first-hand look at a workplace you’re curious about.', 'work shadowing attachment internship jc1', 'briefcase'],
    ['university-applications', 'University Applications', '', 'university-applications', 'How to apply to local and overseas universities.', 'university application uni admissions', 'university'],
    ['get-started-here', 'Get Started Here', 'university-applications', 'university-applications/get-started-here', 'Timelines, pathways and myths, busted.', 'get started timeline results day myths faq alternative pathways igp prerequisites', 'flag'],
    ['new-university-courses', 'New University Courses', 'university-applications', 'university-applications/new-university-courses', 'New degrees opening at universities.', 'new courses degrees programmes', 'sparkles'],
    ['local-universities', 'Local Universities', 'university-applications', 'university-applications/local-universities', 'ABA, essays and interviews for Singapore universities.', 'local nus ntu smu sutd sit suss aba aptitude essay interview singapore', 'school'],
    ['overseas-universities', 'Overseas Universities', 'university-applications', 'university-applications/overseas-universities', 'Compare UK, US, EU, ANZ and Asia.', 'overseas abroad compare', 'plane'],
    ['uk', 'UK', 'overseas-universities', 'university-applications/overseas-universities/uk', 'UCAS, predicted grades and admissions tests.', 'uk united kingdom britain ucas oxbridge oxford cambridge medicine ucat lnat esat tara tmua personal statement', 'landmark'],
    ['us', 'US', 'overseas-universities', 'university-applications/overseas-universities/us', 'Common App, essays and recommendations.', 'us usa america united states common app sat act college essay recommendation', 'star'],
    ['eu-anz-asia', 'EU, ANZ & Asia', 'overseas-universities', 'university-applications/overseas-universities/eu-anz-asia', 'Europe, Australia, New Zealand and Asia.', 'europe eu france sciences po germany netherlands australia new zealand anz asia japan hong kong china taiwan korea', 'globe'],
    ['scholarships-and-interviews', 'Scholarships & Interviews', '', 'scholarships-and-interviews', 'Scholarships VJC supports, and how interviews go.', 'scholarship scholarships interview', 'trophy'],
    ['pre-u-scholarships', 'Pre-U Scholarships', 'scholarships-and-interviews', 'scholarships-and-interviews/pre-u-scholarships', 'Scholarships you can apply for while at VJC.', 'pre-u preu jc scholarship moe etps hsp humanities les language elective rsp regional pm book prize vjc', 'award'],
    ['undergraduate-scholarships', 'Undergraduate Scholarships', 'scholarships-and-interviews', 'scholarships-and-interviews/undergraduate-scholarships', 'Scholarships for university, with deadlines.', 'undergraduate psc mindef saf dsta edb mfa mha msf moh hsp a*star astar mext jardine brightsparks bond deadline', 'landmark'],
    ['interview-processes', 'Interview Processes', 'scholarships-and-interviews', 'scholarships-and-interviews/interview-processes', 'Seniors’ interview stories, questions and tips.', 'interview pae psychometric panel questions tips seniors psc uniformed', 'messages-square'],
    ['useful-resources', 'Useful Resources', '', 'useful-resources', 'Tools to plan your subjects and applications.', 'tools resources calculator', 'compass'],
    ['h2-degree-mapping-advisor', 'Degree Mapping Advisor', 'useful-resources', 'useful-resources/h2-degree-mapping-advisor', 'See which degrees your H2 subjects open up.', 'h2 degree mapping subject combination course prerequisite', 'graduation-cap'],
    ['h2-subject-eligibility-advisor', 'Subject Eligibility Advisor', 'useful-resources', 'useful-resources/h2-subject-eligibility-advisor', 'Check if you can take a subject at H2.', 'h2 subject eligibility eligible combination', 'book-open'],
    ['rank-points-calculator', 'Rank Points Calculator', 'useful-resources', 'useful-resources/rank-points-calculator', 'Work out your score on the 70 RP system.', 'rank points rp calculator grades score 70 uas', 'calculator'],
    ['external-links', 'External Links', 'useful-resources', 'useful-resources/external-links', 'Handy sites outside VJC.', 'external links websites', 'external-link'],
    ['meet-the-team', 'Meet the Team', '', 'meet-the-team', 'Who to contact with ECG questions.', 'team teachers contact email who counsellor rachel cv resume', 'users'],
    ['ecg-chatbot', 'ECG Chatbot', '', 'ecg-chatbot', 'Quick answers to ECG questions, any time.', 'chatbot ask question ai help', 'bot'],
    ['book-an-ecg-session', 'Book an ECG Session', '', 'book-an-ecg-session', 'Talk one-on-one with our ECG Counsellor.', 'book session appointment counsellor consultation rachel gong cv resume', 'calendar-check']
  ].map(function (r) {
    return { file: r[0], title: r[1], parent: r[2], path: r[3], blurb: r[4], kw: r[5], icon: r[6],
      hay: (r[1] + ' ' + r[4] + ' ' + r[5]).toLowerCase() };
  });
  var BY = {}; MAP.forEach(function (p) { BY[p.file] = p; });

  function href(file) {
    var p = BY[file]; if (!p) return file + '.html';
    return EMBEDDED ? SITES + p.path : file + '.html';
  }
  function linkAttrs(file) {
    return 'href="' + href(file) + '"' + (EMBEDDED ? ' target="' + LINK_TARGET + '" rel="noopener"' : '');
  }
  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="' + ICONS + '#i-' + name + '"/></svg>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function chain(file) { var out = []; var p = BY[file]; while (p) { out.unshift(p); p = BY[p.parent]; } return out; }
  function children(file) { return MAP.filter(function (p) { return p.parent === file; }); }

  /* ---------- Shell ---------- */
  var page = document.body.getAttribute('data-page') || 'index';
  var me = BY[page];

  function topbar() {
    return '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="topbar"><div class="wrap topbar__in">' +
      '<a class="brand" ' + linkAttrs('index') + ' aria-label="ECG at VJC home"><span class="brand__mark" aria-hidden="true">VJ</span>' +
      '<span class="brand__name">ECG @ VJC<small>Education &amp; Career Guidance</small></span></a>' +
      '<button class="searchbtn" type="button" data-search aria-label="Search the ECG site">' + icon('search') +
      '<span>Search, e.g. PSC, UCAS, NUS</span><kbd class="kbd">/</kbd></button>' +
      '<nav class="topbar__links" aria-label="Quick links">' +
      '<a class="toplink" ' + linkAttrs('opportunity-search-portal') + '>Opportunities</a>' +
      '<a class="toplink" ' + linkAttrs('ecg-chatbot') + '>' + icon('bot') + 'Ask ECG</a>' +
      '<a class="btn btn--gold" ' + linkAttrs('book-an-ecg-session') + '>' + icon('calendar-check') + '<span>Book a session</span></a>' +
      '</nav></div></header>';
  }

  function crumbs() {
    var c = chain(page); if (c.length < 1 || page === 'index') return '';
    var home = '<a ' + linkAttrs('index') + '>Home</a>';
    var parts = c.map(function (p, i) {
      return i === c.length - 1 ? '<span aria-current="page">' + esc(p.title) + '</span>' : '<a ' + linkAttrs(p.file) + '>' + esc(p.title) + '</a>';
    });
    return '<nav class="crumbs" aria-label="Breadcrumb">' + [home].concat(parts).join(icon('chevron-right')) + '</nav>';
  }

  function subnav() {
    if (!me) return '';
    var parentKey = me.parent; var list;
    if (children(page).length) { parentKey = page; }
    if (!parentKey) return '';
    list = [BY[parentKey]].concat(children(parentKey));
    if (list.length < 3) return '';
    return '<nav class="subnav" aria-label="In this section">' + list.map(function (p, i) {
      return '<a class="chip" ' + linkAttrs(p.file) + (p.file === page ? ' aria-current="page"' : '') + '>' +
        (i === 0 ? icon('layers') + 'Overview' : esc(p.title)) + '</a>';
    }).join('') + '</nav>';
  }

  function pager() {
    if (!me || !me.parent) return '';
    var sibs = children(me.parent); var i = sibs.indexOf(me);
    var prev = sibs[i - 1], next = sibs[i + 1];
    if (!prev && !next) return '';
    return '<nav class="pager wrap" aria-label="More in ' + esc(BY[me.parent].title) + '">' +
      (prev ? '<a ' + linkAttrs(prev.file) + '><small>← Previous</small><b>' + esc(prev.title) + '</b></a>' : '') +
      (next ? '<a class="next" ' + linkAttrs(next.file) + '><small>Next →</small><b>' + esc(next.title) + '</b></a>' : '') + '</nav>';
  }

  function helpcard() {
    if (page === 'book-an-ecg-session' || page === 'ecg-chatbot' || document.body.hasAttribute('data-no-help')) return '';
    return '<section class="wrap" aria-label="Get help"><div class="helpcard">' +
      '<div><h2>Still unsure what to do next?</h2><p>Ask the ECG Chatbot any time, or book a one-on-one with Ms Rachel Gong, our ECG Counsellor.</p></div>' +
      '<div class="helpcard__actions"><a class="btn btn--gold" ' + linkAttrs('book-an-ecg-session') + '>' + icon('calendar-check') + 'Book a session</a>' +
      '<a class="btn btn--light" ' + linkAttrs('ecg-chatbot') + '>' + icon('bot') + 'Ask the chatbot</a></div></div></section>';
  }

  function footer() {
    var top = MAP.filter(function (p) { return !p.parent && p.file !== 'index'; });
    var groups = top.filter(function (p) { return children(p.file).length; });
    var solo = top.filter(function (p) { return !children(p.file).length; });
    var col = function (title, items) {
      return '<div><h3>' + esc(title) + '</h3><ul>' + items.map(function (p) { return '<li><a ' + linkAttrs(p.file) + '>' + esc(p.title) + '</a></li>'; }).join('') + '</ul></div>';
    };
    return '<footer class="footer"><div class="wrap"><div class="footer__grid">' +
      col('Start here', solo) +
      groups.map(function (g) { return col(g.title, [g].concat(children(g.file)).map(function (p, i) { return i ? p : { file: p.file, title: 'Overview' }; })); }).join('') +
      '</div><div class="footer__base"><span>Education &amp; Career Guidance @ Victoria Junior College</span>' +
      '<a ' + linkAttrs('meet-the-team') + '>Questions? Meet the team</a></div></div></footer>';
  }

  function tabbar() {
    var cur = function (f) { return f === page ? ' aria-current="page"' : ''; };
    return '<nav class="tabbar" aria-label="Main">' +
      '<a ' + linkAttrs('index') + cur('index') + '>' + icon('home') + 'Home</a>' +
      '<button type="button" data-search>' + icon('search') + 'Search</button>' +
      '<a ' + linkAttrs('ecg-chatbot') + cur('ecg-chatbot') + '>' + icon('bot') + 'Ask ECG</a>' +
      '<a class="is-book" ' + linkAttrs('book-an-ecg-session') + cur('book-an-ecg-session') + '>' + icon('calendar-check') + 'Book</a></nav>';
  }

  function mountShell() {
    var main = document.querySelector('main'); if (!main) return;
    if (!main.id) main.id = 'main';
    document.body.insertAdjacentHTML('afterbegin', topbar());
    var slot = main.querySelector('[data-crumbs]');
    if (slot) slot.innerHTML = crumbs() + subnav();
    main.insertAdjacentHTML('afterend', helpcard() + '<div style="height:28px"></div>' + pager() + footer() + tabbar());
    if (!document.title || /Bundled/.test(document.title)) document.title = (me ? me.title + ' · ' : '') + 'ECG @ VJC';
    var bar = document.querySelector('.topbar');
    var onScroll = function () { bar.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* Internal links written as "uk.html" in page markup point at the Google Site when embedded. */
  function rewriteLinks(root) {
    (root || document).querySelectorAll('a[href$=".html"], a[href*=".html#"], a[href*=".html?"]').forEach(function (a) {
      var m = a.getAttribute('href').match(/^([\w-]+)\.html([?#].*)?$/); if (!m || !BY[m[1]]) return;
      if (EMBEDDED) { a.href = SITES + BY[m[1]].path; a.target = LINK_TARGET; a.rel = 'noopener'; }
    });
    // Every off-site link opens in a new tab so the student keeps their place.
    (root || document).querySelectorAll('a[href^="http"]').forEach(function (a) {
      if (!a.target) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    });
  }

  /* ---------- Search palette (transitions.dev modal) ---------- */
  var pal, palBack, palInput, palBody, palSel = 0, palItems = [], lastFocus;
  var SUGGEST = ['rank-points-calculator', 'opportunity-search-portal', 'uk', 'undergraduate-scholarships', 'book-an-ecg-session'];
  function buildPalette() {
    document.body.insertAdjacentHTML('beforeend',
      '<div class="palette-backdrop" data-close></div>' +
      '<div class="palette t-modal" role="dialog" aria-modal="true" aria-label="Search the ECG site" hidden>' +
      '<div class="palette__bar">' + icon('search') +
      '<input type="search" placeholder="Search pages, e.g. PSC, UCAS, NUS" aria-label="Search" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="pal-list">' +
      '<button class="palette__close" type="button" data-close aria-label="Close search">' + icon('x') + '</button></div>' +
      '<div class="palette__body" id="pal-list" role="listbox"></div>' +
      '<div class="palette__foot"><span><kbd class="kbd">↑</kbd> <kbd class="kbd">↓</kbd> to move</span><span><kbd class="kbd">Enter</kbd> to open</span><span><kbd class="kbd">Esc</kbd> to close</span></div></div>');
    pal = document.querySelector('.palette'); palBack = document.querySelector('.palette-backdrop');
    palInput = pal.querySelector('input'); palBody = pal.querySelector('.palette__body');
    palInput.addEventListener('input', renderResults);
    palInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); palSel = (palSel + (e.key === 'ArrowDown' ? 1 : -1) + palItems.length) % Math.max(palItems.length, 1); mark(); }
      else if (e.key === 'Enter') { var a = palItems[palSel]; if (a) { e.preventDefault(); a.click(); } }
    });
    pal.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePalette(); if (e.key === 'Tab') trap(e); });
    document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closePalette); });
  }
  function trap(e) {
    var f = pal.querySelectorAll('input, button, a[href]'); var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function score(p, q) {
    var words = q.split(/\s+/).filter(Boolean); var s = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i]; var t = p.title.toLowerCase();
      if (t === w) s += 100; else if (t.indexOf(w) === 0) s += 40; else if (t.indexOf(w) > -1) s += 25;
      else if (new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(p.hay)) s += 12;
      else if (p.hay.indexOf(w) > -1) s += 5; else return 0;
    }
    return s;
  }
  function hl(text, q) {
    var t = esc(text); q.split(/\s+/).filter(function (w) { return w.length > 1; }).forEach(function (w) {
      t = t.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    }); return t;
  }
  function row(p, q) {
    var where = p.parent ? BY[p.parent].title : 'ECG @ VJC';
    return '<a class="result" role="option" ' + linkAttrs(p.file) + '><span class="ico">' + icon(p.icon || 'circle-dot') + '</span>' +
      '<span><span class="result__t">' + hl(p.title, q) + '</span><span class="result__s">' + esc(where) + ' · ' + esc(p.blurb) + '</span></span></a>';
  }
  function renderResults() {
    var q = palInput.value.trim().toLowerCase(); var html;
    if (!q) {
      html = '<div class="palette__group">Popular</div>' + SUGGEST.map(function (f) { return row(BY[f], ''); }).join('');
    } else {
      var hits = MAP.map(function (p) { return { p: p, s: score(p, q) }; }).filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; }).slice(0, 8);
      html = hits.length ? '<div class="palette__group">Pages</div>' + hits.map(function (x) { return row(x.p, q); }).join('') : '';
      html += '<div class="palette__group">Not finding it?</div>' +
        '<a class="result" role="option" href="' + href('ecg-chatbot') + (EMBEDDED ? '' : '?q=' + encodeURIComponent(palInput.value.trim())) + '"' + (EMBEDDED ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="ico ico--gold">' + icon('bot') + '</span><span><span class="result__t">Ask the ECG Chatbot</span><span class="result__s">“' + esc(palInput.value.trim()) + '”</span></span></a>';
    }
    palBody.innerHTML = html; palItems = [].slice.call(palBody.querySelectorAll('.result')); palSel = 0; mark();
  }
  function mark() { palItems.forEach(function (a, i) { a.setAttribute('aria-selected', i === palSel ? 'true' : 'false'); if (i === palSel) a.scrollIntoView({ block: 'nearest' }); }); }
  function openPalette() {
    if (!pal) buildPalette();
    lastFocus = document.activeElement; pal.hidden = false; void pal.offsetWidth;
    pal.classList.remove('is-closing'); palBack.classList.remove('is-closing');
    pal.classList.add('is-open'); palBack.classList.add('is-open');
    palInput.value = ''; renderResults(); palInput.focus();
  }
  function closePalette() {
    if (!pal || !pal.classList.contains('is-open')) return;
    pal.classList.remove('is-open'); palBack.classList.remove('is-open');
    pal.classList.add('is-closing'); palBack.classList.add('is-closing');
    var d = parseFloat(getComputedStyle(pal).getPropertyValue('--modal-close-dur')) || 150;
    setTimeout(function () { pal.classList.remove('is-closing'); palBack.classList.remove('is-closing'); pal.hidden = true; }, d);
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- Accordion (transitions.dev) ----------
     Markup: <div class="qa t-acc" data-open="false"><button class="qa__q">Q <span class="t-acc-chevron">…</span></button>
             <div class="t-acc-panel"><div class="t-acc-panel-inner"><div class="qa__a">A</div></div></div></div> */
  function initAccordions(root) {
    (root || document).querySelectorAll('.t-acc').forEach(function (acc, i) {
      if (acc.__acc) return; acc.__acc = 1;
      var btn = acc.querySelector('.qa__q, [data-acc-trigger]'); var panel = acc.querySelector('.t-acc-panel');
      if (!btn || !panel) return;
      if (!btn.querySelector('.t-acc-chevron')) btn.insertAdjacentHTML('beforeend', '<span class="t-acc-chevron" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
      var id = panel.id || ('acc-' + Math.random().toString(36).slice(2, 8)); panel.id = id;
      btn.setAttribute('aria-controls', id);
      var set = function (open) { acc.setAttribute('data-open', open ? 'true' : 'false'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); panel.inert = !open; };
      set(acc.getAttribute('data-open') === 'true');
      btn.addEventListener('click', function () { set(acc.getAttribute('data-open') !== 'true'); });
    });
  }
  /* Simple FAQ authoring: <details class="qa"><summary>Q</summary>…</details> becomes the animated accordion. */
  function upgradeDetails(root) {
    (root || document).querySelectorAll('details.qa').forEach(function (d) {
      var s = d.querySelector('summary'); var div = document.createElement('div');
      div.className = 'qa t-acc'; div.setAttribute('data-open', d.open ? 'true' : 'false');
      var body = document.createElement('div'); body.className = 'qa__a';
      [].slice.call(d.childNodes).forEach(function (n) { if (n !== s) body.appendChild(n); });
      div.innerHTML = '<button class="qa__q" type="button"><span>' + s.innerHTML + '</span></button><div class="t-acc-panel"><div class="t-acc-panel-inner"></div></div>';
      div.querySelector('.t-acc-panel-inner').appendChild(body); d.replaceWith(div);
    });
  }

  /* ---------- Tabs sliding (transitions.dev) ----------
     Markup: <div class="t-tabs" role="tablist"><span class="t-tabs-pill"></span><button class="t-tab" role="tab" aria-selected="true">…</button>…</div>
     Fires "tabchange" on the tablist with detail.index. */
  function initTabs(root) {
    (root || document).querySelectorAll('.t-tabs').forEach(function (bar) {
      if (bar.__tabs) return; bar.__tabs = 1;
      var pill = bar.querySelector('.t-tabs-pill'); var tabs = [].slice.call(bar.querySelectorAll('.t-tab'));
      var place = function (t, instant) {
        if (!pill || !t) return;
        if (instant) pill.style.transition = 'none';
        pill.style.width = t.offsetWidth + 'px'; pill.style.transform = 'translateX(' + t.offsetLeft + 'px)';
        if (instant) { void pill.offsetWidth; pill.style.transition = ''; }
      };
      var select = function (i, focus) {
        tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
        place(tabs[i]); if (focus) tabs[i].focus();
        // data-panels="<id>": show the matching [data-panel] child of that element
        var host = bar.getAttribute('data-panels') && document.getElementById(bar.getAttribute('data-panels'));
        if (host) [].slice.call(host.querySelectorAll(':scope > [data-panel]')).forEach(function (p, j) { p.hidden = j !== i; if (j === i) p.classList.add('panel-in'); });
        bar.dispatchEvent(new CustomEvent('tabchange', { detail: { index: i, tab: tabs[i] } }));
      };
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(i); });
        t.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select((i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true); }
        });
      });
      var cur = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
      tabs.forEach(function (t, j) { t.tabIndex = j === Math.max(cur, 0) ? 0 : -1; });
      var go = function () { place(tabs[Math.max(cur, 0)] && bar.querySelector('.t-tab[aria-selected="true"]') || tabs[0], true); };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); go();
      window.addEventListener('resize', go);
    });
  }

  /* ---------- Jump bar with scroll spy ---------- */
  function initJump() {
    var host = document.querySelector('[data-jump]'); if (!host) return;
    var secs = [].slice.call(document.querySelectorAll('main section[id] > .block__head h2, main section[id] > h2, main section[id] [data-jump-title]'));
    if (secs.length < 3) { host.remove(); return; }
    host.className = 'jump'; host.setAttribute('aria-label', 'On this page');
    host.innerHTML = '<div class="wrap"><div class="jump__in"><span class="jump__label">On this page</span>' + secs.map(function (h) {
      var s = h.closest('section[id]'); return '<a class="chip" href="#' + s.id + '">' + esc(h.getAttribute('data-short') || s.getAttribute('data-short') || h.textContent) + '</a>';
    }).join('') + '</div></div>';
    var links = [].slice.call(host.querySelectorAll('a'));
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-active', on);
          if (on) a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    secs.forEach(function (h) { io.observe(h.closest('section[id]')); });
  }

  /* ---------- Hero entrance (texts reveal) ---------- */
  function initEnter() {
    var els = document.querySelectorAll('.t-stagger');
    requestAnimationFrame(function () { requestAnimationFrame(function () { els.forEach(function (e) { e.classList.add('is-shown'); }); }); });
  }

  /* ---------- Data: published Google Sheets as CSV ---------- */
  function parseCSV(text) {
    var rows = [], row = [], cur = '', q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) { if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
      else if (ch === '"') q = true;
      else if (ch === ',') { row.push(cur); cur = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += ch;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (x) { return x.trim(); }); });
  }
  /* Fetch a sheet as objects keyed by lower-cased header. Cached for the session so moving
     between pages is instant; the fresh copy replaces it in the background. */
  function sheet(url, opts) {
    opts = opts || {};
    var key = 'ecg:' + url; var cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(key) || 'null'); } catch (e) { }
    var get = function (u, ms) {
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, ms);
      return fetch(u, { cache: 'no-store', signal: ctrl && ctrl.signal })
        .then(function (r) { clearTimeout(timer); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
        .then(function (t) { if (!t || /^\s*</.test(t)) throw new Error('not CSV'); return t; });
    };
    var direct = url + (url.indexOf('?') > -1 ? '&' : '?') + '_ts=' + Date.now();
    // Google's published-CSV redirect sometimes drops CORS headers. Like the previous version of
    // the site, fall back to public CORS proxies in turn before giving up.
    var PROXIES = ['https://api.allorigins.win/raw?url=', 'https://corsproxy.io/?url='];
    var fresh = PROXIES.reduce(function (p, px) {
      return p.catch(function () { return get(px + encodeURIComponent(url), 8000); });
    }, get(direct, opts.timeout || 9000))
      .then(function (t) {
        var rows = parseCSV(t); if (rows.length < 2) throw new Error('empty');
        var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
        // { head: [...], rows: [[raw cells]...], items: [{header: value}...] }
        var data = { head: rows[0], rows: rows.slice(1), items: rows.slice(1).map(function (r) { var o = {}; head.forEach(function (h, i) { o[h] = (r[i] || '').trim(); }); return o; }) };
        try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (e) { }
        return data;
      });
    return { cached: cached, fresh: fresh };
  }

  /* ---------- Boot ---------- */
  function boot() {
    mountShell();
    upgradeDetails(); initAccordions(); initTabs(); rewriteLinks(); initJump(); initEnter();
    document.querySelectorAll('[data-search]').forEach(function (b) { b.addEventListener('click', openPalette); });
    document.addEventListener('keydown', function (e) {
      var typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) { e.preventDefault(); openPalette(); }
    });
  }

  window.ECG = { map: MAP, by: BY, href: href, linkAttrs: linkAttrs, icon: icon, esc: esc, sheet: sheet, parseCSV: parseCSV,
    initAccordions: initAccordions, upgradeDetails: upgradeDetails, initTabs: initTabs, rewriteLinks: rewriteLinks, embedded: EMBEDDED, openSearch: openPalette };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
