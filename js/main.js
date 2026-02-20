/**
 * Portfolio Felipe Reyes - Vanilla JS
 * Navegación, tema día/noche, SEO, accesibilidad (WCAG)
 */

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.header__link');
  const contactForm = document.getElementById('contactForm');
  const themeToggle = document.getElementById('themeToggle');
  const mainContent = document.getElementById('main-content');
  const skipLink = document.querySelector('.skip-link');

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ——— Tema día/noche ———
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', getTheme() === 'light' ? 'true' : 'false');
    themeToggle.addEventListener('click', function () {
      var next = getTheme() === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
    themeToggle.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

  // ——— Skip link (accesibilidad) ———
  if (skipLink && mainContent) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus({ preventScroll: true });
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ——— AOS: respetar prefers-reduced-motion ———
  if (typeof AOS !== 'undefined' && !prefersReducedMotion) {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  } else if (prefersReducedMotion) {
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
    });
  }

  // ——— Header scroll ———
  function onScroll() {
    if (header && window.scrollY > 50) {
      header.classList.add('scrolled');
    } else if (header) {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ——— Menú móvil: toggle + aria + focus ———
  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstLink = mobileNav.querySelector('.header__link');
    if (firstLink) setTimeout(function () { firstLink.focus(); }, 100);
  }
  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    navToggle.focus();
  }
  function toggleMobileNav() {
    if (mobileNav.classList.contains('open')) closeMobileNav();
    else openMobileNav();
  }

  navToggle.addEventListener('click', toggleMobileNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 768) closeMobileNav();
    });
  });

  // Cerrar menú con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Activar enlace según sección visible
  function setActiveLink() {
    var sections = document.querySelectorAll('section[id]');
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      var top = section.offsetTop - 100;
      var height = section.offsetHeight;
      if (id && scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (navLink) {
          navLink.classList.remove('active');
          navLink.removeAttribute('aria-current');
          if (navLink.getAttribute('href') === '#' + id) {
            navLink.classList.add('active');
            navLink.setAttribute('aria-current', 'page');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // Hero: select "Ir a..."
  var heroLink = document.getElementById('heroLink');
  var heroBtnCta = document.querySelector('.hero__btn-cta');
  if (heroLink && heroBtnCta) {
    var behanceUrl = 'https://www.behance.net/dfreyes98';
    heroLink.addEventListener('change', function () {
      var val = this.value;
      if (val === 'proyectos') {
        heroBtnCta.href = '#proyectos';
        heroBtnCta.textContent = 'Ver proyectos';
      } else if (val === 'contacto') {
        heroBtnCta.href = '#contacto';
        heroBtnCta.textContent = 'Empezar';
      } else if (val === 'behance') {
        heroBtnCta.href = behanceUrl;
        heroBtnCta.target = '_blank';
        heroBtnCta.rel = 'noopener';
        heroBtnCta.textContent = 'Ir a Behance';
      } else {
        heroBtnCta.href = '#contacto';
        heroBtnCta.target = '_self';
        heroBtnCta.textContent = 'Empezar';
      }
    });
  }

  // Hero: animación iconos y etiquetas (solo si no hay reduced motion)
  if (!prefersReducedMotion) {
    var heroIcons = document.querySelectorAll('.hero__icon');
    var heroLabels = document.querySelectorAll('.hero__label');
    var heroWrap = document.querySelector('.hero__image-wrap');
    if (heroWrap && (heroIcons.length || heroLabels.length)) {
      heroWrap.addEventListener('mouseenter', function () {
        heroIcons.forEach(function (icon) { icon.classList.add('hero__icon--animated'); });
        heroLabels.forEach(function (label) { label.classList.add('hero__label--animated'); });
      });
      heroWrap.addEventListener('mouseleave', function () {
        heroIcons.forEach(function (icon) { icon.classList.remove('hero__icon--animated'); });
        heroLabels.forEach(function (label) { label.classList.remove('hero__label--animated'); });
      });
    }
  }

  // Formulario de contacto
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.contact__submit');
      var text = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = '¡Mensaje enviado!';
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = text;
          btn.disabled = false;
        }, 2500);
      }, 800);
    });
  }
});
