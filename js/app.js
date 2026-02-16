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
