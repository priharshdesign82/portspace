// assets/js/app.js
// PortSpace - Main JavaScript File

/**
 * Wait for DOM to load
 */
document.addEventListener('DOMContentLoaded', function () {
  // ========================================
  // INITIALIZE ALL FUNCTIONS
  // ========================================
  initLoader();
  initHeaderScroll();
  initMobileMenu();
  initThemeToggle();
  initSmoothScroll();
  initActiveLink();
  initTypedEffect();
  initPortfolioFilter();
  initContactForm();
});

// ============================================
// LOADER FUNCTIONALITY - FIXED
// ============================================
function initLoader() {
  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const mainContent = document.querySelector('main');

  if (!loader) return;

  // Pehle header aur content ko hide karo
  if (header) {
    header.style.opacity = '0';
    header.style.transition = 'opacity 0.5s ease';
  }
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
  }

  // Page load complete hone par
  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('fade-out');

      // Loader fade out ke baad content dikhao
      setTimeout(function () {
        loader.style.display = 'none';

        // Ab header aur content fade in karo
        if (header) header.style.opacity = '1';
        if (mainContent) mainContent.style.opacity = '1';
      }, 500);
    }, 1500); // 1.5 second loader dikhega
  });

  // Agar page already loaded hai (back button, cache)
  if (document.readyState === 'complete') {
    setTimeout(function () {
      loader.classList.add('fade-out');
      setTimeout(function () {
        loader.style.display = 'none';
        if (header) header.style.opacity = '1';
        if (mainContent) mainContent.style.opacity = '1';
      }, 500);
    }, 500);
  }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.addEventListener('click', function (event) {
    if (!navMenu.contains(event.target) &&
      !menuToggle.contains(event.target) &&
      navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// DARK/LIGHT THEME TOGGLE
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  if (!themeToggle) return;

  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeToggle.addEventListener('click', function () {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fa-regular fa-moon' : 'fa-regular fa-sun';
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });
}

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', function () {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// TYPED EFFECT
// ============================================
function initTypedEffect() {
  const typedElement = document.querySelector('.typed');
  if (!typedElement) return;

  const words = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'React Expert', 'Creative Thinker'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }

  type();
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.6s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn && !allBtn.classList.contains('active')) {
    allBtn.click();
  }
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-regular fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('Message sent successfully! I\'ll get back to you soon.');
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}