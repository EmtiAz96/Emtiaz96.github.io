document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to Emtiaz Official! 🚀");


    /* ================= YEAR ================= */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* ================= SCROLL ANIMATION ================= */

    const animatedElements =
        document.querySelectorAll(
            ".skill-card, .service-card, .project-card, .about-content, .about-placeholder"
        );

    animatedElements.forEach(function (element) {
        element.classList.add("animate");
    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

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


        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(function (element) {
            element.classList.add("show");
        });

    }


    /* ================= CONTACT FORM ================= */

    const form =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (form && formMessage) {

        form.addEventListener(
            "submit",
            function (event) {

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


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (!name || !email || !message) {

                    formMessage.textContent =
                        "Please complete all fields.";

                    return;
                }


                const subject =
                    encodeURIComponent(
                        "Message from Emtiaz Official website"
                    );


                const body =
                    encodeURIComponent(
                        "Name: " +
                        name +
                        "\nEmail: " +
                        email +
                        "\n\nMessage:\n" +
                        message
                    );


                const emailAddress =
                    "mdemtiaz36900@gmail.com";


                window.location.href =
                    "mailto:" +
                    emailAddress +
                    "?subject=" +
                    subject +
                    "&body=" +
                    body;


                formMessage.textContent =
                    "Opening your email application...";

            }
        );
    }


    /* ================= BUTTON EFFECT ================= */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.style.transform =
                    "scale(0.97)";


                setTimeout(function () {

                    button.style.transform = "";

                }, 120);

            }
        );

    });


    /* ================= NAVIGATION LOG ================= */

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "Navigation:",
                    link.textContent.trim()
                );

            }
        );

    });

});
