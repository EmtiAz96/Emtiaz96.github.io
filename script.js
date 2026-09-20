// Welcome message

console.log("Welcome to Emtiaz Official!");


// Contact form

const form = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    formMessage.textContent =
        "Thank you, " + name + "! Your message has been received.";

    form.reset();

});


// Smooth navigation

const navLinks = document.querySelectorAll(".nav-links a");


navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        console.log("Navigation clicked");

    });

});


// Simple scroll animation

const cards = document.querySelectorAll(".card");


const observer = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.2
    }
);


cards.forEach(function(card) {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s";

    observer.observe(card);

});