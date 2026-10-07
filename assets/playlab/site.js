// Content is rendered from Markdown by Jekyll. JavaScript adds filters and the menu.
const publications = Array.from(document.querySelectorAll('#publication-list .publication'));
const filters = document.querySelector('.filters');
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const filterStatus = document.querySelector('#filter-status');

function filterPublications(filter = 'all') {
  let count = 0;
  publications.forEach(publication => {
    const visible = filter === 'all' || publication.dataset.category === filter;
    publication.hidden = !visible;
    if (visible) count += 1;
  });
  filterStatus.textContent = `${count} publications shown`;
}

if (filters && filterStatus) {
  filters.hidden = false;
  filterPublications();
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    filterPublications(button.dataset.filter);
  }));
}

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (toggle && navigation) {
  toggle.hidden = false;
  navigation.classList.add('collapsible');
  const setMenuOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  navigation.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}
