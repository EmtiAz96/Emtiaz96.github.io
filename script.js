/* =========================================================
   EMTIAZ OFFICIAL — SCRIPT.JS
   STEP 1 / 3
========================================================= */


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     CURRENT YEAR
  ========================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      const isOpen = navMenu.classList.contains("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });


    /* Close menu after clicking a navigation link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        navMenu.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =========================================
     THEME TOGGLE
  ========================================= */

  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {

    const savedTheme =
      localStorage.getItem("emtiaz-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }


    updateThemeIcon();


    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("light-theme");

      const isLight =
        document.body.classList.contains("light-theme");

      localStorage.setItem(
        "emtiaz-theme",
        isLight ? "light" : "dark"
      );

      updateThemeIcon();

    });

  }


  function updateThemeIcon() {

    if (!themeToggle) return;

    const isLight =
      document.body.classList.contains("light-theme");

    themeToggle.textContent =
      isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    themeToggle.setAttribute(
      "title",
      isLight
        ? "Dark Mode"
        : "Light Mode"
    );

  }


  /* =========================================
     TYPING EFFECT
  ========================================= */

  const typingElement =
    document.getElementById("typingText");

  if (typingElement) {

    const typingWords = [
      "Programmer",
      "Web Developer",
      "Digital Creator",
      "Freelancer",
      "Technology Learner"
    ];

    let wordIndex = 0;
    let characterIndex = 0;

    let isDeleting = false;


    function typeEffect() {

      const currentWord =
        typingWords[wordIndex];


      if (!isDeleting) {

        characterIndex++;

        typingElement.textContent =
          currentWord.substring(
            0,
            characterIndex
          );


        if (
          characterIndex >=
          currentWord.length
        ) {

          isDeleting = true;

          setTimeout(
            typeEffect,
            1300
          );

          return;
        }


        setTimeout(
          typeEffect,
          90
        );

      } else {

        characterIndex--;

        typingElement.textContent =
          currentWord.substring(
            0,
            characterIndex
          );


        if (characterIndex <= 0) {

          isDeleting = false;

          wordIndex =
            (wordIndex + 1) %
            typingWords.length;

          setTimeout(
            typeEffect,
            350
          );

          return;
        }


        setTimeout(
          typeEffect,
          55
        );

      }

    }


    typeEffect();

  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(
      ".scroll-reveal"
    );


  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

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
     STAT COUNTER
  ========================================= */

  const statNumbers =
    document.querySelectorAll(
      ".stat-number"
    );


  function animateCounter(element) {

    const target =
      Number(
        element.getAttribute(
          "data-target"
        )
      );


    if (
      !Number.isFinite(target)
    ) {
      return;
    }


    const duration = 1600;

    const startTime =
      performance.now();


    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const currentValue =
        Math.floor(
          target * easedProgress
        );


      element.textContent =
        currentValue.toLocaleString();


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        element.textContent =
          target.toLocaleString();

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  }


  if (
    statNumbers.length &&
    "IntersectionObserver" in window
  ) {

    const statObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              animateCounter(
                entry.target
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.5
        }
      );


    statNumbers.forEach((element) => {

      statObserver.observe(element);

    });

  } else {

    statNumbers.forEach((element) => {

      animateCounter(element);

    });

  }


  /* =========================================
     LIVE AGE COUNTER
     Born: 16 August 2006
     Time: 12:00 AM
     Bangladesh Time: UTC+06:00
  ========================================= */

  const ageYears =
    document.getElementById("ageYears");

  const ageDays =
    document.getElementById("ageDays");

  const ageHours =
    document.getElementById("ageHours");

  const ageMinutes =
    document.getElementById("ageMinutes");

  const ageSeconds =
    document.getElementById("ageSeconds");


  const birthDate =
    new Date(
      "2006-08-16T00:00:00+06:00"
    );


  function getDhakaDateParts(date) {

    const formatter =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: "Asia/Dhaka",

          year: "numeric",
          month: "numeric",
          day: "numeric"
        }
      );


    const parts =
      formatter.formatToParts(date);


    const result = {};


    parts.forEach((part) => {

      if (
        part.type !== "literal"
      ) {

        result[part.type] =
          Number(part.value);

      }

    });


    return result;

  }


  function calculateAgeYears(now) {

    const dhakaDate =
      getDhakaDateParts(now);


    let years =
      dhakaDate.year - 2006;


    const birthdayPassed =
      (
        dhakaDate.month > 8
      ) ||
      (
        dhakaDate.month === 8 &&
        dhakaDate.day >= 16
      );


    if (!birthdayPassed) {

      years--;

    }


    return Math.max(
      0,
      years
    );

  }


  function updateAgeCounter() {

    const now =
      new Date();


    const elapsedMilliseconds =
      Math.max(
        0,
        now.getTime() -
        birthDate.getTime()
      );


    const totalSeconds =
      Math.floor(
        elapsedMilliseconds / 1000
      );


    const totalMinutes =
      Math.floor(
        totalSeconds / 60
      );


    const totalHours =
      Math.floor(
        totalMinutes / 60
      );


    const totalDays =
      Math.floor(
        totalHours / 24
      );


    const years =
      calculateAgeYears(now);


    if (ageYears) {

      ageYears.textContent =
        years.toLocaleString();

    }


    if (ageDays) {

      ageDays.textContent =
        totalDays.toLocaleString();

    }


    if (ageHours) {

      ageHours.textContent =
        totalHours.toLocaleString();

    }


    if (ageMinutes) {

      ageMinutes.textContent =
        totalMinutes.toLocaleString();

    }


    if (ageSeconds) {

      ageSeconds.textContent =
        totalSeconds.toLocaleString();

    }

  }


  if (
    ageYears ||
    ageDays ||
    ageHours ||
    ageMinutes ||
    ageSeconds
  ) {

    updateAgeCounter();

    setInterval(
      updateAgeCounter,
      1000
    );

  }


});
/* =========================================================
   EMTIAZ OFFICIAL — SCRIPT.JS
   STEP 2 / 3
========================================================= */


