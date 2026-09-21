:root {
    --bg: #070b14;
    --bg2: #0d1322;
    --card: rgba(255, 255, 255, 0.05);
    --border: rgba(255, 255, 255, 0.10);
    --text: #f4f7fb;
    --muted: #aab4c5;
    --primary: #00e5ff;
    --secondary: #7c5cff;
    --success: #25d366;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
}

a {
    text-decoration: none;
    color: inherit;
}

.container {
    width: min(1120px, 92%);
    margin: auto;
}


/* HEADER */

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(7, 11, 20, 0.78);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--border);
}

.nav-container {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 26px;
    font-weight: 800;
}

.logo span,
.footer h3 span {
    color: var(--primary);
}

.nav-links {
    display: flex;
    gap: 22px;
}

.nav-links a {
    color: var(--muted);
    font-size: 14px;
    transition: 0.3s;
}

.nav-links a:hover {
    color: var(--primary);
}


/* HERO */

.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
}

.hero-glow {
    position: absolute;
    width: 450px;
    height: 450px;
    background: var(--secondary);
    filter: blur(170px);
    opacity: 0.18;
    top: 10%;
    right: 5%;
    border-radius: 50%;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-small {
    color: var(--primary);
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 3px;
    margin-bottom: 15px;
}

.hero h1 {
    font-size: clamp(48px, 8vw, 88px);
    line-height: 1.05;
    margin-bottom: 18px;
}

.hero h1 span {
    color: var(--primary);
}

.hero h2 {
    color: var(--muted);
    font-size: clamp(20px, 3vw, 30px);
    margin-bottom: 20px;
}

.hero-text {
    max-width: 650px;
    color: var(--muted);
    font-size: 18px;
}

.hero-buttons {
    display: flex;
    gap: 15px;
    margin-top: 32px;
    flex-wrap: wrap;
}


/* BUTTONS */

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 22px;
    border-radius: 10px;
    font-weight: bold;
    transition: 0.3s;
    border: 1px solid transparent;
    cursor: pointer;
}

.btn:hover {
    transform: translateY(-3px);
}

.primary {
    background: var(--primary);
    color: #001017;
}

.secondary {
    border-color: var(--border);
    background: var(--card);
    color: var(--text);
}

.youtube-btn {
    background: #ff0033;
    color: white;
}


/* SECTIONS */

.section {
    padding: 100px 0;
}

.section-dark {
    background: var(--bg2);
}

.section-title {
    text-align: center;
    margin-bottom: 55px;
}

.section-title p {
    color: var(--primary);
    font-size: 13px;
    letter-spacing: 3px;
    font-weight: bold;
}

.section-title h2 {
    font-size: 42px;
    margin-top: 8px;
}


/* ABOUT */

.about-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 60px;
    align-items: center;
}

.about-placeholder {
    width: 280px;
    height: 280px;
    margin: auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 110px;
    font-weight: 900;
    color: var(--primary);
    background:
        linear-gradient(
            135deg,
            rgba(0, 229, 255, 0.15),
            rgba(124, 92, 255, 0.15)
        );
    border: 1px solid var(--border);
    box-shadow: 0 0 60px rgba(0, 229, 255, 0.10);
}

.about-content h3 {
    font-size: 30px;
    margin-bottom: 18px;
}

.about-content p {
    color: var(--muted);
    margin-bottom: 16px;
}


/* CARDS */

.cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
}

.skill-card,
.service-card,
.project-card {
    padding: 28px;
    border: 1px solid var(--border);
    background: var(--card);
    border-radius: 18px;
    transition: 0.3s;
}

.skill-card:hover,
.service-card:hover,
.project-card:hover {
    transform: translateY(-7px);
    border-color: rgba(0, 229, 255, 0.35);
}

.card-icon {
    font-size: 35px;
    margin-bottom: 18px;
}

.skill-card h3,
.service-card h3,
.project-card h3 {
    margin-bottom: 10px;
}

