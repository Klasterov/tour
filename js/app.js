// =============================================
// "Заказать звонок" — только на index.html
// =============================================
const callBtn = document.getElementById("callBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

if (callBtn && modal) {
  callBtn.onclick = () => { modal.style.display = "flex"; };
}
if (closeModal && modal) {
  closeModal.onclick = () => { modal.style.display = "none"; };
}
window.onclick = (e) => {
  if (modal && e.target === modal) { modal.style.display = "none"; }
};

// Категории — переход на страницу каталога
document.querySelectorAll(".category[data-category]").forEach(item => {
  item.addEventListener("click", () => {
    const categoryName = item.dataset.category || item.textContent.trim();
    window.location.href = `catalog.html?category=${encodeURIComponent(categoryName)}`;
  });
});

// Кнопка "Ещё..." — открывает модальное окно со всеми категориями
const moreCategoriesBtn = document.getElementById("moreCategoriesBtn");
const allCatsModal = document.getElementById("allCatsModal");
const allCatsClose = document.getElementById("allCatsClose");

if (moreCategoriesBtn && allCatsModal) {
  moreCategoriesBtn.addEventListener("click", () => {
    allCatsModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
  allCatsClose.addEventListener("click", () => {
    allCatsModal.classList.remove("open");
    document.body.style.overflow = "";
  });
  allCatsModal.addEventListener("click", (e) => {
    if (e.target === allCatsModal) {
      allCatsModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
  document.querySelectorAll(".all-cats-list li").forEach(li => {
    li.addEventListener("click", () => {
      const cat = li.dataset.category || li.textContent.trim();
      window.location.href = `catalog.html?category=${encodeURIComponent(cat)}`;
    });
  });
}

// Fallback categoriesModal
const categoriesModal = document.getElementById("categoriesModal");
const closeCategories = document.getElementById("closeCategories");
if (closeCategories && categoriesModal) {
  closeCategories.addEventListener("click", () => { categoriesModal.style.display = "none"; });
  window.addEventListener("click", (e) => {
    if (e.target === categoriesModal) { categoriesModal.style.display = "none"; }
  });
}

// =============================================
// Fade-in hero image
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const heroImage = document.querySelector('.hero-image');
  if (!heroImage) return;
  if (heroImage.complete) {
    heroImage.classList.add('loaded');
  } else {
    heroImage.addEventListener('load', () => heroImage.classList.add('loaded'));
  }
});

// =============================================
// КАРТОЧКИ ЭКСКУРСИЙ
// =============================================
function resolveExcursionLink(rawLink) {
  if (!rawLink) return "excursion.html";
  if (rawLink.includes(".html")) return rawLink;
  const match = rawLink.match(/\/excursion\/(\d+)/);
  if (match) return `excursion.html?id=${match[1]}`;
  return "excursion.html";
}

document.querySelectorAll(".excursion-card").forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("book-btn")) return;
    window.location.href = resolveExcursionLink(card.dataset.link);
  });
});

document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".excursion-card");
    window.location.href = resolveExcursionLink(card?.dataset.link);
  });
});

const showMoreBtn = document.getElementById("showMore");
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    window.location.href = "catalog.html";
  });
}

// =============================================
// CALENDAR + SCHEDULE — только на index.html
// =============================================
const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const daysRu = ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];
let currentDate = new Date(2026,0,24);

const monthEl       = document.getElementById("currentMonth");
const calendarDates = document.getElementById("calendarDates");
const monthPicker   = document.getElementById("monthPicker");
const selectedDateText = document.getElementById("selectedDateText");
const scheduleList  = document.getElementById("scheduleList");

