//#region Table of Content
/*
! Rock-Paper-Scissor Main-Javascript-File
? powered by
! Stefan Bartl
! (WKDSteVIE / WKDMinerva)
? Oct. 2021             
? ________________________________                                                                                                                                                                                                  
! Table of content           

? 1) Language     
? 2) Declarations & Starting Values  
? 3) Language & Translation
? 4) Functions
? 5) Event-Listeners

! Javascript - what a wonderful language!
*/
//#endregion


//#region Declarations & Starting Values

const section_pageTitle = document.querySelector('.section_page_title');
const section_game = document.querySelector('.game');
const headline_1 = document.querySelector('.headline_1');
const headline_2 = document.querySelector('.headline_2');
const headline_3 = document.querySelector('.headline_3');
const headline_p = document.querySelector('.headline-p');
const userText = document.querySelector('.user-text');
const cpuText = document.querySelector('.cpu-text');
const resultText = document.querySelector('.result-text');
const playerScoreText = document.querySelector('.player-score-text');
const cpuScoreText = document.querySelector('.cpu-score-text');
const result = document.querySelector('.result');
const gameCPU = document.querySelector('.cpu-game');
const gameUSER = document.querySelector('.user-game');
const scorePLAYER = document.querySelector('.player-score');
const scoreCPU = document.querySelector('.cpu-score');
const rock = document.querySelector('.rock-img');
const paper = document.querySelector('.paper-img');
const scissor = document.querySelector('.scissor-img');
const mylogo = document.querySelector('.mylogo');
const githublogo = document.querySelector('.githublogo');
const languageText = document.querySelector('.language-text');

let scoreCountPlayer = 0,
scoreCountCPU = 0,
playersChoice, computerChoice, game_result_text;

//#endregion


//#region Language & Translation

// ? Setup Translation 
// get setted language from local storage or browser language and store it there
const language = localStorage.language || navigator.language;
// This is not the best way, regexp would be better to proof of 'de'
language[0] === 'd' && language[1] === 'e' ? localStorage.language = 'de' : 'en';

// ? Translation-Libraries

function English() {
    headline_1.innerText = 'Play';
    headline_2.innerText = 'Rock-Paper-Scissor';
    headline_3.innerText = 'against your CPU!';
    headline_p.innerText = 'Win 5 rounds to win the Game!';
    userText.innerText = 'Your Play:';
    cpuText.innerText = 'CPU Plays:';
    resultText.innerText = 'Winner of the round is:';
    playerScoreText.innerText = 'Your Score:';
    cpuScoreText.innerText =  'Score CPU';
    rock.title = 'Click to choose "Rock"';
    paper.title = 'Click to choose "Paper"';
    scissor.title = 'Click to choose "Scissor"';
    mylogo.title='Click to jump to my personal Portfolio-Page!'; 
    mylogo.alt='My personal Logo claims "Loving Tech, Science & Peace".';
    githublogo. title='Click to jump to the Github-Repository of this Project!'; 
    githublogo.alt='Github Logo.';
    languageText.innerText = '.de';
    languageText.title = 'Übersetze diese Seite auf Deutsch';
}

function German() {
    headline_1.innerText = 'Spiele';
    headline_2.innerText = 'Stein-Schere-Papier';
    headline_3.innerText = 'gegen deinen Computer!';
    headline_p.innerText = 'Gewinne 5 Runden um das Spiel zu gewinnen!';
    userText.innerText = 'Deine Wahl:';
    cpuText.innerText = 'CPU Wahl:';
    resultText.innerText = 'Diese Runde hat gewonnen:';
    playerScoreText.innerText = 'Deine Punkte:';
    cpuScoreText.innerText =  'CPU Punkte:';
    rock.title = 'Klicke um "Stein" zu wählen';
    paper.title = 'Klicke um "Papier" zu wählen';
    scissor.title = 'Klicke um "Schere" zu wählen';
    
    mylogo.title='Klicke um zu meiner persönlichen Portfolio-Seite zu springen !'; 
    mylogo.alt='Mein persönliches Motto lautet: "Liebe Technik, Wissenschaft & Frieden!"';
    githublogo. title='Klicke um zum Github-Repository dieses Projekts zu springen !'; 
    githublogo.alt='Github Logo.';
    languageText.innerText = '.en';
    languageText.title = 'Translate page to english';
}

