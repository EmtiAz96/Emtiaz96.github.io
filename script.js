/* =========================================================
   EMTIAZ OFFICIAL — FINAL PREMIUM JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
  document.querySelector(".menu-toggle");

const navMenu =
  document.querySelector(".nav-menu");


if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });


  const navLinks =
    document.querySelectorAll(".nav-menu a");


  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("active");

    });

  });

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   PROJECT DATA
   ========================================================= */

const projectData = {

  portfolio: {

    title: "Emtiaz Official Portfolio",

    description:
      "A modern personal portfolio website created to showcase my skills, services, projects and online presence.",

    features: [
      "Responsive design",
      "Modern dark interface",
      "Animated hero section",
      "Skills progress bars",
      "Services section",
      "Project showcase",
      "Project details modal",
      "YouTube integration",
      "Contact section"
    ],

    tech:
      "HTML5 • CSS3 • JavaScript",

    buttons: `
      <a
        href="https://emtiaz96.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        class="project-btn"
      >
        🌐 Live Demo
      </a>

      <a
        href="https://github.com/EmtiAz96/EmtiAz96.github.io"
        target="_blank"
        rel="noopener noreferrer"
        class="project-btn"
      >
        💻 GitHub
      </a>
    `
  },


  programming: {

    title: "Programming Projects",

    description:
      "A collection of programming experiments, development projects and future software ideas.",

    features: [
      "Programming practice",
      "Web development experiments",
      "Software ideas",
      "Continuous learning",
      "GitHub project management"
    ],

    tech:
      "Python • JavaScript • HTML • CSS • Git",

    buttons: `
      <a
        href="https://github.com/EmtiAz96"
        target="_blank"
        rel="noopener noreferrer"
        class="project-btn"
      >
        💻 GitHub Profile
      </a>
    `
  },


  future: {

    title: "Future Projects",

    description:
      "This section is reserved for upcoming projects that will be added as development progresses.",

    features: [
      "New web projects",
      "Programming projects",
      "Creative technology ideas",
      "Future development work"
    ],

    tech:
      "More technologies coming soon",

    buttons: `
      <a
        href="#contact"
        class="project-btn"
      >
        ✉️ Stay Connected
      </a>
    `
  }

};


/* =========================================================
   PROJECT MODAL
   ========================================================= */

const projectModal =
  document.getElementById("projectModal");

const projectModalClose =
  document.getElementById("projectModalClose");

const projectModalTitle =
  document.getElementById("projectModalTitle");

const projectModalDescription =
  document.getElementById("projectModalDescription");

const projectModalFeatures =
  document.getElementById("projectModalFeatures");

const projectModalTech =
  document.getElementById("projectModalTech");

const projectModalButtons =
  document.getElementById("projectModalButtons");


function openProjectModal(projectName) {

  const project =
    projectData[projectName];


  if (!project || !projectModal) {
    return;
  }


  if (projectModalTitle) {

    projectModalTitle.textContent =
      project.title;

  }


  if (projectModalDescription) {

    projectModalDescription.textContent =
      project.description;

  }


  if (projectModalFeatures) {

    projectModalFeatures.innerHTML =
      project.features
        .map(
          feature =>
            `<li>${feature}</li>`
        )
        .join("");

  }


  if (projectModalTech) {

    projectModalTech.textContent =
      project.tech;

  }


  if (projectModalButtons) {

    projectModalButtons.innerHTML =
      project.buttons;

  }


  projectModal.classList.add("active");

  projectModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function closeProjectModal() {

  if (!projectModal) {
    return;
  }


  projectModal.classList.remove(
    "active"
  );


  projectModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


const projectDetailButtons =
  document.querySelectorAll(
    ".project-details"
  );


projectDetailButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const projectName =
        button.getAttribute(
          "data-project"
        );

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


const projectModalOverlay =
  document.querySelector(
    ".project-modal-overlay"
  );


if (projectModalOverlay) {

  projectModalOverlay.addEventListener(
    "click",
    closeProjectModal
  );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeProjectModal();

    }

  }
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
  document.querySelector(
    ".contact-form"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "name"
        )?.value.trim() || "";


      const email =
        document.getElementById(
          "email"
        )?.value.trim() || "";


      const message =
        document.getElementById(
          "message"
        )?.value.trim() || "";


      const subject =
        encodeURIComponent(
          "Message from Emtiaz Official Website"
        );


      const body =
        encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );


      window.location.href =
        `mailto:mdemtiaz36900@gmail.com?subject=${subject}&body=${body}`;

    }
  );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".section-title, .about-card, .skill-card, .service-card, .project-card, .youtube-card, .contact-card, .contact-form"
  );


