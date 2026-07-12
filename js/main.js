/* OTTO Construction Works — Main JS */

document.addEventListener('DOMContentLoaded', function() {

  // ===== Header scroll effect =====
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== Mobile nav toggle =====
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    // Close nav when link clicked
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // ===== Fade-in on scroll (Intersection Observer) =====
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ===== FAQ Accordion =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(function(i) { i.classList.remove('open'); });
        // Toggle this one
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ===== Contact form submitted state =====
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sent') === '1') {
    const form = document.getElementById('contactForm');
    const sent = document.getElementById('formSent');
    if (form && sent) {
      form.style.display = 'none';
      sent.style.display = 'block';
    }
  }
});
