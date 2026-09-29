/* =========================================
   EMTIAZ OFFICIAL
   COMPLETE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================
     MOBILE MENU
  ======================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      navMenu.classList.toggle("active");

      if (navMenu.classList.contains("active")) {
        menuToggle.textContent = "✕";
        menuToggle.setAttribute("aria-label", "Close Menu");
      } else {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open Menu");
      }

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


  /* =======================================
     CURRENT YEAR
  ======================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================
     TYPING ANIMATION
  ======================================= */

  const typingText = document.getElementById("typingText");

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

      const currentWord = words[wordIndex];

      if (!deleting) {

        typingText.textContent =
          currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

          deleting = true;

          setTimeout(typeEffect, 1700);

          return;
        }

      } else {

        typingText.textContent =
          currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

          deleting = false;

          wordIndex =
            (wordIndex + 1) % words.length;

        }

      }

      setTimeout(
        typeEffect,
        deleting ? 45 : 75
      );

    }

    typeEffect();

  }


  /* =======================================
     SKILL ANIMATION
  ======================================= */

  function animateSkills() {

    document
      .querySelectorAll(".skill-progress")
      .forEach(bar => {

        const targetWidth =
          bar.style.width;

        bar.style.width = "0";

        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 250);

      });

  }

  animateSkills();


  /* =======================================
     SCROLL REVEAL
  ======================================= */

  const revealElements =
    document.querySelectorAll(".scroll-reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              obs.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("show");
    });

  }


  /* =======================================
     ACTIVE NAVIGATION
  ======================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(
      '.nav-menu a[href^="#"]'
    );

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNav
  );

  updateActiveNav();


  /* =======================================
     STAT COUNTERS
  ======================================= */

  const counters =
    document.querySelectorAll(".counter");

  let countersStarted = false;

  function startCounters() {

    if (countersStarted) return;

    const statsSection =
      document.querySelector(".stats-section");

    if (!statsSection) return;

    const rect =
      statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.85) {

      countersStarted = true;

      counters.forEach(counter => {

        const target =
          Number(counter.dataset.target);

        let current = 0;

        const increment =
          Math.max(1, Math.ceil(target / 50));

        const timer =
          setInterval(() => {

            current += increment;

            if (current >= target) {

              current = target;

              clearInterval(timer);

            }

            counter.textContent =
              current + "+";

          }, 30);

      });

    }

  }

  window.addEventListener(
    "scroll",
    startCounters
  );

  startCounters();


  /* =======================================
     PROJECT DATA
  ======================================= */

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


  /* =======================================
     PROJECT MODAL
  ======================================= */

  const projectModal =
    document.getElementById("projectModal");

  const projectModalTitle =
    document.getElementById("projectModalTitle");

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


  function openProjectModal(projectName) {

    const project =
      projectData[projectName];

    if (
      !project ||
      !projectModal
    ) {
      return;
    }

    projectModalTitle.textContent =
      project.title;

    projectModalDescription.textContent =
      project.description;


    projectModalFeatures.innerHTML = "";

    project.features.forEach(feature => {

      const li =
        document.createElement("li");

      li.textContent = feature;

      projectModalFeatures.appendChild(li);

    });


    projectModalTech.innerHTML = "";

    project.tech.forEach(tech => {

      const span =
        document.createElement("span");

      span.textContent = tech;

      projectModalTech.appendChild(span);

    });


    projectModalButtons.innerHTML = "";

    project.links.forEach(link => {

      const a =
        document.createElement("a");

      a.href = link.url;

      a.textContent = link.text;

      a.target = "_blank";

      a.rel = "noopener noreferrer";

      a.className =
        "btn primary-btn";

      projectModalButtons.appendChild(a);

    });


    projectModal.classList.add("active");

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeProjectModal() {

    if (!projectModal) return;

    projectModal.classList.remove("active");

    document.body.classList.remove(
      "modal-open"
    );

  }


  document
    .querySelectorAll(".project-details")
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


  if (projectModalClose) {

    projectModalClose.addEventListener(
      "click",
      closeProjectModal
    );

  }


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


  /* =======================================
     CONTACT FORM
  ======================================= */

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
      event => {

        event.preventDefault();

        const name =
          document.getElementById(
            "contactName"
          ).value.trim();

        const email =
          document.getElementById(
            "contactEmail"
          ).value.trim();

        const message =
          document.getElementById(
            "contactMessage"
          ).value.trim();


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


        const subject =
          encodeURIComponent(
            `Message from ${name}`
          );

        const body =
          encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
          );


        window.location.href =
          `mailto:mdemtiaz36900@gmail.com?subject=${subject}&body=${body}`;


        if (formMessage) {

          formMessage.textContent =
            "Opening your email app...";

        }

      }
    );

  }


  /* =======================================
     BACK TO TOP
  ======================================= */

  const backToTop =
    document.getElementById(
      "backToTop"
    );

  if (backToTop) {

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > 500) {

          backToTop.classList.add(
            "show"
          );

        } else {

          backToTop.classList.remove(
            "show"
          );

        }

      }
    );


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


  /* =======================================
     BUTTON EFFECT
  ======================================= */

  document
    .querySelectorAll(".btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          button.style.transform =
            "scale(0.97)";

          setTimeout(() => {

            button.style.transform = "";

          }, 120);

        }
      );

    });


  /* =======================================
     DARK / LIGHT MODE
  ======================================= */

  const themeToggle =
    document.getElementById(
      "themeToggle"
    );


  function updateThemeIcon() {

    if (!themeToggle) return;

    const lightMode =
      document.body.classList.contains(
        "light-theme"
      );


    if (lightMode) {

      themeToggle.textContent = "🌙";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to Dark Mode"
      );

      themeToggle.title =
        "Switch to Dark Mode";

    } else {

      themeToggle.textContent = "☀️";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to Light Mode"
      );

      themeToggle.title =
        "Switch to Light Mode";

    }

  }


  const savedTheme =
    localStorage.getItem(
      "emtiaz-theme"
    );


  if (savedTheme === "light") {

    document.body.classList.add(
      "light-theme"
    );

  }


  updateThemeIcon();


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


        localStorage.setItem(
          "emtiaz-theme",
          currentTheme
        );


        updateThemeIcon();

      }
    );

  }

});
