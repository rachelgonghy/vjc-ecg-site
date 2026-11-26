#!/usr/bin/env python3
"""Adds (or refreshes) the La Bear theme in every page of the ECG site.
Each page is a bundle whose layout lives in a JSON 'template'; the theme's CSS and JS are
inlined into that template between LB-THEME markers, so running this again just replaces them.
Run from the repo root:  python3 labear/apply-theme.py        (use --remove to take the theme out)"""
import glob, json, re, sys
css = open('labear/theme.css', encoding='utf-8').read()
js = open('labear/theme.js', encoding='utf-8').read()
remove = '--remove' in sys.argv
block = '' if remove else f'<!--LB-THEME--><style id="lb-theme">{css}</style><script id="lb-theme-js">{js}</script><!--/LB-THEME-->'
pat = re.compile(r'(<script type="__bundler/template">)(.*?)(</script>)', re.S)
done = 0
for f in sorted(glob.glob('*.html')):
    s = open(f, encoding='utf-8').read()
    m = pat.search(s)
    if not m: print('skip (no template):', f); continue
    t = json.loads(m.group(2))
    t = re.sub(r'<!--LB-THEME-->.*?<!--/LB-THEME-->', '', t, flags=re.S)
    if block:
        if '</helmet>' not in t: print('skip (no helmet):', f); continue
        t = t.replace('</helmet>', block + '</helmet>', 1)
    enc = json.dumps(t, ensure_ascii=False).replace('</', '<\\u002F')
    s = s[:m.start(2)] + enc + s[m.end(2):]
    open(f, 'w', encoding='utf-8').write(s); done += 1
print(('removed from' if remove else 'applied to'), done, 'pages')
