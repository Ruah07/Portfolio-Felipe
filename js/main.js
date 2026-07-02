/**
 * Portfolio Felipe Reyes - Vanilla JS
 * Navegación, tema día/noche, formulario, accesibilidad (WCAG)
 */

var SITE_CONFIG = {
  contactEmail: 'hola@felipecreativo.art',
  formsubmitUrl: 'https://formsubmit.co/ajax/hola@felipecreativo.art',
  whatsappNumber: '573007663392',
  whatsappMessage: 'Hola Felipe, revisé tu portfolio y me gustaría explorar cómo podríamos trabajar juntos.',
  whatsappPresets: [
    {
      label: 'Quiero trabajar contigo',
      message: 'Hola Felipe, revisé tu portfolio y me gustaría explorar cómo podríamos trabajar juntos en un proyecto.'
    },
    {
      label: 'Diseño UI/UX',
      message: 'Hola Felipe, estoy buscando apoyo en diseño UI/UX para mi producto. ¿Tienes disponibilidad para conversar?'
    },
    {
      label: 'Branding',
      message: 'Hola Felipe, me interesa trabajar contigo en la identidad visual de mi marca. ¿Podrías contarme tu disponibilidad?'
    },
    {
      label: 'Landing page',
      message: 'Hola Felipe, necesito una landing page para mi proyecto. ¿Me compartes tiempos de entrega y rango de inversión?'
    },
    {
      label: 'Diseño gráfico',
      message: 'Hola Felipe, tengo un proyecto que requiere diseño gráfico y me gustaría saber cómo podrías apoyarme. ¿Hablamos?'
    },
    {
      label: 'Freelance',
      message: 'Hola Felipe, busco un diseñador freelance para un proyecto en curso. ¿Estás tomando nuevos clientes?'
    },
    {
      label: 'Hacer sitio web',
      message: 'Hola Felipe, quiero crear un sitio web para mi negocio. ¿Me cuentas opciones, plazos y presupuesto?'
    }
  ]
};

function getWhatsAppUrl(message) {
  var text = (message || SITE_CONFIG.whatsappMessage).trim();
  return 'https://wa.me/' + SITE_CONFIG.whatsappNumber + '?text=' + encodeURIComponent(text);
}

