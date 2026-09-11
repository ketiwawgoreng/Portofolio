// ========================================
// PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ELEMENTS
    // ========================================

    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector("nav");
    const navContainer = document.querySelector(".nav-container");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");


    // ========================================
    // 1. NAVBAR ACTIVE LINK + SHRINK
    // ========================================

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }


    function updateNavbar() {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }


    window.addEventListener("scroll", () => {
        updateActiveNav();
        updateNavbar();
    });

    updateActiveNav();
    updateNavbar();


    // ========================================
    // 2. MOBILE NAVBAR
    // ========================================

    if (nav && navContainer) {

        const menuButton = document.createElement("button");

        menuButton.innerHTML = "☰";
        menuButton.className = "menu-toggle";
        menuButton.setAttribute("aria-label", "Open menu");

        navContainer.appendChild(menuButton);

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("open");

            const isOpen = nav.classList.contains("open");

            menuButton.innerHTML = isOpen ? "×" : "☰";

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");
                menuButton.innerHTML = "☰";

            });

        });

    }


    // ========================================
    // 3. SCROLL REVEAL + BLUR
    // ========================================

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-container, " +
        ".skill-card, " +
        ".portfolio-card, " +
        ".timeline-item, " +
        ".service-card, " +
        ".achievement-card, " +
        ".testimonial-card, " +
        ".contact-container"
    );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        observer.observe(element);
    });


    // ========================================
    // 4. STAGGER CARD ANIMATION
    // ========================================

    const cardGroups = [
        ".skills-grid",
        ".achievement-grid",
        ".services-grid"
    ];


    cardGroups.forEach((groupSelector) => {

        const cards = document.querySelectorAll(
            `${groupSelector} > *`
        );

        cards.forEach((card, index) => {

            card.style.setProperty(
                "--delay",
                `${index * 0.12}s`
            );

        });

    });


    // ========================================
    // 5. BACK TO TOP
    // ========================================

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ========================================
    // 6. TYPING EFFECT
    // ========================================

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "UI/UX Designer",
            "Graphic Designer",
            "Web Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;


        function typingEffect() {

            const currentWord = words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;


                if (charIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typingEffect, 1500);

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex === words.length) {
                        wordIndex = 0;
                    }

                }

            }


            setTimeout(
                typingEffect,
                deleting ? 60 : 100
            );

        }


        typingEffect();

    }


    // ========================================
    // 7. INTERACTIVE CARD TILT
    // ========================================

    function addInteractiveEffect(selector) {

        const cards = document.querySelectorAll(selector);


        cards.forEach((card) => {

            card.classList.add("interactive-card");


            card.addEventListener("mousemove", (event) => {

                if (window.innerWidth <= 768) return;


                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;


                const percentX =
                    (x / rect.width) * 100;

                const percentY =
                    (y / rect.height) * 100;


                card.style.setProperty(
                    "--mouse-x",
                    `${percentX}%`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${percentY}%`
                );


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.03)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            });

        });

    }


    addInteractiveEffect(".timeline-content");
    addInteractiveEffect(".service-card");
    addInteractiveEffect(".achievement-card");
    addInteractiveEffect(".testimonial-card");
    addInteractiveEffect(".skill-card");


    // ========================================
    // 8. HERO PHOTO PARALLAX
    // ========================================

    const interactivePhoto =
        document.querySelector(".interactive-photo");

    if (interactivePhoto) {

        const paperBack =
            interactivePhoto.querySelector(".paper-back");

        const photoNote =
            interactivePhoto.querySelector(".photo-note");

        const sticker =
            interactivePhoto.querySelector(".sticker");


        interactivePhoto.addEventListener("mousemove", (event) => {

            if (window.innerWidth <= 768) return;


            const rect =
                interactivePhoto.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;


            interactivePhoto.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;


            const moveX =
                ((x - centerX) / centerX) * 10;

            const moveY =
                ((y - centerY) / centerY) * 10;


            if (paperBack) {

                paperBack.style.transform =
                    `translate(${-moveX}px, ${-moveY}px)
                     rotate(5deg)`;

            }


            if (photoNote) {

                photoNote.style.transform =
                    `translate(${moveX * 0.7}px, ${moveY * 0.7}px)
                     rotate(5deg)`;

            }


            if (sticker) {

                sticker.style.transform =
                    `translate(${moveX * -0.5}px, ${moveY * -0.5}px)
                     rotate(-12deg)`;

            }

        });


        interactivePhoto.addEventListener("mouseleave", () => {

            interactivePhoto.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";


            if (paperBack) {
                paperBack.style.transform = "rotate(5deg)";
            }


            if (photoNote) {
                photoNote.style.transform = "rotate(5deg)";
            }


            if (sticker) {
                sticker.style.transform = "rotate(-12deg)";
            }

        });

    }


    // ========================================
    // 9. CURSOR GLOW
    // ========================================

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorGlow);


    document.addEventListener("mousemove", (event) => {

        if (window.innerWidth <= 768) return;


        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });


    // ========================================
    // 10. PORTFOLIO HOVER
    // ========================================

    const portfolioCard =
        document.querySelector(".portfolio-card");


    if (portfolioCard) {

        portfolioCard.addEventListener("mousemove", (event) => {

            if (window.innerWidth <= 768) return;


            const rect =
                portfolioCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const percent =
                (x / rect.width) * 100;


            portfolioCard.style.setProperty(
                "--portfolio-x",
                `${percent}%`
            );

        });

    }

}); 