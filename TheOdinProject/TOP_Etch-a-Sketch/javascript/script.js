
// !!!
// todo This code was one of my first projects ever, so... pls be kind!

//#region variables & values

// ? Constants
const wrapper = document.querySelector(".wrapper"),
 wrapper_right = document.querySelector(".sketchboard"),
 gridArray = document.querySelectorAll(".grid"),
 setResolution = document.querySelector(".btn-res"),
 removeDrawing = document.querySelector(".btn-rem"),
 colorPickerDrawing = document.querySelector("#colorPickerDrawing"),
 colorPickerBackground = document.querySelector("#colorPickerBackground"),
 colorPickerBorder = document.querySelector("#colorPickerBorder"),
 selectBorderSize = document.querySelector("#selectBorderSize"),
 resNum_first = document.querySelector(".resnumber-first"),
 resNum_second = document.querySelector(".resnumber-second"),
 bindbtn = document.querySelector(".bind-btn"),
 mylogo = document.querySelector(".mylogo"),
 githublogo = document.querySelector(".githublogo");

// ? DOM-Elements for translation 
const headline_div = document.querySelector(".headline-div"),
 headlineImage = document.querySelector(".headline-image"),
 headline_p1 = document.querySelector(".headline-p1"),
 headline_p2 = document.querySelector(".headline-p2"),
 headline_draw = document.querySelector("#headline-draw"),
 headline_remove = document.querySelector("#headline-remove"),
 changeResolution = document.querySelector(".change-resolution"),
 changeResolutionHeadline = document.querySelector(".change-resolution-headline"),
 resnumberTo = document.querySelector(".resnumber-to"),
 changeColour = document.querySelector(".change-colour"),
 changeColourHeadline = document.querySelector(".change-colour-headline"),
 borderText = document.querySelector(".border-text");

// ? Set starting values
resNum_first.value = 100
resNum_second.value = 100
colorPickerDrawing.value = "#fefefe" // set first drawing-colour #fefefe - white
colorPickerBackground.value = "#73d216" // set first background-colour #73d216 - green
colorPickerBorder.value = "#1d1d1d" // set first border-colour #1d1d1d - darkgrey;

//#endregion



//#region Language / Translation

// ? Setup Translation 
// get setted browser language and store it local storage
const language = localStorage.language || navigator.language
// This is not the best way, regexp would be better to proof of 'de'

language.substr(0, 3) === "de" ? localStorage.language = "de" : "en"

// ? English Library
function English(){
headline_div.title = "A Project-Work from Steve Bartl."
headline_p1.innerText = "Digital"
headline_p2.innerText = "Drawboard"
headline_draw.innerText = "leftMouse = draw"
headline_remove.innerText = "strg+leftMouse = remove"
headlineImage.alt = "Icon of an analog Etch-a-Sketch Game"
changeResolution.title = "Hint: Don't go higher than 100x100 due tue performance issues!"
changeResolutionHeadline.innerText = "Resolution-Size"
bindbtn.innerText = "unbind"
bindbtn.title = "Click to bind/unbind the x and y values!"
setResolution.innerText = "New Resolution"
setResolution.title = "Click to remove the actual sheet and a new one with the resolution you choose!"
removeDrawing.innerText = "Remove Drawing"
removeDrawing.title = "Click to remove the drawing and get a brandnew sheet of 'paper' !"
changeColour.title = "Change Drawing or Background-Colours!"
changeColourHeadline.innerText = "Colour"
colorPickerDrawing.innerText = "Drawing"
colorPickerBackground,innerText = "Background"
borderText.innerText = "Border"
mylogo.title = "Click to jump to my personal Portfolio!"
mylogo.alt = "My actual personal Logo"
githublogo.title="Click to jump to the Github-Repository of this project!"
githublogo.alt= "Github Logo"
}

// ? German Library
function German(){
headline_div.title = "Ein Projekt von Steve Bartl."
headline_p1.innerText = "Digitales"
headline_p2.innerText = "Reißbrett"
headline_draw.innerText = "Maus links = zeichnen"
headline_remove.innerText = "strg + Maus links = löschen"
headlineImage.alt = "Logo eines analogen Etch-a-Sketcch Spiels"
changeResolution.title = "Tipp: Bleibe unter 100x100 aus Perfomance Gründen!"
changeResolutionHeadline.innerText = "Auflösungs-Größe"
bindbtn.innerText = "lösen"
bindbtn.title = "Klicke um die x und y Werte zu binden / zu lösen!"
setResolution.innerText = "Neues Board"
setResolution.title = "Klicke um das aktuelle Blatt zu verwerfen und ein neues mit neuer Auflösung zu öffnen!"
removeDrawing.innerText = "Löschen"
removeDrawing.title = "Klicke um die Zeihung zu löschen und ein brandneues Blatt 'Papier* zu bekommen !"
changeColour.title = "Hintergung- und Zeihnungsfarbe ändern"
changeColourHeadline.innerText = "Farbe"
colorPickerDrawing.innerText = "Zeichung"
colorPickerBackground,innerText = "Hintergrund"
borderText.innerText = "Gitter"
mylogo.title = "Klicke um zu meiner persönlichen Portfolio-Page zu springen!"
mylogo.alt = "Mein aktuelles persönliches Logo"
githublogo.title="klicke um zum Guthub-Repository dieses Projekts zu springen!"
githublogo.alt= "Github Logo"
}

