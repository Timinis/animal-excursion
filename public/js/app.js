'use strict';
$(document).ready(function() {
  console.log('jquery working');
});

$('#start-game').on('click', startGame);

function startGame(event) {
  event.preventDefault();
  console.log('start game');
  $.ajax({
    url: `/start`,
    method: 'GET'
  }).then(result => compileQuestion(result));
}

function compileQuestion(questions) {
  let template = Handlebars.compile($(`#question-list`).text());
  questions.forEach(element => {
    $(`.question-area`).append(template(element));
  });
}

function initMap() {
  // The location of Uluru
  let center = { lat: 0, lng: 0 };
  let asia = { lat: 34.0479, lng: 100.6197 };
  let australia = { lat: -25.2744, lng: 133.7751 };
  let antartica = { lat: -76.300003, lng: -100.0 };
  let southAmerica = { lat: -18.7832, lng: -55.4915 };
  let northAmerica = { lat: 37.0902, lng: -105.7129 };
  let africa = { lat: 8.7832, lng: 20.5085 };
  // The map, centered at Uluru
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 1,
    center: center
  });
  let markerAsia = new google.maps.Marker({ position: asia, map: map });
  markerAsia.addListener('click', function() {
    console.log('Asia is selected');
  });
  let markerAustralia = new google.maps.Marker({
    position: australia,
    map: map
  });
  markerAustralia.addListener('click', function() {
    console.log('Australia is selected');
  });
  let markerAntartica = new google.maps.Marker({
    position: antartica,
    map: map
  });
  markerAntartica.addListener('click', function() {
    console.log('Antartica is selected');
  });
  let markerSouthAmerica = new google.maps.Marker({
    position: southAmerica,
    map: map
  });
  markerSouthAmerica.addListener('click', function() {
    console.log('South America is selected');
  });
  let markerNorthAmerica = new google.maps.Marker({
    position: northAmerica,
    map: map
  });
  markerNorthAmerica.addListener('click', function() {
    console.log('North America is selected');
  });
  let markerAfrica = new google.maps.Marker({
    position: africa,
    map: map
  });
  markerAfrica.addListener('click', function() {
    console.log('Africa is selected');
  });
}
