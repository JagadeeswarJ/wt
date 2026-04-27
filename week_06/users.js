async function loadUsers() {
  try {
    const res = await fetch('users.xml');
    if (!res.ok) throw new Error('Failed to load XML');
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');

    return Array.from(xml.getElementsByTagName('user')).map(u => {
      const get = tag => u.getElementsByTagName(tag)[0]?.textContent || '';

      const passwordEl = u.getElementsByTagName('password')[0];
      const password = passwordEl?.textContent || '';
      const algorithm = passwordEl?.getAttribute('algorithm') || 'sha256';

      const purchases = Array.from(u.getElementsByTagName('purchase')).map(p => ({
        orderId: p.getAttribute('orderId') || '',
        date: p.getAttribute('date') || '',
        items: Array.from(p.getElementsByTagName('item')).map(i => ({
          bookId: i.getAttribute('bookId') || '',
          title: i.getAttribute('title') || '',
          price: i.getAttribute('price') || '',
          currency: i.getAttribute('currency') || '',
        })),
      }));

      return {
        id: u.getAttribute('id'),
        username: get('username'),
        password,
        algorithm,
        email: get('email'),
        purchases,
      };
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderUsers(users) {
  const list = document.getElementById('userList');
  list.innerHTML = '';

  if (!users || users.length === 0) {
    list.innerHTML = '<div class="empty">No users found.</div>';
    return;
  }

  users.forEach(u => {
    const hasOrders = u.purchases.length > 0;
    const shortHash = u.password.slice(0, 12) + '…';

    const ordersHtml = hasOrders
      ? u.purchases.map(p => `
          <div class="order">
            <div class="order-meta">
              <span>${esc(p.orderId)}</span>
              <span>${esc(p.date)}</span>
            </div>
            ${p.items.map(i => `
              <div class="order-item">
                ${esc(i.title)} — <span>${esc(i.currency)} ${esc(i.price)}</span>
              </div>`).join('')}
          </div>`).join('')
      : '<div class="empty" style="padding:8px 0">No purchases yet.</div>';

    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.username = u.username.toLowerCase();
    card.dataset.email = u.email.toLowerCase();
    card.dataset.hasOrders = hasOrders ? 'with' : 'without';

    card.innerHTML = `
      <div class="user-header">
        <div class="user-info">
          <div class="username">${esc(u.username)}</div>
          <div class="email">${esc(u.email)}</div>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <span class="badge ${hasOrders ? 'has-orders' : 'no-orders'}">
            ${hasOrders ? u.purchases.length + ' order(s)' : 'No orders'}
          </span>
          <span class="toggle-icon">▼</span>
        </div>
      </div>
      <div class="user-details">
        <div class="detail-row">
          <span class="detail-label">User ID</span>
          <span>${esc(u.id)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Password</span>
          <span class="hash" title="${esc(u.password)}">${esc(u.algorithm).toUpperCase()}: ${esc(shortHash)}</span>
        </div>
        <div class="history-title">Purchase History</div>
        ${ordersHtml}
      </div>`;

    // toggle expand/collapse
    card.querySelector('.user-header').addEventListener('click', () => {
      const details = card.querySelector('.user-details');
      const icon = card.querySelector('.toggle-icon');
      const open = details.classList.toggle('open');
      icon.textContent = open ? '▲' : '▼';
    });

    list.appendChild(card);
  });
}

function applyFilters(allUsers) {
  const q = document.getElementById('search').value.trim().toLowerCase();
  const historyFilter = document.getElementById('filterHistory').value;

  const filtered = allUsers.filter(u => {
    const matchesSearch = (u.username + ' ' + u.email).toLowerCase().includes(q);
    const matchesHistory =
      historyFilter === '' ||
      (historyFilter === 'with' && u.purchases.length > 0) ||
      (historyFilter === 'without' && u.purchases.length === 0);
    return matchesSearch && matchesHistory;
  });

  renderUsers(filtered);
}

(async function init() {
  const allUsers = await loadUsers();
  if (allUsers === null) {
    document.getElementById('userList').innerHTML =
      '<div class="empty">Could not load users.xml. Serve this folder over HTTP.</div>';
    return;
  }

  renderUsers(allUsers);

  document.getElementById('search').addEventListener('input', () => applyFilters(allUsers));
  document.getElementById('filterHistory').addEventListener('change', () => applyFilters(allUsers));
})();
