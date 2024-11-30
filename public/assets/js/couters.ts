(function(w: Window, d: Document, s: string, l: string, i: string): void {
  w[l] = w[l] || [];
  w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  const f: HTMLScriptElement = d.getElementsByTagName(s)[0];
  const j: HTMLScriptElement = d.createElement(s);
  const dl: string = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-KMJ8HKG');