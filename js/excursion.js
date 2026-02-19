const allTags = [
    "Речные прогулки Казани",
    "Экскурсии по ночной Казани",
    "Групповые экскурсии",
    "Автобусные экскурсии по Казани",
    "Индивидуальные экскурсии",
    "Дворец земледельцев",
    "Пешеходная экскурсия по Казани",
    "Театр «Экият»",
    "Школьные экскурсии",
    "Экскурсия в Раифа",
    "Кул шариф",
    "Спасская башня",
    "Казанский Кремль",
    "Старо-Татарская слобода",
    "Речная прогулка ночью",
    "Экскурсия в Свияжск"
  ];

  const VISIBLE_COUNT = 11;
  let expanded = false;

  const wrapper = document.getElementById('tagsWrapper');

  function render() {
    wrapper.innerHTML = '';

    allTags.forEach((text, i) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      if (i >= VISIBLE_COUNT && !expanded) tag.classList.add('hidden');
      if (i >= VISIBLE_COUNT && expanded) tag.classList.add('visible');
      tag.textContent = text;
      tag.addEventListener('click', () => tag.classList.toggle('active'));
      wrapper.appendChild(tag);
    });

    if (allTags.length > VISIBLE_COUNT) {
      const more = document.createElement('span');
      more.className = 'tag tag-more';
      more.textContent = expanded ? 'Скрыть' : 'Ещё...';
      more.addEventListener('click', () => {
        expanded = !expanded;
        render();
      });
      wrapper.appendChild(more);
    }
  }

  render();

  const PHOTOS = [
    {
      src:    "../img/excursion/1.png",
      srcset: "../img/excursion/1.png 1x, ../img/excursion/1@2x.png 2x",
      alt:    "Экскурсия — фото 1"
    },
    {
      src:    "../img/excursion/2.png",
      srcset: "../img/excursion/2.png 1x, ../img/excursion/2@2x.png 2x",
      alt:    "Экскурсия — фото 2"
    },
    {
      src:    "../img/excursion/3.png",
      srcset: "../img/excursion/3.png 1x, ../img/excursion/3@2x.png 2x",
      alt:    "Экскурсия — фото 3"
    },
    {
      src:    "../img/excursion/4.png",
      srcset: "../img/excursion/4.png 1x, ../img/excursion/4@2x.png 2x",
      alt:    "Экскурсия — фото 4"
    },
  ];

  const VISIBLE = 4;
  let cur = 0, offset = 0;

  const mainImg   = document.getElementById('mainImg');
  const thumbsRow = document.getElementById('thumbsRow');

  mainImg.style.transition = 'opacity 0.18s';

  function renderThumbs() {
    thumbsRow.innerHTML = '';
    const slice = PHOTOS.slice(offset, offset + VISIBLE);
    slice.forEach((_p, i) => {
      const ri = offset + i;
      const d = document.createElement('div');
      d.className = 'th' + (ri === cur ? ' on' : '');
      const img = document.createElement('img');
      img.src    = PHOTOS[ri].src;
      img.srcset = PHOTOS[ri].srcset;
      img.alt    = PHOTOS[ri].alt;
      img.loading   = 'lazy';
      img.decoding  = 'async';
      d.appendChild(img);
      d.addEventListener('click', () => goTo(ri));
      thumbsRow.appendChild(d);
    });
    // arrow if more photos exist
    if (PHOTOS.length > VISIBLE) {
      const btn = document.createElement('button');
      btn.className = 'th-arrow';
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.8"
        stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
      btn.addEventListener('click', () => {
        offset = (offset + 1) % PHOTOS.length;
        renderThumbs();
      });
      thumbsRow.appendChild(btn);
    }
  }

  function goTo(index) {
    cur = (index + PHOTOS.length) % PHOTOS.length;
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src    = PHOTOS[cur].src;
      mainImg.srcset = PHOTOS[cur].srcset;
      mainImg.alt    = PHOTOS[cur].alt;
      mainImg.style.opacity = '1';
    }, 180);
    if (cur < offset || cur >= offset + VISIBLE) {
      offset = Math.max(0, Math.min(cur, PHOTOS.length - VISIBLE));
    }
    renderThumbs();
  }

  document.getElementById('prevBtn').addEventListener('click', () => goTo(cur - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(cur + 1));
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(cur - 1);
    if (e.key === 'ArrowRight') goTo(cur + 1);
    if (e.key === 'Escape')     closeModal();
  });

  renderThumbs();

  const overlay = document.getElementById('overlay');

  document.getElementById('bookBtn').addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('mClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  function doSubmit() {
    alert('Заявка принята! Мы свяжемся с вами в ближайшее время.');
    closeModal();
  }