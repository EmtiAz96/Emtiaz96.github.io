/* =========================================================
   EMTIAZ OFFICIAL — PREMIUM JAVASCRIPT
   STEP 3 / 3 — COMPLETE SCRIPT.JS
========================================================= */

"use strict";

/* =========================================================
   1. SAFE ELEMENT SELECTOR
========================================================= */

const $ = (selector) => document.querySelector(selector);

const elements = {
  dhakaDay: $("#dhakaDay"),
  dhakaDate: $("#dhakaDate"),
  dhakaTime: $("#dhakaTime"),

  jummaSection: $("#jummaSection"),

  ageYears: $("#ageYears"),
  ageDays: $("#ageDays"),
  ageHours: $("#ageHours"),
  ageMinutes: $("#ageMinutes"),
  ageSeconds: $("#ageSeconds"),

  countdownDays: $("#countdownDays"),
  countdownHours: $("#countdownHours"),
  countdownMinutes: $("#countdownMinutes"),
  countdownSeconds: $("#countdownSeconds"),

  currentYear: $("#currentYear"),

  themeToggle: $("#themeToggle"),
  menuToggle: $("#menuToggle"),
  navMenu: $("#navMenu"),

  typingText: $("#typingText"),

  maleVoiceButton: $("#maleVoiceButton"),
  femaleVoiceButton: $("#femaleVoiceButton"),
  voiceButton: $("#voiceButton"),
  voiceStatus: $("#voiceStatus"),

  projectModal: $("#projectModal"),
  modalTitle: $("#modalTitle"),
  modalDescription: $("#modalDescription"),
  modalClose: $("#modalClose"),

  contactForm: $("#contactForm"),
  contactName: $("#contactName"),
  contactEmail: $("#contactEmail"),
  contactMessage: $("#contactMessage"),
  formMessage: $("#formMessage"),

  backToTop: $("#backToTop"),
  scrollProgress: $(".scroll-progress")
};


/* =========================================================
   2. BANGLADESH TIME
========================================================= */

const DHAKA_TIME_ZONE = "Asia/Dhaka";

const dhakaDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DHAKA_TIME_ZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: "h23"
});

const dhakaDayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DHAKA_TIME_ZONE,
  weekday: "long"
});

const dhakaDateDisplayFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: DHAKA_TIME_ZONE,
  day: "2-digit",
  month: "long",
  year: "numeric"
});

const dhakaTimeDisplayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DHAKA_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});


/* Get exact Bangladesh calendar information */

function getDhakaParts(date = new Date()) {
  const parts = dhakaDateFormatter.formatToParts(date);

  const result = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      result[part.type] = part.value;
    }
  });

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day),
    weekday: result.weekday,
    hour: Number(result.hour),
    minute: Number(result.minute),
    second: Number(result.second)
  };
}


/* Convert Bangladesh local time to UTC timestamp */

function dhakaToUTC(year, month, day, hour = 0, minute = 0, second = 0) {
  return Date.UTC(
    year,
    month - 1,
    day,
    hour - 6,
    minute,
    second
  );
}


/* Update clock and Friday greeting */

function updateDhakaClock() {
  const now = new Date();

  const parts = getDhakaParts(now);

  if (elements.dhakaDay) {
    elements.dhakaDay.textContent = parts.weekday;
  }

  if (elements.dhakaDate) {
    elements.dhakaDate.textContent =
      dhakaDateDisplayFormatter.format(now);
  }

  if (elements.dhakaTime) {
    elements.dhakaTime.textContent =
      dhakaTimeDisplayFormatter.format(now);
  }

  if (elements.jummaSection) {
    const isFriday = parts.weekday === "Friday";

    elements.jummaSection.hidden = !isFriday;
  }
}


/* Update immediately and every second */

updateDhakaClock();

setInterval(updateDhakaClock, 1000);


/* =========================================================
   3. AGE COUNTER
========================================================= */

/*
  Date of Birth:
  16 August 2006
  12:00 AM
  Bangladesh Time (UTC+6)
*/

const birthTimestamp = dhakaToUTC(
  2006,
  8,
  16,
  0,
  0,
  0
);


