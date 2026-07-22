/* =====================================================WEB DESIGN PAGE LYM GROUP===================================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ==========================================HERO PARALLAX========================================== */

    const heroImage = document.querySelector(".web-hero-image");

    if (heroImage) {

        window.addEventListener("mousemove", (e) => {

            const x = (window.innerWidth / 2 - e.clientX) / 45;
            const y = (window.innerHeight / 2 - e.clientY) / 45;

if (heroImage) {
    heroImage.style.transform =
    `translate(${x}px,${y}px)`;

        });

    }

/* ==========================================GALLERY HOVER========================================== */

    const galleryCards = document.querySelectorAll(".gallery-card");

    galleryCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 10;

            const rotateX =
                ((y / rect.height) - 0.5) * -10;

            card.style.transform =

                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

/* ==========================================TECH CARD FLOAT========================================== */

    document.querySelectorAll(".tech-card")

    .forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-12px) scale(1.04)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

/* ==========================================PROCESS ANIMATION========================================== */

    const processCards =
        document.querySelectorAll(".process-card");

    const processObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        }, {

            threshold: .25

        });

    processCards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(70px)";

        card.style.transition =
            ".8s ease";

        processObserver.observe(card);

    });

/* ==========================================FAQ ACCORDION========================================== */

    document.querySelectorAll(".faq-item")

    .forEach(item => {

        const p = item.querySelector("p");

        if (!p) return;

        p.style.maxHeight = "0";

        p.style.overflow = "hidden";

        p.style.transition =
            ".45s ease";

        item.addEventListener("click", () => {

            const opened =
                item.classList.contains("open");

            document.querySelectorAll(".faq-item")

            .forEach(el => {

                el.classList.remove("open");

                const text =
                    el.querySelector("p");

                if (text)
                    text.style.maxHeight = "0";

            });

            if (!opened) {

                item.classList.add("open");

                p.style.maxHeight =
                    p.scrollHeight + "px";

            }

        });

    });

/* ==========================================NUMBER COUNTER========================================== */

    const stats =
        document.querySelectorAll(".statistics h2");

    const statObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter =
                    entry.target;

                const target =
                    parseInt(counter.innerText);

                let current = 0;

                const update = () => {

                    current +=
                        Math.ceil(target / 70);

                    if (current < target) {

                        counter.innerText =
                            current + "+";

                        requestAnimationFrame(update);

                    } else {

                        counter.innerText =
                            target + "+";

                    }

                };

                update();

                statObserver.unobserve(counter);

            });

        });

    stats.forEach(stat => {

        statObserver.observe(stat);

    });

/* ==========================================CTA PARALLAX========================================== */

    const cta =
        document.querySelector(".cta-box");

    if (cta) {

        cta.addEventListener("mousemove", e => {

            const rect =
                cta.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            cta.style.background =

                `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(200,164,107,.15),
                    white 70%
                )`;

        });

        cta.addEventListener("mouseleave", () => {

            cta.style.background = "white";

        });

    }

/* ==========================================SCROLL REVEAL========================================== */

    const revealItems =

        document.querySelectorAll(

            ".category-card,.gallery-card,.tech-card,.process-card,.faq-item"

        );

    const revealObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {

            threshold: .15

        });

    revealItems.forEach(item => {

        item.classList.add("hidden");

        revealObserver.observe(item);

    });

/* ==========================================CONSOLE========================================== */

    console.log(

        "%cWeb Design Page Ready",

        "color:#C8A46B;font-size:18px;font-weight:bold;"

    );

});