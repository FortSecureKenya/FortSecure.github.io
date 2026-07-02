// script.js — adds accessible menu toggle and an example Firebase+Firestore job application flow.
// IMPORTANT: Create a Firebase project and replace the firebaseConfig object below with your project's config.

// Accessible mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
if(menuToggle){
  menuToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('active');
  });
}

// Firebase / Firestore integration (real-time application tracking)
// Placeholder config — replace with your project's values.
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};

// Dynamically load Firebase scripts only if config is set (prevents console errors)
function loadFirebaseScriptsAndInit(cb){
  if(!firebaseConfig || firebaseConfig.apiKey === 'REPLACE_ME'){
    console.warn('Firebase config not provided. Please replace placeholders in script.js with your Firebase project config to enable real-time job tracking.');
    return;
  }

  const s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  s1.onload = () => {
    const s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
    s2.onload = () => {
      const s3 = document.createElement('script');
      s3.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js';
      s3.onload = () => { cb(); };
      document.head.appendChild(s3);
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
}

// Setup after Firebase scripts loaded
function setupFirebaseApp(){
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

  const form = document.getElementById('job-form');
  const messageBox = document.getElementById('form-message');
  const trackingEl = document.getElementById('tracking-id');
  const statusEl = document.getElementById('application-status');
  const progressFill = document.getElementById('progress-fill');

  // Helper to update UI based on status
  function updateStatusUI(status){
    statusEl.textContent = status;
    statusEl.className = 'status-badge';
    if(status === 'submitted') statusEl.classList.add('status-submitted');
    else if(status === 'reviewing') statusEl.classList.add('status-reviewing');
    else if(status === 'interview') statusEl.classList.add('status-interview');
    else if(status === 'hired') statusEl.classList.add('status-hired');
    else if(status === 'rejected') statusEl.classList.add('status-rejected');

    // Progress bar
    let pct = 0;
    if(status === 'submitted') pct = 25;
    else if(status === 'reviewing') pct = 50;
    else if(status === 'interview') pct = 75;
    else if(status === 'hired') pct = 100;
    else pct = 0;
    progressFill.style.width = pct + '%';

    // Mark steps
    const steps = ['step-submitted','step-reviewing','step-interview','step-hired'];
    steps.forEach((id,i)=>{
      const el = document.getElementById(id);
      if(!el) return;
      el.classList.remove('active','completed');
      if(pct >= (i+1)*25) el.classList.add('completed');
      if(status === 'reviewing' && id==='step-reviewing') el.classList.add('active');
      if(status === 'interview' && id==='step-interview') el.classList.add('active');
    });
  }

  // Real-time listener: if there's an existing stored tracking ID, listen to it
  const storedId = localStorage.getItem('fs_tracking_id');
  if(storedId){
    trackingEl.textContent = storedId;
    const docRef = db.collection('applications').doc(storedId);
    docRef.onSnapshot(doc => {
      if(!doc.exists) return;
      const data = doc.data();
      updateStatusUI(data.status || 'submitted');
    });
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    messageBox.className = 'form-message';

    const name = document.getElementById('applicant-name').value.trim();
    const email = document.getElementById('applicant-email').value.trim();
    const phone = document.getElementById('applicant-phone').value.trim();
    const position = document.getElementById('applicant-position').value.trim();
    const resumeInput = document.getElementById('applicant-resume');
    const resumeFile = resumeInput.files && resumeInput.files[0];

    if(!name || !email){
      messageBox.textContent = 'Please provide name and email.';
      messageBox.classList.add('error');
      return;
    }

    try{
      // Create a new application doc with status 'submitted'
      const docRef = await db.collection('applications').add({
        name, email, phone, position, status: 'submitted', createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // if resume provided, upload to storage and set resumeURL on doc
      if(resumeFile){
        const storageRef = storage.ref().child(`resumes/${docRef.id}/${encodeURIComponent(resumeFile.name)}`);
        const snapshot = await storageRef.put(resumeFile);
        const downloadURL = await snapshot.ref.getDownloadURL();
        await docRef.update({resumeURL: downloadURL});
      }

      // Save tracking id locally so user can resume view
      localStorage.setItem('fs_tracking_id', docRef.id);
      trackingEl.textContent = docRef.id;

      // Listen for real-time updates for this document
      docRef.onSnapshot(doc => {
        if(!doc.exists) return;
        const data = doc.data();
        updateStatusUI(data.status || 'submitted');
      });

      messageBox.textContent = 'Application submitted. Your tracking ID has been generated.';
      messageBox.classList.add('success');

      form.reset();
    }catch(err){
      console.error(err);
      messageBox.textContent = 'There was an error submitting your application. Please try again later.';
      messageBox.classList.add('error');
    }
  });
}

// Kick off Firebase load if config is set
loadFirebaseScriptsAndInit(setupFirebaseApp);