function updateAgeCounter() {
  const now = new Date();

  const nowTimestamp = now.getTime();

  const parts = getDhakaParts(now);

  let age = parts.year - 2006;

  const birthdayPassed =
    parts.month > 8 ||
    (parts.month === 8 && parts.day >= 16);

  if (!birthdayPassed) {
    age--;
  }

  if (elements.ageYears) {
    elements.ageYears.textContent = Math.max(0, age);
  }

  const elapsedMilliseconds = Math.max(
    0,
    nowTimestamp - birthTimestamp
  );

  const totalSeconds = Math.floor(
    elapsedMilliseconds / 1000
  );

  const totalDays = Math.floor(
    totalSeconds / 86400
  );

  const remainingHours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const remainingMinutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const remainingSeconds = totalSeconds % 60;

  if (elements.ageDays) {
    elements.ageDays.textContent =
      totalDays.toLocaleString("en-US");
  }

  if (elements.ageHours) {
    elements.ageHours.textContent = remainingHours;
  }

  if (elements.ageMinutes) {
    elements.ageMinutes.textContent = remainingMinutes;
  }

  if (elements.ageSeconds) {
    elements.ageSeconds.textContent = remainingSeconds;
  }
}


/* =========================================================
   4. NEXT BIRTHDAY COUNTDOWN
========================================================= */

function updateBirthdayCountdown() {
  const now = new Date();

  const parts = getDhakaParts(now);

  let nextBirthdayYear = parts.year;

  const birthdayThisYear = dhakaToUTC(
    parts.year,
    8,
    16
  );

  if (now.getTime() >= birthdayThisYear) {
    nextBirthdayYear++;
  }

  const nextBirthday = dhakaToUTC(
    nextBirthdayYear,
    8,
    16
  );

  const difference = Math.max(
    0,
    nextBirthday - now.getTime()
  );

  const totalSeconds = Math.floor(
    difference / 1000
  );

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  if (elements.countdownDays) {
    elements.countdownDays.textContent = days;
  }

  if (elements.countdownHours) {
    elements.countdownHours.textContent = hours;
  }

  if (elements.countdownMinutes) {
    elements.countdownMinutes.textContent = minutes;
  }

  if (elements.countdownSeconds) {
    elements.countdownSeconds.textContent = seconds;
  }
}


/* =========================================================
   5. UPDATE AGE AND BIRTHDAY
========================================================= */

function updatePersonalTime() {
  updateAgeCounter();
  updateBirthdayCountdown();
}

updatePersonalTime();

setInterval(updatePersonalTime, 1000);


/* =========================================================
   6. CURRENT YEAR
========================================================= */

if (elements.currentYear) {
  elements.currentYear.textContent =
    getDhakaParts().year;
}


/* =========================================================
   7. DARK / LIGHT THEME
========================================================= */

const THEME_STORAGE_KEY = "emtiaz-theme";


function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}


function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Theme will still work without storage.
  }
}


function applyTheme(theme) {
  const isLight = theme === "light";

  document.body.classList.toggle(
    "light-theme",
    isLight
  );

  if (elements.themeToggle) {
    elements.themeToggle.textContent =
      isLight ? "☀️" : "🌙";

    elements.themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }
}


const savedTheme = getSavedTheme();

applyTheme(
  savedTheme === "light" ? "light" : "dark"
);


if (elements.themeToggle) {
  elements.themeToggle.addEventListener("click", () => {
    const isCurrentlyLight =
      document.body.classList.contains("light-theme");

    const newTheme = isCurrentlyLight ? "dark" : "light";

    applyTheme(newTheme);
    saveTheme(newTheme);
  });
}


/* =========================================================
   8. MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {
  if (!elements.navMenu || !elements.menuToggle) {
    return;
  }

  elements.navMenu.classList.remove("active");

  elements.menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  elements.menuToggle.textContent = "☰";
}


if (elements.menuToggle && elements.navMenu) {
  elements.menuToggle.addEventListener("click", () => {
    const isOpen =
      elements.navMenu.classList.toggle("active");

    elements.menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    elements.menuToggle.textContent =
      isOpen ? "✕" : "☰";
  });

  elements.navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu =
      elements.navMenu.contains(event.target);

    const clickedToggle =
      elements.menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      closeMobileMenu();
    }
  });
}


/* =========================================================
   9. TYPING ANIMATION
========================================================= */

const typingWords = [
  "Programmer",
  "Web Developer",
  "Digital Creator",
  "Technology Enthusiast",
  "Future Software Developer"
];

let typingWordIndex = 0;
let typingCharacterIndex = 0;
let isDeleting = false;