if (monthEl && calendarDates) {

  const excursionData = [
    { id: 1, title: "Экскурсия в Йошкар-Олу на автобусе из Казани", type: "Автобусная", duration: "10 часов", price: 2900 },
    { id: 2, title: "Экскурсия в Болгар из Казани",                  type: "Автобусная", duration: "11 часов", price: 3000 },
    { id: 3, title: "Автобусная экскурсия в Елабугу",                type: "Автобусная", duration: "11 часов", price: 3300 },
    { id: 4, title: "Обзорная экскурсия по Казани с посещением Кремля", type: "Автобусная", duration: "4 часа",   price: 1100 },
    { id: 5, title: "Экскурсия «Ночная Казань с колесом обозрения»", type: "Автобусная", duration: "2,5 часа", price: 1400 },
    { id: 6, title: "Экскурсия в Свияжск и Храм всех религий",       type: "Автобусная", duration: "6 часов",  price: 2400 },
  ];

  function renderCalendar() {
    monthEl.textContent = months[currentDate.getMonth()] + " " + currentDate.getFullYear();
    calendarDates.innerHTML = "";
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay  = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
    let start = firstDay.getDay();
    if (start === 0) start = 7;
    for (let i = 1; i < start; i++) calendarDates.innerHTML += "<span></span>";
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const span = document.createElement("span");
      span.textContent = d;
      if (d === currentDate.getDate()) span.classList.add("active");
      span.onclick = () => { currentDate.setDate(d); renderCalendar(); renderSchedule(); };
      calendarDates.appendChild(span);
    }
  }

  function renderSchedule() {
    const day   = currentDate.getDate().toString().padStart(2,"0");
    const month = (currentDate.getMonth()+1).toString().padStart(2,"0");
    const year  = currentDate.getFullYear();
    if (selectedDateText) selectedDateText.textContent = `${day}.${month}.${year}, ${daysRu[currentDate.getDay()]}`;
    if (!scheduleList) return;
    scheduleList.innerHTML = "";
    excursionData.forEach((exc, i) => {
      const hour = (9 + i).toString().padStart(2, "0");
      const item = document.createElement("div");
      item.className = "schedule-item";
      item.style.cursor = "pointer";
      item.onclick = () => window.location.href = `excursion.html?id=${exc.id}`;
      item.innerHTML = `
        <div class="time">${hour}:00</div>
        <div class="schedule-item-info">
          <div class="schedule-title">${exc.title}</div>
          <div class="schedule-meta">${exc.type}, ${exc.duration}</div>
        </div>
        <div class="price">от ${exc.price} ₽ <span class="schedule-arrow">→</span></div>
      `;
      scheduleList.appendChild(item);
    });
  }

  if (monthEl) monthEl.onclick = () => {
    monthPicker.classList.toggle("hidden");
    monthPicker.innerHTML = "";
    months.forEach((m, i) => {
      const div = document.createElement("div");
      div.textContent = m;
      div.onclick = () => { currentDate.setMonth(i); monthPicker.classList.add("hidden"); renderCalendar(); renderSchedule(); };
      monthPicker.appendChild(div);
    });
  };

  const prevMonth = document.getElementById("prevMonth");
  const nextMonth = document.getElementById("nextMonth");
  const prevDay   = document.getElementById("prevDay");
  const nextDay   = document.getElementById("nextDay");
  const fullSched = document.getElementById("fullSchedule");

  if (prevMonth) prevMonth.onclick = () => { currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(); renderSchedule(); };
  if (nextMonth) nextMonth.onclick = () => { currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(); renderSchedule(); };
  if (prevDay)   prevDay.onclick   = () => { currentDate.setDate(currentDate.getDate()-1);   renderCalendar(); renderSchedule(); };
  if (nextDay)   nextDay.onclick   = () => { currentDate.setDate(currentDate.getDate()+1);   renderCalendar(); renderSchedule(); };
  if (fullSched) fullSched.onclick = () => { window.location.href = "schedule.html"; };

  renderCalendar();
  renderSchedule();

} // end calendar guard

// =============================================
// REVIEWS SLIDER — работает на любой странице
// =============================================
function openYandex() {
  window.open('https://yandex.ru/maps', '_blank');
}

const sliderEl      = document.getElementById('slider');
const prevBtnRev    = document.getElementById('prev');
const nextBtnRev    = document.getElementById('next');
const progressBar   = document.getElementById('progress');
const progressTrack = document.querySelector('.progress-track');
const reviewCards   = document.querySelectorAll('.review-card');
const cardsPerView  = 3;
let reviewIndex = 0;
let isDragging  = false;

if (sliderEl && prevBtnRev && nextBtnRev && reviewCards.length > 0) {

  function updateSlider() {
    const cardWidth = reviewCards[0].offsetWidth;
    const gap = 16;
    sliderEl.style.transform = `translateX(${-reviewIndex * (cardWidth + gap)}px)`;
    prevBtnRev.disabled = reviewIndex === 0;
    nextBtnRev.disabled = reviewIndex >= reviewCards.length - cardsPerView;
    updateProgressBar();
  }

  function updateProgressBar() {
    if (!progressBar || !progressTrack) return;
    const maxScroll  = Math.max(reviewCards.length - cardsPerView, 1);
    const percentage = reviewIndex / maxScroll;
    const trackWidth = progressTrack.offsetWidth;
    const barWidth   = Math.max(trackWidth * (cardsPerView / reviewCards.length), 40);
    progressBar.style.width = barWidth + 'px';
    progressBar.style.left  = (trackWidth - barWidth) * percentage + 'px';
  }

  function navigate(dir) {
    if (dir === 'prev' && reviewIndex > 0) { reviewIndex--; updateSlider(); }
    else if (dir === 'next' && reviewIndex < reviewCards.length - cardsPerView) { reviewIndex++; updateSlider(); }
  }

  prevBtnRev.addEventListener('click', () => navigate('prev'));
  nextBtnRev.addEventListener('click', () => navigate('next'));

  if (progressTrack) {
    progressTrack.addEventListener('mousedown', () => { isDragging = true; });
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const rect = progressTrack.getBoundingClientRect();
      const maxScroll = Math.max(reviewCards.length - cardsPerView, 1);
      const barWidth  = progressBar ? progressBar.offsetWidth : 0;
      const maxX      = rect.width - barWidth;
      reviewIndex = Math.max(0, Math.min(Math.round(((e.clientX - rect.left) / maxX) * maxScroll), reviewCards.length - cardsPerView));
      updateSlider();
    });
    document.addEventListener('mouseup', () => { isDragging = false; });
  }

  window.addEventListener('resize', updateProgressBar);
  updateSlider();

} // end slider guard

