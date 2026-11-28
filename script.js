/* =====================================================
   EMTIAZ OFFICIAL — PREMIUM SCRIPT.JS
   STEP 3 / 3
===================================================== */

"use strict";

/* =========================================
   1. THEME SYSTEM
========================================= */

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");

  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
  }
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("emtiaz-theme") || "dark";
} catch (error) {
  savedTheme = "dark";
}

applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";

    applyTheme(newTheme);

    try {
      localStorage.setItem("emtiaz-theme", newTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved.");
    }
  });
}

/* =========================================
   2. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

/* =========================================
   3. TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typingText");

if (typingText) {
  const phrases = [
    "Programmer",
    "Web Developer",
    "Digital Creator",
    "Technology Enthusiast"
  ];

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (deleting) {
      characterIndex--;
    } else {
      characterIndex++;
    }

    typingText.textContent = currentPhrase.substring(
      0,
      characterIndex
    );

    let delay = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentPhrase.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    window.setTimeout(typeEffect, delay);
  }

  typeEffect();
}

/* =========================================
   4. WELCOME VOICE
========================================= */

const voiceButton = document.getElementById("voiceButton");

if (voiceButton) {
  voiceButton.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support voice greetings.");
      return;
    }

    window.speechSynthesis.cancel();

    const greeting = new SpeechSynthesisUtterance(
      "Welcome to Emtiaz website."
    );

    greeting.lang = "en-US";
    greeting.rate = 0.9;
    greeting.pitch = 1;

    window.speechSynthesis.speak(greeting);
  });
}

/* =========================================
   5. LIVE AGE COUNTER
========================================= */

const birthDate = new Date("2006-08-16T00:00:00+06:00");

const ageYears = document.getElementById("ageYears");
const ageDays = document.getElementById("ageDays");
const ageHours = document.getElementById("ageHours");
const ageMinutes = document.getElementById("ageMinutes");
const ageSeconds = document.getElementById("ageSeconds");

function updateAge() {
  const now = new Date();
  const difference = now.getTime() - birthDate.getTime();

  if (difference < 0) return;

  let years = now.getUTCFullYear() - 2006;

  const currentMonth = now.getUTCMonth();
  const currentDay = now.getUTCDate();

  if (
    currentMonth < 7 ||
    (currentMonth === 7 &&
      (currentDay < 16 ||
        (currentDay === 16 &&
          now.getUTCHours() < 18)))
  ) {
    years--;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (ageYears) ageYears.textContent = years;
  if (ageDays) ageDays.textContent = days;
  if (ageHours) ageHours.textContent = hours;
  if (ageMinutes) ageMinutes.textContent = minutes;
  if (ageSeconds) ageSeconds.textContent = seconds;
}

updateAge();
window.setInterval(updateAge, 1000);

/* =========================================
   6. NEXT BIRTHDAY COUNTDOWN
========================================= */

function updateBirthdayCountdown() {
  const now = new Date();

  let nextBirthday = new Date(
    now.getUTCFullYear(),
    7,
    16,
    18,
    0,
    0
  );

  if (nextBirthday.getTime() <= now.getTime()) {
    nextBirthday = new Date(
      now.getUTCFullYear() + 1,
      7,
      16,
      18,
      0,
      0
    );
  }

  const remaining = nextBirthday.getTime() - now.getTime();

  const countdownDays = document.getElementById("countdownDays");
  const countdownHours = document.getElementById("countdownHours");
  const countdownMinutes = document.getElementById("countdownMinutes");
  const countdownSeconds = document.getElementById("countdownSeconds");

  if (remaining < 0) return;

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  if (countdownDays) countdownDays.textContent = days;
  if (countdownHours) countdownHours.textContent = hours;
  if (countdownMinutes) countdownMinutes.textContent = minutes;
  if (countdownSeconds) countdownSeconds.textContent = seconds;
}

updateBirthdayCountdown();
window.setInterval(updateBirthdayCountdown, 1000);

/* =========================================
   7. PROJECT DETAILS MODAL
========================================= */

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

function closeProjectModal() {
  if (projectModal) {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

document.querySelectorAll(".project-details").forEach((button) => {
  button.addEventListener("click", () => {
    if (!projectModal) return;

    const title = button.dataset.title || "Project Details";
    const description =
      button.dataset.description || "More information coming soon.";

    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;

    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

/* =========================================
   8. CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName")?.value.trim();
    const email = document.getElementById("contactEmail")?.value.trim();
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !email || !message) {
      if (formMessage) {
        formMessage.textContent = "Please fill in all fields.";
      }
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      if (formMessage) {
        formMessage.textContent = "Please enter a valid email address.";
      }
      return;
    }

    const subject = encodeURIComponent(
      "Website Message from " + name
    );

    const body = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\nMessage:\n" + message
    );

    if (formMessage) {
      formMessage.textContent =
        "Your email application is opening. Please send the message there.";
    }

    window.location.href =
      "mailto:mdemtiaz36900@gmail.com?subject=" +
      subject +
      "&body=" +
      body;
  });
}

/* =========================================
   9. SCROLL PROGRESS
========================================= */

let scrollProgress = document.querySelector(".scroll-progress");

if (!scrollProgress) {
  scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  document.body.prepend(scrollProgress);
}

function updateScrollProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

  scrollProgress.style.width = progress + "%";
}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

updateScrollProgress();

/* =========================================
   10. BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
  if (!backToTop) return;

  backToTop.classList.toggle("show", window.scrollY > 400);
}

window.addEventListener("scroll", updateBackToTop, {
  passive: true
});

updateBackToTop();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================================
   11. SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".scroll-reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================================
   12. IMAGE ERROR HANDLING
========================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-unavailable");
    console.warn("Image could not be loaded:", image.getAttribute("src"));
  });
});

/* =========================================
   13. CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================
   14. CONSOLE MESSAGE
========================================= */

console.log(
  "%c EMTIAZ OFFICIAL ",
  "background:#00d4ff;color:#06101c;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:6px;"
);

console.log(
  "%c Welcome to Emtiaz Official Website!",
  "color:#00ffa3;font-size:13px;font-weight:bold;"
);
