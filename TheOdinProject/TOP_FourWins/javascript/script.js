//#region 1) general settings & set-up pages

//? === game object for storing all important game properties ===

const Game = {
  // Game Object for storing important values in variables. Collected access via Game.[variable]
  // Setting the Gameboard arrays to keep Coin placements
  gameboard_size_x: 7,
  gameboard_size_y: 6,
  user_changed_gameboard: false,
  actualGameboardPlayer1: {},
  actualGameboardPlayer2: {},
  player1_coins: [],
  player2_coins: [],
  all_coins: [],
  rowCounter: [],
  clicked_column: undefined,
  clicked_TopCell_ID: "",
  // Setting variable to know who is on turn
  playerIsOnTurn: "right",
  // Setting a counter for the played rounds
  roundCounter: 0,
  // Hold if it is a game against CPU and the Level
  Game_against_CPU: false,
  CPU_Level: "none",
  //Count the wins in this session
  Player_1_wins: 0,
  Player_2_wins: 0,
  Draws: 0,
  // Standard is: Left Yellow / Right Red
  player_Colour_Left: "yellow",
  Sound: false,
  animations: "true",
  state: "startingScreen",
};

//#region game settings

//? === set attribute-marker for smartphones/small devices ===
// at start...
if (window.innerWidth < 767.98) {
  settings_span.setAttribute("data-device", "smart");
  settings_menu.setAttribute("data-device", "smart");
  // console.log("Small Device");
}

//? === reset gameboard size values and than create new gameboard ===
document.getElementById("settings_gameboard_sizeX").value = 7;
document.getElementById("settings_gameboard_sizeY").value = 6;
Create_Gameboard(
  document.getElementById("settings_gameboard_sizeX").value,
  document.getElementById("settings_gameboard_sizeY").value
);

Set_Page_Language();

//#region audio

//? === set sound ===
Game.Sound = localStorage.Sound || false;
Correct_Sound_Setting();

sound_checkbox.addEventListener("click", () => {
  if (sound_checkbox.checked === true) {
    localStorage.Sound = true;
    Game.Sound = true;
  } else {
    localStorage.Sound = false;
    Game.Sound = false;
  }
});

//? === assign variables for audio files ===

// confirm audio sample
const warning_audio = new Audio(
  "audio/freesound_com/OneHits/chord-alert-notification.wav"
);

// loose against CPU audio sample
const lost_audio = new Audio("audio/freesound_com/loose.wav");

// winning cheer audio sample
const win_audio = new Audio(
  "audio/freesound_com/klankbeeld__choir-sing-a-final-01.wav"
);

// placement audio sample
const placing_audio = new Audio(
  "audio/freesound_com/OneHits/garuda1982__plop-sound-effect.wav"
);

//? === preload audio if sound is on ===

if (Game.Sound === true) {
  warning_audio.load();
  lost_audio.load();
  win_audio.load();
  placing_audio.load();
}

//#endregion

//#region set coin colour

// ? === set coin colour ===

Game.player_Colour_Left = localStorage.Player_Colour_Left || "yellow";
if (Game.player_Colour_Left === "red") {
  toggle_colour_button.classList.add("toggle__colour");
  toggle_colour_slider.style.backgroundColor = "red";
} else {
  toggle_colour_button.classList.remove("toggle__colour");
  toggle_colour_slider.style.backgroundColor = "yellow";
}

//#endregion

//#region set correct names

//? === set player to stored names ===

if (localStorage.Player_One_Name)
  player_1_name.value = localStorage.Player_One_Name;
if (localStorage.Player_Two_Name)
  player_2_name.value = localStorage.Player_Two_Name;

//? === store player names ===

// save names from input in local storage
Push_to_LocalStorage(
  "player1_name_svg",
  "input__player1_name",
  "Player_One_Name",
  "click"
);

Push_to_LocalStorage(
  "player2_name_svg",
  "input__player2_name",
  "Player_Two_Name",
  "click"
);

// hover animations for circles after name-inputs
Swap_Two_Classes_by_Events(
  "player1_name_svg",
  "mouseenter",
  "mouseleave",
  "Class_Buttons_Add_Hover_Animations_1",
  "Class_Buttons_Remove_Hover_Animations_1"
);