// =============================================
// GALERIE FOTO (about section) — только на index.html
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const image          = document.getElementById("galleryImage");
  const prevPhotoBtn   = document.getElementById("prevPhoto");
  const nextPhotoBtn   = document.getElementById("nextPhoto");
  const currentIndexEl = document.getElementById("currentIndex");
  const totalPhotosEl  = document.getElementById("totalPhotos");
  if (!image || !prevPhotoBtn) return;

  const photos = [
    { src: "img/galery/photo@1x.png", srcset: "img/galery/photo@1x.png 1x, img/galery/photo@2x.png 2x" },
    { src: "img/galery/photo@1x.png", srcset: "img/galery/photo@1x.png 1x, img/galery/photo@2x.png 2x" },
    { src: "img/galery/photo@1x.png", srcset: "img/galery/photo@1x.png 1x, img/galery/photo@2x.png 2x" },
  ];
  let photoIndex = 0;
  if (totalPhotosEl) totalPhotosEl.textContent = photos.length.toString().padStart(2, "0");

  function updateGallery() {
    image.src    = photos[photoIndex].src;
    image.srcset = photos[photoIndex].srcset;
    if (currentIndexEl) currentIndexEl.textContent = (photoIndex + 1).toString().padStart(2, "0");
  }

  nextPhotoBtn.onclick = () => { photoIndex = (photoIndex + 1) % photos.length; updateGallery(); };
  prevPhotoBtn.onclick = () => { photoIndex = (photoIndex - 1 + photos.length) % photos.length; updateGallery(); };
});

// =============================================
// ABOUT TOGGLE — только на index.html
// =============================================
const aboutContent = document.getElementById('aboutContent');
const aboutToggle  = document.getElementById('aboutToggle');
if (aboutContent && aboutToggle) {
  const arrow = aboutToggle.querySelector('.arrow');
  aboutToggle.addEventListener('click', () => {
    aboutContent.classList.toggle('collapsed');
    if (aboutContent.classList.contains('collapsed')) {
      aboutToggle.childNodes[0].textContent = 'Читать полностью ';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    } else {
      aboutToggle.childNodes[0].textContent = 'Скрыть ';
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
  });
}

// =============================================
// GALLERY SLIDER (categories section) — только на index.html
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards");
  const rightArrow     = document.querySelector(".arrow.right");
  if (!cardsContainer || !rightArrow) return;

  let cardSliderIndex = 0;
  const cardWidth   = 270;
  const visibleCards = 3;
  const totalCards  = cardsContainer.children.length;

  rightArrow.addEventListener("click", () => {
    cardSliderIndex++;
    if (cardSliderIndex > totalCards - visibleCards) cardSliderIndex = 0;
    cardsContainer.style.transform = `translateX(${-cardSliderIndex * cardWidth}px)`;
  });

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => { card.style.transform = "scale(1.1)"; });
    card.addEventListener("mouseleave", () => { card.style.transform = "scale(1)"; });
  });

  const showAll = document.querySelector(".show-all");
  if (showAll) {
    showAll.addEventListener("mouseenter", () => { showAll.style.transform = "scale(1.2)"; });
    showAll.addEventListener("mouseleave", () => { showAll.style.transform = "scale(1)"; });
  }
});

// =============================================
// GALLERY SLIDER 2 (gallerySlider) — только на index.html
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const gallerySlider  = document.getElementById("gallerySlider");
  const galleryPrevBtn = document.getElementById("galleryPrev");
  const galleryNextBtn = document.getElementById("galleryNext");
  if (!gallerySlider || !galleryNextBtn) return;

  const galleryCards = gallerySlider.querySelectorAll(".card");
  const gap          = 20;
  let galleryIndex   = 0;
  const visibleCards = 4;

  function updateGallerySlider() {
    if (!galleryCards[0]) return;
    gallerySlider.style.transform = `translateX(-${galleryIndex * (galleryCards[0].offsetWidth + gap)}px)`;
  }

  galleryNextBtn.addEventListener("click", () => {
    if (galleryIndex < galleryCards.length - visibleCards) { galleryIndex++; updateGallerySlider(); }
  });
  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener("click", () => {
      if (galleryIndex > 0) { galleryIndex--; updateGallerySlider(); }
    });
  }
});

