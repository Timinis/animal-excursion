'use strict';
$(document).ready(function() {
  console.log('jquery working');
  displayDetail();
});

$('#start-game').on('click', startGame);
$('#check-score').on('click', checkHighScore);

function startGame(event) {
  event.preventDefault();
  console.log('start game');
  $.ajax({
    url: `/start`,
    method: 'GET'
  }).then(result => compileQuestion(result));
}

function compileQuestion(questions) {
  console.log(questions);
  let template = Handlebars.compile($(`#question-list`).text());
  questions.forEach(element => {
    $(`.question-area`).append(template(element));
  });
  $('.detail').on('click', function(event) {
    let value = event.target.id;
    localStorage.setItem('name', value);

    window.location.href='/pages/details.html';
    $.ajax({
      url: '/details',
      method: 'GET'
    })
      .then(result => displayDetail(result));
  });
}

let highScoreInput = finalScore => {
  return `<form>
<h2 type="text" id="current-score">${finalScore}</h2>
<input type = "text" id = "enter-user" required></input>
<button type = "submit" id = "enter-button">Submit Score</button>
</form>`;
};

function compileHighScore(scores, finalScore) {
  if (finalScore === undefined) {
    finalScore = 0;
  }
  if (!scores.length) {
    console.log('I should work');
    let template = Handlebars.compile($(`#no-score`).text());
    $('.score-area').append(
      template({ text: 'No Scores Yet, please submit your name' })
    );
    $('.score-area').append(highScoreInput(finalScore));
  } else {
    let template = Handlebars.compile($(`high-score`).text());
    $('.score-area').append(scores.forEach(element => template(element)));
    if (finalScore > scores[scores.length - 1]) {
      $('.score-area').append(highScoreInput(finalScore));
    }
  }
}

function checkHighScore(event) {
  $.ajax({
    url: `/score`,
    method: 'GET'
  }).then(result => compileHighScore(result));
}

function displayDetail(animal) {
  let template = Handlebars.compile($('#animal-template').text());
  $('#detail-container').append(template(animal));
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
