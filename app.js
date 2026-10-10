(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menuToggle = $('#menu-toggle');
  const mainNav = $('#main-nav');
  const searchPanel = $('#search-panel');
  const cartPanel = $('#cart-panel');
  const siteSearch = $('#site-search');
  const searchResults = $('#search-results');
  const spiceCards = $$('.spice-card');
  const searchEmpty = $('#search-empty');
  const cartItemsEl = $('#cart-items');
  const bagCount = $('#bag-count');
  const cartCountLabel = $('#cart-count-label');
  const toast = $('#toast');
  let bag = [];
  let toastTimer;
  let lastFocus = null;

  $('#year').textContent = new Date().getFullYear();

  function lockBody() {
    document.body.classList.add('is-locked');
  }
  function unlockBodyIfPanelsClosed() {
    if (!searchPanel.classList.contains('is-open') && !cartPanel.classList.contains('is-open')) {
      document.body.classList.remove('is-locked');
    }
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2500);
  }
  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  $$('#main-nav a').forEach(link => link.addEventListener('click', closeMenu));

  function openSearch() {
    lastFocus = document.activeElement;
    searchPanel.classList.add('is-open');
    searchPanel.setAttribute('aria-hidden', 'false');
    lockBody();
    window.setTimeout(() => siteSearch.focus(), 50);
  }
  function closeSearch() {
    searchPanel.classList.remove('is-open');
    searchPanel.setAttribute('aria-hidden', 'true');
    unlockBodyIfPanelsClosed();
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  $('#open-search').addEventListener('click', openSearch);
  $('#account-button').addEventListener('click', () => showToast('Customer accounts are not connected in this prototype yet.'));
  $$('[data-close-search]').forEach(el => el.addEventListener('click', closeSearch));

  function filterSpices(term) {
    const query = term.trim().toLowerCase();
    let visibleCount = 0;
    spiceCards.forEach(card => {
      const text = (card.dataset.search + ' ' + card.textContent).toLowerCase();
      const visible = !query || text.includes(query);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    searchEmpty.hidden = visibleCount !== 0;
    return visibleCount;
  }
  siteSearch.addEventListener('input', () => {
    const query = siteSearch.value.trim().toLowerCase();
    const entries = $$('[data-search-pick]', searchResults);
    let matchCount = 0;
    entries.forEach(entry => {
      const matched = !query || entry.dataset.searchPick.toLowerCase().includes(query);
      entry.hidden = !matched;
      if (matched) matchCount += 1;
    });
    const empty = $('#search-no-results');
    if (empty) empty.remove();
    if (!matchCount) {
      const notice = document.createElement('p');
      notice.id = 'search-no-results';
      notice.className = 'search-help';
      notice.textContent = 'No matching spices found. Try pepper, cardamom, cloves, cinnamon, ginger, or turmeric.';
      searchResults.append(notice);
    }
  });
  $$('[data-search-pick]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const term = link.dataset.searchPick;
    closeSearch();
    siteSearch.value = '';
    filterSpices(term);
    $('#shop').scrollIntoView({ behavior: 'smooth' });
    showToast(`Showing ${term} in the spice collection.`);
  }));
  $$('[data-filter]').forEach(link => link.addEventListener('click', () => {
    const term = link.dataset.filter;
    filterSpices(term);
  }));
  $$('.spice-explore, .spice-image-link').forEach(link => link.addEventListener('click', event => {
    if (link.closest('.spice-card')) {
      const card = link.closest('.spice-card');
      const name = card.querySelector('h3').textContent;
      showToast(`${name}: product details will be connected when the catalogue is ready.`);
    }
  }));

  function openCart() {
    lastFocus = document.activeElement;
    cartPanel.classList.add('is-open');
    cartPanel.setAttribute('aria-hidden', 'false');
    lockBody();
    renderCart();
  }
  function closeCart() {
    cartPanel.classList.remove('is-open');
    cartPanel.setAttribute('aria-hidden', 'true');
    unlockBodyIfPanelsClosed();
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  $('#open-cart').addEventListener('click', openCart);
  $$('[data-close-cart]').forEach(el => el.addEventListener('click', closeCart));
  $$('[data-scroll-shop]').forEach(el => el.addEventListener('click', () => $('#shop').scrollIntoView({ behavior: 'smooth' })));
  function addItem(name, pack) {
    const existing = bag.find(item => item.name === name && item.pack === pack);
    if (existing) existing.quantity += 1;
    else bag.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, name, pack, quantity: 1 });
    renderCart();
    showToast(`${name} added to your demo bag.`);
  }
  function removeItem(id) {
    bag = bag.filter(item => item.id !== id);
    renderCart();
  }
  function renderCart() {
    const count = bag.reduce((total, item) => total + item.quantity, 0);
    bagCount.textContent = String(count);
    cartCountLabel.textContent = `(${count})`;
    if (!bag.length) {
      cartItemsEl.innerHTML = '<div class="empty-bag"><span aria-hidden="true">◯</span><h3>Your bag is empty</h3><p>Explore the spice collection to add a sample item.</p><button class="button button-primary" type="button" data-close-cart data-scroll-shop>Explore spices</button></div>';
      const browseButton = $('[data-scroll-shop]', cartItemsEl);
      browseButton.addEventListener('click', () => { closeCart(); $('#shop').scrollIntoView({ behavior: 'smooth' }); });
      return;
    }
    cartItemsEl.innerHTML = '';
    bag.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      const info = document.createElement('div');
      const name = document.createElement('h3');
      name.textContent = item.name;
      const pack = document.createElement('p');
      pack.textContent = `${item.pack} · Qty ${item.quantity}`;
      info.append(name, pack);
      const side = document.createElement('div');
      side.className = 'cart-item-side';
      const price = document.createElement('strong');
      price.textContent = 'Price pending';
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove-item';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${item.name} from demo bag`);
      remove.addEventListener('click', () => removeItem(item.id));
      side.append(price, remove);
      row.append(info, side);
      cartItemsEl.append(row);
    });
  }
  $$('.add-to-bag').forEach(button => button.addEventListener('click', () => {
    const selector = document.getElementById(button.dataset.select);
    addItem(button.dataset.name, selector ? selector.value : 'Example pack size');
  }));

  function selectInquiry(type) {
    const field = $('#business-type');
    const match = [...field.options].find(option => option.textContent.toLowerCase() === type.toLowerCase());
    if (match) field.value = match.value;
  }
  $$('[data-inquiry]').forEach(link => link.addEventListener('click', () => {
    selectInquiry(link.dataset.inquiry);
  }));

  $('#newsletter-form').addEventListener('submit', event => {
    event.preventDefault();
    const message = $('#newsletter-message');
    const email = $('#newsletter-email').value.trim();
    message.className = 'form-message success';
    message.textContent = `Thanks — ${email} is validly formatted. Connect an email platform to save subscriptions.`;
    event.currentTarget.reset();
  });
  $('#business-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const name = $('#business-name').value.trim();
    const type = $('#business-type').value;
    const status = $('#business-message-status');
    status.className = 'form-message success';
    status.textContent = `Thank you, ${name}. Your ${type.toLowerCase()} enquiry is ready for review, but this prototype does not send or save submissions. Connect a form service or CRM to receive it.`;
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (searchPanel.classList.contains('is-open')) closeSearch();
      if (cartPanel.classList.contains('is-open')) closeCart();
      closeMenu();
    }
  });
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor && anchor.closest('#main-nav')) closeMenu();
  });
})();