Swap_Two_Classes_by_Events(
  "player2_name_svg",
  "mouseenter",
  "mouseleave",
  "Class_Buttons_Add_Hover_Animations_2",
  "Class_Buttons_Remove_Hover_Animations_2"
);

/* ==================================
         Set correct Names Event-Listener 
         ================================= */
choose_ki.addEventListener("change", () => {
  // Set correct names after choosing "Play against"
  // If "Play against CPU = No" is selected, make sure "No" isn"t the name of Player Two
  if (choose_ki.value === "No") {
    player_2_name.value = localStorage.Player_Two_Name || "Player 2";
  }
  // If it is a game against CPU, set Player Two Name to CPU Level
  else if (Game.Language === "de" && choose_ki.value === "CPU Easy")
    document.getElementById("input__player2_name").value =
      "Einfacher CPU Gegner";
  else if (Game.Language !== "de" && choose_ki.value === "CPU Easy")
    document.getElementById("input__player2_name").value = "Easy CPU Opponent";
  else if (Game.Language === "de" && choose_ki.value === "CPU Normal")
    document.getElementById("input__player2_name").value =
      "Normaler CPU Gegner";
  else if (Game.Language !== "de" && choose_ki.value === "CPU Normal")
    document.getElementById("input__player2_name").value =
      "Normal CPU Opponent";
});
/* =======================================
         Showing Name is saved Event-Listeners 
         ====================================== */
player_1_svg.addEventListener("click", () => {
  //console.log("Player 1 name saved to local Storage.");
  // Create notiification element
  let notificationL = document.createElement("h3");
  notificationL.innerText = "Name saved!";
  notificationL.style.width = "100%";
  notificationL.id = "saveNameP1";
  // Push it to DOM
  left_sidebar.appendChild(notificationL);
  // Smooth showing if animation is on
  if (Game.animations === "true") {
    notificationL.classList.add("Class_Smooth_In");
    // Smooth removing after 3 seconds
    setTimeout(() => {
      notificationL.classList.remove("Class_Smooth_In");
      notificationL.classList.add("Class_Smooth_Out");
    }, 3000);
  }
  // Remove it from DOM
  setTimeout(() => {
    notificationL.remove();
  }, 4000);
});

player_2_svg.addEventListener("click", () => {
  //console.log("Player 2 name saved to local Storage.");
  let notification = document.createElement("h3");
  notification.innerText = "Name saved!";
  notification.style.width = "100%";
  notification.id = "saveNameP2";
  right_sidebar.appendChild(notification);
  if (Game.animations === "true") {
    notification.classList.add("Class_Smooth_In");
    setTimeout(() => {
      notification.classList.remove("Class_Smooth_In");
      notification.classList.add("Class_Smooth_Out");
    }, 3000);
  }
  setTimeout(() => {
    notification.remove();
  }, 4000);
});

//#endregion

//#region settings-menu setup

//? === update stats ===

Stats();

//! Not ready, bugs, so disabled
//? ===  proof firing animations === 

// Game.animations = localStorage.animations || "true";
// if (Game.animations === "true") {
//   settings_span.classList.add("colourAnimation");
//   start_button.classList.add("colourAnimation");
//   document.getElementById("headline").classList.add("colouredTextAnimation");
//   aniToggle_checkbox.checked = true;
// } else {
//   aniToggle_checkbox.checked = false;
// }

//? === set display device state ===

window.addEventListener("resize", () => {
  // width under ~770px change to small device
  if (window.innerWidth < 767.98) {
    settings_span.setAttribute("data-device", "smart");
    settings_menu.setAttribute("data-device", "smart");
    //  console.log("Small Device");
  } else {
    settings_span.setAttribute("data-device", "default");
    settings_menu.setAttribute("data-device", "default");
    //  console.log("Default Device");
  }
});

