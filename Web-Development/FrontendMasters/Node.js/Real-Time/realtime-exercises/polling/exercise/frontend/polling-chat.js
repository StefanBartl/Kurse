const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");

// let's store all current messages here
let allChat = [];

// the interval to poll at in milliseconds
const INTERVAL = 3000;

// a submit listener on the form in the HTML
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  // post to /poll a new message
  // write code here
  const data = {
    user,
    text,
  }

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }

  await fetch("/poll", options);
}

async function getNewMsgs() {
  let json;
  try {
    const res = await fetch("/poll");
    json = await res.json();
  } catch (e) {
    console.error("Polling failed", e);
  }
  allChat = json.msg;

  render();
  
  // Polling with setTimeout
  // setTimeout(getNewMsgs, INTERVAL);
}

function render() {
  // as long as allChat is holding all current messages, this will render them
  // into the ui. yes, it's inefficent. yes, it's fine for this example
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

// given a user and a msg, it returns an HTML string to render to the UI
const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

// make the first request

// Polling with setTimeout
//getNewMsgs();

// Polling with requestAnimationFrame
let timeToMakeRequest = 0; 
// Because requestAnimationFrame() calls rafTimer() a lot, it should be pure as possible
async function rafTimer(time){
  // console.log(time);
  if(timeToMakeRequest <= time){
    await getNewMsgs();
    timeToMakeRequest = time + INTERVAL;
  }

  /* Info:
    requestAnimationFrame() calles the function if Browser is 'idle', not doing nything else.
    Unlike setTimeout, which holds other processes, raf doesn't stops
    processes like streaming video etc.. and only runs at the end of the current frame
  */
  requestAnimationFrame(rafTimer);
}
// Initial request
requestAnimationFrame(rafTimer);
