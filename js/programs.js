const cards = document.querySelectorAll(".program-card");

cards.forEach(card=>{

    const header = card.querySelector(".program-header");

    header.addEventListener("click",()=>{

        cards.forEach(c=>{

            if(c!==card){

                c.classList.remove("active");

            }

        });

        card.classList.toggle("active");

    });

});