//? === if [data-device: desktop] attach the menu animation ===
if (settings_menu.getAttribute("data-device") === "default") {
  settings_span.addEventListener("mouseenter", () => {
    // if the menu is hovered and there is the show class attached, remove multiple classes,  then trigger show animation
    if (!settings_span.classList.contains("Class_Show_Settings")) {
      settings_span.classList.remove("Class_Hide_Settings");
      settings_span.classList.remove("colourAnimation");
      settings_span.classList.add("Class_Show_Settings");
    }
  });

  main_wrapper.addEventListener("mouseenter", () => {
    // if the  menu is leaved to the main wrapper and there is the showing class attached, remove multiple classes, then trigger hide animatiom
    if (settings_span.classList.contains("Class_Show_Settings")) {
      settings_span.classList.remove("Class_Show_Settings");
      settings_span.classList.add("Class_Hide_Settings");
    }

    // if menu animation is not setted of, attach animation class after small delay to make sure the triggered hide animation is fired
    if (Game.animations === "true") {
      setTimeout(() => {
        settings_span.classList.remove("Class_Hide_Settings");
        settings_span.classList.add("colourAnimation");
      }, 10);
    }
  });

  document.querySelector("header").addEventListener("mousemove", () => {
    // if the menu is leaved to the header and there is the showing class attached, remove multiple classes, then trigger hide animatiom
    if (settings_span.classList.contains("Class_Show_Settings")) {
      settings_span.classList.remove("Class_Show_Settings");
      settings_span.classList.add("Class_Hide_Settings");

      if (Game.animations === "true") {
        setTimeout(() => {
          settings_span.classList.remove("Class_Hide_Settings");
          settings_span.classList.add("colourAnimation");
        }, 10);
      }
    }
  });
}

//#endregion

//#region settings-menu event-listeners

//? === game informations window  ===

info_h.addEventListener("click", () => {
  //console.log("Information window clicked");

  if (Game.Language === "de") {
    New_Window({
      ID: "ID_Info_Window",
      Name: info_h.innerText,
      Alert: true,
      Variable: "Game Info",
      Text: `Online-4-Gewinnt

1) Das Ziel des Spiels ist es 4 Spielsteine (Coins) nebeneinander, übereinander oder diagonal legen zu können.
Die/der erste SpielerIn, welche dies schafft hat die Runde gewonnen.
2) Die darauffolgende Runde beginnt der/die Verlierer_in aus der Vorrunde. (Gleicht spielerische Vorteile aus)
3) Ein Unentschieden tritt ein, wenn kein Stein mehr spielbar ist und nimmt gewonnen hat. In diesem Fall beginnt derjenige, der nicht den letzten Spielzug machte.

Informationen & Einstellungs-Menü:
Es ist nur jeweils vor dem Spiel möglich die Größe des Gameboards zu verändern. Andererseits würde es die Möglichkeit eröffnen sich unfaire Vorteile zu verschaffen!
Standardgröße ist 7 Spalten und 6 Reihen - Einwurfreihe exklusive.
Jede Zelle hat ein 1:1 Höhen und Seitenverhältniss, deswegen werden die Spielfeldzellen kleiner  je mehr Spalten gewählt werden.
Dies ist auch der Grund warum mit unrealistisch großer Differenz von Spalten und Reihen die Einwurfanimation immer ungenauer wird, da sich die Distanzen auf den verschiedenen Spieler-Bildschirmen mit meinen einfachen Mitteln nicht mehr berechnen lassen.

Eine Farbwahl der Spielsteine ist möglich - auch während des Spieles. 
Grundeinstellung ist Gelb für den / die linke Spieler_in und Rot für das Gegenüber.

Der Sound hat eine On/Off Funktion. und es ist möglich zwischen Deutscher und Englischer Sprache zu wählen.
Ebenso ist es möglich alle Animationen auszuschalten.
Bei Spielen gegen den Computer wird der Spielausgang in einer Statistik aufgezeichnet. Diesen findet man in den Spieleinstellungen unter "Statistiken gegen den CPU".
Diese Statistiken kann man separat zurücksetzen.

Die Einstellungen Sound, Sprache, Statistiken gegen den CPU sowie gespeicherte Spielernamen werden in Ihrem Browser gespeichert. So ist es möglich, dass Sie den Browser schließen
und die Einstellungen trotzdem erhalten bleiben. Wollen Sie diese Einstellungen löschen, so können Sie dies im Einstellungs-Menü ganz unten mit Klick auf "Alles löschen" tun.
`,
    });
  } else {
    New_Window({
      ID: "ID_Info_Window",
      Name: info_h.innerText,
      Alert: true,
      Text: `Online-4-Wins

      1) The aim of the game is to be able to place 4 tokens (coins) next to each other, on top of each other or diagonally.
      The first player to do this wins the round.
      2) The following round starts with the loser from the previous round. (Balances game advantages)
      3) A tie occurs when there is no more playable checker and has won. In this case, the player who did not make the last move begins.
      
      Information & Settings menu:
      It is only possible to change the size of the gameboard before each game. On the other hand, it would open up the possibility of gaining unfair advantages!
      Standard size is 7 columns and 6 rows - excluding throw-in row.
      Each cell has a 1:1 height and aspect ratio, so the more columns you choose, the smaller the gamefield cells will be.
      This is also the reason why the throw-in animation becomes less and less precise with unrealistically large differences in columns and rows, since the distances on the various player screens can no longer be calculated with my simple means.

      A color choice of the game pieces is possible - even during the game.
      The basic setting is yellow for the player on the left and red for the opponent.
      
      The sound has an on/off function. and it is possible to choose between German and English language.
      Also it's possible to turn of all animations.
      When playing against the computer, the outcome of the game is recorded in a statistic. This can be found in the game settings under "Stats vs. CPU".
      These statistics can be reset separately.
      
      The settings sound, language, statistics against the CPU and saved player names are saved in your browser. So it is possible that you close the browser
      and the settings are retained. If you want to delete these settings, you can do this in the settings menu at the bottom by clicking on "Delete all".
`,
    });
  }
});