// ? Initial Translation
localStorage.language === "de" ? German() : English()


//#endregion



//#region Track state for left mouse button & strg kex

// ? left mouse button

let leftMouseButtonState = false;

function stateMouseButtons(e) {
   e.buttons === 1 ? leftMouseButtonState = true : leftMouseButtonState = false
}

document.addEventListener("mousedown", stateMouseButtons)
document.addEventListener("mouseup", stateMouseButtons);

// ? STRG key

let strgKeyState = false;

function stateKeySTRG(e) {
  e.ctrlKey === true ? strgKeyState = true : strgKeyState = false
}

document.addEventListener("keydown", stateKeySTRG);
document.addEventListener("keyup", stateKeySTRG);

//#endregion


//#region Functions

// ? Remove old wrapper-, create a new wrapper-Element and push it to DOM; R stands for RIGHT (-Side of the Layout)
function NewSketchboard() { 
  // Remove the old wrapper_right
  const oldSketchboard = document.querySelector(".sketchboard")
  oldSketchboard.remove()
  // Create new wrapper_right & append it
  const newSketchboard = document.createElement("div")
  newSketchboard.classList.add("sketchboard")
  wrapper.appendChild(newSketchboard)
}


// ? Functions to bind the numbers in the input forms to eachother
function DoubleFirst() {
  // Set second value to first
  document.querySelector(".resnumber-second").value =
    document.querySelector(".resnumber-first").value
}
function DoubleSecond() {
  // Set first value to second
  document.querySelector(".resnumber-first").value =
    document.querySelector(".resnumber-second").value
}


// ? Create the Cells od the Grid and append it to DOM
function CreateNewGrid(resNum_first, resNum_second) {
  // Get correct wrapper
  const sketchboard = document.querySelector(".sketchboard")

  // Calculate cell width and height
  const cellOffsetWidth =
    document.querySelector(".sketchboard").offsetWidth /
    document.querySelector(".resnumber-first").value
  const cellOffsetHeight =
    document.querySelector(".sketchboard").offsetHeight /
    document.querySelector(".resnumber-second").value

    // Create and append the first row
  for (let column = 0; column < resNum_first; column++) {
    let firstrow = document.createElement("div")
    firstrow.classList.add("grid-firstrow")
    sketchboard.appendChild(firstrow)
    // Create and append the columns
    for (let cellC = 0; cellC < resNum_second; cellC++) {
      let gridC = document.createElement("div")
      // Set grid cells attributes
      gridC.classList.add("grid")
      gridC.id = `C${column}R${cellC}`
      // gridC.style.height = `${cellOffsetHeight}px`
      // gridC.style.width = `${cellOffsetWidth}px`
      gridC.style.backgroundColor = colorPickerBackground.value
      // Append the grid cell to corresponend first row cell
      firstrow.appendChild(gridC)
    }
  }
}

// ? Add drawing function
function DrawAndRemoveFunction() {
  // get all cells of the grid
  const actualGridArray = document.getElementsByClassName("grid")
  // console.log(gridArrayA);
  // Loop trough grid array
  for (let cell = 0; cell < actualGridArray.length; cell++) {
    // Every cell get a Event-Listener
    actualGridArray[cell].addEventListener("mouseenter", function () {
      // if leftMouseButtonState === true....
      if(leftMouseButtonState){
        // ....and if the mouse enters the cell of the grid.....
        strgKeyState === true ? actualGridArray[cell].removeAttribute("data-active") : actualGridArray[cell].setAttribute("data-active", "1")
        strgKeyState === true ? actualGridArray[cell].style.backgroundColor = document.querySelector("#colorPickerBackground").value : actualGridArray[cell].style.backgroundColor = document.querySelector("#colorPickerDrawing").value
      }
    });
  }
}


// ? Set the border width and colour of the grid
function SetBorder (borderColour) {
  // Get actual grid and loop trogh it
  const actualGridArray = document.querySelectorAll(".grid")
  for (let cell = 0; cell < actualGridArray.length; cell++) { 
  actualGridArray[cell].style.border = `solid ${selectBorderSize.value}px ${document.querySelector("#colorPickerBorder").value}`
  }
}


