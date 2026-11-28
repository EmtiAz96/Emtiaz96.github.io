/* =========================================================
   EMTIAZ OFFICIAL — PREMIUM JAVASCRIPT
   FILE 3 / 3
   Complete Website Functionality
========================================================= */

"use strict";

/* =========================================================
   1. SELECT ELEMENTS
========================================================= */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const typingText = document.getElementById("typingText");
const welcomeVoiceBtn = document.getElementById("welcomeVoiceBtn");

const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


/* =========================================================
   2. DARK / LIGHT THEME
========================================================= */

function applyTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  body.classList.toggle(
    "light-theme",
    selectedTheme === "light"
  );

  if (themeToggle) {
    themeToggle.textContent =
      selectedTheme === "light" ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-label",
      selectedTheme === "light"
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    themeToggle.setAttribute(
      "title",
      selectedTheme === "light"
        ? "Dark Mode"
        : "Light Mode"
    );
  }

  try {
    localStorage.setItem("emtiaz-theme", selectedTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.");
  }
}

function initializeTheme() {
  let savedTheme = "dark";

  try {
    const storedTheme = localStorage.getItem("emtiaz-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      savedTheme = storedTheme;
    }
  } catch (error) {
    console.warn("Saved theme could not be accessed.");
  }

  applyTheme(savedTheme);
}

initializeTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const isLight = body.classList.contains("light-theme");

    applyTheme(isLight ? "dark" : "light");
  });
}


/* =========================================================
   3. MOBILE NAVIGATION
========================================================= */

function closeNavigation() {
  if (!navMenu || !menuToggle) return;

  navMenu.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.textContent = "☰";
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      closeNavigation();
    }
  });
}


/* =========================================================
   4. HERO TYPING ANIMATION
========================================================= */

if (typingText) {
  const typingWords = [
    "Programmer",
    "Web Developer",
    "Digital Creator",
    "Technology Enthusiast"
  ];

  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeAnimation() {
    const currentWord = typingWords[wordIndex];

    if (!deleting) {
      characterIndex++;

      typingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex === currentWord.length) {
        deleting = true;

        setTimeout(typeAnimation, 1500);
        return;
      }
    } else {
      characterIndex--;

      typingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex === 0) {
        deleting = false;

        wordIndex =
          (wordIndex + 1) % typingWords.length;
      }
    }

    setTimeout(
      typeAnimation,
      deleting ? 45 : 90
    );
  }

  typeAnimation();
}


/* =========================================================
   5. WELCOME VOICE
========================================================= */

if (welcomeVoiceBtn) {
  welcomeVoiceBtn.addEventListener("click", function () {
    if (!("speechSynthesis" in window)) {
      if (formMessage) {
        formMessage.textContent =
          "Voice feature is not supported by this browser.";
      }

      return;
    }

    window.speechSynthesis.cancel();

    const welcomeMessage = new SpeechSynthesisUtterance(
      "Welcome to Emtiaz Official. " +
      "I am Emtiaz, a programmer and web developer. " +
      "Thank you for visiting my website."
    );

    welcomeMessage.lang = "en-US";
    welcomeMessage.rate = 0.9;
    welcomeMessage.pitch = 1;
    welcomeMessage.volume = 1;

    window.speechSynthesis.speak(welcomeMessage);
  });
}


/* =========================================================
   6. AGE & BIRTHDAY COUNTER
========================================================= */

const birthdayDate = new Date(
  "2006-08-16T00:00:00+06:00"
);

const ageYears = document.getElementById("ageYears");
const ageDays = document.getElementById("ageDays");
const ageHours = document.getElementById("ageHours");
const ageMinutes = document.getElementById("ageMinutes");
const ageSeconds = document.getElementById("ageSeconds");

