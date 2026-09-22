document.addEventListener("DOMContentLoaded", () => {

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  const isOpen = navMenu.classList.contains("active");

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

}

/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}

/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailAddress = "mdemtiaz36900@gmail.com";

  const mailSubject =
    encodeURIComponent("Website Contact: " + subject);

  const mailBody =
    encodeURIComponent(
      "Hello Emtiaz,\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n\n" +
      "Message:\n" +
      message +
      "\n\nSent from Emtiaz Official website."
    );

  const mailtoLink =
    "mailto:" +
    emailAddress +
    "?subject=" +
    mailSubject +
    "&body=" +
    mailBody;

  window.location.href = mailtoLink;

});

}

/* ================= ESC KEY ================= */

document.addEventListener("keydown", event => {

if (event.key === "Escape" && navMenu) {
  navMenu.classList.remove("active");

  if (menuToggle) {
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }
}

});

});