// ? Initial Translation
localStorage.language === 'en' ? English() : German();

// ? Change Language
languageText.addEventListener('click', ()=>{
  // Check for the actual language
  if(localStorage.language === 'en'){
    // Invoke opposite language
    German();
    // Store new language in localStorage
    localStorage.language = 'de';
  } else {
    English();
    localStorage.language = 'en';
  };
})

// ? Fixed translated strings
let rock_string, scissor_string, paper_string;
if(localStorage.language === 'en'){
    rock_string = 'Rock', scissor_string = 'Scissor', paper_string = 'Paper';
} else {
    rock_string = 'Stein', scissor_string = 'Schere', paper_string = 'Papier';
};

const startingText_string_en = 'When you\'re ready, click "Start" to begin the first of five rounds of Rock-Paper-Scissors. Once you\'ve made a choice, click on the corresponding icon to start the round. The computer answers randomly, you can read off the result of the round and the next starts.',
      startingText_string_de = 'Sobald du bereit bist klicke "Start" um mit dem der ersten von fünf Runden Stein-Schere-Papier zu beginnen. Hast du dich für Stein, Schere oder Papier entschieden klicke auf das entsprechende Symbol um die Runde einzuleiten. Der Computer antwortet per Zufallsgenerator, du kannst das Rundengebnis ablesen und die nächste Runde startet.',
      startGame_innerText_string_en = 'Start Game',
      startGame_innerText_string_de = 'Spiel starten',
      startGame_title_string_en = 'Click to start the game',
      startGame__title_string_de = 'Klicke um das Spiel zu starten';

const player_round_won_text_en = 'You have won this round!',
      cpu_round_won_text_en = 'CPU have won this round!',
      patt_round_text_en = 'Patt - no points for anyone!',
      player_round_won_text_de = 'Du hast diese Runde gewonnen!',
      cpu_round_won_text_de = 'Der Computer hat diese Runde gewonnen!',
      patt_round_text_de = 'Patt - in dieser Runde bekommt niemand Punkte!';

const player_game_win_string_en = 'You have WON this GAME - Congratulations!', 
      player_game_win_string_de = 'Du hast dieses SPIEL GEWONNEN - Gratulation!',
      cpu_game_win_string_en = 'CPU won this GAME - try it again!',
      cpu_game_win_string_de = 'Du hast dieses SPIEL verloren - probiere es nochmal!'; 

//#endregion


//#region Functions

// ? Start Game sequence
function StartGame(){

    // Hide Game-UI
    section_game.style.display = 'none';
    //Create Starting Text
    const startingText = document.createElement('p');
    localStorage.language === 'en' 
     ? startingText.innerText = startingText_string_en 
     : startingText.innerText = startingText_string_de;
    // Create starting button
    const startGame = document.createElement('button');
    localStorage.language === 'en' ? startGame.innerText = startGame_innerText_string_en : startGame.innerText = startGame_innerText_string_de;
    localStorage.language === 'en' ? startGame.title = startGame_title_string_en : startGame.title = startGame__title_string_de;
    // Add classes
    startGame.classList.add('start-btn');
    startingText.classList.add('starting-text');
    // Push Headline, Text & Button to DOM
    insertAfter(headline_3, startGame);
    insertAfter(section_game, startingText);
    // Add start game Event-Listerner
    startGame.addEventListener('click', ()=>{
        // Remove the before created DOM-Elements
        section_pageTitle.remove();
        startingText.remove();
        startGame.remove();
        // Show the Game UI
        section_game.style.display = 'block';
        // Make sure counters are set to zero
        scoreCountPlayer = 0;
        scoreCountCPU = 0;
    })
};

// ? Get a random choice for the CPU
function CPUChoice(){
    let a = Math.random();
    if  (a < 0.34) {
        return rock_string
    }
    else if (a >= 0.34 && a < 0.67) {
        return paper_string;
    }
    else if (a >= 0.67) {
        return scissor_string;
    }
    else {
        if(localStorage.language === 'en'){
            return patt_round_text_en;
        } else {
            return patt_round_text_de;
        };
    };
};

// ? Reset counters and corresponend UI
function ResetCounting(){
    scoreCountCPU = 0;
    scoreCountPlayer = 0;
    scorePLAYER.innerText = scoreCountPlayer;
    scoreCPU.innerText = scoreCountCPU;
};