/* =========================================
   PROJECT MODAL
========================================= */

const projectModal =
  document.getElementById("projectModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalDescription =
  document.getElementById("modalDescription");

const modalClose =
  document.getElementById("modalClose");


/* =========================================
   OPEN PROJECT MODAL
========================================= */

function openProjectModal(
  title,
  description
) {

  if (!projectModal) {
    return;
  }


  if (modalTitle) {

    modalTitle.textContent =
      title || "Project Details";

  }


  if (modalDescription) {

    modalDescription.textContent =
      description ||
      "More information about this project will be available soon.";

  }


  projectModal.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";

}


/* =========================================
   CLOSE PROJECT MODAL
========================================= */

function closeProjectModal() {

  if (!projectModal) {
    return;
  }


  projectModal.classList.remove(
    "active"
  );


  document.body.style.overflow =
    "";

}


/* =========================================
   PROJECT DETAIL BUTTONS
========================================= */

const projectDetailButtons =
  document.querySelectorAll(
    ".project-details-btn"
  );


projectDetailButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const title =
          button.getAttribute(
            "data-title"
          );


        const description =
          button.getAttribute(
            "data-description"
          );


        openProjectModal(
          title,
          description
        );

      }
    );

  }
);


/* =========================================
   MODAL CLOSE BUTTON
========================================= */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeProjectModal
  );

}


/* =========================================
   CLOSE MODAL BY CLICKING BACKDROP
========================================= */

if (projectModal) {

  projectModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        projectModal
      ) {

        closeProjectModal();

      }

    }
  );

}


/* =========================================
   CLOSE MODAL WITH ESCAPE
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      projectModal &&
      projectModal.classList.contains(
        "active"
      )
    ) {

      closeProjectModal();

    }

  }
);


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );

const formMessage =
  document.getElementById(
    "formMessage"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const nameInput =
        document.getElementById(
          "name"
        );

      const emailInput =
        document.getElementById(
          "email"
        );

      const messageInput =
        document.getElementById(
          "message"
        );


      const name =
        nameInput
          ? nameInput.value.trim()
          : "";


      const email =
        emailInput
          ? emailInput.value.trim()
          : "";


      const message =
        messageInput
          ? messageInput.value.trim()
          : "";


      if (
        !name ||
        !email ||
        !message
      ) {

        if (formMessage) {

          formMessage.textContent =
            "Please fill in all fields.";

        }

        return;

      }


      if (formMessage) {

        formMessage.textContent =
          `Thanks ${name}! Your message has been received.`;

      }


      contactForm.reset();

    }
  );

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
  document.getElementById(
    "backToTop"
  );


function updateBackToTop() {

  if (!backToTop) {
    return;
  }


  if (
    window.scrollY >
    450
  ) {

    backToTop.classList.add(
      "show"
    );

  } else {

    backToTop.classList.remove(
      "show"
    );

  }

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  {
    passive: true
  }
);


if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navigationLinks =
  document.querySelectorAll(
    ".nav-menu a"
  );


if (
  sections.length &&
  navigationLinks.length &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              const sectionId =
                entry.target.id;


              navigationLinks.forEach(
                (link) => {

                  const href =
                    link.getAttribute(
                      "href"
                    );


                  link.classList.toggle(
                    "active",
                    href ===
                    `#${sectionId}`
                  );

                }
              );

            }

          }
        );

      },
      {
        rootMargin:
          "-30% 0px -60% 0px",

        threshold: 0
      }
    );


  sections.forEach(
    (section) => {

      sectionObserver.observe(
        section
      );

    }
  );

}


/* =========================================
   SMOOTH ANCHOR HANDLING
========================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {

            return;

          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


/* =========================================
   EXTERNAL LINKS
========================================= */

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach(
    (link) => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    }
  );


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
  "%cEmtiaz Official",
  "font-size: 22px; font-weight: 800;"
);

