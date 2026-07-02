// script.js — handles mobile menu toggle and job application form tracking

(function(){
  'use strict';

  // Mobile menu toggle
  function initMenuToggle(){
    const btn = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    if(!btn || !nav) return;

    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // toggle a class on the nav element for CSS to pick up
      nav.classList.toggle('open');
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(e){
      if(!nav.classList.contains('open')) return;
      const target = e.target;
      if(target === btn || nav.contains(target)) return;
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  }

  // Simple tracking ID generator
  function generateTrackingId(){
    // e.g. FS-4B9F-7A2C
    const hex = () => Math.floor((1+Math.random())*0x10000).toString(16).substring(1).toUpperCase();
    return `FS-${hex()}-${hex()}`;
  }

  // Save application to localStorage
  function saveApplication(id, data){
    try{
      const key = 'fs_applications_v1';
      const raw = localStorage.getItem(key);
      const map = raw ? JSON.parse(raw) : {};
      map[id] = data;
      localStorage.setItem(key, JSON.stringify(map));
      return true;
    }catch(e){
      console.error('Failed to save application', e);
      return false;
    }
  }

  // Update UI after submit
  function updateApplicationUI(id){
    const trackingEl = document.getElementById('tracking-id');
    const statusEl = document.getElementById('application-status');
    const progressFill = document.getElementById('progress-fill');
    if(trackingEl) trackingEl.textContent = id;
    if(statusEl){
      statusEl.className = 'status-badge status-submitted';
      statusEl.textContent = 'Submitted';
    }
    if(progressFill) progressFill.style.width = '25%';
  }

  // Initialize form behavior
  function initJobForm(){
    const form = document.getElementById('job-form');
    if(!form) return;

    const msgEl = document.getElementById('form-message');

    form.addEventListener('submit', function(e){
      e.preventDefault();

      const name = (form.querySelector('[name="name"]')||{}).value || '';
      const email = (form.querySelector('[name="email"]')||{}).value || '';
      const phone = (form.querySelector('[name="phone"]')||{}).value || '';
      const position = (form.querySelector('[name="position"]')||{}).value || '';

      if(!name || !email){
        if(msgEl) msgEl.textContent = 'Please fill in required fields (name, email).';
        return;
      }

      const id = generateTrackingId();
      const payload = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        position: position,
        status: 'submitted',
        createdAt: new Date().toISOString()
      };

      const saved = saveApplication(id, payload);

      if(saved){
        if(msgEl){
          msgEl.textContent = 'Application submitted. Save your tracking ID to check progress.';
        }
        updateApplicationUI(id);
      }else{
        if(msgEl) msgEl.textContent = 'Could not save application locally. Please try again.';
      }

      // Optional: send to Formspree or other endpoint
      // Replace the URL below with your Formspree endpoint if you want server-side email delivery
      // fetch('https://formspree.io/f/your-form-id', { method:'POST', body: new FormData(form) })
      //   .then(res => console.log('Formspree response', res))
      //   .catch(err => console.warn('Formspree error', err));

    });

    // If there's a stored tracking id in the query (e.g. ?tracking=FS-...), show it
    const params = new URLSearchParams(window.location.search);
    const qid = params.get('tracking');
    if(qid){ updateApplicationUI(qid); }
  }

  // On DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    initMenuToggle();
    initJobForm();
  });
})();
