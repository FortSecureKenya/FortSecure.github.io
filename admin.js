// admin.js — allows an admin to read/edit data/statuses.json using GitHub REST API

async function apiRequest(url, method = 'GET', token, body) {
  const headers = { 'Accept': 'application/vnd.github+json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(url, { method, headers, body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

function el(id) { return document.getElementById(id); }

el('load').addEventListener('click', async ()=>{
  const token = el('token').value.trim();
  const owner = el('owner').value.trim();
  const repo = el('repo').value.trim();
  const path = el('path').value.trim();
  if(!token) return alert('Enter your GitHub token');

  try{
    el('status-message').textContent = 'Loading...';
    // GET file contents
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const data = await apiRequest(url, 'GET', token);
    // data.content is base64
    const content = atob(data.content.replace(/\n/g,''));
    const json = JSON.parse(content);

    // store sha for commits
    el('load').dataset.sha = data.sha;
    el('load').dataset.content = JSON.stringify(json);

    renderList(json);
    el('status-message').textContent = 'Loaded. Edit statuses then click Commit changes.';
    el('commit').disabled = false;
  }catch(err){
    console.error(err);
    el('status-message').textContent = 'Error: ' + err.message;
  }
});

function renderList(json){
  const container = el('list');
  container.innerHTML = '';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>Tracking ID</th><th>Status</th><th>Actions</th></tr>';
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  Object.keys(json).forEach(id =>{
    const tr = document.createElement('tr');
    const tdId = document.createElement('td'); tdId.textContent = id;
    const tdStatus = document.createElement('td');
    const sel = document.createElement('select');
    ['submitted','reviewing','interview','hired','rejected'].forEach(s=>{ const opt=document.createElement('option'); opt.value=s; opt.textContent=s; if(json[id]===s) opt.selected=true; sel.appendChild(opt); });
    tdStatus.appendChild(sel);
    const tdActions = document.createElement('td');
    const btnRemove = document.createElement('button'); btnRemove.textContent = 'Remove';
    btnRemove.addEventListener('click', ()=>{ delete json[id]; renderList(json); el('load').dataset.content = JSON.stringify(json); });
    tdActions.appendChild(btnRemove);
    tr.appendChild(tdId); tr.appendChild(tdStatus); tr.appendChild(tdActions);
    // allow inline edit
    sel.addEventListener('change', ()=>{ json[id]=sel.value; el('load').dataset.content = JSON.stringify(json); });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  // form to add new tracking id
  const addDiv = document.createElement('div'); addDiv.style.marginTop='12px';
  addDiv.innerHTML = '<input id="new-id" placeholder="New tracking id (FS-...)" /> <select id="new-status"> <option>submitted</option><option>reviewing</option><option>interview</option><option>hired</option><option>rejected</option></select> <button id="add-btn">Add</button>';
  container.appendChild(addDiv);
  el('add-btn').addEventListener('click', ()=>{
    const newid = el('new-id').value.trim(); const ns = el('new-status').value;
    if(!newid) return alert('Enter tracking id');
    json[newid] = ns;
    renderList(json);
    el('load').dataset.content = JSON.stringify(json);
  });
}

el('commit').addEventListener('click', async ()=>{
  const token = el('token').value.trim();
  const owner = el('owner').value.trim();
  const repo = el('repo').value.trim();
  const path = el('path').value.trim();
  const sha = el('load').dataset.sha;
  if(!token) return alert('Enter your GitHub token');
  if(!sha) return alert('Load file first');

  try{
    el('status-message').textContent = 'Committing...';
    const jsonStr = el('load').dataset.content || '{}';
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const body = {
      message: 'Update application statuses via admin UI',
      content: b64,
      sha: sha,
      branch: 'main'
    };
    const res = await apiRequest(url, 'PUT', token, body);
    el('status-message').textContent = 'Committed: ' + res.commit.html_url;
  }catch(err){
    console.error(err);
    el('status-message').textContent = 'Commit error: ' + err.message;
  }
});

