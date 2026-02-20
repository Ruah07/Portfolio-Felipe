/**
 * Inicialización del tema (día/noche) antes del primer pintado.
 * Se carga en <head> sin defer para evitar parpadeo.
 */
(function () {
  var stored = localStorage.getItem('portfolio-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