// ? Set only border colour of the grid
function ChangeBorderColour () {
  // Get actual grid and loop trogh it
  const actualGridArray = document.querySelectorAll(".grid")
  for (let cell = 0; cell < actualGridArray.length; cell++) {
      actualGridArray[cell].style.borderColor = colorPickerBorder.value
  }
}


// ? Change the colour of the grid background
function ChangeBackgroundColour () {
  // Get actual grid and loopr trough it
  const actualGridArray = document.querySelectorAll(".grid")
  for (let cell = 0; cell < actualGridArray.length; cell++) {
    if (actualGridArray[cell].getAttribute("data-active") !== "1")
      // Select all cells which are not been drawed yet and change background color
      actualGridArray[cell].style.backgroundColor =
        document.querySelector("#colorPickerBackground").value
  };
};


// ? Change the colour to "draw"
function ChangeDrawingColour () {
  // Get actual grid and loop trogh it
  const actualGridArray = document.querySelectorAll(".grid")
  for (let cell = 0; cell < actualGridArray.length; cell++) {
    // If the cell has the attribute data-active set to "1", then it was hovered before and the background color is set to the Drawing color
    if (actualGridArray[cell].getAttribute("data-active") === "1")
      actualGridArray[cell].style.backgroundColor = colorPickerDrawing.value
  };
};


// ? Create a new sheet - removes old Wrapper, creates and append new one
function NewSheet(resNum_first, resNum_second) {
  NewSketchboard()
  CreateNewGrid(resNum_first, resNum_second)
  SetBorder()
  DrawAndRemoveFunction()
}


// ? Remove the drawing from the sheet
function RemoveSheet () {
  // Get actual grid and loop trough it
  const actualGridArray = document.querySelectorAll(".grid")
  for (let cell = 0; cell < actualGridArray.length; cell++) {
    // Set back the background to each cell to the color of the actual 'sheet'
    actualGridArray[cell].style.backgroundColor =
      actualGridArray[0].style.backgroundColor
  };
};


// ? Open a new browser tab 
function OpenInNewTab(href) {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: href,
  }).click()
}

//#endregion


//#region Event-Listener

// ? Bind the x value to the y value
resNum_first.addEventListener("input", DoubleFirst)
resNum_second.addEventListener("input", DoubleSecond)

// ? Toggle binding
bindbtn.addEventListener("click", () => {
  // Toggle bind data-attribute (at start it is set to on)
  bindbtn.getAttribute("data-bind") === "off"
    ? bindbtn.setAttribute("data-bind", "on")
    : bindbtn.setAttribute("data-bind", "off")

  // Binding depends on bind data-attribute state
  if (bindbtn.getAttribute("data-bind") === "on") {
    resNum_first.addEventListener("input", DoubleFirst)
    resNum_second.addEventListener("input", DoubleSecond)
    localStorage.language === "en" 
      ? document.querySelector(".bind-btn").innerText = "unbind"
      : document.querySelector(".bind-btn").innerText = "lösen"
    } else {
    resNum_first.removeEventListener("input", DoubleFirst)
    resNum_second.removeEventListener("input", DoubleSecond)
    localStorage.language === "en" 
      ? document.querySelector(".bind-btn").innerText = "bind"
      : document.querySelector(".bind-btn").innerText = "binden"
  }
});

// ? New grid with new Resolution 
setResolution.addEventListener("click", function () {
  // Invoke a New Sheet with correct (user input) values
  let newRes_first = document.querySelector(".resnumber-first").value
  let newRes_second = document.querySelector(".resnumber-second").value
  NewSheet(newRes_first, newRes_second)
})

// ? Remove the drawing 
removeDrawing.addEventListener("click", RemoveSheet)

// ? Change the color of the drawing
colorPickerDrawing.addEventListener("input", ChangeDrawingColour)

// ? Change the color of the background
colorPickerBackground.addEventListener("input", ChangeBackgroundColour)

// ? Change the color of the border
colorPickerBorder.addEventListener("input", ChangeBorderColour)

// ? Change the size of the border
selectBorderSize.addEventListener("input", SetBorder)

// ? Jump to my Portfolio
mylogo.addEventListener("click", ()=>{
  OpenInNewTab("https://stefanbartl.github.io/Portfolio/")
});

// ? Jump to the Project Github-Repository
githublogo.addEventListener("click", ()=>{
  OpenInNewTab("https://github.com/StefanBartl/Etch-a-Sketch")
});

//#endregion


// ?      === Start Application  ===

// Start / Initiate the application by invoking the grid with the starting values
(function startApp(){NewSheet(resNum_first.value, resNum_second.value)}())