function updateAgeCounter() {
  const now = new Date();

  if (Number.isNaN(birthdayDate.getTime())) {
    return;
  }

  let years = now.getFullYear() - birthdayDate.getFullYear();

  const birthdayThisYear = new Date(
    now.getFullYear(),
    7,
    16,
    0,
    0,
    0
  );

  if (now < birthdayThisYear) {
    years--;
  }

  if (ageYears) {
    ageYears.textContent = Math.max(0, years);
  }

  const nextBirthdayYear =
    now < birthdayThisYear
      ? now.getFullYear()
      : now.getFullYear() + 1;

  const nextBirthday = new Date(
    nextBirthdayYear,
    7,
    16,
    0,
    0,
    0
  );

  const remainingMilliseconds =
    Math.max(0, nextBirthday.getTime() - now.getTime());

  const totalSeconds = Math.floor(
    remainingMilliseconds / 1000
  );

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  if (ageDays) {
    ageDays.textContent = days;
  }

  if (ageHours) {
    ageHours.textContent = hours;
  }

  if (ageMinutes) {
    ageMinutes.textContent = minutes;
  }

  if (ageSeconds) {
    ageSeconds.textContent = seconds;
  }
}

updateAgeCounter();

setInterval(updateAgeCounter, 1000);


/* =========================================================
   7. PROJECT DETAILS MODAL
========================================================= */

function openProjectModal(title, description) {
  if (
    !projectModal ||
    !modalTitle ||
    !modalDescription
  ) {
    return;
  }

  modalTitle.textContent = title;
  modalDescription.textContent = description;

  projectModal.classList.add("active");

  projectModal.setAttribute("aria-hidden", "false");

  body.style.overflow = "hidden";

  if (modalClose) {
    modalClose.focus();
  }
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("active");

  projectModal.setAttribute("aria-hidden", "true");

  body.style.overflow = "";
}

document.querySelectorAll(".project-details").forEach(
  function (button) {
    button.addEventListener("click", function () {
      const title =
        button.dataset.title || "Project Details";

      const description =
        button.dataset.description ||
        "More information about this project will be available soon.";

      openProjectModal(title, description);
    });
  }
);

if (modalClose) {
  modalClose.addEventListener(
    "click",
    closeProjectModal
  );
}

if (projectModal) {
  projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    projectModal &&
    projectModal.classList.contains("active")
  ) {
    closeProjectModal();
  }
});


/* =========================================================
   8. CONTACT FORM
========================================================= */

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput =
      document.getElementById("contactName");

    const emailInput =
      document.getElementById("contactEmail");

    const messageInput =
      document.getElementById("contactMessage");

    if (!nameInput || !emailInput || !messageInput) {
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      if (formMessage) {
        formMessage.textContent =
          "Please complete all fields.";
      }

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      if (formMessage) {
        formMessage.textContent =
          "Please enter a valid email address.";
      }

      emailInput.focus();
      return;
    }

    const subject = encodeURIComponent(
      "Website Message from " + name
    );

    const emailBody = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\nMessage:\n" + message
    );

    const mailtoLink =
      "mailto:mdemtiaz36900@gmail.com" +
      "?subject=" + subject +
      "&body=" + emailBody;

    if (formMessage) {
      formMessage.textContent =
        "Opening your email application...";
    }

    window.location.href = mailtoLink;
  });
}


/* =========================================================
   9. SCROLL PROGRESS & BACK TO TOP
========================================================= */

function updateScrollElements() {
  const scrollTop =
    window.scrollY || document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress =
    scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

  if (scrollProgress) {
    scrollProgress.style.width =
      Math.min(100, Math.max(0, progress)) + "%";
  }

  if (backToTop) {
    backToTop.classList.toggle(
      "show",
      scrollTop > 450
    );
  }
}

window.addEventListener(
  "scroll",
  updateScrollElements,
  { passive: true }
);

updateScrollElements();

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* =========================================================
   10. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".scroll-reveal"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   12. IMAGE ERROR HANDLING
   No letter or "E" fallback is added.
========================================================= */

document.querySelectorAll("img").forEach(
  function (image) {
    image.addEventListener("error", function () {
      image.classList.add("image-unavailable");
    });
  }
);


/* =========================================================
   13. INITIAL PAGE SETUP
========================================================= */

if (projectModal) {
  projectModal.setAttribute("aria-hidden", "true");
}

if (menuToggle) {
  menuToggle.setAttribute("aria-expanded", "false");
}

console.log(
  "Emtiaz Official — Premium website initialized successfully."
);
