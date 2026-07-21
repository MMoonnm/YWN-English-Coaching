/* ==========================================
   LANGUAGE SYSTEM
========================================== */

const LANGUAGE_STORAGE_KEY = "site-language";

const DATA_PATH = window.location.pathname.includes("/programs/")
    ? "../data/"
    : "data/";

let currentLanguage = "en";
let translations = {};

/* ==========================================
   INITIALISE
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    currentLanguage = getSavedLanguage();

    await loadLanguage(currentLanguage);

    initialiseLanguageButtons();

});

/* ==========================================
   LOAD LANGUAGE
========================================== */
async function loadLanguage(lang){

    try{

        const response = await fetch(`${DATA_PATH}${lang}.json`);

        if(!response.ok){

            throw new Error(`Cannot load ${lang}.json`);

        }

        translations = await response.json();

        currentLanguage = lang;

        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        translatePage();

        updateLanguageButtons();

        document.documentElement.lang = currentLanguage;

        document.documentElement.classList.toggle(
            "lang-vi",
            currentLanguage === "vi"
        );

        document.documentElement.classList.toggle(
            "lang-en",
            currentLanguage === "en"
        );

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   BUTTON EVENTS
========================================== */
function initialiseLanguageButtons(){

    document.querySelectorAll("[data-lang]").forEach(button=>{

        button.addEventListener("click",()=>{

            const lang=button.dataset.lang;

            if(lang!==currentLanguage){

                loadLanguage(lang);

            }

        });

    });

}
/* click area */
document.querySelectorAll(".language-toggle").forEach(toggle=>{

    toggle.addEventListener("click",(e)=>{

        // Ignore clicks directly on EN or VI
        if(e.target.matches("[data-lang]")) return;

        loadLanguage(
            currentLanguage==="en"
                ? "vi"
                : "en"
        );

    });

});

/* ==========================================
   REMEMBER LANGUAGE
========================================== */

function getSavedLanguage(){

    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if(saved){

        return saved;

    }

    return navigator.language.toLowerCase().startsWith("vi")
        ? "vi"
        : "en";

}

/* ==========================================
   UPDATE TOGGLE
========================================== */
function updateLanguageButtons(){

    document.querySelectorAll("[data-lang]").forEach(button=>{

        button.classList.toggle(
            "active",
            button.dataset.lang===currentLanguage
        );

    });

    document.querySelectorAll(".language-toggle").forEach(toggle=>{

        toggle.classList.toggle(
            "vi",
            currentLanguage==="vi"
        );

    });

}

/* ==========================================
   TRANSLATE PAGE
========================================== */

function translatePage(){

    /* Normal Text */

    document.querySelectorAll("[data-i18n]").forEach(element=>{

        const value = getTranslation(
            element.dataset.i18n
        );

        if(value){

            element.textContent = value;

        }

    });

    /* HTML */

    document.querySelectorAll("[data-i18n-html]").forEach(element=>{

        const value = getTranslation(
            element.dataset.i18nHtml
        );

        if(value){

            element.innerHTML = value;

        }

    });

    /* Placeholder */

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element=>{

        const value = getTranslation(
            element.dataset.i18nPlaceholder
        );

        if(value){

            element.placeholder = value;

        }

    });

    /* Title Attribute */

    document.querySelectorAll("[data-i18n-title]").forEach(element=>{

        const value = getTranslation(
            element.dataset.i18nTitle
        );

        if(value){

            element.title = value;

        }

    });

}

/* ==========================================
   GET NESTED JSON VALUE
========================================== */

function getTranslation(path){

    return path.split(".").reduce((obj,key)=>{

        return obj ? obj[key] : null;

    },translations);

}