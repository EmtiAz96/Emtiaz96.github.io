/* =========================================
   EMTIAZ OFFICIAL - MAIN JAVASCRIPT
   ========================================= */

/* =========================================
   MOBILE MENU
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}


/* =========================================
   CURRENT YEAR
   ========================================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   TYPING ANIMATION
   ========================================= */

const typingElement = document.getElementById("typingText");

if (typingElement) {

  const typingTexts = [
    "I am a Programmer",
    "I am a Content Creator",
    "I am a Web Developer",
    "I am a Technology Enthusiast"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeAnimation() {

    const currentText = typingTexts[textIndex];

    if (!isDeleting) {

      typingElement.textContent =
        currentText.substring(0, charIndex + 1);

      charIndex++;

      if (charIndex === currentText.length) {

        isDeleting = true;

        setTimeout(typeAnimation, 1800);
        return;
      }

      setTimeout(typeAnimation, 90);

    } else {

      typingElement.textContent =
        currentText.substring(0, charIndex - 1);

      charIndex--;

      if (charIndex === 0) {

        isDeleting = false;

        textIndex =
          (textIndex + 1) % typingTexts.length;

        setTimeout(typeAnimation, 400);
        return;
      }

      setTimeout(typeAnimation, 55);
    }
  }

  typeAnimation();
}


/* =========================================
   SKILLS PROGRESS ANIMATION
   ========================================= */

const skillProgressBars =
  document.querySelectorAll(".skill-progress span");

function animateSkills() {

  skillProgressBars.forEach(bar => {

    const targetWidth =
      bar.getAttribute("data-width");

    if (targetWidth) {
      bar.style.width = targetWidth;
    }
  });
}


/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements = document.querySelectorAll(
  ".section-title, .about-card, .skill-card, .service-card, .project-card, .youtube-card, .contact-card, .contact-form, .stat-card"
);

if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);
          }
        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(element => {

    element.classList.add("scroll-reveal");

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(element => {
    element.classList.add("show");
  });

}


/* =========================================
   ACTIVE NAVIGATION
   ========================================= */

const sections =
  document.querySelectorAll("main section[id]");

const navLinks =
  document.querySelectorAll(".nav-menu a");

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
      scrollPosition < sectionTop + sectionHeight
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });

  navLinks.forEach(link => {

    const href =
      link.getAttribute("href");

    link.classList.remove("active");

    if (href === "#" + currentSection) {
      link.classList.add("active");
    }

  });
}

window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

updateActiveNavigation();


/* =========================================
   STATISTICS COUNTER ANIMATION
   ========================================= */

const counters =
  document.querySelectorAll(".counter");

let countersStarted = false;

function animateCounters() {

  if (countersStarted) return;

  countersStarted = true;

  counters.forEach(counter => {

    const target =
      Number(counter.getAttribute("data-target"));

    let current = 0;

    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      current =
        Math.floor(target * easedProgress);

      counter.textContent = current;

      if (progress < 1) {

        requestAnimationFrame(updateCounter);

      } else {

        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);

  });
}


/* =========================================
   COUNTER OBSERVER
   ========================================= */

const statsSection =
  document.querySelector(".stats-section");

if (statsSection && "IntersectionObserver" in window) {

  const statsObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            animateCounters();

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.3
      }
    );

  statsObserver.observe(statsSection);

}


/* =========================================
   PROJECT DETAILS MODAL
   ========================================= */

const projectModal =
  document.getElementById("projectModal");

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

const projectModalClose =
  document.getElementById("projectModalClose");

const projectModalOverlay =
  document.querySelector(".project-modal-overlay");


const projectData = {

  portfolio: {

    title: "Emtiaz Official Portfolio",

    description:
      "A modern personal portfolio website designed to showcase my skills, projects, services, and online presence.",

    features: [
      "Responsive design",
      "Modern dark UI",
      "Animated sections",
      "Project showcase",
      "Contact section",
      "Mobile friendly navigation"
    ],

    technologies:
      "HTML5, CSS3, JavaScript",

    buttons: [
      {
        text: "Live Demo",
        url: "https://emtiaz96.github.io/",
        className: "project-btn project-live"
      },
      {
        text: "GitHub",
        url: "https://github.com/EmtiAz96/EmtiAz96.github.io",
        className: "project-btn project-github"
      }
    ]

  },

  programming: {

    title: "Programming Projects",

    description:
      "A collection of programming experiments and projects created while learning and improving development skills.",

    features: [
      "Programming practice",
      "Problem solving",
      "Web development experiments",
      "Continuous learning"
    ],

    technologies:
      "Python, JavaScript, HTML, CSS",

    buttons: [
      {
        text: "GitHub",
        url: "https://github.com/EmtiAz96",
        className: "project-btn project-github"
      }
    ]

  },

  future: {

    title: "Future Projects",

    description:
      "More exciting programming, web development, and technology projects will be added here in the future.",

    features: [
      "New web projects",
      "Programming experiments",
      "Creative technology projects",
      "Continuous development"
    ],

    technologies:
      "Coming Soon",

    buttons: []

  }

};


/* =========================================
   OPEN PROJECT MODAL
   ========================================= */

document
  .querySelectorAll(".project-details")
  .forEach(button => {

    button.addEventListener("click", () => {

      const projectId =
        button.getAttribute("data-project");

      const project =
        projectData[projectId];

      if (!project || !projectModal) return;

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

      projectModalTech.textContent =
        project.technologies;

      projectModalButtons.innerHTML = "";

      project.buttons.forEach(buttonData => {

        const link =
          document.createElement("a");

        link.href = buttonData.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = buttonData.className;
        link.textContent = buttonData.text;

        projectModalButtons.appendChild(link);

      });

      projectModal.classList.add("active");
      projectModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "modal-open"
      );

    });

  });


/* =========================================
   CLOSE PROJECT MODAL
   ========================================= */

function closeProjectModal() {

  if (!projectModal) return;

  projectModal.classList.remove("active");

  projectModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );
}


if (projectModalClose) {

  projectModalClose.addEventListener(
    "click",
    closeProjectModal
  );

}


if (projectModalOverlay) {

  projectModalOverlay.addEventListener(
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
      projectModal.classList.contains("active")
    ) {

      closeProjectModal();

    }

  }
);


/* =========================================
   CONTACT FORM
   ========================================= */

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const name =
        document.getElementById("name")?.value.trim();

      const email =
        document.getElementById("email")?.value.trim();

      const message =
        document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {

        alert(
          "Please fill in all fields."
        );

        return;
      }

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


/* =========================================
   BACK TO TOP BUTTON
   ========================================= */

const backToTop =
  document.getElementById("backToTop");

if (backToTop) {

  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 500) {

        backToTop.classList.add("show");

      } else {

        backToTop.classList.remove("show");

      }

    },
    { passive: true }
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


/* =========================================
   PAGE LOAD
   ========================================= */

window.addEventListener(
  "load",
  () => {

    animateSkills();

  }
);