//? === create a new gameboard button ===

document
  .getElementById("settings_gameboard_button")
  .addEventListener("click", () => {
    //console.log("Create new gameboard clicked");

    const sizeX = document.getElementById("settings_gameboard_sizeX").value;
    const sizeY = document.getElementById("settings_gameboard_sizeY").value;
    Create_Gameboard(sizeX, sizeY);
    Game.user_changed_gameboard = true;
  });

//? === toggle the coin colour ===

document
  .getElementById("container__toggleColour")
  .addEventListener("click", () => {
    //console.log("Colour toggle clicked");

    if (
      localStorage.Player_Colour_Left === "yellow" ||
      localStorage.Player_Colour_Left === undefined
    ) {
      //console.log("Set colour toggle to red.");
      localStorage.Player_Colour_Left = "red";
      Game.player_Colour_Left = "red";
      toggle_colour_button.classList.add("toggle__colour");
      toggle_colour_slider.style.backgroundColor = "red";
      // console.log("Colour toggle changed colour for future coins to red.")
    } else if (localStorage.Player_Colour_Left === "red") {
      // console.log("Set colour toggle to yellow.")
      localStorage.Player_Colour_Left = "yellow";
      Game.player_Colour_Left = "yellow";
      toggle_colour_button.classList.remove("toggle__colour");
      toggle_colour_slider.style.backgroundColor = "yellow";
      // console.log("Colour toggle changed colour for future coins to yellow.")
    }

    // changing colour of existing coins
    if (Game.state == "InGame") {
      const cellsArray = document.getElementsByClassName("cells");
      //Loops trough cellsArray
      for (let cell of cellsArray) {
        // if one cell have tht Class with a red or yellow Coin Background attached, change it to the other colored background (PNG)
        if (cell.classList.contains("placedCoin__1")) {
          cell.classList.remove("placedCoin__1");
          cell.classList.add("placedCoin__2");
        } else if (cell.classList.contains("placedCoin__2")) {
          cell.classList.remove("placedCoin__2");
          cell.classList.add("placedCoin__1");
        }
        // console.log("Existing coins changed colour.");
      }
    }
  });

//? === change the game language (en/ger) ===

