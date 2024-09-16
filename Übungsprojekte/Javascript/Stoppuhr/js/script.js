window.onload = function(){

    var sekunden = 00;
    var zehner = 00;
    var zehnerAnhängen = document.getElementById("zehner")
    var sekundenAnhängen = document.getElementById("sekunden")
    var buttonStart = document.getElementById("start");
    var buttonStop = document.getElementById("stop");
    var buttonReset = document.getElementById("reset");
    var Interval;

    buttonStart.onclick = function(){
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10)
    }
    buttonStop.onclick = function(){
        clearInterval(Interval);
    }
    buttonReset.onclick = function(){
        zehner = "00";
        sekunden = "00";
        zehnerAnhängen.innerHTML = zehner;
        sekundenAnhängen.innerHTML = sekunden;
    }

    function startTimer () {
        zehner++; 
        
        if(zehner <= 9){
        zehnerAnhängen.innerHTML = "0" + zehner;
        }
        
        if (zehner > 9){
        zehnerAnhängen.innerHTML = zehner;
        
        } 
        
        if (zehner > 99) {
        console.log("sekunden");
        sekunden++;
        sekundenAnhängen.innerHTML = "0" + sekunden;
        zehner = 0;
        zehnerAnhängen.innerHTML = "0" + 0;
        }
        
        if (sekunden > 9){
        sekundenAnhängen.innerHTML = sekunden;
        }    
    }

}