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

document.querySelectorAll(".category").forEach(item => {
  item.addEventListener("click", () => {
    const categoryName = item.textContent.trim();
    window.location.href = `/catalog?category=${encodeURIComponent(categoryName)}`;
  });
});

// Modal pentru "Еще"
const categoriesModal = document.getElementById("categoriesModal");
const closeCategories = document.getElementById("closeCategories");
const moreBtn = document.querySelector(".more");
const allCategoriesList = document.getElementById("allCategories");

moreBtn.addEventListener("click", () => {
  allCategoriesList.innerHTML = "";
  document.querySelectorAll(".category").forEach(el => {
    const li = document.createElement("li");
    li.textContent = el.textContent;
    allCategoriesList.appendChild(li);
  });
  categoriesModal.style.display = "block";
});

closeCategories.addEventListener("click", () => {
  categoriesModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === categoriesModal) {
    categoriesModal.style.display = "none";
  }
});

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


// Click pe card
document.querySelectorAll(".excursion-card").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = card.dataset.link;
  });
});

// Click pe buton rezervare
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".excursion-card");
    window.location.href = card.dataset.link;
  });
});

// Show more
document.getElementById("showMore").addEventListener("click", () => {
  window.location.href = "/catalog";
});


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

function renderSchedule(){
  const day = currentDate.getDate().toString().padStart(2,"0");
  const month = (currentDate.getMonth()+1).toString().padStart(2,"0");
  const year = currentDate.getFullYear();

  selectedDateText.textContent = `${day}.${month}.${year}, ${daysRu[currentDate.getDay()]}`;

  scheduleList.innerHTML = "";

  for(let i = 0; i < 9; i++) {

  const hour = (9 + i).toString().padStart(2, "0");

  const item = document.createElement("div");
  item.className = "schedule-item";
  item.onclick = () => window.location.href = "/excursion.html";

  item.innerHTML = `
    <div class="time">${hour}:00</div>
    <div>
      <div class="schedule-title">Экскурсия пример ${i+1}</div>
      <div style="color:#888;font-size:16px">Автобусная, 4 часа</div>
    </div>
    <div class="price">от ${2000 + i * 300} ₽ →</div>
  `;

  scheduleList.appendChild(item);
}
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
  window.location.href="/schedule.html";
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