language_menu.addEventListener("change", () => {
  //console.log("Set language clicked");

  // save language in local storage and game object
  let languageCode;
  language_menu.value === "Deutsch"
    ? (languageCode = "de")
    : (languageCode = "en");
  localStorage.Language = languageCode;
  localStorage.LanguageIsSetttedByUser = true;
  Game.Language = languageCode;
  Game.LanguageIsSetttedByUser = true;
  // make sure that a manually setted setted language is not overwritten by the default detected default browser language
  Translate_StartScreen(languageCode, true);

  // if exist yet, translate actual turning div
  if (document.getElementById("h__turnDiv")) {
    // deutsch
    if (Game.Language === "de") {
      if (Game.playerIsOnTurn === "left") {
        document.getElementById(
          "h__turnDiv"
        ).innerText = `Dein Zug, ${Game.Player_One_Name}`;
      } else if (
        Game.playerIsOnTurn === "right" &&
        Game.Game_against_CPU === false
      ) {
        document.getElementById(
          "h__turnDiv"
        ).innerText = `Du bist dran, ${Game.Player_Two_Name}`;
      } else {
        document.getElementById(
          "h__turnDiv"
        ).innerText = `${Game.Player_Two_Name} denkt nach...`;
      }
    } else {
      // english
      if (Game.playerIsOnTurn === "left") {
        document.getElementById(
          "h__turnDiv"
        ).innerText = `Your turn, ${Game.Player_One_Name}`;
      } else if (
        Game.playerIsOnTurn === "right" &&
        Game.Game_against_CPU === false
      ) {
        document.getElementById(
          "h__turnDiv"
        ).innerText = `Do you best, ${Game.Player_Two_Name}`;
      } else {
        document.getElementById(
          "h__turnDiv"
        ).innerText = `${Game.Player_Two_Name}"s is thinking...`;
      }
    }
  }
});

//!! Not ready, bugs... so disabled
//? === toogle all animations ===

// aniToggle_checkbox.addEventListener("click", () => {
//   //console.log("Toggle animations clicked");

//   if (
//     localStorage.animations === "true" ||
//     localStorage.animations === undefined
//   ) {
//     localStorage.animations = "false";
//     Game.animations = "false";
//     start_button.classList.remove("colourAnimation");
//     document
//       .getElementById("headline")
//       .classList.remove("colouredTextAnimation");
//     document.getElementById("div__turnPlayers").style.visibility = "hidden";
//   } else {
//     localStorage.animations = "true";
//     Game.animations = "true";
//     start_button.classList.add("colourAnimation");
//     document.getElementById("headline").classList.add("colouredTextAnimation");
//     document.getElementById("div__turnPlayers").style.visibility = "visible";
//   }
// });

//? === reset stats against cpu easy ===

stats_reset_easy.addEventListener("click", () => {
  //console.log("Reset stats easy clicked");

  localStorage.CPU_Easy_Wins = 0;
  localStorage.CPU_Easy_CPUWins = 0;
  localStorage.CPU_Easy_Draws = 0;
  Stats();
});

//? === reset stats against cpu normal ===

stats_reset_normal.addEventListener("click", () => {
  //console.log("Reset stats normal clicked");

  localStorage.CPU_Normal_Wins = 0;
  localStorage.CPU_Normal_CPUWins = 0;
  localStorage.CPU_Normal_Draws = 0;
  Stats();
});

//? === link to contact page ===

contact_h.addEventListener("click", () => {
  //console.log("Contacts clicked");

  window.open("https://stefanbartl.github.io/Portfolio/");
});

//? === link to credits page ===

credits_h.addEventListener("click", () => {
  //console.log("Credits clicked");

  window.open("https://github.com/StefanBartl/FourWins/blob/main/README.md");
});

//? === delete all data from local storage ===

delete_all.addEventListener("click", () => {
  //console.log("Delete all clicked");

  // play warning sound
  if (Game.Sound === true) warning_audio.play();

  // create confirm window
  if (Game.Language === "de") {
    const confirm = New_Window({
      ID: "newWindow__delete",
      Name: "Notification",
      Text: `${
        localStorage.getItem("Player_One_Name") || "Spieler"
      }, willst du wirklich die gespeicherte Sprache, die Spieler Namen und die Statistiken von deinem local-Storage löschen? Diese Daten sind nur in deinem Browser gespeichert und können nach einer Löschung nicht wiederhergestellt werden.`,
      Confirm: true,
    });
  } else {
    const confirm = New_Window({
      ID: "newWindow__delete",
      Name: "Notification",
      Text: `${
        localStorage.getItem("Player_One_Name") || "Player"
      }, do you really want do delete the saved language, saved Player names and the stats from your local Storage? The data is stored in your Browser and cannot be restored again after deleting it.`,
      Confirm: true,
    });
  }
  // if user clicked OK after notification, delete local storage
  document
    .getElementById("newWindow__delete_OK_Button")
    .addEventListener("click", () => {
      localStorage.clear();
      //console.log("Local Storage deleted");
    });

  //Reset name inputs
  player_1_name.value = player_1_name.placeholder;
  Game.player_1_name = player_1_name.placeholder;
  player_2_name.value = player_2_name.placeholder;
  Game.player_2_name = player_2_name.placeholder;
});