// ? Get result
function ValidateRound (playersChoice, computerChoice){
    console.log(playersChoice, computerChoice);

    if (playersChoice == rock_string && computerChoice == scissor_string){
        localStorage.language === 'en' ? result.innerText = player_round_won_text_en : result.innerText = player_round_won_text_de;
        scoreCountPlayer += 1;
    } else if (playersChoice == rock_string && computerChoice == paper_string){
        localStorage.language === 'en' ? result.innerText = cpu_round_won_text_en : result.innerText = cpu_round_won_text_de;
        scoreCountCPU += 1;
    } else if (playersChoice == paper_string && computerChoice == scissor_string){
        localStorage.language === 'en' ? result.innerText = cpu_round_won_text_en : result.innerText = cpu_round_won_text_de;
        scoreCountCPU += 1;
    }  else if (playersChoice == paper_string && computerChoice == rock_string){
        localStorage.language === 'en' ? result.innerText = player_round_won_text_en : result.innerText = player_round_won_text_de;
        scoreCountPlayer += 1;
    } else if (playersChoice == scissor_string && computerChoice == rock_string){
        localStorage.language === 'en' ? result.innerText = cpu_round_won_text_en : result.innerText = cpu_round_won_text_de;
        scoreCountCPU += 1;
    } else if (playersChoice == scissor_string && computerChoice == paper_string){
        localStorage.language === 'en' ? result.innerText = player_round_won_text_en : result.innerText = player_round_won_text_de;
        scoreCountPlayer += 1;
    } else {
        localStorage.language === 'en' ? result.innerText = patt_round_text_en : result.innerText = patt_round_text_de;
    };

    // Attach round win text animation and remove it after
    result.classList.add('round_won_ani');
    setTimeout(()=>{
        result.classList.remove('round_won_ani')
    }, 1000)

    // Update Score-UI
    scorePLAYER.innerText = scoreCountPlayer;
    scoreCPU.innerText = scoreCountCPU;
    // Validate if someone have 5 rounds won
    ValidateGameWin();
};

// ? Validate if game is won
function ValidateGameWin(){
    if (scoreCountPlayer === 5){
        game_result_text = confirm(localStorage.language === 'en' ? player_game_win_string_en : player_game_win_string_de);
        game_result_text === true ? ResetCounting() : StartGame();
        };

    if (scoreCountCPU === 5){
        game_result_text = confirm(localStorage.language === 'en' ? cpu_game_win_string_en : cpu_game_win_string_de);
        game_result_text === true ? ResetCounting() : StartGame();
    };
};

// ? Insert a DOM-Element after an other DOM-Element
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

// ? Open a new browser tab 
function OpenInNewTab(href) {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href: href,
    }).click();
};

//#endregion


//#region Event-Listeners

// ? Trigger round by user input

// Choose Rock and trigger new round
rock.onclick = () => {
    // Assign choice via text to variable
    playersChoice = rock_string;
    // Get random cpu choice
    computerChoice = CPUChoice();
    // Update UI
    gameUSER.innerHTML = playersChoice;
    gameCPU.innerHTML = computerChoice;
    // Trigger result
    ValidateRound(playersChoice, computerChoice);
}

// Choose Paper and trigger new round
paper.onclick = () => {
    playersChoice = paper_string;
    gameUSER.innerHTML = playersChoice;
    computerChoice = CPUChoice();
    gameCPU.innerHTML = computerChoice;
    ValidateRound(playersChoice, computerChoice);
}

// Choose Scissor and trigger new round
scissor.onclick = () => {
    playersChoice = scissor_string;
    gameUSER.innerHTML = playersChoice;
    computerChoice = CPUChoice();
    gameCPU.innerHTML = computerChoice;
    ValidateRound(playersChoice, computerChoice);
}


// ? Open correct tab by clicking on logo

// Jump to my Portfolio
mylogo.addEventListener('click', ()=>{
    OpenInNewTab('https://stefanbartl.vercel.app');
  });
  
  // Jump to the Project Github-Repository
githublogo.addEventListener('click', ()=>{
    OpenInNewTab('https://github.com/StefanBartl/Rock-Paper-Scissor');
  });

//#endregion


// ? Initiate game starting sequence
StartGame();