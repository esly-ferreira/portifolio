'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "todos") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// portfolio lightbox (logos, edições, cartões)
const portfolioLightboxCategories = new Set(["logos", "edições", "cartões"]);
const portfolioLightbox = document.querySelector("[data-portfolio-lightbox]");
const portfolioLightboxImg = document.querySelector("[data-portfolio-lightbox-img]");
const portfolioLightboxTitle = document.querySelector("[data-portfolio-lightbox-title]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const carouselMeta = document.querySelector("[data-carousel-meta]");
const carouselHint = document.querySelector("[data-carousel-hint]");

let portfolioCarouselSlides = null;
let portfolioCarouselIndex = 0;
let portfolioCarouselAlt = "";
let portfolioCarouselTitle = "";

const portfolioCarouselHideChrome = function () {
  portfolioCarouselSlides = null;
  portfolioCarouselIndex = 0;
  if (carouselPrev) {
    carouselPrev.hidden = true;
    carouselPrev.disabled = false;
  }
  if (carouselNext) {
    carouselNext.hidden = true;
    carouselNext.disabled = false;
  }
  if (carouselMeta) {
    carouselMeta.hidden = true;
    carouselMeta.textContent = "";
  }
  if (carouselHint) {
    carouselHint.hidden = true;
  }
  if (portfolioLightbox) {
    portfolioLightbox.classList.remove("portfolio-lightbox--carousel");
  }
};

const portfolioCarouselApplySlide = function () {
  if (!portfolioLightboxImg || !portfolioCarouselSlides || portfolioCarouselSlides.length === 0) { return; }
  portfolioLightboxImg.src = portfolioCarouselSlides[portfolioCarouselIndex];
  portfolioLightboxImg.alt = portfolioCarouselAlt;
  if (carouselMeta) {
    carouselMeta.textContent = (portfolioCarouselIndex + 1) + " / " + portfolioCarouselSlides.length;
  }
};

const portfolioCarouselShowChrome = function () {
  if (!portfolioCarouselSlides || portfolioCarouselSlides.length < 2) { return; }
  if (carouselPrev) { carouselPrev.hidden = false; }
  if (carouselNext) { carouselNext.hidden = false; }
  if (carouselMeta) { carouselMeta.hidden = false; }
  if (carouselHint) { carouselHint.hidden = false; }
  if (portfolioLightbox) {
    portfolioLightbox.classList.add("portfolio-lightbox--carousel");
  }
  portfolioCarouselApplySlide();
};

const portfolioCarouselStep = function (delta) {
  if (!portfolioCarouselSlides || portfolioCarouselSlides.length < 2) { return; }
  const len = portfolioCarouselSlides.length;
  portfolioCarouselIndex = (portfolioCarouselIndex + delta + len) % len;
  portfolioCarouselApplySlide();
};

const portfolioLightboxOpen = function (src, alt, title, slides) {
  if (!portfolioLightbox || !portfolioLightboxImg) { return; }
  portfolioCarouselHideChrome();

  if (slides && slides.length >= 2) {
    portfolioCarouselSlides = slides;
    portfolioCarouselIndex = 0;
    portfolioCarouselAlt = alt || "";
    portfolioCarouselTitle = title || "";
    if (portfolioLightboxTitle) {
      portfolioLightboxTitle.textContent = portfolioCarouselTitle;
    }
    portfolioCarouselShowChrome();
  } else {
    portfolioLightboxImg.src = src;
    portfolioLightboxImg.alt = alt || "";
    if (portfolioLightboxTitle) {
      portfolioLightboxTitle.textContent = title || "";
    }
  }

  portfolioLightbox.classList.add("active");
  portfolioLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const portfolioLightboxClose = function () {
  if (!portfolioLightbox || !portfolioLightboxImg) { return; }
  portfolioLightbox.classList.remove("active");
  portfolioLightbox.setAttribute("aria-hidden", "true");
  portfolioLightboxImg.src = "";
  portfolioCarouselHideChrome();
  document.body.style.overflow = "";
};

if (portfolioLightbox && portfolioLightboxImg) {
  const closeTriggers = portfolioLightbox.querySelectorAll("[data-portfolio-lightbox-close]");
  for (let i = 0; i < closeTriggers.length; i++) {
    closeTriggers[i].addEventListener("click", portfolioLightboxClose);
  }

  if (carouselPrev) {
    carouselPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      portfolioCarouselStep(-1);
    });
  }
  if (carouselNext) {
    carouselNext.addEventListener("click", function (e) {
      e.stopPropagation();
      portfolioCarouselStep(1);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!portfolioLightbox.classList.contains("active")) { return; }
    if (e.key === "Escape") {
      portfolioLightboxClose();
      return;
    }
    if (portfolioCarouselSlides && portfolioCarouselSlides.length >= 2) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        portfolioCarouselStep(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        portfolioCarouselStep(1);
      }
    }
  });

  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    const cat = item.dataset.category;
    if (!portfolioLightboxCategories.has(cat)) { continue; }

    const link = item.querySelector("a");
    if (!link) { continue; }

    link.addEventListener("click", function (e) {
      e.preventDefault();
      const thumb = item.querySelector(".project-img img");
      const titleEl = item.querySelector(".project-title");
      if (!thumb) { return; }
      const titleText = titleEl ? titleEl.textContent.trim() : "";
      const slidesRaw = item.dataset.carouselSlides;
      let slides = null;
      if (slidesRaw) {
        slides = slidesRaw.split("|").map(function (s) { return s.trim(); }).filter(Boolean);
      }
      if (slides && slides.length >= 2) {
        portfolioLightboxOpen("", thumb.alt, titleText, slides);
      } else if (slides && slides.length === 1) {
        portfolioLightboxOpen(slides[0], thumb.alt, titleText, null);
      } else {
        portfolioLightboxOpen(thumb.src, thumb.alt, titleText, null);
      }
    });
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}