console.log(
  "%cWelcome to Emtiaz Official 🚀",
  "font-size: 14px;"
);
/* =========================================================
   EMTIAZ OFFICIAL — SCRIPT.JS
   STEP 3 / 3
========================================================= */

/* IMAGE FALLBACK */
const profileImage = document.querySelector(".hero-card img");

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";

    const imageContainer = profileImage.parentElement;

    if (imageContainer && !imageContainer.querySelector(".image-fallback")) {
      const fallback = document.createElement("div");

      fallback.className = "image-fallback";
      fallback.textContent = "E";

      imageContainer.appendChild(fallback);
    }
  });
}


/* PAGE LOADED STATE */
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});


/* SCROLL PROGRESS */
const scrollProgress = document.createElement("div");

scrollProgress.className = "scroll-progress";

scrollProgress.style.position = "fixed";
scrollProgress.style.top = "0";
scrollProgress.style.left = "0";
scrollProgress.style.width = "0%";
scrollProgress.style.height = "3px";
scrollProgress.style.zIndex = "9999";
scrollProgress.style.pointerEvents = "none";
scrollProgress.style.background =
  "linear-gradient(90deg, #4da3ff, #7c5cff, #00d4ff)";

document.body.appendChild(scrollProgress);

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  if (documentHeight <= 0) {
    scrollProgress.style.width = "0%";
    return;
  }

  const progress =
    (scrollTop / documentHeight) * 100;

  scrollProgress.style.width =
    `${Math.min(progress, 100)}%`;
}

window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

updateScrollProgress();


/* CURRENT YEAR SAFETY UPDATE */
const footerYear = document.getElementById("currentYear");

if (footerYear) {
  footerYear.textContent =
    new Date().getFullYear();
}


/* EXTERNAL SOCIAL LINKS */
const socialLinks = document.querySelectorAll(
  'a[href*="youtube.com"], a[href*="github.com"]'
);

socialLinks.forEach((link) => {
  if (link.getAttribute("target") === "_blank") {
    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );
  }
});


/* EMAIL LINK SAFETY */
const emailLinks =
  document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(
      "Email contact link opened."
    );
  });
});


/* PHONE LINK SAFETY */
const phoneLinks =
  document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(
      "Phone contact link opened."
    );
  });
});


/* CARD HOVER ACCESSIBILITY */
const interactiveCards =
  document.querySelectorAll(
    ".service-card, .project-card, .skill-card, .age-counter-box"
  );

interactiveCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("is-hovered");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("is-hovered");
  });
});


/* PREVENT DOUBLE SUBMISSION */
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const submitButton =
      contactForm.querySelector(
        'button[type="submit"]'
      );

    if (submitButton) {
      setTimeout(() => {
        submitButton.blur();
      }, 100);
    }
  });
}


/* KEYBOARD ACCESS FOR MODAL */
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    document.activeElement &&
    document.activeElement.classList.contains(
      "project-details-btn"
    )
  ) {
    document.activeElement.click();
  }
});


/* VISIBILITY CHECK */
document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      console.log(
        "Emtiaz Official: page is currently hidden."
      );
    } else {
      console.log(
        "Emtiaz Official: welcome back."
      );
    }
  }
);


/* SAFE AGE COUNTER REFRESH */
let ageRefreshTimer = null;

function keepAgeCounterAccurate() {
  const ageElements = [
    ageYears,
    ageDays,
    ageHours,
    ageMinutes,
    ageSeconds
  ];

  const hasAgeCounter =
    ageElements.some(
      (element) => element !== null
    );

  if (!hasAgeCounter) {
    return;
  }

  if (typeof updateAgeCounter === "function") {
    updateAgeCounter();
  }
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (!document.hidden) {
      keepAgeCounterAccurate();
    }
  }
);


/* CLEANUP OLD TIMER BEFORE STARTING A NEW ONE */
if (ageRefreshTimer) {
  clearInterval(ageRefreshTimer);
}

ageRefreshTimer = setInterval(
  keepAgeCounterAccurate,
  1000
);


/* REDUCED MOTION SUPPORT */
const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

if (prefersReducedMotion) {
  document.documentElement.classList.add(
    "reduce-motion"
  );
}


/* SAFE RESIZE HANDLER */
let resizeTimer = null;

window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      updateScrollProgress();
    }, 150);
  },
  { passive: true }
);


/* FINAL READY MESSAGE */
console.log(
  "%cWebsite systems loaded successfully.",
  "font-size: 13px; font-weight: 700;"
);

console.log(
  "%cLive Age Counter: Active",
  "font-size: 13px; font-weight: 700;"
);

console.log(
  "%cEmtiaz Official — All systems ready 🚀",
  "font-size: 13px; font-weight: 700;"
);


/* =========================================================
   END OF SCRIPT.JS
========================================================= */
