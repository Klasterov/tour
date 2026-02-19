const callBtn = document.getElementById("callBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

callBtn.onclick = () => {
  modal.style.display = "flex";
};

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
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

  // Клик на категорию внутри модального окна
  document.querySelectorAll(".all-cats-list li").forEach(li => {
    li.addEventListener("click", () => {
      const cat = li.dataset.category || li.textContent.trim();
      window.location.href = `catalog.html?category=${encodeURIComponent(cat)}`;
    });
  });
}

// Старый modal categorii (fallback)
const categoriesModal = document.getElementById("categoriesModal");
const closeCategories = document.getElementById("closeCategories");
if (closeCategories) {
  closeCategories.addEventListener("click", () => {
    if (categoriesModal) categoriesModal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === categoriesModal) {
      categoriesModal.style.display = "none";
    }
  });
}

// =============================
// Fade-in imagine hero
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const heroImage = document.querySelector('.hero-image');

  // Dacă imaginea e deja încărcată
  if (heroImage.complete) {
    heroImage.classList.add('loaded');
  } else {
    // Așteaptă să se încarce
    heroImage.addEventListener('load', () => {
      heroImage.classList.add('loaded');
    });
  }
});


// =============================================
// КАРТОЧКИ ЭКСКУРСИЙ — клик на карточку или "Забронировать"
// =============================================

// Нормализуем data-link: убираем ведущий слеш если есть, добавляем .html
function resolveExcursionLink(rawLink) {
  if (!rawLink) return "excursion.html";
  // Если уже выглядит как файл — вернуть как есть
  if (rawLink.includes(".html")) return rawLink;
  // /excursion/1 → excursion.html?id=1
  const match = rawLink.match(/\/excursion\/(\d+)/);
  if (match) return `excursion.html?id=${match[1]}`;
  return "excursion.html";
}

document.querySelectorAll(".excursion-card").forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    // Не срабатывает если кликнули на кнопку (она сама обработает)
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

// =============================================
// "Показать еще" → каталог
// =============================================
const showMoreBtn = document.getElementById("showMore");
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    window.location.href = "catalog.html";
  });
}


const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const daysRu = ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];

let currentDate = new Date(2026,0,24);

const monthEl = document.getElementById("currentMonth");
const calendarDates = document.getElementById("calendarDates");
const monthPicker = document.getElementById("monthPicker");
const selectedDateText = document.getElementById("selectedDateText");
const scheduleList = document.getElementById("scheduleList");

function renderCalendar() {
  monthEl.textContent = months[currentDate.getMonth()] + " " + currentDate.getFullYear();
  calendarDates.innerHTML = "";

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(),1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth()+1,0);

  let start = firstDay.getDay();
  if(start===0) start=7;

  for(let i=1;i<start;i++){
    calendarDates.innerHTML += "<span></span>";
  }

  for(let d=1; d<=lastDay.getDate(); d++){
    const span = document.createElement("span");
    span.textContent = d;

    if(d===currentDate.getDate()){
      span.classList.add("active");
    }

    span.onclick = ()=>{
      currentDate.setDate(d);
      renderCalendar();
      renderSchedule();
    }

    calendarDates.appendChild(span);
  }
}

// Данные экскурсий для расписания
const excursionData = [
  { id: 1, title: "Экскурсия в Йошкар-Олу на автобусе из Казани", type: "Автобусная", duration: "10 часов", price: 2900 },
  { id: 2, title: "Экскурсия в Болгар из Казани", type: "Автобусная", duration: "11 часов", price: 3000 },
  { id: 3, title: "Автобусная экскурсия в Елабугу", type: "Автобусная", duration: "11 часов", price: 3300 },
  { id: 4, title: "Обзорная экскурсия по Казани с посещением Кремля", type: "Автобусная", duration: "4 часа", price: 1100 },
  { id: 5, title: "Экскурсия «Ночная Казань с колесом обозрения»", type: "Автобусная", duration: "2,5 часа", price: 1400 },
  { id: 6, title: "Экскурсия в Свияжск и Храм всех религий", type: "Автобусная", duration: "6 часов", price: 2400 },
];

