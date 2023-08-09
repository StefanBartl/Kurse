//#region Table of Content
/*
!                         To-do-List Main-Javascript-File
?                                      powered by
!                                      Stefan Bartl
!                        (WKDSteVIE / WKDMinerva)
?                                            2022             
?                  ________________________________                                                                                                                                                                                                  
!                                     Table of content              
?                                       -) Language     
?                                       -)  Open Jobs
todo                 Javascript - what a wonderful language!
*/
//#endregion


//#region Open Jobs  
/*
todo    
*/
//#endregion


//#region Declaration

// ? Language translation
// Get setted language from local storage or browser language and store it there
const language = localStorage.language || navigator.language;
const languageText = document.querySelector(".language-translate");


//#endregion


//#region Language & Translation

// ? Setup Translation 
language[0] === "d" && language[1] === "e" ? localStorage.language = "de" : "en";


// ! Libraries
// If the page have less text, do library here in script.js
function English() {
}

function German() {
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