//#endregion

//#endregion

//#endregion

//#region 2) main game

/*  ================  
!          ===  Preparings  ===
          ================  */
function Game_Preparations() {
  //? === do all the preparations to start the game ===

  // console.log("Entered Game Preparations");

  Game.state = "Preparations";

  // disable gameboard-size changing during game
  document
    .getElementById("settings_span__gameboard")
    .setAttribute("data-ingame", "yes");

  // make sure at game start are valid name variables available
  if (player_1_name.value === "")
    player_1_name.value = player_1_name.placeholder;
  if (player_2_name.value === "")
    player_2_name.value = player_2_name.placeholder;
  Game.Player_One_Name = player_1_name.value;
  Game.Player_Two_Name = player_2_name.value;
  // console.log("Setted Names:", Game.Player_One_Name, Game.Player_Two_Name);

  // get all cells and give them same data-isplayed attribute
  const cellsArray = document.getElementsByClassName("cells");
  for (let cell of cellsArray) {
    cell.setAttribute("data-isplayed", "no");
  }

  // proof if game is against CPU and if set correct level
  if (choose_ki.value != "No") Game.Game_against_CPU = true;
  if (Game.Game_against_CPU === true) {
    if (choose_ki.value === "CPU Easy") {
      Game.CPU_Level = "Easy";
    }
    if (choose_ki.value === "CPU Normal") {
      Game.CPU_Level = "Normal";
    }
    if (choose_ki.value === "CPU Hard") {
      Game.CPU_Level = "Hard";
    }
  }

  // create important objects
  for (let i = 1; i <= Game.gameboard_size_x; i++) {
    // create the arrays to validate the placements later
    let arr = [];
    Game.player1_coins[`C${i}`] = [];
    Game.player2_coins[`C${i}`] = [];
    Game.actualGameboardPlayer1[`C${i}`] = [];
    Game.actualGameboardPlayer2[`C${i}`] = [];
    // create row counter for easy calculation of the correct row for  placement
    Game.rowCounter[`C${i}`] = `${Game.gameboard_size_y}`;
  }

  // console.log("Game against CPU:", Game.Game_against_ki, "CPU Level:", Game.CPU_Level);
  // DOM-manipulations to get to the "Game-Screen"
  Game_Screen();

  // create DOM-elements for show the switching which player is on turn
  Create_DOM_Element({
    ParentID: "section__main",
    Element: "div",
    ID: "div__turnPlayers",
  });
  Create_DOM_Element({
    ParentID: "div__turnPlayers",
    Element: "h2",
    ID: "h__turnDiv",
  });

  // show correct player is on turn message
  Turning_PlayerIsOnTurn();

  // after 8 seconds, smoothly remind the player of time
  setTimeout(Thinking_Effect, 8000);

  // after finished the preparations start game
  PlayGame();

  // console.log("Finished Game preparations.");
}
/*  ===========  
!         ===  Play  ===
          ===========  */
function PlayGame() {
  //? === detect placing of a coin ===

  // console.log("Entered Play Game Function.");

  Game.state = "InGame";
  document
    .getElementById("wrapper__gameboard")
    .setAttribute("data-inGame", "yes");

  // detection of the correct top-cells  to put the event listeners on them so the players can make there placements
  // get all top-cells
  const topCellsArray = document.getElementsByClassName("topCells");
  for (let topCell of topCellsArray) {
    let topCellColumn = parseInt(topCell.getAttribute("data-column"));

    //?  Event-Listener for the Choosing-Animation
    topCell.addEventListener("mouseover", () => {
      Add_Choosing_Ani(topCellColumn);
      // console.log(`Triggered choosing animation in top cell ${topCellColumn}`);
    });
    topCell.addEventListener("mouseleave", () => {
      Remove_Choosing_Ani(topCellColumn);
    });

    //?  Event-Listener for actions if a Top Cell is clicked
    topCell.addEventListener("click", () => {
      // play placement sound if on:
      if (Game.Sound === true) {
        placing_audio.play();
      }

      // get the id & column of the played top-cell:
      Game.clicked_TopCell_ID = topCell.id;

      let clicked_column = parseInt(topCell.getAttribute("data-column"));
      // get the correct column of the clicked top-cell:
      Game.clicked_column = clicked_column;

      for (let topCell of topCellsArray) {
        topCell.style = "pointer-events:none";
      }

      // start placement function
      Prepare_Placement();
    });
  }
  // console.log("Leaving Play Game Function.");
}
//#endregion

