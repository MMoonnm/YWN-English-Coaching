const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".mobile-overlay");

/* =========================
   OPEN / CLOSE MENU
========================= */

function openMenu() {

    hamburger.classList.add("active");
    mobileMenu.classList.add("open");
    overlay.classList.add("show");

    document.body.classList.add("menu-open");

}

function closeMenu() {

    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
    overlay.classList.remove("show");

    document.body.classList.remove("menu-open");

}

/* =========================
   HAMBURGER
========================= */

hamburger.addEventListener("click", () => {

    if (mobileMenu.classList.contains("open")) {

        closeMenu();

    } else {

        openMenu();

    }

});

/* =========================
   TAP OUTSIDE TO CLOSE
========================= */

overlay.addEventListener("click", closeMenu);

/* =========================
   CLOSE AFTER CLICKING A LINK
========================= */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

/* =========================
   ACCORDION
========================= */

document.querySelectorAll(".mobile-expand").forEach(button => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        button.closest(".mobile-group").classList.toggle("active");

    });

});

/* =========================
   RESET ON DESKTOP
========================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});