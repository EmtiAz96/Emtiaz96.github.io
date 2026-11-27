/* =========================================================
   EMTIAZ OFFICIAL — PREMIUM SCRIPT.JS
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches || false;

  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  const currentYear = $("#currentYear");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  /* =======================================================
     IMAGE FALLBACK
     If an image cannot load, show its fallback letter.
  ======================================================= */

  $$("img").forEach(image => {
    const showFallback = () => {
      image.hidden = true;

      const fallback = image.nextElementSibling;

      if (fallback && fallback.classList.contains("image-fallback")) {
        fallback.hidden = false;
      }
    };

    image.addEventListener("error", showFallback, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  });

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = $("#menuToggle");
  const navMenu = $("#navMenu");

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const opened = navMenu.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(opened));
      menuToggle.setAttribute(
        "aria-label",
        opened ? "Close navigation menu" : "Open navigation menu"
      );
    });

    $$("a", navMenu).forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =======================================================
     THEME TOGGLE
  ======================================================= */

  const themeToggle = $("#themeToggle");

  const applyTheme = theme => {
    const light = theme === "light";

    document.body.classList.toggle("light-theme", light);

    if (themeToggle) {
      themeToggle.textContent = light ? "🌙" : "☀️";

      themeToggle.setAttribute(
        "aria-label",
        light ? "Switch to dark mode" : "Switch to light mode"
      );

      themeToggle.title = light ? "Dark mode" : "Light mode";
    }
  };

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("emtiaz-theme") || "dark";
  } catch (_) {
    savedTheme = "dark";
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-theme")
        ? "dark"
        : "light";

      applyTheme(nextTheme);

      try {
        localStorage.setItem("emtiaz-theme", nextTheme);
      } catch (_) {
        // Theme still works for the current page session.
      }
    });
  }

  /* =======================================================
     TYPING ANIMATION
  ======================================================= */

  const typingElement = $("#typingText");

  if (typingElement) {
    const words = [
      "Programmer",
      "Web Developer",
      "Digital Creator",
      "Freelancer",
      "Technology Learner"
    ];

    if (reducedMotion) {
      typingElement.textContent = words[0];
    } else {
      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
        const word = words[wordIndex];

        charIndex += deleting ? -1 : 1;
        typingElement.textContent = word.slice(0, charIndex);

        let delay = deleting ? 48 : 85;

        if (!deleting && charIndex >= word.length) {
          deleting = true;
          delay = 1250;
        } else if (deleting && charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 320;
        }

        window.setTimeout(type, delay);
      };

      type();
    }
  }

  /* =======================================================
     SCROLL REVEAL ANIMATION
  ======================================================= */

  const revealElements = $$(".scroll-reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
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

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  /* =======================================================
     STATS COUNTER ANIMATION
  ======================================================= */

  const statNumbers = $$(".stat-number");

  const animateCounter = element => {
    if (element.dataset.animated === "true") return;

    element.dataset.animated = "true";

    const target = Number(element.dataset.target);

    if (!Number.isFinite(target)) return;

    if (reducedMotion) {
      element.textContent = target.toLocaleString();
      return;
    }

    const start = performance.now();
    const duration = 1400;

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = Math.floor(
        target * eased
      ).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4
      }
    );

    statNumbers.forEach(element => {
      statsObserver.observe(element);
    });
  } else {
    statNumbers.forEach(animateCounter);
  }

  /* =======================================================
     LIVE AGE COUNTER — BANGLADESH TIME
     Birthday: 16 August 2006, 12:00 AM
  ======================================================= */

  const ageNodes = {
    years: $("#ageYears"),
    days: $("#ageDays"),
    hours: $("#ageHours"),
    minutes: $("#ageMinutes"),
    seconds: $("#ageSeconds")
  };

  const birthTimestamp = new Date(
    "2006-08-16T00:00:00+06:00"
  ).getTime();

  const dhakaFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });

  const getDhakaParts = date => {
    const result = {};

    dhakaFormatter.formatToParts(date).forEach(part => {
      if (part.type !== "literal") {
        result[part.type] = Number(part.value);
      }
    });

    return result;
  };

  const updateAgeCounter = () => {
    const now = new Date();

    const elapsed = Math.max(
      0,
      now.getTime() - birthTimestamp
    );

    const totalSeconds = Math.floor(elapsed / 1000);
    const parts = getDhakaParts(now);

    let years = parts.year - 2006;

    if (
      parts.month < 8 ||
      (parts.month === 8 && parts.day < 16)
    ) {
      years--;
    }

    const values = {
      years: Math.max(0, years),
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor(totalSeconds / 60),
      seconds: totalSeconds
    };

    Object.entries(ageNodes).forEach(([key, node]) => {
      if (node) {
        node.textContent = values[key].toLocaleString();
      }
    });
  };

  const hasAgeCounter = Object.values(ageNodes).some(Boolean);

  if (hasAgeCounter) {
    updateAgeCounter();

    window.setInterval(updateAgeCounter, 1000);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        updateAgeCounter();
      }
    });
  }

  /* =======================================================
     PROJECT DETAILS MODAL
  ======================================================= */

  const projectModal = $("#projectModal");
  const modalTitle = $("#projectModalTitle");
  const modalDescription = $("#projectModalDescription");
  const modalClose = $("#projectModalClose");
  const modalDone = $("#modalDone");

  let previousFocus = null;

  const closeProjectModal = () => {
    if (!projectModal) return;

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (previousFocus) {
      previousFocus.focus();
    }
  };

  $$(".project-details-btn").forEach(button => {
    button.addEventListener("click", () => {
      if (!projectModal) return;

      previousFocus = button;

      if (modalTitle) {
        modalTitle.textContent =
          button.dataset.title || "Project Details";
      }

      if (modalDescription) {
        modalDescription.textContent =
          button.dataset.description ||
          "More information will be available soon.";
      }

      projectModal.classList.add("active");
      projectModal.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";

      modalClose?.focus();
    });
  });

  modalClose?.addEventListener("click", closeProjectModal);
  modalDone?.addEventListener("click", closeProjectModal);

  projectModal?.addEventListener("click", event => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      projectModal?.classList.contains("active")
    ) {
      closeProjectModal();
    }
  });

  /* =======================================================
     CONTACT FORM
     GitHub Pages does not provide a built-in form backend.
     This prepares an email for the visitor to review and send.
  ======================================================= */

  const contactForm = $("#contactForm");
  const formMessage = $("#formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = $("#contactName")?.value.trim() || "";
      const email = $("#contactEmail")?.value.trim() || "";
      const message = $("#contactMessage")?.value.trim() || "";

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

      if (formMessage) {
        formMessage.textContent =
          "Opening your email app. Please review and send the prepared message.";
      }

      window.location.href =
        `mailto:mdemtiaz36900@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backToTop = $("#backToTop");

  const updateBackToTop = () => {
    if (backToTop) {
      backToTop.classList.toggle(
        "show",
        window.scrollY > 450
      );
    }
  };

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  updateBackToTop();

  /* =======================================================
     SCROLL PROGRESS BAR
  ======================================================= */

  const scrollProgress = document.createElement("div");

  scrollProgress.className = "scroll-progress";
  scrollProgress.setAttribute("aria-hidden", "true");

  document.body.appendChild(scrollProgress);

  const updateScrollProgress = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = maxScroll > 0
      ? (window.scrollY / maxScroll) * 100
      : 0;

    scrollProgress.style.width =
      `${Math.min(100, Math.max(0, percent))}%`;
  };

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  /* =======================================================
     ACTIVE NAVIGATION LINK
  ======================================================= */

  const sections = $$("main section[id]");
  const navigationLinks = $$("#navMenu a[href^='#']");

  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navigationLinks.length
  ) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /* =======================================================
     SMOOTH IN-PAGE LINKS
  ======================================================= */

  $$("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const selector = link.getAttribute("href");

      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });

      if (navMenu?.contains(link)) {
        closeMenu();
      }
    });
  });

  /* =======================================================
     EXTERNAL LINK SAFETY
  ======================================================= */

  $$('a[target="_blank"]').forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* =======================================================
     WELCOME VOICE
     Browsers require user interaction before speech playback.
  ======================================================= */

  const welcomeButton = $("#welcomeVoiceBtn");
  const voiceStatus = $("#voiceStatus");

  let welcomeSpoken = false;

  const speakWelcome = () => {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      if (voiceStatus) {
        voiceStatus.textContent =
          "Voice playback is not supported by this browser.";
      }

      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      "Welcome to Emtiaz Official Website."
    );

    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1;

    utterance.onstart = () => {
      if (voiceStatus) {
        voiceStatus.textContent = "Playing welcome message...";
      }
    };

    utterance.onend = () => {
      if (voiceStatus) {
        voiceStatus.textContent = "Welcome message finished.";
      }
    };

    utterance.onerror = () => {
      if (voiceStatus) {
        voiceStatus.textContent =
          "Tap the button to play the welcome message.";
      }
    };

    window.speechSynthesis.speak(utterance);

    welcomeSpoken = true;
  };

  welcomeButton?.addEventListener("click", speakWelcome);

  const firstInteraction = () => {
    if (welcomeSpoken) return;

    speakWelcome();

    document.removeEventListener("pointerdown", firstInteraction);
    document.removeEventListener("keydown", firstInteraction);
  };

  document.addEventListener("pointerdown", firstInteraction, {
    once: true
  });

  document.addEventListener("keydown", firstInteraction, {
    once: true
  });

  /* =======================================================
     PAGE READY
  ======================================================= */

  window.addEventListener(
    "load",
    () => {
      document.body.classList.add("page-loaded");
    },
    { once: true }
  );

  console.log("Emtiaz Official — premium website scripts ready.");
});
