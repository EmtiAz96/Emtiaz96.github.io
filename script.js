document.addEventListener("DOMContentLoaded", () => {

/* =========================
MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("active");

  const isOpen =
    navMenu.classList.contains("active");

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );
});

navMenu.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

  });

});

}

/* =========================
CURRENT YEAR
========================= */

const yearElement =
document.getElementById("year");

if (yearElement) {

yearElement.textContent =
  new Date().getFullYear();

}

/* =========================
PROJECT DETAILS MODAL
========================= */

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

const projectModalOverlay =
document.querySelector(".project-modal-overlay");

const projectData = {

portfolio: {

  title:
    "Emtiaz Official Portfolio",

  description:
    "A modern personal portfolio website created to showcase my skills, services, projects, technology interests and online presence.",

  features: [

    "Modern responsive design",

    "Personal profile section",

    "Skills and services showcase",

    "Project showcase",

    "YouTube section",

    "Contact section",

    "Mobile-friendly navigation"

  ],

  tech:
    "HTML5 • CSS3 • JavaScript",

  buttons: `

    <a
      href="https://emtiaz96.github.io/"
      target="_blank"
      rel="noopener noreferrer"
      class="project-btn project-live"
    >
      🚀 Live Demo
    </a>

    <a
      href="https://github.com/EmtiAz96/EmtiAz96.github.io"
      target="_blank"
      rel="noopener noreferrer"
      class="project-btn project-github"
    >
      💻 GitHub
    </a>

  `

},


programming: {

  title:
    "Programming Projects",

  description:
    "A collection of programming and development projects created while learning and improving my coding skills.",

  features: [

    "Programming practice",

    "Web development experiments",

    "Problem solving",

    "Continuous learning",

    "Future project expansion"

  ],

  tech:
    "Python • JavaScript • HTML • CSS • GitHub",

  buttons: `

    <a
      href="https://github.com/EmtiAz96"
      target="_blank"
      rel="noopener noreferrer"
      class="project-btn project-github"
    >
      💻 GitHub Profile
    </a>

  `

},


future: {

  title:
    "Future Projects",

  description:
    "This section is reserved for upcoming projects, software ideas and larger development work.",

  features: [

    "New web applications",

    "Programming projects",

    "Creative technology ideas",

    "Open-source experiments",

    "Future portfolio updates"

  ],

  tech:
    "Coming Soon",

  buttons: `

    <a
      href="#contact"
      class="project-btn project-live"
    >
      ✉️ Stay Connected
    </a>

  `

}

};

function openProjectModal(projectKey) {

if (
  !projectModal ||
  !projectData[projectKey]
) {
  return;
}

const project =
  projectData[projectKey];

if (projectModalTitle) {

  projectModalTitle.textContent =
    project.title;

}

if (projectModalDescription) {

  projectModalDescription.textContent =
    project.description;

}

if (projectModalFeatures) {

  projectModalFeatures.innerHTML = "";

  project.features.forEach(feature => {

    const li =
      document.createElement("li");

    li.textContent =
      feature;

    projectModalFeatures.appendChild(li);

  });

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

document
.querySelectorAll(".project-details")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const projectKey =
        button.getAttribute(
          "data-project"
        );

      openProjectModal(
        projectKey
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

if (projectModalOverlay) {

projectModalOverlay.addEventListener(
  "click",
  closeProjectModal
);

}

/* =========================
SCROLL REVEAL
========================= */

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

const observer =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

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

  observer.observe(element);

});

} else {

revealElements.forEach(element => {

  element.classList.add(
    "show"
  );

});

}

/* =========================
ACTIVE NAVIGATION
========================= */

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
      section.getAttribute("id");

  }

});


navLinks.forEach(link => {

  const href =
    link.getAttribute("href");

  link.classList.remove(
    "active"
  );


  if (
    href === "#" + currentSection
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

/* =========================
CONTACT FORM
========================= */

const contactForm =
document.getElementById(
"contactForm"
);

if (contactForm) {

contactForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const name =
      document
        .getElementById("name")
        .value
        .trim();


    const email =
      document
        .getElementById("email")
        .value
        .trim();


    const subject =
      document
        .getElementById("subject")
        .value
        .trim();


    const message =
      document
        .getElementById("message")
        .value
        .trim();


    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {

      alert(
        "Please fill in all fields."
      );

      return;

    }


    const emailAddress =
      "mdemtiaz36900@gmail.com";


    const mailSubject =
      encodeURIComponent(
        "Website Contact: " +
        subject
      );


    const mailBody =
      encodeURIComponent(

        "Hello Emtiaz,\n\n" +

        "Name: " +
        name +
        "\n" +

        "Email: " +
        email +
        "\n\n" +

        "Message:\n" +
        message +

        "\n\n" +

        "Sent from Emtiaz Official website."

      );


    const mailtoLink =
      "mailto:" +
      emailAddress +
      "?subject=" +
      mailSubject +
      "&body=" +
      mailBody;


    window.location.href =
      mailtoLink;

  }
);

}

/* =========================
ESCAPE KEY
========================= */

document.addEventListener(
"keydown",
event => {

  if (
    event.key === "Escape"
  ) {

    if (navMenu) {

      navMenu.classList.remove(
        "active"
      );


      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      }

    }


    closeProjectModal();

  }

}

);

});
