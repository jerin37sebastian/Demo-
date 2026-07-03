// =========================================================
// Flower Valley — interactivity
// 1. Mobile nav toggle
// 2. Category filtering (shared logic for Products + Gallery)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu after tapping a link (mobile UX nicety)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Generic filter setup ----------
  // Works for both the Products grid and the Gallery grid.
  function setupFilter(filterRowId, itemSelector) {
    const filterRow = document.getElementById(filterRowId);
    if (!filterRow) return;

    const chips = filterRow.querySelectorAll('.filter-chip');
    const items = document.querySelectorAll(itemSelector);

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;

        // update active chip state
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');

        // show/hide items
        items.forEach(item => {
          const matches = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('is-hidden', !matches);
        });
      });
    });
  }

  setupFilter('productFilters', '.product-card');
  setupFilter('galleryFilters', '.gallery-grid img');

});