function renderSchedule(){
  const day = currentDate.getDate().toString().padStart(2,"0");
  const month = (currentDate.getMonth()+1).toString().padStart(2,"0");
  const year = currentDate.getFullYear();

  selectedDateText.textContent = `${day}.${month}.${year}, ${daysRu[currentDate.getDay()]}`;

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

monthEl.onclick = ()=>{
  monthPicker.classList.toggle("hidden");
  monthPicker.innerHTML="";
  months.forEach((m,i)=>{
    const div = document.createElement("div");
    div.textContent=m;
    div.onclick=()=>{
      currentDate.setMonth(i);
      monthPicker.classList.add("hidden");
      renderCalendar();
      renderSchedule();
    }
    monthPicker.appendChild(div);
  });
};

document.getElementById("prevMonth").onclick=()=>{
  currentDate.setMonth(currentDate.getMonth()-1);
  renderCalendar();
  renderSchedule();
};
document.getElementById("nextMonth").onclick=()=>{
  currentDate.setMonth(currentDate.getMonth()+1);
  renderCalendar();
  renderSchedule();
};

document.getElementById("prevDay").onclick=()=>{
  currentDate.setDate(currentDate.getDate()-1);
  renderCalendar();
  renderSchedule();
};
document.getElementById("nextDay").onclick=()=>{
  currentDate.setDate(currentDate.getDate()+1);
  renderCalendar();
  renderSchedule();
};

document.getElementById("fullSchedule").onclick=()=>{
  window.location.href="schedule.html";
};

renderCalendar();
renderSchedule();

function openYandex() {
    window.open('https://yandex.ru/maps', '_blank');
}

const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress');
const progressTrack = document.querySelector('.progress-track');

const cards = document.querySelectorAll('.review-card');
const cardsPerView = 3;
let currentIndex = 0;
let isDragging = false;

function updateSlider() {
    // Move cards
    const cardWidth = cards[0].offsetWidth;
    const gap = 16;
    const offset = -currentIndex * (cardWidth + gap);
    slider.style.transform = `translateX(${offset}px)`;

    // Update buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - cardsPerView;

    // Update progress bar
    updateProgressBar();
}

function updateProgressBar() {
    const maxScroll = Math.max(cards.length - cardsPerView, 1);
    const percentage = currentIndex / maxScroll;
    const trackWidth = progressTrack.offsetWidth;
    const barWidth = Math.max(trackWidth * (cardsPerView / cards.length), 40);
    
    progressBar.style.width = barWidth + 'px';
    progressBar.style.left = (trackWidth - barWidth) * percentage + 'px';
}

function navigate(direction) {
    if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
        updateSlider();
    } else if (direction === 'next' && currentIndex < cards.length - cardsPerView) {
        currentIndex++;
        updateSlider();
    }
}

prevBtn.addEventListener('click', () => navigate('prev'));
nextBtn.addEventListener('click', () => navigate('next'));

// Slider drag
progressTrack.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = progressTrack.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const maxScroll = Math.max(cards.length - cardsPerView, 1);
        const barWidth = progressBar.offsetWidth;
        const maxX = rect.width - barWidth;
        currentIndex = Math.round((x / maxX) * maxScroll);
        currentIndex = Math.max(0, Math.min(currentIndex, cards.length - cardsPerView));
        updateSlider();
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigate('prev');
    if (e.key === 'ArrowRight') navigate('next');
});

// Initialize
updateSlider();

// Resize handler
window.addEventListener('resize', updateProgressBar);


