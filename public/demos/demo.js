const app = document.querySelector('#app')
const appId = new URLSearchParams(window.location.search).get('app')
const projects = [
  { id: 'shop', title: 'Handmade Craft Shop', icon: '🛍', label: 'Shop preview' },
  { id: 'tasks', title: 'Task Management Dashboard', icon: '☑', label: 'Tasks preview' },
  { id: 'pipeline', title: 'CI/CD Pipeline Automation', icon: '◉', label: 'Pipeline preview' },
  { id: 'portfolio', title: 'Portfolio Website', icon: '✳', label: 'Portfolio preview' },
]
const project = projects.find((item) => item.id === appId)

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return entities[char]
  })
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
}

function footer() {
  return `
    <footer class="demo-footer">
      <span>Interactive portfolio demo · Sample data only</span>
      <div class="project-nav">${projects.map((item) => `<a class="quiet-link" href="./index.html?app=${item.id}">${item.label} ↗</a>`).join('')}</div>
    </footer>
  `
}

function shell(content, brand) {
  document.title = `${project.title} · Kanchan Thakare`
  app.innerHTML = `
    <div class="demo-shell ${appId === 'shop' ? 'shop-preview' : ''}">
      <header class="demo-header">
        <a class="brand" href="../#projects" aria-label="Back to Kanchan Thakare's portfolio">
          <span class="brand-dot">${brand}</span>
          <span>studio.<small>PROJECT PREVIEW</small></span>
        </a>
        <div class="demo-header-side">
          <span class="preview-label"><span class="status-dot dot-success"></span> Live demo</span>
          <a class="text-link" href="../#projects">Portfolio ↗</a>
        </div>
      </header>
      <div class="main-content">${content}</div>
      ${footer()}
    </div>
  `
}

function toast(message) {
  document.querySelector('.toast')?.remove()
  const messageBox = document.createElement('div')
  messageBox.className = 'toast'
  messageBox.setAttribute('role', 'status')
  messageBox.textContent = message
  document.body.append(messageBox)
  window.setTimeout(() => messageBox.remove(), 3000)
}

const products = [
  { id: 'daisy-keychain', name: 'Daisy Day Keychain', detail: 'Mouldit clay · hand-painted', category: 'Clay & keychains', price: 299, motif: 'clay-daisy' },
  { id: 'heart-tray', name: 'Blush Heart Trinket Tray', detail: 'Mouldit clay · handmade', category: 'Mouldit clay', price: 549, motif: 'clay-heart' },
  { id: 'mushroom-home', name: 'Tiny Mushroom Décor', detail: 'Mouldit clay · hand-painted', category: 'Home décor', price: 399, motif: 'clay-mushroom' },
  { id: 'smiley-magnets', name: 'Little Happy Magnets', detail: 'Mouldit clay · set of 2', category: 'Mouldit clay', price: 349, motif: 'clay-magnets' },
  { id: 'sunny-canvas', name: 'Golden Hour Mini Canvas', detail: 'Painted by hand · 6 × 8 in', category: 'Canvas paintings', price: 899, motif: 'canvas-sun' },
  { id: 'flower-canvas', name: 'A Garden in June', detail: 'Painted by hand · 8 × 10 in', category: 'Canvas paintings', price: 1299, motif: 'canvas-flowers' },
  { id: 'wool-keychain', name: 'Daisy Puff Keychain', detail: 'Crochet wool · handmade', category: 'Wool & crochet', price: 249, motif: 'wool-daisy' },
  { id: 'wool-coasters', name: 'Cozy Little Coasters', detail: 'Soft wool · set of 2', category: 'Home décor', price: 399, motif: 'wool-coasters' },
]
const categories = ['All things', ...new Set(products.map((item) => item.category))]
const cart = new Map()
let shopCategory = 'All things'
let shopQuery = ''
let cartOpen = false

