/* =========================================================
   EMTIAZ OFFICIAL — SIGNATURE LUXURY EDITION
   COMPLETE SCRIPT.JS
========================================================= */

"use strict";

/* =========================
   ELEMENTS
========================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

/* =========================
   CURRENT YEAR
========================= */

const currentYear = $("#currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================
   THEME SYSTEM
========================= */

const themeToggle = $("#themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "☾" : "☼";
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  }
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("emtiaz-theme") || "dark";
} catch {
  savedTheme = "dark";
}

setTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  setTheme(nextTheme);

  try {
    localStorage.setItem("emtiaz-theme", nextTheme);
  } catch {
    // Theme still works for this page session.
  }
});

/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");

function closeMenu() {
  navMenu?.classList.remove("active");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.toggle("active") || false;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

$$(".nav-menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", event => {
  if (
    navMenu &&
    menuToggle &&
    !navMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

/* =========================
   TYPING ANIMATION
========================= */

const typingText = $("#typingText");

if (typingText) {
  const words = [
    "Programmer",
    "Web Developer",
    "Digital Creator",
    "Technology Explorer"
  ];

  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      characterIndex++;

      typingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      characterIndex--;

      typingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 55 : 105);
  }

  typeEffect();
}

/* =========================
   WELCOME VOICE
========================= */

const welcomeVoiceBtn = $("#welcomeVoiceBtn");

welcomeVoiceBtn?.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    welcomeVoiceBtn.textContent = "Voice not supported";
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(
    "Welcome to Emtiaz Official. I am Emtiaz. Welcome to my digital world."
  );

  message.lang = "en-US";
  message.rate = 0.9;
  message.pitch = 1;

  window.speechSynthesis.speak(message);
});

/* =========================
   BIRTHDAY & AGE COUNTER
========================= */

const birthday = new Date("2006-08-16T00:00:00+06:00");

const ageYears = $("#ageYears");
const ageDays = $("#ageDays");
const ageHours = $("#ageHours");
const ageMinutes = $("#ageMinutes");
const ageSeconds = $("#ageSeconds");

function updateAgeCounter() {
  const now = new Date();

  if (now < birthday) return;

  let years = now.getFullYear() - birthday.getFullYear();

  const birthdayThisYear = new Date(
    now.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
    0, 0, 0
  );

  if (now < birthdayThisYear) {
    years--;
  }

  const lastBirthday = new Date(
    birthday.getFullYear() + years,
    birthday.getMonth(),
    birthday.getDate()
  );

  const nextBirthday = new Date(
    birthday.getFullYear() + years + 1,
    birthday.getMonth(),
    birthday.getDate()
  );

  const elapsed = now - lastBirthday;
  const remaining = nextBirthday - now;

  const days = Math.floor(elapsed / 86400000);
  const hours = Math.floor((elapsed % 86400000) / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);

  if (ageYears) ageYears.textContent = years;
  if (ageDays) ageDays.textContent = days;
  if (ageHours) ageHours.textContent = hours;
  if (ageMinutes) ageMinutes.textContent = minutes;
  if (ageSeconds) ageSeconds.textContent = seconds;

  const agePanel = $(".age-panel");

  if (agePanel) {
    agePanel.setAttribute(
      "title",
      `${Math.floor(remaining / 86400000)} days until next birthday`
    );
  }
}

updateAgeCounter();
setInterval(updateAgeCounter, 1000);

/* =========================
   PROJECT MODAL
========================= */

const projectModal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalClose = $("#modalClose");

function openProjectModal(title, description) {
  if (!projectModal) return;

  if (modalTitle) modalTitle.textContent = title;
  if (modalDescription) modalDescription.textContent = description;

  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalClose?.focus();
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$$(".project-details").forEach(button => {
  button.addEventListener("click", () => {
    openProjectModal(
      button.dataset.title || "Project Details",
      button.dataset.description || "More information coming soon."
    );
  });
});

modalClose?.addEventListener("click", closeProjectModal);

projectModal?.addEventListener("click", event => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProjectModal();
    closeMenu();
  }
});

/* =========================
   CONTACT FORM
========================= */

const contactForm = $("#contactForm");
const formMessage = $("#formMessage");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#contactName")?.value.trim();
  const email = $("#contactEmail")?.value.trim();
  const message = $("#contactMessage")?.value.trim();

  if (!name || !email || !message) {
    if (formMessage) {
      formMessage.textContent = "Please complete all fields.";
    }
    return;
  }

  const subject = encodeURIComponent(
    `Website message from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  const mailto =
    `mailto:mdemtiaz36900@gmail.com?subject=${subject}&body=${body}`;

  if (formMessage) {
    formMessage.textContent =
      "Opening your email application...";
  }

  window.location.href = mailto;
});

/* =========================
   BACK TO TOP
========================= */

const backToTop = $("#backToTop");

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   SCROLL PROGRESS
========================= */

const scrollProgress = $(".scroll-progress");

function updateScrollEffects() {
  const scrollTop = window.scrollY;

  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  backToTop?.classList.toggle("show", scrollTop > 450);
}

window.addEventListener("scroll", updateScrollEffects, {
  passive: true
});

updateScrollEffects();

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = $$(".scroll-reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

/* =========================
   IMAGE FALLBACK
========================= */

$$("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";

    const fallback = img.nextElementSibling;

    if (fallback?.classList.contains("image-fallback")) {
      fallback.style.display = "grid";
    }
  });
});

/* =========================
   ACTIVE NAVIGATION
========================= */

const pageSections = $$("main section[id]");
const navLinks = $$(".nav-menu a[href^='#']");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  pageSections.forEach(section => {
    sectionObserver.observe(section);
  });
}

/* =========================
   ACCESSIBILITY
========================= */

document.addEventListener("keydown", event => {
  if (event.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("pointerdown", () => {
  document.body.classList.remove("keyboard-navigation");
});

/* =========================
   INITIALIZATION
========================= */

document.documentElement.classList.add("js-enabled");

console.log("Emtiaz Official — Signature Luxury Edition loaded.");
