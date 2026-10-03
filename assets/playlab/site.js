const data = window.PLAYLAB;
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
document.querySelector('#news-list').innerHTML = data.news.map(n => `<article class="news-item"><p class="news-date">${escapeHTML(n.date)}</p><div class="news-copy"><h3>${escapeHTML(n.title)}</h3><p>${escapeHTML(n.text)}</p>${n.papers ? `<ul>${n.papers.map(title => `<li>${escapeHTML(title)}</li>`).join('')}</ul>` : ''}${n.image ? `<a class="news-photo" href="${escapeHTML(n.image)}" aria-label="View full-size REU team photo"><img src="${escapeHTML(n.image)}" alt="${escapeHTML(n.imageAlt)}" loading="lazy"></a>` : ''}<a class="text-link small" href="${escapeHTML(n.link)}">${escapeHTML(n.linkLabel)} ↗</a></div></article>`).join('');
function renderPublications(filter = 'all') {
  const publications = data.publications.filter(p => filter === 'all' || p.category === filter);
  document.querySelector('#publication-list').innerHTML = publications.map(p => `<article class="publication"><a class="publication-image" href="${escapeHTML(p.doi)}"><img src="images/playlab/${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} - project overview" loading="lazy"></a><div class="publication-copy"><p class="venue">${escapeHTML(p.venue)}</p><h3><a href="${escapeHTML(p.doi)}">${escapeHTML(p.title)}</a></h3><p class="authors">${escapeHTML(p.authors).replace('Ananya Ipsita', '<strong>Ananya Ipsita</strong>')}</p><p class="summary">${escapeHTML(p.summary)}</p><div class="publication-links"><a href="${escapeHTML(p.doi)}">Paper ↗</a><a href="${escapeHTML(p.video)}">Video ↗</a></div></div></article>`).join('');
  document.querySelector('#filter-status').textContent = `${publications.length} publications shown`;
}
renderPublications();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  renderPublications(button.dataset.filter);
}));
function renderPeople(selector, people) {
  document.querySelector(selector).innerHTML = people.map(p => `<article class="person">${p.photo ? `<img src="${escapeHTML(p.photo)}" alt="${escapeHTML(p.name)}" loading="lazy">` : `<div class="person-placeholder" aria-hidden="true">${escapeHTML(p.name.replace(/^Dr\. /, '').split(' ').filter(n => n.length > 1).slice(0, 2).map(n => n[0]).join(''))}</div>`}<h3>${p.website ? `<a href="${escapeHTML(p.website)}">${escapeHTML(p.name)} ↗</a>` : escapeHTML(p.name)}</h3><p>${escapeHTML(p.role)}</p>${p.bio ? `<details><summary>Research & background</summary><p>${escapeHTML(p.bio)}</p></details>` : ''}</article>`).join('');
}
renderPeople('#people-list', data.people);
renderPeople('#alumni-list', data.alumni);
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); document.querySelector('#navigation').classList.toggle('open', open); });
document.querySelectorAll('#navigation a').forEach(link => link.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); document.querySelector('#navigation').classList.remove('open'); }));
