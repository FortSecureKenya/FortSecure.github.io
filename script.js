// script.js — Formspree submission + simple tracking via statuses.json hosted in the repo (no backend required)

// CONFIG — replace FORMSPREE_ENDPOINT with your Formspree form endpoint (example: https://formspree.io/f/yourFormId)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_ME';
// URL to the public statuses file (raw file in the repo's main branch)
const STATUSES_RAW_URL = 'https://raw.githubusercontent.com/FortSecureKenya/FortSecure.github.io/main/data/statuses.json';

// Accessible mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('active');
  });
}

// Utilities
function generateTrackingId() {
  return 'FS-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function showMessage(text, type = 'success') {
  const box = document.getElementById('form-message');
  box.className = 'form-message';
  if (type === 'success') box.classList.add('success');
  else box.classList.add('error');
  box.textContent = text;
}

function updateStatusUI(status) {
  const statusEl = document.getElementById('application-status');
  const progressFill = document.getElementById('progress-fill');
  statusEl.textContent = status || 'Not submitted';
  statusEl.className = 'status-badge';
  if (status === 'submitted') statusEl.classList.add('status-submitted');
  else if (status === 'reviewing') statusEl.classList.add('status-reviewing');
  else if (status === 'interview') statusEl.classList.add('status-interview');
  else if (status === 'hired') statusEl.classList.add('status-hired');
  else if (status === 'rejected') statusEl.classList.add('status-rejected');
  else {};

  let pct = 0;
  if (status === 'submitted') pct = 25;
  else if (status === 'reviewing') pct = 50;
  else if (status === 'interview') pct = 75;
  else if (status === 'hired') pct = 100;
  else pct = 0;
  progressFill.style.width = pct + '%';
}

// Polling statuses.json for updates (every 10s)
let pollingInterval = null;
async function fetchAndApplyStatus(trackingId) {
  if (!trackingId) return;
  try {
    const resp = await fetch(STATUSES_RAW_URL + '?t=' + Date.now());
    if (!resp.ok) return;
    const json = await resp.json();
    const status = json[trackingId];
    if (status) updateStatusUI(status);
  } catch (err) {
    // ignore
    console.warn('Could not fetch statuses.json', err);
  }
}

function startPolling(trackingId) {
  if (pollingInterval) clearInterval(pollingInterval);
  fetchAndApplyStatus(trackingId);
  pollingInterval = setInterval(() => fetchAndApplyStatus(trackingId), 10000);
}

// Form submission handler using Formspree
const form = document.getElementById('job-form');
if (form) {
  // restore tracking id if present
  const storedId = localStorage.getItem('fs_tracking_id');
  if (storedId) {
    document.getElementById('tracking-id').textContent = storedId;
    startPolling(storedId);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('applicant-name').value.trim();
    const email = document.getElementById('applicant-email').value.trim();
    if (!name || !email) {
      showMessage('Please provide name and email.', 'error');
      return;
    }

    const trackingId = generateTrackingId();

    // Build FormData for Formspree
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', document.getElementById('applicant-phone').value.trim());
    fd.append('position', document.getElementById('applicant-position').value.trim());
    fd.append('tracking_id', trackingId);

    // If a resume was selected, attach it
    const resumeInput = document.getElementById('applicant-resume');
    if (resumeInput.files && resumeInput.files[0]) {
      fd.append('resume', resumeInput.files[0]);
    }

    try {
      if (FORMSPREE_ENDPOINT.includes('REPLACE_ME')) {
        showMessage('Formspree endpoint not configured. Please update script.js with your Formspree form endpoint.', 'error');
        return;
      }

      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('Formspree error', errorText);
        showMessage('There was an error submitting your application. Please try again later.', 'error');
        return;
      }

      // Success — save tracking id and basic data locally
      localStorage.setItem('fs_tracking_id', trackingId);
      localStorage.setItem('fs_last_application', JSON.stringify({ name, email, phone: document.getElementById('applicant-phone').value.trim(), position: document.getElementById('applicant-position').value.trim(), trackingId, createdAt: new Date().toISOString() }));

      document.getElementById('tracking-id').textContent = trackingId;
      showMessage('Application submitted. Your tracking ID has been generated and saved in your browser.', 'success');
      updateStatusUI('submitted');
      startPolling(trackingId);
      form.reset();
    } catch (err) {
      console.error(err);
      showMessage('There was an error submitting your application. Please try again later.', 'error');
    }
  });
}

