const languageText = document.querySelector(".language-text");

//#region Language / Translation

// ? Setup Translation 
// get setted language from local storage or browser language and store it there
const language = localStorage.language || navigator.language;
// This is not the best way, regexp would be better to proof of 'de'
language[0] === "d" && language[1] === "e" ? localStorage.language = "de" : "en";


// ? English Library
function English(){
  languageText.innerText = ".de";
  languageText.title = "Translate Page to German";
}

// ? German Library
function German(){
  languageText.innerText = ".en";
  languageText.title = "Übersetze diese Seite auf English";
}

// ? Initial Translation
localStorage.language === "en" ? English() : German();

// ? Change Language
languageText.addEventListener("click", ()=>{
  // Check for the actual language
  if(localStorage.language === "en"){
    // Invoke opposite language
    German();
    // Store new language in localStorage
    localStorage.language = "de";
  } else {
    English();
    localStorage.language = "en";
  };
})

//#endregion