.skill-card p,
.service-card p,
.project-card p {
    color: var(--muted);
}


/* PROJECTS */

.project-number {
    font-size: 14px;
    color: var(--primary);
    font-weight: bold;
    margin-bottom: 25px;
}

.project-link {
    display: inline-block;
    color: var(--primary);
    margin-top: 20px;
    font-weight: bold;
}


/* YOUTUBE */

.youtube-box {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 25px;
    align-items: center;
    padding: 35px;
    border: 1px solid var(--border);
    background: var(--card);
    border-radius: 20px;
}

.youtube-icon {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ff0033;
    font-size: 28px;
}

.youtube-label {
    color: #ff5475;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
}

.youtube-box h2 {
    margin: 5px 0;
}

.youtube-box p {
    color: var(--muted);
}


/* CONTACT */

.contact-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 50px;
}

.contact-info h3 {
    font-size: 30px;
    margin-bottom: 15px;
}

.contact-info > p {
    color: var(--muted);
    margin-bottom: 30px;
}

.contact-item {
    display: flex;
    gap: 15px;
    margin-bottom: 22px;
    align-items: flex-start;
}

.contact-item > span {
    font-size: 23px;
}

.contact-item strong {
    display: block;
    margin-bottom: 3px;
}

.contact-item a {
    color: var(--primary);
    word-break: break-word;
}

.contact-form-box {
    padding: 30px;
    border-radius: 18px;
    border: 1px solid var(--border);
    background: var(--card);
}

.input-group {
    margin-bottom: 18px;
}

.input-group label {
    display: block;
    margin-bottom: 7px;
    font-weight: bold;
}

.input-group input,
.input-group textarea {
    width: 100%;
    padding: 13px 15px;
    background: rgba(0, 0, 0, 0.2);
    color: white;
    border: 1px solid var(--border);
    border-radius: 9px;
    outline: none;
    font-family: inherit;
}

.input-group input:focus,
.input-group textarea:focus {
    border-color: var(--primary);
}

.input-group textarea {
    resize: vertical;
}

.form-message {
    margin-top: 15px;
    color: var(--primary);
}


/* FOOTER */

.footer {
    background: #050810;
    border-top: 1px solid var(--border);
}

.footer-content {
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

.footer h3 {
    font-size: 25px;
}

.footer p {
    color: var(--muted);
}

.footer-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.footer-links a {
    color: var(--muted);
}

.footer-links a:hover {
    color: var(--primary);
}

.footer-bottom {
    text-align: center;
    padding: 20px;
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 13px;
}


/* ANIMATION */

.animate {
    opacity: 0;
    transform: translateY(25px);
    transition: 0.7s ease;
}

.animate.show {
    opacity: 1;
    transform: translateY(0);
}


/* RESPONSIVE */

@media (max-width: 850px) {

    .nav-container {
        flex-direction: column;
        padding: 15px 0;
        gap: 12px;
    }

    .nav-links {
        gap: 13px;
        overflow-x: auto;
        width: 100%;
        justify-content: flex-start;
        padding-bottom: 3px;
    }

    .nav-links a {
        white-space: nowrap;
        font-size: 12px;
    }

    .hero {
        padding-top: 130px;
    }

    .about-grid,
    .contact-grid {
        grid-template-columns: 1fr;
    }

    .cards-grid {
        grid-template-columns: 1fr 1fr;
    }

    .youtube-box {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .youtube-icon {
        margin: auto;
    }

}


@media (max-width: 550px) {

    .section {
        padding: 75px 0;
    }

    .section-title h2 {
        font-size: 34px;
    }

    .hero h1 {
        font-size: 52px;
    }

    .hero h2 {
        font-size: 20px;
    }

    .hero-text {
        font-size: 16px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
    }

    .about-placeholder {
        width: 220px;
        height: 220px;
        font-size: 85px;
    }

    .footer-content {
        flex-direction: column;
    }

}
