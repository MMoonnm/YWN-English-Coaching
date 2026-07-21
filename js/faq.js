// ==========================
// HOMEPAGE FAQ
// ==========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.querySelector(".faq-question").addEventListener("click", () => {

        faqItems.forEach(i => {

            if (i !== item) {
                i.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


// ==========================
// PARENTS PAGE POLICIES
// ==========================

const policyCards = document.querySelectorAll(".policy-card");

policyCards.forEach(card => {

    card.querySelector(".policy-header").addEventListener("click", () => {

        policyCards.forEach(c => {

            if (c !== card) {
                c.classList.remove("active");
            }

        });

        card.classList.toggle("active");

    });

});