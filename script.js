// =====================================
// Emtiaz Official - Professional JS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to Emtiaz Official! 🚀");


    // =====================================
    // Contact Form
    // =====================================

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form && formMessage) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput = document.getElementById("name");

            const name = nameInput
                ? nameInput.value.trim()
                : "there";

            if (name) {

                formMessage.textContent =
                    "Thank you, " + name +
                    "! Your message has been received. 🖤";

            } else {

                formMessage.textContent =
                    "Thank you! Your message has been received. 🖤";

            }

            form.reset();

        });

    }


    // =====================================
    // Navigation
    // =====================================

    const navLinks =
        document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log(
                "Navigation clicked:",
                link.textContent.trim()
            );

        });

    });


    // =====================================
    // Scroll Animation
    // =====================================

    const animatedElements =
        document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        animatedElements.forEach(function (element) {

            element.classList.add("animate");

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(function (element) {

            element.classList.add("show");

        });

    }


    // =====================================
    // Button Click Effect
    // =====================================

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.style.transform = "scale(0.97)";

            setTimeout(function () {

                button.style.transform = "";

            }, 120);

        });

    });


    // =====================================
    // Current Year
    // =====================================

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});
