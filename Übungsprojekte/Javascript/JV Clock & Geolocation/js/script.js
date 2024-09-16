'use strict';
window.onload = function(){

let stunden = document.getElementById("stunden");
let minuten = document.getElementById("minuten");
let sekunden = document.getElementById("sekunden");
let ampm = document.getElementById("ampm");
let tag = document.getElementById("tag");
let monat = document.getElementById("monat");
let jahr = document.getElementById("jahr");


let heute = new Date();
let stundenDazu = heute.getHours();
stunden.innerHTML = stundenDazu;
if(stundenDazu <= 9){
        stunden.innerHTML = "0" + stundenDazu;
        }
let minutenDazu = heute.getMinutes();
minuten.innerHTML = minutenDazu;
if(minutenDazu <= 9){
        minuten.innerHTML = "0" + minutenDazu;
        }
let sekundenDazu = heute.getSeconds();
sekunden.innerHTML = sekundenDazu;
if(sekundenDazu <= 9){
        sekunden.innerHTML = "0" + sekundenDazu;
        }
let tagDazu = heute.getDate();
tag.innerHTML = tagDazu;
let monatDazu = heute.getMonth()+1;
monat.innerHTML = monatDazu;
let jahrDazu = heute.getFullYear();
jahr.innerHTML = jahrDazu;

if(stundenDazu > 12){
    ampm.innerHTML = "PM";
}


function getPosition() {
  function successHandler(position) {
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
    document.getElementById('accuracy').value = position.coords.accuracy;
    document.getElementById('altitudeAccuracy').value = position.coords.altitudeAccuracy;
    document.getElementById('heading').value = position.coords.heading;
    document.getElementById('speed').value = position.coords.speed;
    document.getElementById('timestamp').value = position.timestamp;
    const mapOptions = {
      zoom: 6
    };
    const map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    const googlePosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    const infowindow = new google.maps.InfoWindow({
      map: map,
      position: googlePosition,
      content: 'Sie befinden sich hier.'
    });
    map.setCenter(googlePosition);
  }
  function errorHandler(error) {
    // Nutzer verweigert Positionsermittlung.
  }
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }
}


}