//#region 3) placements

/*  =====================  
!         ===  Prepare placement  ===
          =====================  */
function Prepare_Placement() {
  //? === gather coin placement informations to trigger the placement ===

  // console.log("Entered Function for preparing new Placement.");

  // get all top-cells
  const topCellsArray = document.getElementsByClassName("topCells");

  // get the played top cell for getting the right column
  topCell = document.getElementById(`${Game.clicked_TopCell_ID}`);

  // make sure, placement only is allowed if the animation from the placement before is finished
  if (topCell.firstChild) return;

  // increase round counter
  Game.roundCounter++;

  Game.coin_placement_row = parseInt(
    Game.rowCounter[`C${Game.clicked_column}`]
  );
  Game.coin_placement_id = `ID_C${Game.clicked_column}R${Game.coin_placement_row}`;

  Game.animations === "true" ? Placement_Animation() : Placement_End();
}

/*  ================  
!         ===  Animation  ===
          ================  */
function Placement_Animation() {
  //? === fire the placement animation ===

  /*console.log(`Make placement on coin. The placement id is: ${Game.coin_placement_id} in row: ${Game.coin_placement_row} and column: ${Game.clicked_column}.`);*/

  //? create the correct coin, note correct position and append it to the DOM
  const coin = document.createElement("div");

  // if left player is on turn
  if (Game.playerIsOnTurn === "left" && Game.player_Colour_Left === "yellow") {
    coin.classList.add("coin__yellow");
    Game.actualGameboardPlayer1[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    Game.player1_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  }

  if (Game.playerIsOnTurn === "left" && Game.player_Colour_Left === "red") {
    coin.classList.add("coin__red");
    Game.actualGameboardPlayer1[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    Game.player1_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  }

  //if player right is on turn
  if (Game.playerIsOnTurn === "right" && Game.player_Colour_Left === "yellow") {
    coin.classList.add("coin__red");
    Game.actualGameboardPlayer2[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    Game.player2_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  }

  if (Game.playerIsOnTurn === "right" && Game.player_Colour_Left === "red") {
    coin.classList.add("coin__yellow");
    Game.actualGameboardPlayer2[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    Game.player2_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  }

  // get the played top cell for getting the right column and append the coin
  topCell = document.getElementById(`${Game.clicked_TopCell_ID}`);
  topCell.appendChild(coin);

  // trigger the correct animation (animated coin route-length) for the placement row in all gameboard sizes
  let gameboard__height =
    document.getElementById("wrapper__gameboard").clientHeight;
  let cell__height = (gameboard__height / (Game.gameboard_size_x + 1)) * 10.5;
  let animation__length = cell__height * Game.coin_placement_row;

  // consider small devices
  if (settings_menu.getAttribute("data-device") === "smart")
    animation__length *= 0.6;
  // animate coin
  coin.animate(
    [
      // keyframes
      { transform: "translateY(0)" },
      { transform: `translateY(${animation__length}px)` },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
    }
  );

  // ? after placing coin animation, validate possible win and next turn
  // remove the coin with the animation after the animation time ended and place the coin on correct position
  setTimeout(() => {
    Placement_End();
  }, 1000);

  // console.log("Placement done.");
}

/*  ===================  
!         ===  End placement  ===
          ===================  */
function Placement_End() {
  //? === place coin on his destination ===

  // console.log("Entered End of Placement");

  //  first remove the coin from the top-cell to get rid of the animated coin, if animation is on
  if (Game.animations === "true")
    document.getElementById(`${Game.clicked_TopCell_ID}`).firstChild.remove();

  // get the destination of the coin
  coin_destination = document.getElementById(
    `ID_C${Game.clicked_column}R${Game.coin_placement_row}`
  );

  // set general properties
  coin_destination.style.opacity = "1";
  coin_destination.setAttribute("data-isPlayed", "yes");

  // set player specific properties
  if (Game.playerIsOnTurn === "left") {
    // place the coin as background image on the correct column (get the correct row/value from the decreased row counter)
    if (Game.player_Colour_Left === "yellow") {
      coin_destination.classList.add("placedCoin__1");
      coin_destination.setAttribute("data-isPlayedFrom", "player_1");
    } else {
      coin_destination.classList.add("placedCoin__2");
      coin_destination.setAttribute("data-isPlayedFrom", "player_2");
    }
  } else {
    if (Game.player_Colour_Left === "red") {
      coin_destination.classList.add("placedCoin__1");
      coin_destination.setAttribute("data-isPlayedFrom", "player_1");
    } else {
      coin_destination.classList.add("placedCoin__2");
      coin_destination.setAttribute("data-isPlayedFrom", "player_2");
    }
  }
  // decrease row counter so next placement can calculate correct row position
  Game.rowCounter[`C${Game.clicked_column}`]--;

  // invoke
  Game.playerIsOnTurn === "left"
    ? Player_1_Placement_Finish()
    : Player_2_Placement_Finish();
}

/*  =====================  
!         ===  After placement I  ===
          =====================  */
function Player_1_Placement_Finish() {
  // ? === invoke winning-validation for player 1 and if true invoke game-end function ===

  const valid_row = Row_Validator(1, Game.coin_placement_row);
  const valid_column = validator__column(
    1,
    Game.clicked_column,
    Game.coin_placement_row
  );
  const valid_diagonal = Diagonal_Validator(
    1,
    Game.clicked_column,
    Game.coin_placement_row
  );
  if (valid_row === true || valid_column === true || valid_diagonal === true)
    return;

  // if there are no more cells to  play invoke draw
  if (Game.roundCounter === Game.gameboard_size_x * Game.gameboard_size_y) {
    Game_End_Screen(3);
    return;
  }

  // if no win or draw proof if column is full and unlock the top-cells
  if (Game.Game_against_CPU === false) Unlock_TopCells();

  Column_Locking_Validation(false);

  //  next player is on turn
  Turning_PlayerIsOnTurn();

  // if game is against CPU invoke correct CPU-Level
  if (Game.CPU_Level === "Easy" || Game.CPU_Level === "Einfach") {
    CPU_Easy();
    Lock_TopCells();
  } else if (Game.CPU_Level === "Normal") {
    CPU_Normal();
    Lock_TopCells();
  } else if (Game.CPU_Level === "Hard" || Game.CPU_Level === "Schwer") {
    CPU_Hard();
    Lock_TopCells();
  }
}

/*  =====================  
!         ===  After placement II  ===
          =====================  */
function Player_2_Placement_Finish() {
  const valid_row = Row_Validator(2, Game.coin_placement_row);
  const valid_column = validator__column(
    2,
    Game.clicked_column,
    Game.coin_placement_row
  );
  const valid_diagonal = Diagonal_Validator(
    2,
    Game.clicked_column,
    Game.coin_placement_row
  );
  if (valid_row === true || valid_column === true || valid_diagonal === true)
    return;

  if (Game.roundCounter === Game.gameboard_size_x * Game.gameboard_size_y) {
    Game_End_Screen(3);
    return;
  }

  if (Game.Game_against_CPU === false) {
    Column_Locking_Validation(false);
    Unlock_TopCells();
  }

  Turning_PlayerIsOnTurn();
  Unlock_TopCells();
}
//#endregion

//#region 4) bonus jobs & ideas for future
/*
? Easier (more visible) translation button
? make the coin images a variable so a user could choice between coin appearance 
? save /load game function f.e. saving cell-states in local storage
? improve CPU Normal algorhytmus f.e. with randomizing upwards/vertical placements by getting multiple values
? write a CPU Heavy algorhytmus
? design a starting screen animation to make it more interesting to play if landing on the page                                                                                                                                                                                                                                                                              */
//#endregion