// =============================================
// FAQ
// =============================================
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const item     = question.parentElement;
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach(el => {
      el.classList.remove("active");
      const ans = el.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = null;
    });
    if (!isActive) {
      item.classList.add("active");
      const ans = item.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = ans.scrollHeight + "px";
    }
  });
});

// =============================================
// SOCIAL BUTTONS + CONTACT FORM
// =============================================
const socialButtons = document.querySelectorAll(".social-btn");
const hiddenInput   = document.getElementById("selectedSocial");
if (socialButtons.length && hiddenInput) {
  socialButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      socialButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      hiddenInput.value = btn.dataset.social;
    });
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    alert("Заявка отправлена через: " + formData.get("social"));
    this.reset();
  });
}

// =============================================
// TOPICS MODAL
// =============================================
const topicsModal = document.getElementById("topicsModal");
const topicsMoreBtn  = document.querySelector(".more-btn");
const closeTopics = document.getElementById("closeTopics");
if (topicsMoreBtn && topicsModal) {
  topicsMoreBtn.addEventListener("click", () => { topicsModal.style.display = "flex"; });
  if (closeTopics) closeTopics.addEventListener("click", () => { topicsModal.style.display = "none"; });
  window.addEventListener("click", (e) => { if (e.target === topicsModal) topicsModal.style.display = "none"; });
}

// =============================================
// FOOTER — только на index.html
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const footerAddress = document.getElementById("footerAddress");
  if (footerAddress) {
    footerAddress.addEventListener("click", () => {
      window.open("https://yandex.ru/maps/?text=Казань+Баумана+26", "_blank");
    });
  }

  const footerCallBtn = document.getElementById("footerCallBtn");
  const footerModal   = document.getElementById("modal");
  if (footerCallBtn && footerModal) {
    footerCallBtn.addEventListener("click", () => { footerModal.style.display = "flex"; });
  }

  const scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 10 ? "flex" : "none";
    });
    scrollTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
});

// =============================================
// MOBILE HEADER: Phone Modal + Burger Menu
// =============================================
(function() {
  const mobPhoneBtn        = document.getElementById('mobPhoneBtn');
  const mobPhoneModal      = document.getElementById('mobPhoneModal');
  const mobPhoneModalClose = document.getElementById('mobPhoneModalClose');

  if (mobPhoneBtn && mobPhoneModal) {
    mobPhoneBtn.addEventListener('click', () => { mobPhoneModal.classList.add('open'); });
    if (mobPhoneModalClose) mobPhoneModalClose.addEventListener('click', () => { mobPhoneModal.classList.remove('open'); });
    mobPhoneModal.addEventListener('click', (e) => { if (e.target === mobPhoneModal) mobPhoneModal.classList.remove('open'); });
  }

  const mobBurger      = document.getElementById('mobBurger');
  const mobMenuDrawer  = document.getElementById('mobMenuDrawer');
  const mobMenuOverlay = document.getElementById('mobMenuOverlay');
  const mobMenuClose   = document.getElementById('mobMenuClose');
  const mobMenuCallBtn = document.getElementById('mobMenuCallBtn');

  function openDrawer()  {
    if (mobMenuDrawer)  mobMenuDrawer.classList.add('open');
    if (mobMenuOverlay) mobMenuOverlay.classList.add('open');
    if (mobBurger)      mobBurger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (mobMenuDrawer)  mobMenuDrawer.classList.remove('open');
    if (mobMenuOverlay) mobMenuOverlay.classList.remove('open');
    if (mobBurger)      mobBurger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobBurger) {
    mobBurger.addEventListener('click', () => {
      mobMenuDrawer && mobMenuDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }
  if (mobMenuClose)   mobMenuClose.addEventListener('click', closeDrawer);
  if (mobMenuOverlay) mobMenuOverlay.addEventListener('click', closeDrawer);
  if (mobMenuCallBtn) {
    mobMenuCallBtn.addEventListener('click', () => {
      closeDrawer();
      const m = document.getElementById('modal');
      if (m) m.style.display = 'flex';
    });
  }
})();

// =============================================
// "Читать еще" — мобиле отзывы
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) return;
  document.querySelectorAll('.review-card p').forEach(p => {
    p.classList.add('truncated');
    const btn = document.createElement('button');
    btn.className   = 'read-more-btn';
    btn.textContent = 'Читать еще';
    p.after(btn);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      p.classList.remove('truncated');
      btn.remove();
    });
  });
});