const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.8
});

document.querySelectorAll(".section-heading h2").forEach(el=>{
    observer.observe(el);
});

document.querySelectorAll(".program-tile").forEach(el=>{
    observer.observe(el);
});