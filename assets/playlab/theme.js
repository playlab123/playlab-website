// Follow the device preference before the page paints and when it changes.
(function () {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  function applyTheme() {
    document.documentElement.dataset.theme = preference.matches ? 'dark' : 'light';
  }
  applyTheme();
  preference.addEventListener('change', applyTheme);
})();