function runTypingAnimation() {
  const target = elements.typingText;

  if (!target) {
    return;
  }

  const currentWord = typingWords[typingWordIndex];

  if (isDeleting) {
    typingCharacterIndex--;
  } else {
    typingCharacterIndex++;
  }

  target.textContent = currentWord.substring(
    0,
    typingCharacterIndex
  );

  let delay = isDeleting ? 45 : 95;

  if (!isDeleting &&
      typingCharacterIndex === currentWord.length) {

    isDeleting = true;
    delay = 1500;

  } else if (isDeleting && typingCharacterIndex === 0) {

    isDeleting = false;

    typingWordIndex =
      (typingWordIndex + 1) % typingWords.length;

    delay = 350;
  }

  setTimeout(runTypingAnimation, delay);
}


if (elements.typingText) {
  runTypingAnimation();
}


/* =========================================================
   10. VOICE GREETING
========================================================= */

/*
  Voice selection uses voices available in the visitor's
  browser/device.

  Gender identification is not guaranteed by browsers.
  The code uses voice-name hints when available.
*/

let selectedVoiceType = "male";

let availableVoices = [];

const speechSupported =
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;


function loadAvailableVoices() {
  if (!speechSupported) {
    return;
  }

  availableVoices =
    window.speechSynthesis.getVoices() || [];
}


function findGreetingVoice(type) {
  if (!availableVoices.length) {
    return null;
  }

  const englishVoices = availableVoices.filter((voice) => {
    return voice.lang &&
      voice.lang.toLowerCase().startsWith("en");
  });

  const pool = englishVoices.length
    ? englishVoices
    : availableVoices;

  const maleHints = [
    "male",
    "david",
    "mark",
    "guy",
    "daniel",
    "james",
    "alex",
    "tom"
  ];

  const femaleHints = [
    "female",
    "zira",
    "samantha",
    "victoria",
    "karen",
    "aria",
    "jenny",
    "susan"
  ];

  const hints =
    type === "male" ? maleHints : femaleHints;

  const matchedVoice = pool.find((voice) => {
    const name = voice.name.toLowerCase();

    return hints.some((hint) => name.includes(hint));
  });

  return matchedVoice || pool[0] || null;
}


if (speechSupported) {
  loadAvailableVoices();

  window.speechSynthesis.addEventListener(
    "voiceschanged",
    loadAvailableVoices
  );
}


function selectVoice(type) {
  selectedVoiceType = type;

  const isMale = type === "male";

  if (elements.maleVoiceButton) {
    elements.maleVoiceButton.classList.toggle(
      "active",
      isMale
    );

    elements.maleVoiceButton.setAttribute(
      "aria-pressed",
      String(isMale)
    );
  }

  if (elements.femaleVoiceButton) {
    elements.femaleVoiceButton.classList.toggle(
      "active",
      !isMale
    );

    elements.femaleVoiceButton.setAttribute(
      "aria-pressed",
      String(!isMale)
    );
  }

  if (elements.voiceStatus) {
    elements.voiceStatus.textContent =
      isMale
        ? "Male voice selected. Press play to listen."
        : "Female voice selected. Press play to listen.";
  }
}


if (elements.maleVoiceButton) {
  elements.maleVoiceButton.addEventListener("click", () => {
    selectVoice("male");
  });
}


if (elements.femaleVoiceButton) {
  elements.femaleVoiceButton.addEventListener("click", () => {
    selectVoice("female");
  });
}


/* Speak greeting after visitor presses the button */

function playWelcomeGreeting() {
  if (!speechSupported) {
    if (elements.voiceStatus) {
      elements.voiceStatus.textContent =
        "Sorry, your browser does not support voice greeting.";
    }

    return;
  }

  loadAvailableVoices();

  window.speechSynthesis.cancel();

  const voice = findGreetingVoice(selectedVoiceType);

  const parts = getDhakaParts();

  let greetingText = "Welcome to Emtiaz website.";

  if (parts.weekday === "Friday") {
    greetingText += " Jummah Mubarak.";
  }

  const utterance = new SpeechSynthesisUtterance(
    greetingText
  );

  utterance.lang = voice ? voice.lang : "en-US";

  utterance.rate =
    selectedVoiceType === "male" ? 1.18 : 1.0;

  utterance.pitch =
    selectedVoiceType === "male" ? 0.92 : 1.08;

  utterance.volume = 1;

  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    if (elements.voiceStatus) {
      elements.voiceStatus.textContent =
        "Playing welcome greeting...";
    }

    if (elements.voiceButton) {
      elements.voiceButton.textContent =
        "■ Stop Greeting";
    }
  };

  utterance.onend = () => {
    if (elements.voiceStatus) {
      elements.voiceStatus.textContent =
        "Greeting finished. Welcome to Emtiaz Official!";
    }

    if (elements.voiceButton) {
      elements.voiceButton.textContent =
        "▶ Play Welcome Greeting";
    }
  };

  utterance.onerror = () => {
    if (elements.voiceStatus) {
      elements.voiceStatus.textContent =
        "Voice could not be played. Please try again.";
    }

    if (elements.voiceButton) {
      elements.voiceButton.textContent =
        "▶ Play Welcome Greeting";
    }
  };

  window.speechSynthesis.speak(utterance);
}