revealElements.forEach(element => {

  element.classList.add(
    "scroll-reveal"
  );

});


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      (
        entries,
        observer
      ) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "show"
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


  revealElements.forEach(element => {

    revealObserver.observe(
      element
    );

  });

} else {

  revealElements.forEach(element => {

    element.classList.add(
      "show"
    );

  });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navLinks =
  document.querySelectorAll(
    ".nav-menu a"
  );


function updateActiveNavigation() {

  let currentSection = "";

  const scrollPosition =
    window.scrollY + 140;


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop;

    const sectionHeight =
      section.offsetHeight;


    if (
      scrollPosition >= sectionTop &&
      scrollPosition <
        sectionTop + sectionHeight
    ) {

      currentSection =
        section.getAttribute(
          "id"
        );

    }

  });


  navLinks.forEach(link => {

    const href =
      link.getAttribute(
        "href"
      );


    link.classList.remove(
      "active"
    );


    if (
      href ===
      "#" + currentSection
    ) {

      link.classList.add(
        "active"
      );

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  {
    passive: true
  }
);


updateActiveNavigation();


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

const typingElement =
  document.querySelector(
    ".typing-text"
  );


if (typingElement) {

  const roles = [
    "Programmer",
    "Web Developer",
    "Content Creator",
    "Technology Enthusiast"
  ];


  let roleIndex = 0;

  let characterIndex = 0;

  let isDeleting = false;


  const typingSpeed = 90;

  const deletingSpeed = 55;

  const pauseAfterTyping = 1500;

  const pauseAfterDeleting = 500;


  function typeRole() {

    const currentRole =
      roles[roleIndex];


    if (!isDeleting) {

      characterIndex++;


      typingElement.textContent =
        currentRole.substring(
          0,
          characterIndex
        );


      if (
        characterIndex ===
        currentRole.length
      ) {

        isDeleting = true;

        setTimeout(
          typeRole,
          pauseAfterTyping
        );

        return;

      }


      setTimeout(
        typeRole,
        typingSpeed
      );

    } else {

      characterIndex--;


      typingElement.textContent =
        currentRole.substring(
          0,
          characterIndex
        );


      if (characterIndex === 0) {

        isDeleting = false;


        roleIndex =
          (roleIndex + 1) %
          roles.length;


        setTimeout(
          typeRole,
          pauseAfterDeleting
        );

        return;

      }


      setTimeout(
        typeRole,
        deletingSpeed
      );

    }

  }


  typeRole();

}


/* =========================================================
   SKILL PROGRESS ANIMATION
   ========================================================= */

const skillCards =
  document.querySelectorAll(
    ".skill-card"
  );


if (
  "IntersectionObserver" in window &&
  skillCards.length > 0
) {

  const skillObserver =
    new IntersectionObserver(
      (
        entries,
        observer
      ) => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            const progress =
              entry.target.querySelector(
                ".skill-progress"
              );


            if (progress) {

              const value =
                progress.getAttribute(
                  "data-progress"
                );


              progress.style.width =
                value + "%";

            }


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


  skillCards.forEach(card => {

    skillObserver.observe(
      card
    );

  });

} else {

  document
    .querySelectorAll(
      ".skill-progress"
    )
    .forEach(progress => {

      const value =
        progress.getAttribute(
          "data-progress"
        );

      progress.style.width =
        value + "%";

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop =
  document.getElementById(
    "backToTop"
  );


if (backToTop) {

  window.addEventListener(
    "scroll",
    () => {

      if (
        window.scrollY > 500
      ) {

        backToTop.classList.add(
          "show"
        );

      } else {

        backToTop.classList.remove(
          "show"
        );

      }

    },
    {
      passive: true
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


/* =========================================================
   CLOSE MOBILE MENU WITH ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      navMenu
    ) {

      navMenu.classList.remove(
        "active"
      );

    }

  }
);


/* =========================================================
   END
   ========================================================= */