const artworkDetails = {
  'clay-daisy': {
    background: '#f4e9df',
    shapes: `<circle cx="160" cy="63" r="28" fill="none" stroke="#aa846a" stroke-width="5"/><circle cx="160" cy="63" r="18" fill="none" stroke="#f8f3ed" stroke-width="3"/><path d="M159 90v21" stroke="#aa846a" stroke-width="5"/><path d="M160 176c-14 0-24-9-24-21 0-10 8-17 15-25-2-13 1-23 9-23s11 10 9 23c9 8 15 15 15 25 0 12-10 21-24 21" fill="#e88e75"/><g fill="#f2ad8c"><ellipse cx="160" cy="125" rx="8" ry="19"/><ellipse cx="160" cy="125" rx="8" ry="19" transform="rotate(60 160 145)"/><ellipse cx="160" cy="125" rx="8" ry="19" transform="rotate(120 160 145)"/></g><circle cx="160" cy="145" r="10" fill="#e6b956"/><path d="M160 173v48M160 195q-25-23-37-4 15 25 37 12M160 209q23-24 38-6-16 26-38 15" fill="#829373" stroke="#718363" stroke-width="3" stroke-linecap="round"/>`,
  },
  'clay-heart': {
    background: '#f3e5e2',
    shapes: `<path d="M160 221 66 135C-3 71 72 21 123 72c20 20 30 37 37 50 8-13 18-30 38-50 51-51 126-1 57 63z" fill="#e7a190" stroke="#ce8272" stroke-width="4"/><path d="M160 203 81 132c-51-49 8-78 47-35 16 17 25 34 32 47 7-13 16-30 32-47 39-43 98-14 47 35z" fill="#f3b7a9"/><path d="M104 118q14-23 33-16M102 135q9 8 17 11" fill="none" stroke="#fff0e8" stroke-width="5" stroke-linecap="round"/><circle cx="218" cy="77" r="18" fill="#f8f1e9"/><circle cx="218" cy="77" r="11" fill="none" stroke="#d2a18c" stroke-width="3"/>`,
  },
  'clay-mushroom': {
    background: '#edf0e7',
    shapes: `<path d="M151 96c-28-41-17-69 5-70s33 30 8 70" fill="#ece4d3"/><path d="M160 86q9-55 20-57t17 52" fill="#ebd9c3"/><path d="M155 136c-4-31-4-51 5-68 5-12 14-13 19-1 8 17 5 39 2 69 26 19 38 42 36 61-2 16-20 25-58 25s-56-9-58-25c-2-19 10-42 36-61z" fill="#d48566" stroke="#bf6c52" stroke-width="4"/><path d="M121 155q39-17 79 0M144 156v34M165 154v42M185 159v29" fill="none" stroke="#f3c1a5" stroke-width="5" stroke-linecap="round"/><circle cx="105" cy="210" r="5" fill="#879578"/><circle cx="222" cy="215" r="7" fill="#dcb363"/><path d="M119 235h83" stroke="#879578" stroke-width="3" stroke-linecap="round"/>`,
  },
  'clay-magnets': {
    background: '#f1eae1',
    shapes: `<ellipse cx="100" cy="210" rx="57" ry="12" fill="#cdbbb0"/><ellipse cx="224" cy="210" rx="54" ry="12" fill="#cdbbb0"/><circle cx="103" cy="136" r="57" fill="#ecc975"/><circle cx="222" cy="137" r="56" fill="#e79479"/><circle cx="86" cy="125" r="5" fill="#51473e"/><circle cx="119" cy="125" r="5" fill="#51473e"/><path d="M87 149q16 17 32 0M207 127q7-9 14 0 7-9 14 0M207 151q14 13 29 0" fill="none" stroke="#534840" stroke-width="4" stroke-linecap="round"/><path d="m81 96 5 9m26-9 5 9m79-10 5 9m27-10 5 9m-70 55h12" fill="none" stroke="#fff3d9" stroke-width="4" stroke-linecap="round"/>`,
  },
  'canvas-sun': {
    background: '#edc896',
    shapes: `<circle cx="219" cy="75" r="49" fill="#bf5541"/><path d="M0 177c43-21 82-21 125 0s83 22 125 0 47-20 70-8v91H0z" fill="#df8154"/><path d="M0 214c62-25 119-24 171 0s95 22 149-1v47H0z" fill="#7b7160"/><path d="M31 51c30-26 62-31 97-15" fill="none" stroke="#fff0ce" stroke-width="3" stroke-linecap="round"/>`,
  },
  'canvas-flowers': {
    background: '#e8cfac',
    shapes: `<path d="M54 260c18-57 18-101 28-157M129 260c-4-68 8-109 29-169M209 260c-13-53-4-97 12-131" fill="none" stroke="#66795a" stroke-width="5" stroke-linecap="round"/><path d="M81 190q-36-33-47-8 22 31 47 8M154 224q26-38 45-16-13 35-45 16M224 204q-36-26-48-4 23 28 48 4" fill="#768f64"/><g fill="#c65049"><circle cx="83" cy="98" r="19"/><circle cx="62" cy="80" r="15"/><circle cx="102" cy="77" r="16"/><circle cx="65" cy="119" r="14"/><circle cx="106" cy="115" r="15"/><circle cx="162" cy="76" r="18"/><circle cx="141" cy="59" r="14"/><circle cx="184" cy="57" r="15"/><circle cx="143" cy="98" r="14"/><circle cx="184" cy="96" r="15"/><circle cx="222" cy="128" r="17"/><circle cx="203" cy="111" r="13"/><circle cx="241" cy="108" r="14"/><circle cx="203" cy="147" r="13"/><circle cx="240" cy="147" r="14"/></g><g fill="#e9bd6c"><circle cx="82" cy="98" r="6"/><circle cx="162" cy="76" r="6"/><circle cx="222" cy="128" r="6"/></g>`,
  },
  'wool-daisy': {
    background: '#ebe3d8',
    shapes: `<path d="M92 144c-31 0-48-15-48-36a36 36 0 0 1 38-35 45 45 0 0 1 85-8 42 42 0 0 1 47 42c0 23-18 39-45 39z" fill="#e8c177"/><g fill="#fff0dc" stroke="#dcb56b" stroke-width="3"><ellipse cx="158" cy="109" rx="14" ry="39"/><ellipse cx="158" cy="109" rx="14" ry="39" transform="rotate(45 158 109)"/><ellipse cx="158" cy="109" rx="14" ry="39" transform="rotate(90 158 109)"/><ellipse cx="158" cy="109" rx="14" ry="39" transform="rotate(135 158 109)"/></g><circle cx="158" cy="109" r="21" fill="#d99054"/><circle cx="158" cy="109" r="13" fill="#edbb6c"/><path d="M65 176h190M85 194h150M105 211h110" stroke="#c88758" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 11"/><path d="M120 173v52m76-52v52" stroke="#869171" stroke-width="4" stroke-dasharray="2 7"/>`,
  },
  'wool-coasters': {
    background: '#e8dfd3',
    shapes: `<circle cx="113" cy="139" r="69" fill="#d8a47f"/><circle cx="113" cy="139" r="56" fill="#f0d3a6"/><circle cx="113" cy="139" r="42" fill="#dfaa86"/><circle cx="113" cy="139" r="28" fill="#f3dfbe"/><circle cx="113" cy="139" r="13" fill="#c98568"/><circle cx="232" cy="139" r="69" fill="#8b9b7c"/><circle cx="232" cy="139" r="56" fill="#e5d1a9"/><circle cx="232" cy="139" r="42" fill="#849477"/><circle cx="232" cy="139" r="28" fill="#eee3cf"/><circle cx="232" cy="139" r="13" fill="#cf9f80"/><g fill="none" stroke="#fff7e8" stroke-width="2" stroke-dasharray="1 7"><circle cx="113" cy="139" r="62"/><circle cx="232" cy="139" r="62"/></g><path d="M77 222q36 11 72-1m47 3q36 11 72-1" stroke="#aa7960" stroke-width="4" stroke-linecap="round"/>`,
  },
  'home-hanging': {
    background: '#e8e8d9',
    shapes: `<path d="M99 72q0-37 61-37t61 37" fill="none" stroke="#c58b5c" stroke-width="9" stroke-linecap="round"/><path d="M105 81h110" stroke="#8a755f" stroke-width="5"/><path d="M115 84v134m30-134v134m30-134v134m30-134v134" stroke="#c2946e" stroke-width="4"/><path d="M112 112h96M112 143h96M112 174h96" stroke="#e9bd82" stroke-width="7" stroke-linecap="round"/><path d="m130 211-12 30m27-30-5 36m32-36 5 36m26-36 12 30" stroke="#9c7758" stroke-width="3" stroke-linecap="round"/><circle cx="160" cy="129" r="16" fill="#d9856b"/><circle cx="160" cy="129" r="7" fill="#f3d8a8"/>`,
  },
}