document.addEventListener("DOMContentLoaded", () => {

  const image = document.getElementById("galleryImage");
  const prevBtn = document.getElementById("prevPhoto");
  const nextBtn = document.getElementById("nextPhoto");
  const currentIndexEl = document.getElementById("currentIndex");
  const totalPhotosEl = document.getElementById("totalPhotos");

  const photos = [
    { 
      src: "img/galery/photo@1x.png",
      srcset: "img/galery/photo@1x.png 1x, img/galery/photo@2x.png 2x"
    },
    { 
      src: "img/galery/photo@1x.png",
      srcset: "img/galery/photo@1x.png 1x, img/galery/photo@2x.png 2x"
    },
    { 
      src: "img/galery/photo@1x.png",
      srcset: "img/galery/photo@1x.png 1x, img/galery/photo@2x.png 2x"
    }
  ];

  let index = 0;

  totalPhotosEl.textContent = photos.length.toString().padStart(2, "0");

  function updateGallery() {
    image.src = photos[index].src;
    image.srcset = photos[index].srcset;

    currentIndexEl.textContent = (index + 1)
      .toString()
      .padStart(2, "0");
  }

  nextBtn.onclick = () => {
    index = (index + 1) % photos.length;
    updateGallery();
  };

  prevBtn.onclick = () => {
    index = (index - 1 + photos.length) % photos.length;
    updateGallery();
  };

});


const content = document.getElementById('aboutContent');
  const toggle = document.getElementById('aboutToggle');
  const arrow = toggle.querySelector('.arrow');

  toggle.addEventListener('click', () => {
    content.classList.toggle('collapsed');

    if (content.classList.contains('collapsed')) {
      toggle.childNodes[0].textContent = 'Читать полностью ';
      arrow.style.transform = 'rotate(0deg)';
    } else {
      toggle.childNodes[0].textContent = 'Скрыть ';
      arrow.style.transform = 'rotate(180deg)';
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards");
  const rightArrow = document.querySelector(".arrow.right");

  let index = 0;
  const cardWidth = 270; // lățimea cardului + margin
  const visibleCards = 3; // câte carduri se văd simultan
  const totalCards = cardsContainer.children.length;

  function updateSlider() {
    const offset = -index * cardWidth;
    cardsContainer.style.transform = `translateX(${offset}px)`;
  }

  rightArrow.addEventListener("click", () => {
    index++;
    if (index > totalCards - visibleCards) {
      // dacă am ajuns la capăt, revin la început
      index = 0;
    }
    updateSlider();
  });

  // Hover pe card → se mărește
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
    });
  });

  // Hover pe "Показать все" → se mărește
  const showAll = document.querySelector(".show-all");
  showAll.addEventListener("mouseenter", () => {
    showAll.style.transform = "scale(1.2)";
  });
  showAll.addEventListener("mouseleave", () => {
    showAll.style.transform = "scale(1)";
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.getElementById("gallerySlider");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  const cards = slider.querySelectorAll(".card");
  const gap = 20;

  let index = 0;
  const visibleCards = 4;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + gap;
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

});


document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const isActive = item.classList.contains("active");

    // Закрываем все
    document.querySelectorAll(".faq-item").forEach(el => {
      el.classList.remove("active");
      const ans = el.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = null;
    });

    // Открываем кликнутый (если не был открыт)
    if (!isActive) {
      item.classList.add("active");
      const ans = item.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = ans.scrollHeight + "px";
    }
  });
});


const socialButtons = document.querySelectorAll(".social-btn");
const hiddenInput = document.getElementById("selectedSocial");

socialButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    socialButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    hiddenInput.value = btn.dataset.social;
  });
});


document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  console.log("Имя:", formData.get("name"));
  console.log("Телефон:", formData.get("phone"));
  console.log("Вопрос:", formData.get("question"));
  console.log("Соцсеть:", formData.get("social"));

  alert("Заявка отправлена! Способ связи: " + formData.get("social"));

  this.reset();
});