if (elements.voiceButton) {
  elements.voiceButton.addEventListener("click", () => {
    if (!speechSupported) {
      playWelcomeGreeting();
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();

      elements.voiceButton.textContent =
        "▶ Play Welcome Greeting";

      if (elements.voiceStatus) {
        elements.voiceStatus.textContent =
          "Greeting stopped.";
      }

      return;
    }

    playWelcomeGreeting();
  });
}


/* Default selection */

selectVoice("male");


/* =========================================================
   11. PROJECT DETAILS MODAL
========================================================= */

const projectButtons = document.querySelectorAll(
  ".project-details"
);


function openProjectModal(title, description) {
  if (!elements.projectModal) {
    return;
  }

  if (elements.modalTitle) {
    elements.modalTitle.textContent = title;
  }

  if (elements.modalDescription) {
    elements.modalDescription.textContent = description;
  }

  elements.projectModal.classList.add("active");

  document.body.style.overflow = "hidden";

  if (elements.modalClose) {
    elements.modalClose.focus();
  }
}


function closeProjectModal() {
  if (!elements.projectModal) {
    return;
  }

  elements.projectModal.classList.remove("active");

  document.body.style.overflow = "";
}


projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.dataset.title || "Project Details";

    const description =
      button.dataset.description || "No details available.";

    openProjectModal(title, description);
  });
});


if (elements.modalClose) {
  elements.modalClose.addEventListener(
    "click",
    closeProjectModal
  );
}


if (elements.projectModal) {
  elements.projectModal.addEventListener("click", (event) => {
    if (event.target === elements.projectModal) {
      closeProjectModal();
    }
  });
}


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
    closeMobileMenu();
  }
});


/* =========================================================
   12. CONTACT FORM
========================================================= */

/*
  This is a mailto-based form.
  It opens the visitor's email application.
  It does not store messages on the website.
*/

if (elements.contactForm) {
  elements.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = elements.contactName?.value.trim() || "";
    const email = elements.contactEmail?.value.trim() || "";
    const message =
      elements.contactMessage?.value.trim() || "";

    if (!name || !email || !message) {
      if (elements.formMessage) {
        elements.formMessage.textContent =
          "Please complete all fields.";
      }

      return;
    }

    if (!elements.contactEmail.checkValidity()) {
      if (elements.formMessage) {
        elements.formMessage.textContent =
          "Please enter a valid email address.";
      }

      return;
    }

    const subject = encodeURIComponent(
      "Website message from " + name
    );

    const body = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\nMessage:\n" + message
    );

    const mailtoLink =
      "mailto:mdemtiaz36900@gmail.com" +
      "?subject=" + subject +
      "&body=" + body;

    if (elements.formMessage) {
      elements.formMessage.textContent =
        "Opening your email application...";
    }

    window.location.href = mailtoLink;
  });
}


/* =========================================================
   13. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".scroll-reveal"
);


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
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
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


/* =========================================================
   14. SCROLL PROGRESS & BACK TO TOP
========================================================= */

function handleScroll() {
  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress =
    scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

  if (elements.scrollProgress) {
    elements.scrollProgress.style.width =
      progress + "%";
  }

  if (elements.backToTop) {
    elements.backToTop.classList.toggle(
      "visible",
      scrollTop > 400
    );
  }
}


window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);

handleScroll();


if (elements.backToTop) {
  elements.backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* =========================================================
   15. IMAGE FALLBACK
========================================================= */

/*
  Keep the layout stable if an image is missing.
  The original image path is not changed.
*/

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.classList.add("image-unavailable");

    img.setAttribute(
      "alt",
      img.getAttribute("alt") + " (image unavailable)"
    );
  });
});


/* =========================================================
   16. INITIAL PAGE SETUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  updateDhakaClock();
  updatePersonalTime();
  handleScroll();
});


/* =========================================================
   EMTIAZ OFFICIAL — SCRIPT COMPLETE
========================================================= */
