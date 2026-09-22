/* =====================================================
   EMTIAZ OFFICIAL - WEBSITE JAVASCRIPT
   ===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      menuToggle.textContent = "✕";
    } else {
      menuToggle.textContent = "☰";
    }

  });


  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("active");

      menuToggle.textContent = "☰";

    });

  });

}


/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* ================= CONTACT FORM ================= */

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const subject =
      document.getElementById("subject").value.trim();

    const message =
      document.getElementById("message").value.trim();


    const emailAddress =
      "mdemtiaz36900@gmail.com";


    const emailSubject =
      encodeURIComponent(
        subject || "Message from Emtiaz Website"
      );


    const emailBody =
      encodeURIComponent(
        `Hello Emtiaz,

Name: ${name}
Email: ${email}

Message:
${message}

Sent from Emtiaz Official website.`
      );


    const mailtoLink =
      `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;


    window.location.href = mailtoLink;

  });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(
    ".section-heading, .glass-card, .skill-card, .service-card, .project-card, .contact-card, .youtube-box"
  );


revealElements.forEach((element) => {

  element.classList.add("reveal");

});


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

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


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* ================= HEADER SHADOW ================= */

const header =
  document.querySelector(".header");


window.addEventListener(
  "scroll",
  () => {

    if (!header) return;

    if (window.scrollY > 20) {

      header.style.boxShadow =
        "0 10px 40px rgba(0,0,0,0.22)";

    } else {

      header.style.boxShadow = "none";

    }

  },
  { passive: true }
);
