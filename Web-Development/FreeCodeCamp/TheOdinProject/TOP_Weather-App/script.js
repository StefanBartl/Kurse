const wrapperDiv = document.getElementById("wrapper");

const textInputDOM = document.createElement("input");
textInputDOM.type = "text";
textInputDOM.setAttribute("id", "textInput");
textInputDOM.textContent = "Vienna";
wrapperDiv.appendChild(textInputDOM);
const inputBtn = document.createElement("button");
inputBtn.textContent = "Get Weather!";
inputBtn.addEventListener("click", ()=>{
    let city = textInputDOM.value;
    GetWeather(city);
})
wrapperDiv.appendChild(inputBtn);
let showResult = document.createElement("h1");
wrapperDiv.appendChild(showResult);

async function GetWeather (location){
        const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=104220b914800f12f345225805800f10`, {mode: 'cors'});
        const data = await api.json();
        const result = data.weather[0].main;
        console.log(result);
    
        showResult.innerText = result;
     
        if (result == "Clear"){
            document.body.style.backgroundColor = "yellow";
        } 
        else if (result == "Clouds"){
            document.body.style.backgroundColor = "grey";
        }
        else if (result == "Rain"){
            document.body.style.backgroundColor = "darkblue";
        }
        else if (result == "Snow"){
            document.body.style.backgroundColor = "white";
        }
        else if (result == "Drizzle"){
            document.body.style.backgroundColor = "darkgrey";
        }
        else if (result == "Thunderstorm"){
            document.body.style.backgroundColor = "black";
        }
        else if (result == "Mist"){
            document.body.style.backgroundColor = "green";
        }
    }

    

// API api.openweathermap.org/data/2.5/weather?q={Vienna}&appid=104220b914800f12f345225805800f10

/* 	
	clear
    drizzle
	clouds
	rain
	thunderstorm
	snow
	mist 
    */