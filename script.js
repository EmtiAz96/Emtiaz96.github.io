document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      navMenu.classList.toggle("active");

      const isOpen =
        navMenu.classList.contains("active");

      menuToggle.textContent =
        isOpen ? "✕" : "☰";

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close Menu" : "Open Menu"
      );
    });

    navMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
          "aria-label",
          "Open Menu"
        );
      });

    });
  }


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* =========================================
     TYPING EFFECT
  ========================================= */

  const typingText =
    document.getElementById("typingText");

  if (typingText) {

    const words = [
      "I am a Programmer",
      "I am a Content Creator",
      "I am a Web Developer",
      "I am a Technology Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

      const currentWord =
        words[wordIndex];

      if (!deleting) {

        typingText.textContent =
          currentWord.substring(
            0,
            charIndex + 1
          );

        charIndex++;

        if (
          charIndex ===
          currentWord.length
        ) {

          deleting = true;

          setTimeout(
            typeEffect,
            1700
          );

          return;
        }

      } else {

        typingText.textContent =
          currentWord.substring(
            0,
            charIndex - 1
          );

        charIndex--;

        if (charIndex === 0) {

          deleting = false;

          wordIndex =
            (wordIndex + 1) %
            words.length;
        }
      }

      setTimeout(
        typeEffect,
        deleting ? 45 : 75
      );
    }

    typeEffect();
  }


  /* =========================================
     SKILL BAR ANIMATION
  ========================================= */

  const skillBars =
    document.querySelectorAll(
      ".skill-progress"
    );

  skillBars.forEach(bar => {

    const targetWidth =
      bar.style.width;

    if (!targetWidth) return;

    bar.style.width = "0";

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        bar.style.width =
          targetWidth;

      });

    });

  });


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(
      ".scroll-reveal"
    );

  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "show"
            );

            observer.unobserve(
              entry.target
            );

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

      element.classList.add("show");

    });

  }


  /* =========================================
     SECTION + NAVIGATION REFERENCES
  ========================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      '.nav-menu a[href^="#"]'
    );


  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  function updateActiveNav() {

    if (!sections.length) {
      return;
    }

    const scrollPosition =
      window.scrollY + 150;

    let currentSection = "";

    sections.forEach(section => {

      if (
        scrollPosition >=
        section.offsetTop
      ) {

        currentSection =
          section.id;

      }

    });

    navLinks.forEach(link => {

      const isActive =
        link.getAttribute("href") ===
        `#${currentSection}`;

      link.classList.toggle(
        "active",
        isActive
      );

    });

  }


  /* =========================================
     PERFORMANCE SCROLL SYSTEM
  ========================================= */

  let scrollTicking = false;

  function handleScroll() {

    if (scrollTicking) {
      return;
    }

    scrollTicking = true;

    requestAnimationFrame(() => {

      updateActiveNav();

      updateBackToTop();

      scrollTicking = false;

    });

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

    backToTop.classList.toggle(
      "show",
      window.scrollY > 500
    );

  }


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


  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );


  updateActiveNav();

  updateBackToTop();


  /* =========================================
     STATS COUNTER
  ========================================= */

  const counters =
    document.querySelectorAll(
      ".counter"
    );

  const statsSection =
    document.querySelector(
      ".stats-section"
    );

  let countersStarted = false;

  function animateCounter(counter) {

    const target =
      Number(
        counter.dataset.target
      );

    if (
      !Number.isFinite(target) ||
      target < 0
    ) {
      return;
    }

    const duration = 1200;

    const startTime =
      performance.now();

    function updateCounter(
      currentTime
    ) {

      const elapsed =
        currentTime -
        startTime;

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
          target *
          easedProgress
        );

      counter.textContent =
        currentValue + "+";

      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        counter.textContent =
          target + "+";
      }

    }

    requestAnimationFrame(
      updateCounter
    );
  }


  function startCounters() {

    if (
      countersStarted ||
      !statsSection ||
      !counters.length
    ) {
      return;
    }

    countersStarted = true;

    counters.forEach(counter => {

      animateCounter(counter);

    });

  }


  if (
    statsSection &&
    "IntersectionObserver" in window
  ) {

    const statsObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              startCounters();

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );

    statsObserver.observe(
      statsSection
    );

  } else {

    startCounters();

  }
  /* =========================================
     PROJECT DATA
  ========================================= */

  const projectData = {

    portfolio: {
      title: "Personal Portfolio",

      description:
        "A modern responsive portfolio website created to showcase Emtiaz's skills, projects, learning journey and digital presence.",

      features: [
        "Responsive modern design",
        "Animated hero section",
        "Typing animation",
        "Skills section",
        "Project showcase",
        "YouTube section",
        "Contact form",
        "Dark and Light Mode"
      ],

      tech: [
        "HTML",
        "CSS",
        "JavaScript"
      ],

      links: [
        {
          text: "Live Website",
          url: "https://emtiaz96.github.io/"
        },
        {
          text: "GitHub",
          url: "https://github.com/EmtiAz96"
        }
      ]
    },


    friendship: {
      title: "Friendship Page",

      description:
        "A dedicated friendship page created for Emtiaz's close friends and best friend, with animated RGB names and a clean design.",

      features: [
        "Dedicated friendship page",
        "Close friends section",
        "Best friend section",
        "RGB animated names",
        "Responsive design",
        "Standalone HTML page"
      ],

      tech: [
        "HTML",
        "CSS",
        "Animation"
      ],

      links: [
        {
          text: "Open Friendship Page",
          url: "friendship.html"
        },
        {
          text: "GitHub",
          url: "https://github.com/EmtiAz96"
        }
      ]
    },


    future: {
      title: "Future Project",

      description:
        "A future project area reserved for new technology experiments, creative ideas and upcoming development work.",

      features: [
        "Future technology experiments",
        "New project ideas",
        "Programming experiments",
        "Creative digital projects"
      ],

      tech: [
        "Future",
        "Technology",
        "Innovation"
      ],

      links: []
    }

  };


  /* =========================================
     PROJECT MODAL ELEMENTS
  ========================================= */

  const projectModal =
    document.getElementById(
      "projectModal"
    );

  const projectModalTitle =
    document.getElementById(
      "projectModalTitle"
    );

  const projectModalDescription =
    document.getElementById(
      "projectModalDescription"
    );

  const projectModalFeatures =
    document.getElementById(
      "projectModalFeatures"
    );

  const projectModalTech =
    document.getElementById(
      "projectModalTech"
    );

  const projectModalButtons =
    document.getElementById(
      "projectModalButtons"
    );

  const projectModalClose =
    document.getElementById(
      "projectModalClose"
    );


  /* =========================================
     OPEN PROJECT MODAL
  ========================================= */

  function openProjectModal(
    projectName
  ) {

    const project =
      projectData[projectName];

    if (
      !project ||
      !projectModal ||
      !projectModalTitle ||
      !projectModalDescription ||
      !projectModalFeatures ||
      !projectModalTech ||
      !projectModalButtons
    ) {
      return;
    }


    projectModalTitle.textContent =
      project.title;


    projectModalDescription.textContent =
      project.description;


    /* ---------- FEATURES ---------- */

    projectModalFeatures.replaceChildren();

    project.features.forEach(
      feature => {

        const li =
          document.createElement("li");

        li.textContent =
          feature;

        projectModalFeatures.appendChild(
          li
        );

      }
    );


    /* ---------- TECHNOLOGIES ---------- */

    projectModalTech.replaceChildren();

    project.tech.forEach(
      tech => {

        const span =
          document.createElement("span");

        span.textContent =
          tech;

        projectModalTech.appendChild(
          span
        );

      }
    );


    /* ---------- PROJECT LINKS ---------- */

    projectModalButtons.replaceChildren();

    project.links.forEach(
      link => {

        const anchor =
          document.createElement("a");

        anchor.href =
          link.url;

        anchor.textContent =
          link.text;

        anchor.target =
          "_blank";

        anchor.rel =
          "noopener noreferrer";

        anchor.className =
          "btn primary-btn";

        projectModalButtons.appendChild(
          anchor
        );

      }
    );


    /* ---------- SHOW MODAL ---------- */

    projectModal.classList.add(
      "active"
    );

    document.body.classList.add(
      "modal-open"
    );

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

    document.body.classList.remove(
      "modal-open"
    );

  }


  /* =========================================
     PROJECT DETAILS BUTTONS
  ========================================= */

  document
    .querySelectorAll(
      ".project-details"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const projectName =
            button.dataset.project;

          openProjectModal(
            projectName
          );

        }
      );

    });


  /* =========================================
     MODAL CLOSE BUTTON
  ========================================= */

  if (projectModalClose) {

    projectModalClose.addEventListener(
      "click",
      closeProjectModal
    );

  }


  /* =========================================
     MODAL OVERLAY
  ========================================= */

  const modalOverlay =
    document.querySelector(
      ".project-modal-overlay"
    );

  if (modalOverlay) {

    modalOverlay.addEventListener(
      "click",
      closeProjectModal
    );

  }


  /* =========================================
     ESCAPE KEY
  ========================================= */

  document.addEventListener(
    "keydown",
    event => {

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

    const nameInput =
      document.getElementById(
        "contactName"
      );

    const emailInput =
      document.getElementById(
        "contactEmail"
      );

    const messageInput =
      document.getElementById(
        "contactMessage"
      );


    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (
          !nameInput ||
          !emailInput ||
          !messageInput
        ) {
          return;
        }


        const name =
          nameInput.value.trim();

        const email =
          emailInput.value.trim();

        const message =
          messageInput.value.trim();


        /* ---------- NAME VALIDATION ---------- */

        if (
          name.length < 2 ||
          name.length > 100
        ) {

          if (formMessage) {

            formMessage.textContent =
              "Please enter a valid name.";

          }

          return;
        }


        /* ---------- EMAIL VALIDATION ---------- */

        if (
          email.length > 150 ||
          !emailInput.checkValidity()
        ) {

          if (formMessage) {

            formMessage.textContent =
              "Please enter a valid email address.";

          }

          return;
        }


        /* ---------- MESSAGE VALIDATION ---------- */

        if (
          message.length < 3 ||
          message.length > 2000
        ) {

          if (formMessage) {

            formMessage.textContent =
              "Please enter a message between 3 and 2000 characters.";

          }

          return;
        }


        /* ---------- MAILTO DATA ---------- */

        const subject =
          encodeURIComponent(
            `Message from ${name}`
          );


        const body =
          encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
          );


        if (formMessage) {

          formMessage.textContent =
            "Opening your email app...";

        }


        window.location.href =
          `mailto:mdemtiaz36900@gmail.com?subject=${subject}&body=${body}`;

      }
    );

  }


  /* =========================================
     BUTTON PRESS EFFECT
  ========================================= */

  document
    .querySelectorAll(".btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          button.style.transform =
            "scale(0.97)";


          setTimeout(() => {

            button.style.transform =
              "";

          }, 120);

        }
      );

    });
  /* =========================================
     DARK / LIGHT MODE
  ========================================= */

  const themeToggle =
    document.getElementById(
      "themeToggle"
    );


  function updateThemeIcon() {

    if (!themeToggle) {
      return;
    }


    const lightMode =
      document.body.classList.contains(
        "light-theme"
      );


    if (lightMode) {

      themeToggle.textContent =
        "🌙";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to Dark Mode"
      );

      themeToggle.title =
        "Switch to Dark Mode";

    } else {

      themeToggle.textContent =
        "☀️";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to Light Mode"
      );

      themeToggle.title =
        "Switch to Light Mode";

    }

  }


  /* =========================================
     LOAD SAVED THEME
  ========================================= */

  let savedTheme = null;


  try {

    savedTheme =
      localStorage.getItem(
        "emtiaz-theme"
      );

  } catch (error) {

    savedTheme = null;

  }


  if (
    savedTheme === "light"
  ) {

    document.body.classList.add(
      "light-theme"
    );

  }


  updateThemeIcon();


  /* =========================================
     THEME TOGGLE
  ========================================= */

  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        document.body.classList.toggle(
          "light-theme"
        );


        const currentTheme =
          document.body.classList.contains(
            "light-theme"
          )
            ? "light"
            : "dark";


        try {

          localStorage.setItem(
            "emtiaz-theme",
            currentTheme
          );

        } catch (error) {

          /* Storage may be unavailable */

        }


        updateThemeIcon();

      }
    );

  }


  /* =========================================
     INITIAL UI UPDATE
  ========================================= */

  updateActiveNav();

  updateBackToTop();


  /* =========================================
     PAGE VISIBILITY OPTIMIZATION
  ========================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      /*
       * Browser নিজে background tab-এর
       * animation throttle করবে।
       * এখানে কোনো unnecessary কাজ চালানো হচ্ছে না।
       */

      if (
        document.hidden
      ) {

        return;

      }

      /*
       * User আবার tab-এ ফিরে এলে
       * navigation state একবার refresh করা হয়।
       */

      updateActiveNav();

      updateBackToTop();

    }
  );


  /* =========================================
     PERFORMANCE SAFETY
  ========================================= */

  window.addEventListener(
    "resize",
    () => {

      /*
       * Resize event-এ কোনো heavy calculation
       * করা হচ্ছে না।
       *
       * Browser layout নিজেই handle করবে।
       */

    },
    {
      passive: true
    }
  );


});
