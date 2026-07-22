"use strict";

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.transition = ".6s";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }

});


/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        menuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

}


/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

if (navLinks && menuBtn) {

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuBtn.classList.remove("active");

        });

    });

}


/* ==========================================
   STICKY HEADER
========================================== */

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

    });

}


/* ==========================================
   SCROLL PROGRESS
========================================== */

const progressBar = document.querySelector(".progress-bar");

if (progressBar) {

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progressHeight =
            (window.pageYOffset / totalHeight) * 100;

        progressBar.style.width = progressHeight + "%";

    });

}


/* ==========================================
   BACK TO TOP
========================================== */

const backTop = document.getElementById("backToTop");

if (backTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ==========================================
   REVEAL ANIMATION
========================================== */

const reveals = document.querySelectorAll(
    ".section, .project-card, .service-card, .info-card, .testimonial-card, .stat-card"
);

if (reveals.length > 0) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach((el) => {

        el.classList.add("hidden");
        revealObserver.observe(el);

    });

}


/* ==========================================
   COUNTER
========================================== */

const counters = document.querySelectorAll(".stat-card h2");

if (counters.length > 0) {

    const speed = 150;

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                parseInt(counter.innerText.replace(/\D/g, "")) || 0;

            const updateCounter = () => {

                let current =
                    parseInt(counter.dataset.count || "0");

                const increment =
                    Math.max(1, Math.ceil(target / speed));

                if (current < target) {

                    current += increment;

                    if (current > target)
                        current = target;

                    counter.dataset.count = current;

                    counter.innerText = current + "+";

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

if (sections.length > 0 && navItems.length > 0) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (window.pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}


/* ==========================================
   PARALLAX HERO
========================================== */

const heroImage = document.querySelector(".hero-image");

if (heroImage) {

    window.addEventListener("mousemove", (e) => {

        const x =
            (window.innerWidth / 2 - e.pageX) / 40;

        const y =
            (window.innerHeight / 2 - e.pageY) / 40;

        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursor = document.querySelector(".cursor");

if (cursor) {

    window.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll("a, button").forEach(el => {

        el.addEventListener("mouseenter", () => {

            cursor.style.width = "55px";
            cursor.style.height = "55px";

        });

        el.addEventListener("mouseleave", () => {

            cursor.style.width = "22px";
            cursor.style.height = "22px";

        });

    });

}


/* ==========================================
   BUTTON RIPPLE
========================================== */

document.querySelectorAll(".btn-primary").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        circle.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        circle.style.left =
            (e.clientX - rect.left) + "px";

        circle.style.top =
            (e.clientY - rect.top) + "px";

        this.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});


/* ==========================================
   READY
========================================== */

console.log(

    "%cLYM GROUP Website Ready",

    "color:#C8A46B;font-size:18px;font-weight:bold;"

);