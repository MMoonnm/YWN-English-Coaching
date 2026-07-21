const cards = [...document.querySelectorAll(".testimonial-card")];

const filterButtons = document.querySelectorAll(".testimonial-filter button");

const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentFilter = "all";

let visibleCount = 0;

function cardsPerLoad(){

    if(window.innerWidth <= 600){

        return 1;

    }

    return 2;

}

function filteredCards(){

    if(currentFilter === "all"){

        return cards;

    }

    if(currentFilter === "parent"){

        return cards.filter(card =>
            card.dataset.role === "parent"
        );

    }

    return cards.filter(card =>
        card.dataset.program === currentFilter
    );

}

function renderCards(reset=false){

    const visibleCards = filteredCards();

    const amount = cardsPerLoad();

    if(reset){
        visibleCount = amount;
    }

    cards.forEach(card=>{
        card.classList.remove("show");
    });

    visibleCards
        .slice(0,visibleCount)
        .forEach(card=>{
            card.classList.add("show");
        });

    if(visibleCount >= visibleCards.length){

        loadMoreBtn.style.display="none";
    }

    else{
        loadMoreBtn.style.display="inline-flex";
    }

}

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{
        filterButtons.forEach(btn=>btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;

        renderCards(true);
    });
});

loadMoreBtn.addEventListener("click",()=>{
    visibleCount += cardsPerLoad();

    renderCards();
});

window.addEventListener("resize",()=>{
    renderCards(true);
});

renderCards(true);