document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CALL MODAL
  =============================== */

  const callBtn = document.getElementById("callBtn");
  const callModal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  if (callBtn && callModal) {
    callBtn.onclick = () => callModal.style.display = "flex";
    closeModal.onclick = () => callModal.style.display = "none";

    window.addEventListener("click", (e) => {
      if (e.target === callModal) callModal.style.display = "none";
    });
  }


  document.querySelectorAll(".category").forEach(item => {
    item.addEventListener("click", () => {
      const categoryName = item.textContent.trim();
      window.location.href = `/catalog?category=${encodeURIComponent(categoryName)}`;
    });
  });


  const topicsModal = document.getElementById("topicsModal");
  const moreBtn = document.querySelector(".more-btn");
  const closeTopics = document.getElementById("closeTopics");

  if (moreBtn && topicsModal) {
    moreBtn.addEventListener("click", () => {
      topicsModal.style.display = "flex";
    });

    closeTopics.addEventListener("click", () => {
      topicsModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === topicsModal) {
        topicsModal.style.display = "none";
      }
    });
  }


  // FAQ handled globally above


  const socialButtons = document.querySelectorAll(".social-btn");
  const hiddenInput = document.getElementById("selectedSocial");

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

      console.log("Имя:", formData.get("name"));
      console.log("Телефон:", formData.get("phone"));
      console.log("Вопрос:", formData.get("question"));
      console.log("Соцсеть:", formData.get("social"));

      alert("Заявка отправлена через: " + formData.get("social"));

      this.reset();
    });
  }

});

document.addEventListener("DOMContentLoaded", () => {

  /* Адрес → Яндекс карты */
  const address = document.getElementById("footerAddress");
  address.addEventListener("click", () => {
    window.open("https://yandex.ru/maps/?text=Казань+Баумана+26", "_blank");
  });

  /* Заказать звонок */
  const footerCallBtn = document.getElementById("footerCallBtn");
  const callModal = document.getElementById("modal");

  footerCallBtn.addEventListener("click", () => {
    callModal.style.display = "flex";
  });

  /* Кнопка вверх */
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});

// =============================================
// MOBILE HEADER: Phone Modal, Burger Menu, Sticky
// =============================================
(function() {

  // -- Phone modal --
  const mobPhoneBtn = document.getElementById('mobPhoneBtn');
  const mobPhoneModal = document.getElementById('mobPhoneModal');
  const mobPhoneModalClose = document.getElementById('mobPhoneModalClose');

  if (mobPhoneBtn && mobPhoneModal) {
    mobPhoneBtn.addEventListener('click', () => {
      mobPhoneModal.classList.add('open');
    });

    mobPhoneModalClose.addEventListener('click', () => {
      mobPhoneModal.classList.remove('open');
    });

    mobPhoneModal.addEventListener('click', (e) => {
      if (e.target === mobPhoneModal) mobPhoneModal.classList.remove('open');
    });
  }

  // -- Burger / Drawer menu --
  const mobBurger = document.getElementById('mobBurger');
  const mobMenuDrawer = document.getElementById('mobMenuDrawer');
  const mobMenuOverlay = document.getElementById('mobMenuOverlay');
  const mobMenuClose = document.getElementById('mobMenuClose');
  const mobMenuCallBtn = document.getElementById('mobMenuCallBtn');

  function openDrawer() {
    mobMenuDrawer.classList.add('open');
    mobMenuOverlay.classList.add('open');
    mobBurger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobMenuDrawer.classList.remove('open');
    mobMenuOverlay.classList.remove('open');
    mobBurger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobBurger) {
    mobBurger.addEventListener('click', () => {
      if (mobMenuDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (mobMenuClose) mobMenuClose.addEventListener('click', closeDrawer);
  if (mobMenuOverlay) mobMenuOverlay.addEventListener('click', closeDrawer);

  // "Заказать звонок" in mobile menu opens the main call modal
  if (mobMenuCallBtn) {
    mobMenuCallBtn.addEventListener('click', () => {
      closeDrawer();
      const callModal = document.getElementById('modal');
      if (callModal) callModal.style.display = 'flex';
    });
  }

  // -- Mobile header stays fixed on scroll (already handled by position:fixed in CSS) --
  // No extra JS needed; CSS position:fixed handles it.

})();

// =============================================
// "Читать еще" — разворачивает текст отзыва на мобиле
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.review-card p').forEach(p => {
      // Добавляем класс truncated для обрезки
      p.classList.add('truncated');

      // Кнопка "Читать еще"
      const btn = document.createElement('button');
      btn.className = 'read-more-btn';
      btn.textContent = 'Читать еще';
      p.after(btn);

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        p.classList.remove('truncated');
        btn.remove();
      });
    });
  }
});