(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#y').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    var mobileNav = document.querySelector('.site-mobile-nav');
    if (toggle && mobileNav) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('menu-open');
        mobileNav.style.display = open ? 'flex' : 'none';
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('menu-open');
          mobileNav.style.display = 'none';
          document.body.style.overflow = '';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    var transparentHeader = document.querySelector('.site-header.is-transparent');
    if (transparentHeader) {
      var updateHeaderState = function () {
        transparentHeader.classList.toggle('scrolled', window.scrollY > 80);
      };
      updateHeaderState();
      window.addEventListener('scroll', updateHeaderState, { passive: true });
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.section-head, .listing, .stat, .two-col, .advisor, .closing, .team-member, .office').forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ' + (i * 0.03) + 's, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ' + (i * 0.03) + 's';
        io.observe(el);
      });
    }

    document.querySelectorAll('form[data-enquiry-form]').forEach(function (form) {
      var status = form.querySelector('.form-status');
      var submitBtn = form.querySelector('button[type="submit"]');

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        var data = Object.fromEntries(new FormData(form).entries());
        var originalLabel = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
        if (status) { status.textContent = ''; status.removeAttribute('data-state'); }

        fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(function (response) {
            return response.json().then(function (result) {
              if (!response.ok) { throw new Error(result.error || 'Something went wrong. Please try again.'); }
              return result;
            });
          })
          .then(function () {
            if (status) {
              status.textContent = "Thanks, we've received your enquiry and will be in touch shortly.";
              status.setAttribute('data-state', 'success');
            }
            form.reset();
          })
          .catch(function (err) {
            if (status) {
              status.textContent = err.message || 'Something went wrong. Please email info@lminventories.co.uk directly.';
              status.setAttribute('data-state', 'error');
            }
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          });
      });
    });
  });
})();