var HERO_PROJECT_LABELS = {
  ui: 'Diseño UI/UX',
  branding: 'Branding',
  web: 'Diseño Web',
  landing: 'Landing Page'
};

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.header__link');
  const contactForm = document.getElementById('contactForm');
  const themeToggle = document.getElementById('themeToggle');
  const mainContent = document.getElementById('main-content');
  const skipLink = document.querySelector('.skip-link');
  const heroKeyword = document.getElementById('heroKeyword');
  const heroLink = document.getElementById('heroLink');
  const heroBtnCta = document.querySelector('.hero__btn-cta');
  const messageField = document.getElementById('message');
  const contactStatus = document.getElementById('contactStatus');
  const whatsappModal = document.getElementById('whatsappModal');
  const whatsappMessageField = document.getElementById('whatsappMessage');
  const whatsappSendBtn = document.getElementById('whatsappSend');
  const whatsappPresetsContainer = document.getElementById('whatsappPresets');
  const whatsappOpenTriggers = document.querySelectorAll('[data-whatsapp-open]');
  const toolsModal = document.getElementById('toolsModal');
  const toolsOpenTriggers = document.querySelectorAll('[data-tools-open]');
  var whatsappLastFocus = null;
  var toolsLastFocus = null;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var behanceUrl = 'https://www.behance.net/dfreyes98';
  var selectedProjectType = '';

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
      setTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
    themeToggle.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }

  if (skipLink && mainContent) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus({ preventScroll: true });
      mainContent.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

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

  function onScroll() {
    if (header && window.scrollY > 50) {
      header.classList.add('scrolled');
    } else if (header) {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function getMobileFocusables() {
    if (!mobileNav) return [];
    return Array.prototype.slice.call(
      mobileNav.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú');
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
    navToggle.setAttribute('aria-label', 'Abrir menú');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  function toggleMobileNav() {
    if (mobileNav.classList.contains('open')) closeMobileNav();
    else openMobileNav();
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 768) closeMobileNav();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toolsModal && !toolsModal.hidden) {
      closeToolsModal();
      return;
    }

    if (e.key === 'Escape' && whatsappModal && !whatsappModal.hidden) {
      closeWhatsAppModal();
      return;
    }

    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
      return;
    }

    if (e.key !== 'Tab') return;

    if (toolsModal && !toolsModal.hidden) {
      var toolsFocusables = getToolsFocusables();
      if (!toolsFocusables.length) return;

      var toolsFirst = toolsFocusables[0];
      var toolsLast = toolsFocusables[toolsFocusables.length - 1];

      if (e.shiftKey && document.activeElement === toolsFirst) {
        e.preventDefault();
        toolsLast.focus();
      } else if (!e.shiftKey && document.activeElement === toolsLast) {
        e.preventDefault();
        toolsFirst.focus();
      }
      return;
    }

    if (whatsappModal && !whatsappModal.hidden) {
      var modalFocusables = getWhatsAppFocusables();
      if (!modalFocusables.length) return;

      var modalFirst = modalFocusables[0];
      var modalLast = modalFocusables[modalFocusables.length - 1];

      if (e.shiftKey && document.activeElement === modalFirst) {
        e.preventDefault();
        modalLast.focus();
      } else if (!e.shiftKey && document.activeElement === modalLast) {
        e.preventDefault();
        modalFirst.focus();
      }
      return;
    }

    if (!mobileNav || !mobileNav.classList.contains('open')) return;

    var focusables = getMobileFocusables();
    if (!focusables.length) return;

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  function setActiveLink() {
    var sections = document.querySelectorAll('section[id]');
    var scrollY = window.scrollY;
    var activeId = 'inicio';

    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      var top = section.offsetTop - 120;
      var height = section.offsetHeight;
      if (id && scrollY >= top && scrollY < top + height) {
        activeId = id;
      }
    });

    navLinks.forEach(function (navLink) {
      navLink.classList.remove('active');
      navLink.removeAttribute('aria-current');
      if (navLink.getAttribute('href') === '#' + activeId) {
        navLink.classList.add('active');
        navLink.setAttribute('aria-current', 'page');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  function resetHeroCtaExternal() {
    if (!heroBtnCta) return;
    heroBtnCta.removeAttribute('target');
    heroBtnCta.removeAttribute('rel');
  }

  function updateHeroCta() {
    if (!heroLink || !heroBtnCta) return;

    var val = heroLink.value;
    resetHeroCtaExternal();

    if (val === 'proyectos') {
      heroBtnCta.href = '#proyectos';
      heroBtnCta.textContent = 'Ver proyectos';
    } else if (val === 'github') {
      heroBtnCta.href = '#github';
      heroBtnCta.textContent = 'Ver GitHub';
    } else if (val === 'contacto') {
      heroBtnCta.href = '#contacto';
      heroBtnCta.textContent = 'Empezar';
    } else if (val === 'behance') {
      heroBtnCta.href = behanceUrl;
      heroBtnCta.target = '_blank';
      heroBtnCta.rel = 'noopener noreferrer';
      heroBtnCta.textContent = 'Ir a Behance';
    } else {
      heroBtnCta.href = '#contacto';
      heroBtnCta.textContent = 'Empezar';
    }
  }

  function updateProjectType() {
    if (!heroKeyword) return;

    selectedProjectType = heroKeyword.value;
    try {
      if (selectedProjectType) {
        sessionStorage.setItem('portfolio-project-type', selectedProjectType);
      } else {
        sessionStorage.removeItem('portfolio-project-type');
      }
    } catch (e) {}

    if (messageField && selectedProjectType && HERO_PROJECT_LABELS[selectedProjectType]) {
      messageField.placeholder = 'Cuéntame sobre tu proyecto de ' + HERO_PROJECT_LABELS[selectedProjectType] + '...';
    } else if (messageField) {
      messageField.placeholder = 'Cuéntame sobre tu proyecto...';
    }
  }

  if (heroLink) {
    heroLink.addEventListener('change', updateHeroCta);
  }

  if (heroKeyword) {
    heroKeyword.addEventListener('change', updateProjectType);
  }

  if (heroBtnCta) {
    heroBtnCta.addEventListener('click', function () {
      if (selectedProjectType) {
        try { sessionStorage.setItem('portfolio-project-type', selectedProjectType); } catch (e) {}
      }
    });
  }

  try {
    var storedType = sessionStorage.getItem('portfolio-project-type');
    if (storedType && heroKeyword) {
      heroKeyword.value = storedType;
      updateProjectType();
    }
  } catch (e) {}

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

  document.querySelectorAll('.project-card__image img').forEach(function (img) {
    img.addEventListener('error', function () {
      var link = img.closest('.project-card__image');
      if (!link || link.classList.contains('project-card__image--fallback')) return;
      var title = img.getAttribute('alt') || 'Proyecto';
      img.remove();
      link.classList.add('project-card__image--fallback');
      link.insertAdjacentHTML('beforeend', '<span class="project-card__fallback-title">' + title + '</span>');
    }, { once: true });
  });

  var heroImg = document.querySelector('.hero__image');
  if (heroImg) {
    heroImg.addEventListener('error', function () {
      heroImg.classList.add('hero__image--hidden');
      var wrap = heroImg.closest('.hero__image-wrap');
      if (wrap) wrap.classList.add('hero__image-wrap--fallback');
    }, { once: true });
  }

  function setContactStatus(message, type) {
    if (!contactStatus) return;
    contactStatus.textContent = message;
    contactStatus.setAttribute('data-type', type || '');
  }

  function getWhatsAppFocusables() {
    if (!whatsappModal) return [];
    return Array.prototype.slice.call(
      whatsappModal.querySelectorAll(
        'button:not([disabled]), [href], textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) {
      return el.offsetParent !== null || el === whatsappMessageField;
    });
  }

  function setWhatsAppPresetActive(message) {
    if (!whatsappPresetsContainer) return;
    var normalized = (message || '').trim();
    whatsappPresetsContainer.querySelectorAll('.whatsapp-modal__preset').forEach(function (btn) {
      var isActive = btn.getAttribute('data-message').trim() === normalized;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function updateWhatsAppSendLink() {
    if (!whatsappSendBtn || !whatsappMessageField) return;
    var message = whatsappMessageField.value.trim();
    whatsappSendBtn.href = getWhatsAppUrl(message || SITE_CONFIG.whatsappMessage);
    whatsappSendBtn.setAttribute('aria-disabled', message ? 'false' : 'true');
    whatsappSendBtn.classList.toggle('is-disabled', !message);
  }

  function renderWhatsAppPresets() {
    if (!whatsappPresetsContainer) return;
    whatsappPresetsContainer.innerHTML = '';

    SITE_CONFIG.whatsappPresets.forEach(function (preset) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'whatsapp-modal__preset';
      btn.textContent = preset.label;
      btn.setAttribute('data-message', preset.message);
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        whatsappMessageField.value = preset.message;
        setWhatsAppPresetActive(preset.message);
        updateWhatsAppSendLink();
        whatsappMessageField.focus();
      });
      whatsappPresetsContainer.appendChild(btn);
    });
  }

  function openWhatsAppModal() {
    if (!whatsappModal || !whatsappMessageField) return;

    whatsappLastFocus = document.activeElement;
    whatsappMessageField.value = SITE_CONFIG.whatsappMessage;
    setWhatsAppPresetActive(SITE_CONFIG.whatsappMessage);
    updateWhatsAppSendLink();

    whatsappModal.hidden = false;
    whatsappModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('whatsapp-modal-open');

    var focusables = getWhatsAppFocusables();
    if (focusables.length) focusables[0].focus();
  }

  function closeWhatsAppModal() {
    if (!whatsappModal) return;

    whatsappModal.hidden = true;
    whatsappModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('whatsapp-modal-open');

    if (whatsappLastFocus && typeof whatsappLastFocus.focus === 'function') {
      whatsappLastFocus.focus();
    }
  }

  renderWhatsAppPresets();

  function getToolsFocusables() {
    if (!toolsModal) return [];
    return Array.prototype.slice.call(
      toolsModal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
    );
  }

  function openToolsModal() {
    if (!toolsModal) return;

    toolsLastFocus = document.activeElement;
    toolsModal.hidden = false;
    toolsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('tools-modal-open');

    var focusables = getToolsFocusables();
    if (focusables.length) focusables[0].focus();
  }

  function closeToolsModal() {
    if (!toolsModal) return;

    toolsModal.hidden = true;
    toolsModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('tools-modal-open');

    if (toolsLastFocus && typeof toolsLastFocus.focus === 'function') {
      toolsLastFocus.focus();
    }
  }

  toolsOpenTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileNav && mobileNav.classList.contains('open')) closeMobileNav();
      openToolsModal();
    });
  });

  if (toolsModal) {
    toolsModal.querySelectorAll('[data-tools-close]').forEach(function (el) {
      el.addEventListener('click', closeToolsModal);
    });
  }

  whatsappOpenTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileNav && mobileNav.classList.contains('open')) closeMobileNav();
      openWhatsAppModal();
    });
  });

  if (whatsappModal) {
    whatsappModal.querySelectorAll('[data-whatsapp-close]').forEach(function (el) {
      el.addEventListener('click', closeWhatsAppModal);
    });
  }

  if (whatsappMessageField) {
    whatsappMessageField.addEventListener('input', function () {
      setWhatsAppPresetActive(whatsappMessageField.value.trim());
      updateWhatsAppSendLink();
    });
  }

  if (whatsappSendBtn) {
    whatsappSendBtn.addEventListener('click', function (e) {
      if (!whatsappMessageField.value.trim()) {
        e.preventDefault();
        whatsappMessageField.focus();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = contactForm.querySelector('.contact__submit');
      var defaultText = btn.textContent;
      var name = contactForm.querySelector('#name').value.trim();
      var email = contactForm.querySelector('#email').value.trim();
      var message = contactForm.querySelector('#message').value.trim();
      var projectType = selectedProjectType && HERO_PROJECT_LABELS[selectedProjectType]
        ? HERO_PROJECT_LABELS[selectedProjectType]
        : 'No especificado';

      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setContactStatus('', '');

      var payload = {
        name: name,
        email: email,
        message: message,
        project_type: projectType,
        _subject: 'Nuevo contacto portfolio - ' + name,
        _captcha: 'false',
        _template: 'table'
      };

      fetch(SITE_CONFIG.formsubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Error al enviar');
          return response.json();
        })
        .then(function () {
          btn.textContent = '¡Mensaje enviado!';
          setContactStatus('Gracias por escribirme. Te responderé pronto.', 'success');
          contactForm.reset();
          selectedProjectType = '';
          if (heroKeyword) heroKeyword.value = '';
          updateProjectType();
          try { sessionStorage.removeItem('portfolio-project-type'); } catch (err) {}
          setTimeout(function () {
            btn.textContent = defaultText;
            btn.disabled = false;
          }, 3000);
        })
        .catch(function () {
          btn.textContent = defaultText;
          btn.disabled = false;
          setContactStatus(
            'No se pudo enviar. Escríbeme por WhatsApp o a ' + SITE_CONFIG.contactEmail,
            'error'
          );
        });
    });
  }
});