function renderArtwork(item, className) {
  const artwork = artworkDetails[item.motif]
  return `<svg class="${className}" viewBox="0 0 320 260" role="img" aria-label="${escapeHtml(item.name)} · ${escapeHtml(item.detail)}" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="260" fill="${artwork.background}" />
    ${artwork.shapes}
    <circle cx="283" cy="225" r="2" fill="#473f32" opacity=".45" />
  </svg>`
}

function renderShop() {
  const filtered = products.filter((item) => {
    const matchesCategory = shopCategory === 'All things' || item.category === shopCategory
    const matchesQuery = `${item.name} ${item.detail} ${item.category}`.toLowerCase().includes(shopQuery.toLowerCase())
    return matchesCategory && matchesQuery
  })
  const cartCount = [...cart.values()].reduce((total, quantity) => total + quantity, 0)
  const cartTotal = [...cart.entries()].reduce((total, [id, quantity]) => {
    return total + products.find((item) => item.id === id).price * quantity
  }, 0)
  const cartItems = [...cart.entries()]
    .map(([id, quantity]) => ({ item: products.find((productItem) => productItem.id === id), quantity }))
    .filter((entry) => entry.item)
  shell(
    `
      <div class="shop-page">
        <div class="shop-hero">
          <div class="shop-hero-content">
            <p class="eyebrow">Little things, lovingly made</p>
            <h1>Made by hand.<br><span>Made to make you smile.</span></h1>
            <p>Clay keepsakes, cozy wool, and one-of-a-kind art for your little corner of the world.</p>
            <a class="shop-hero-cta" href="#shop-collection">Find your little thing <span aria-hidden="true">↓</span></a>
            <span class="shop-edition"><span>✳</span> Small-batch · handmade with heart</span>
          </div>
          <div class="hero-print">
            <span class="hero-print-index">A LITTLE JOY, MADE BY HAND</span>
            ${renderArtwork(products[0], 'hero-artwork')}
            <span class="hero-print-caption">Made slowly. Loved every day.</span>
            <span class="hero-sparkle" aria-hidden="true">✳</span>
          </div>
        </div>
        <section class="shop-values" aria-label="Shop values">
          <span><b>♡</b> Made with care</span>
          <span><b>✳</b> Little-batch creations</span>
          <span><b>⌂</b> Made to brighten your space</span>
        </section>
        <div class="shop-toolbar" id="shop-collection">
          <div>
            <p class="eyebrow shop-collection-eyebrow">A happy little collection</p>
            <h2 class="shop-collection-title">Find a new favourite <span>(${filtered.length})</span></h2>
            <p class="shop-collection-subtitle">Every piece is a tiny celebration of making things by hand.</p>
          </div>
          <label class="search">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <input class="input" type="search" id="shop-search" placeholder="Search handmade things" value="${escapeHtml(shopQuery)}" aria-label="Search handmade products" />
          </label>
        </div>
        <div class="shop-toolbar shop-categories">
          <div class="category-list" role="group" aria-label="Filter handmade products by category">
            ${categories.map((category) => `<button class="chip ${shopCategory === category ? 'chip-active' : ''}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('')}
          </div>
          <button class="button button-quiet shop-bag" id="cart-toggle" type="button" aria-expanded="${cartOpen}">
            Bag <span aria-label="${cartCount} items">${cartCount}</span> · ${formatPrice(cartTotal)}
          </button>
        </div>
        <div class="product-grid">
          ${filtered.length ? filtered.map((item, index) => `
            <article class="product-card" style="--card-index:${index}">
              <div class="product-image">
                <span class="print-number">MADE WITH LOVE</span>
                ${renderArtwork(item, 'product-artwork')}
                <span class="print-badge">Handmade</span>
              </div>
              <div class="product-info">
                <span class="product-category">${escapeHtml(item.category)}</span>
                <h3>${escapeHtml(item.name)}</h3>
                <div class="product-bottom">
                  <span class="product-artist">${escapeHtml(item.detail)}</span>
                  <button class="add-button" type="button" data-add="${item.id}" aria-label="Add ${escapeHtml(item.name)} to bag">+</button>
                </div>
                <div class="product-price-row"><span class="product-price">${formatPrice(item.price)}</span><span class="product-price-note">one lovely thing</span></div>
              </div>
            </article>`).join('') : '<p class="empty-state">Nothing found. Try another search.</p>'}
        </div>
        <div class="shop-note"><span>◇</span> A cheerful shop preview · Illustrations are mockups; no real orders or payments are processed.</div>
        <p class="shop-status" role="status" id="shop-status"></p>
        ${cartOpen ? `
          <section class="panel cart-panel" id="cart-panel" aria-label="Shopping bag">
            <div class="panel-title"><h2>Your happy little bag</h2><button class="text-link" id="cart-close" type="button">Close</button></div>
            ${cartItems.length ? `
              ${cartItems.map(({ item, quantity }) => `
                <div class="cart-row">
                  <span class="cart-row-name">${escapeHtml(item.name)}<small class="cart-meta">${escapeHtml(item.detail)} · ${formatPrice(item.price)} each</small></span>
                  <span class="cart-controls">
                    <button class="stepper" type="button" data-quantity="-1" data-item="${item.id}" aria-label="Remove one ${escapeHtml(item.name)}">−</button>
                    <span>${quantity}</span>
                    <button class="stepper" type="button" data-quantity="1" data-item="${item.id}" aria-label="Add one ${escapeHtml(item.name)}">+</button>
                  </span>
                </div>`).join('')}
              <div class="cart-total"><span>Estimated total</span><span>${formatPrice(cartTotal)}</span></div>
              <p class="muted" style="font-size:10px">Just a preview — no payment details are collected.</p>
              <button class="button" id="checkout" type="button" style="width:100%;margin-top:4px">Complete demo order →</button>
            ` : '<p class="cart-empty">Your bag is waiting for something lovely.</p>'}
          </section>` : ''}
      </div>
    `,
    '✿',
  )
  const search = document.querySelector('#shop-search')
  search?.addEventListener('input', (event) => {
    const cursor = event.target.selectionStart
    shopQuery = event.target.value
    renderShop()
    const nextSearch = document.querySelector('#shop-search')
    nextSearch.focus()
    nextSearch.setSelectionRange(cursor, cursor)
  })
  document.querySelectorAll('[data-category]').forEach((button) =>
    button.addEventListener('click', () => {
      shopCategory = button.dataset.category
      renderShop()
    }),
  )
  document.querySelector('#cart-toggle')?.addEventListener('click', () => {
    cartOpen = !cartOpen
    renderShop()
  })
  document.querySelector('#cart-close')?.addEventListener('click', () => {
    cartOpen = false
    renderShop()
  })
  document.querySelectorAll('[data-add]').forEach((button) =>
    button.addEventListener('click', () => {
      const id = button.dataset.add
      cart.set(id, (cart.get(id) || 0) + 1)
      cartOpen = true
      renderShop()
      document.querySelector('#shop-status').textContent = `${products.find((item) => item.id === id).name} added to your bag.`
    }),
  )
  document.querySelectorAll('[data-quantity]').forEach((button) =>
    button.addEventListener('click', () => {
      const id = button.dataset.item
      const quantity = (cart.get(id) || 0) + Number(button.dataset.quantity)
      if (quantity > 0) cart.set(id, quantity)
      else cart.delete(id)
      renderShop()
    }),
  )
  document.querySelector('#checkout')?.addEventListener('click', () => {
    cart.clear()
    cartOpen = false
    renderShop()
    document.querySelector('#shop-status').textContent = 'Demo order complete — no payment details were collected. Thanks for supporting handmade!'
  })
}

const taskStorageKey = 'portfolio-demo-tasks'
const starterTasks = [
  { id: 't-1', title: 'Sketch out the home page', project: 'Website refresh', priority: 'high', completed: false },
  { id: 't-2', title: 'Share the first draft with the team', project: 'Website refresh', priority: 'medium', completed: false },
  { id: 't-3', title: 'Review the API error states', project: 'Mobile app', priority: 'medium', completed: true },
  { id: 't-4', title: 'Write up the launch notes', project: 'Mobile app', priority: 'low', completed: false },
  { id: 't-5', title: 'Set up tomorrow’s stand-up', project: 'Team rituals', priority: 'low', completed: true },
]
let tasks = JSON.parse(localStorage.getItem(taskStorageKey) || 'null') || starterTasks
let taskFilter = 'all'
let taskQuery = ''
let taskInitialRender = true

function saveTasks() {
  localStorage.setItem(taskStorageKey, JSON.stringify(tasks))
}

function renderTasks() {
  const completed = tasks.filter((task) => task.completed).length
  const filtered = tasks.filter((task) => {
    const matchesFilter = taskFilter === 'all' || (taskFilter === 'active' && !task.completed) || (taskFilter === 'done' && task.completed)
    const matchesQuery = `${task.title} ${task.project}`.toLowerCase().includes(taskQuery.toLowerCase())
    return matchesFilter && matchesQuery
  })

  shell(
    `
      <div class="page-head ${taskInitialRender ? 'task-intro' : ''}">
        <p class="eyebrow">A little more organized</p>
        <h1>Good things, getting done.</h1>
        <p class="subhead">A calm space for your team to make steady progress. Your changes are saved in this browser.</p>
      </div>
      <div class="stats-grid ${taskInitialRender ? 'task-intro' : ''}">
        <div class="stat-card"><div class="stat-label">Everything</div><div class="stat-value">${tasks.length} <small>tasks</small></div></div>
        <div class="stat-card"><div class="stat-label">In progress</div><div class="stat-value">${tasks.length - completed} <small>tasks</small></div></div>
        <div class="stat-card"><div class="stat-label">Completed</div><div class="stat-value">${completed} <small>tasks</small></div></div>
        <div class="stat-card"><div class="stat-label">Team progress</div><div class="stat-value">${tasks.length ? Math.round((completed / tasks.length) * 100) : 0}<small>% complete</small></div></div>
      </div>
      <section class="panel ${taskInitialRender ? 'task-intro' : ''}" aria-label="Team task list">
        <div class="panel-title"><h2>Your team board</h2><span class="pill" style="padding:7px 10px;background:#f1f3ef;color:#687064">${tasks.length} items</span></div>
        <form class="task-add-form" id="add-task-form">
          <input class="input" id="new-task-title" maxlength="100" placeholder="What needs doing?" aria-label="New task title" required />
          <select class="input" id="new-task-project" aria-label="Choose a project">
            <option>Website refresh</option><option>Mobile app</option><option>Team rituals</option><option>Personal</option>
          </select>
          <select class="input" id="new-task-priority" aria-label="Choose a priority">
            <option value="low">Low priority</option><option value="medium" selected>Medium priority</option><option value="high">High priority</option>
          </select>
          <button class="button" type="submit">Add task +</button>
        </form>
        <div class="task-toolbar">
          <div class="task-filters" role="group" aria-label="Filter tasks">
            ${[['all', 'Everything'], ['active', 'In progress'], ['done', 'Completed']].map(([filter, label]) =>
              `<button class="chip ${taskFilter === filter ? 'chip-active' : ''}" type="button" data-filter="${filter}">${label}</button>`,
            ).join('')}
          </div>
          <label class="search"><span class="search-icon" aria-hidden="true">⌕</span>
            <input class="input" id="task-search" type="search" placeholder="Search tasks" value="${escapeHtml(taskQuery)}" aria-label="Search tasks" />
          </label>
        </div>
        <div class="task-list ${taskInitialRender ? 'task-list-intro' : ''}">
          ${filtered.length ? filtered.map((task, index) => `
            <article class="task-row ${task.completed ? 'task-completed' : ''}" style="--row-index:${index}">
              <div class="task-main">
                <input class="task-checkbox" type="checkbox" data-complete="${task.id}" ${task.completed ? 'checked' : ''} aria-label="Mark ${escapeHtml(task.title)} complete" />
                <span class="task-title" title="${escapeHtml(task.title)}">${escapeHtml(task.title)}</span>
              </div>
              <div class="task-meta">
                <span>${escapeHtml(task.project)}</span>
                <span class="priority priority-${task.priority}">${escapeHtml(task.priority)}</span>
                <span class="task-actions"><button class="delete-task" type="button" data-delete="${task.id}" aria-label="Delete ${escapeHtml(task.title)}">×</button></span>
              </div>
            </article>`).join('') : '<p class="empty-state">No tasks here yet. Add one above to get started.</p>'}
        </div>
      </section>
    `,
    '✓',
  )
  taskInitialRender = false
  document.querySelector('#add-task-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const titleInput = document.querySelector('#new-task-title')
    const title = titleInput.value.trim()
    if (!title) {
      titleInput.focus()
      return
    }
    tasks.unshift({
      id: `t-${crypto.randomUUID()}`,
      title,
      project: document.querySelector('#new-task-project').value,
      priority: document.querySelector('#new-task-priority').value,
      completed: false,
    })
    saveTasks()
    renderTasks()
    document.querySelector('#new-task-title').focus()
  })
  document.querySelectorAll('[data-filter]').forEach((button) =>
    button.addEventListener('click', () => {
      taskFilter = button.dataset.filter
      renderTasks()
    }),
  )
  document.querySelector('#task-search').addEventListener('input', (event) => {
    taskQuery = event.target.value
    renderTasks()
    const search = document.querySelector('#task-search')
    search.focus()
    search.setSelectionRange(taskQuery.length, taskQuery.length)
  })
  document.querySelectorAll('[data-complete]').forEach((checkbox) =>
    checkbox.addEventListener('change', () => {
      const task = tasks.find((item) => item.id === checkbox.dataset.complete)
      if (task) task.completed = checkbox.checked
      saveTasks()
      renderTasks()
    }),
  )
  document.querySelectorAll('[data-delete]').forEach((button) =>
    button.addEventListener('click', () => {
      tasks = tasks.filter((task) => task.id !== button.dataset.delete)
      saveTasks()
      renderTasks()
      toast('Task removed from your board.')
    }),
  )
}

let selectedEnvironment = 'production'
const stages = ['Build', 'Test', 'Package', 'Deploy']
const pipelines = [
  { id: 'web', name: 'Web app · main', branch: 'main', commit: 'a8f42d1', status: 'Success', stage: 4, environment: 'production', time: '8 min ago' },
  { id: 'api', name: 'API service · release/2.1', branch: 'release/2.1', commit: 'bb731c0', status: 'Success', stage: 4, environment: 'staging', time: '21 min ago' },
  { id: 'docs', name: 'Documentation · main', branch: 'main', commit: 'c64a9e2', status: 'Success', stage: 4, environment: 'preview', time: '1 hr ago' },
]
const pipelineLogs = []
const timers = new Map()
let pipelineInitialRender = true

function renderPipeline() {
  const running = pipelines.filter((pipeline) => pipeline.status === 'Running').length
  shell(
    `
      <div class="page-head ${pipelineInitialRender ? 'pipeline-intro' : ''}">
        <p class="eyebrow">Delivery, at a glance</p>
        <h1>From commit to shipped.</h1>
        <p class="subhead">A simple view of your builds, checks and releases. Start a demo run or change its target environment.</p>
      </div>
      <div class="pipeline-summary ${pipelineInitialRender ? 'pipeline-intro' : ''}">
        <span class="summary-item"><i class="status-dot dot-success"></i>${pipelines.filter((pipeline) => pipeline.status === 'Success').length} successful</span>
        <span class="summary-item"><i class="status-dot dot-running"></i>${running} running</span>
        <span class="summary-item"><i class="status-dot"></i>GitHub Actions + Jenkins</span>
      </div>
      <div class="pipeline-board ${pipelineInitialRender ? 'pipeline-intro' : ''}">
        <section class="pipeline-list" aria-label="Recent pipelines">
          ${pipelines.map((pipeline, index) => `
            <article class="pipeline-row" style="--row-index:${index}">
              <div style="flex:1;min-width:0">
                <div class="pipeline-name">${escapeHtml(pipeline.name)}</div>
                <div class="pipeline-meta">
                  <span class="status-pill ${pipeline.status === 'Success' ? 'status-success' : pipeline.status === 'Running' ? 'status-running' : ''}"><i class="status-dot ${pipeline.status === 'Success' ? 'dot-success' : pipeline.status === 'Running' ? 'dot-running' : ''}"></i>${pipeline.status}</span>
                  <span>${escapeHtml(pipeline.branch)}</span><span>·</span><span>${escapeHtml(pipeline.commit)}</span>
                  <span>·</span><span>${pipeline.status === 'Running' ? 'in progress' : escapeHtml(pipeline.time)}</span>
                </div>
                <div class="stage-list" aria-label="Pipeline stages">
                  ${stages.map((stage, index) => `<span class="stage ${index < pipeline.stage ? 'stage-done' : index === pipeline.stage && pipeline.status === 'Running' ? 'stage-active' : ''}" title="${stage}"></span>`).join('')}
                </div>
              </div>
              <button class="button button-quiet" type="button" data-run="${pipeline.id}" ${pipeline.status === 'Running' ? 'disabled' : ''}>${pipeline.status === 'Running' ? 'Running…' : 'Run again ↗'}</button>
            </article>`).join('')}
        </section>
        <aside class="panel pipeline-detail">
          <div class="panel-title"><h3>Release target</h3><span class="pill" style="padding:6px 9px;background:#edf2e9;color:#526c4b">Demo</span></div>
          <p class="pipeline-detail-copy">Choose a target, then rerun a pipeline to watch the stages move.</p>
          <div class="environment-list" role="group" aria-label="Select release environment">
            ${['preview', 'staging', 'production', 'rancher'].map((environment) => `
              <button class="environment-button ${selectedEnvironment === environment ? 'environment-selected' : ''}" type="button" data-environment="${environment}">${environment === 'rancher' ? 'Rancher' : environment}</button>`).join('')}
          </div>
          <div class="log" aria-label="Pipeline activity" aria-live="polite">
            ${(pipelineLogs.length ? pipelineLogs : ['12:04:18  Ready to run a demo pipeline.', '12:04:19  Select an environment above.'])
              .slice(-8).map((line) => `<div class="log-line">${escapeHtml(line)}</div>`).join('')}
          </div>
          <p class="pipeline-disclaimer">Simulation only. No deployments, services or cloud resources are started.</p>
        </aside>
      </div>
    `,
    '↗',
  )
  pipelineInitialRender = false
  document.querySelectorAll('[data-environment]').forEach((button) =>
    button.addEventListener('click', () => {
      selectedEnvironment = button.dataset.environment
      renderPipeline()
    }),
  )
  document.querySelectorAll('[data-run]').forEach((button) =>
    button.addEventListener('click', () => {
      const pipeline = pipelines.find((item) => item.id === button.dataset.run)
      if (!pipeline || pipeline.status === 'Running') return
      const environment = selectedEnvironment
      pipeline.status = 'Running'
      pipeline.stage = 0
      pipeline.environment = environment
      pipelineLogs.push(`12:04:18  ▶ ${pipeline.name} → ${environment}`)
      renderPipeline()
      const timer = window.setInterval(() => {
        pipeline.stage += 1
        pipelineLogs.push(`12:04:${String(18 + pipeline.stage * 3).padStart(2, '0')}  ✓ ${stages[pipeline.stage - 1]} completed`)
        if (pipeline.stage === stages.length) {
          pipeline.status = 'Success'
          pipeline.time = 'just now'
          pipelineLogs.push(`12:04:30  🚀 Demo run completed for ${pipeline.environment}`)
          window.clearInterval(timer)
          timers.delete(pipeline.id)
        }
        renderPipeline()
      }, 800)
      timers.set(pipeline.id, timer)
    }),
  )
}

function renderPortfolio() {
  document.title = 'Kanchan Thakare · Portfolio preview'
  const savedTheme = localStorage.getItem('portfolio-demo-theme')
  const dark = savedTheme === 'dark'
  app.innerHTML = `
    <div class="portfolio-shell ${dark ? 'theme-dark' : ''}">
      <div class="demo-shell">
        <header class="demo-header">
          <a class="brand" href="../#projects" aria-label="Back to portfolio">
            <span class="brand-dot">KT</span><span>Kanchan Thakare<small>SOFTWARE ENGINEER · PUNE, INDIA</small></span>
          </a>
          <div class="demo-header-side">
            <a class="text-link" href="#work">Selected work</a>
            <a class="text-link" href="#contact">Get in touch</a>
            <button class="theme-toggle" type="button" id="theme-toggle" aria-label="Switch to ${dark ? 'light' : 'dark'} theme">${dark ? '☀' : '☾'}</button>
          </div>
        </header>
          <section class="portfolio-hero">
            <p class="eyebrow">Hello, I'm Kanchan · Software developer</p>
            <h1>Thoughtful code.<span>Useful things.</span></h1>
            <p class="subhead">I build friendly digital experiences, from reliable backends to delightful frontends. Always learning, always making.</p>
            <div class="portfolio-hero-buttons">
              <a class="button" href="#work">Explore my work ↓</a>
              <a class="button button-quiet" href="mailto:krt856@gmail.com">Say hello ↗</a>
            </div>
            <div class="portfolio-facts">
              <span>✳ 5.5 years building software</span><span>⌘ .NET · React · Next.js</span><span>⌖ Pune, India</span>
            </div>
          </section>
          <section class="portfolio-section portfolio-work" id="work">
            <p class="eyebrow">A few things I've been making</p>
            <h2>Selected work</h2>
            <div class="portfolio-projects">
              ${projects.slice(0, 3).map((item, index) => `<a class="portfolio-project-card" style="--card-index:${index}" href="./index.html?app=${item.id}"><span class="portfolio-project-icon">${item.icon}</span><span><span class="portfolio-project-name">${item.title}</span><small class="portfolio-project-tech">Open the ${item.label.toLowerCase()} ↗</small></span></a>`).join('')}
              <a class="portfolio-project-card" style="--card-index:3" href="../#projects"><span class="portfolio-project-icon">✳</span><span><span class="portfolio-project-name">Portfolio Website</span><small class="portfolio-project-tech">You're looking at its live preview</small></span></a>
            </div>
          </section>
          <section class="portfolio-contact" id="contact">
            <span><strong>Have a good idea?</strong><p>Let's make something useful together.</p></span>
            <a class="button" href="mailto:krt856@gmail.com">Get in touch ↗</a>
          </section>
        <footer class="demo-footer"><span>Made with curiosity in Pune, India</span><span>Interactive portfolio preview · <a class="quiet-link" href="../#projects">Back to the main portfolio</a></span></footer>
      </div>
    </div>
  `
  document.querySelector('#theme-toggle').addEventListener('click', () => {
    localStorage.setItem('portfolio-demo-theme', dark ? 'light' : 'dark')
    renderPortfolio()
  })
}

if (!project) {
  document.title = 'Project previews · Kanchan Thakare'
  app.innerHTML = `
    <div class="demo-shell">
      <header class="demo-header"><a class="brand" href="../#projects"><span class="brand-dot">KT</span><span>Kanchan Thakare<small>PROJECT PREVIEWS</small></span></a></header>
      <section class="error-card">
        <p class="eyebrow">Four little demos</p><h1>Choose a project to explore.</h1>
        <p>Each preview runs in your browser and opens in its own tab.</p>
        <div class="portfolio-projects">${projects.map((item) => `<a class="portfolio-project-card" href="./index.html?app=${item.id}"><span class="portfolio-project-icon">${item.icon}</span><span class="portfolio-project-name">${item.title} ↗</span></a>`).join('')}</div>
      </section>
    </div>
  `
} else if (appId === 'shop') {
  renderShop()
} else if (appId === 'tasks') {
  renderTasks()
} else if (appId === 'pipeline') {
  renderPipeline()
} else {
  renderPortfolio()
}
