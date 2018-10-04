'use strict';
$(document).ready(function() {
  console.log('jquery working');
  displayDetailRequest(); //display handlebars for details page
});

$('#start-game').on('click', startGame);
$('#check-score').on('click', checkHighScore);

let inputRegion;
let markerAsia;
let markerAustralia;
let markerAntartica;
let markerAfrica;
let markerNorthAmerica;
let markerSouthAmerica;
let turns;
let lives;
let questionList;
let totalScore;

function apiGrab() {
  console.log('start map');
  $.ajax({
    url: `/api-key`,
    method: 'GET'
  }).then(result =>
    $(`#map-script`).append(
      `<script async defer src="https://maps.googleapis.com/maps/api/js?key=${result}&callback=initMap"></script>`
    )
  );
}

function startGame(event) {
  event.preventDefault();
  let turnCount = localStorage.getItem('turns');
  console.log(turnCount);
  if(turnCount === 0 || turnCount === undefined || turnCount === null){
    lives = 5;
    turns = 0;
    totalScore = 0;
    localStoragePersistence();
  } else {
    localStorageGet();
    localStoragePersistence();
  }
  console.log('start game');
  $.ajax({
    url: `/start`,
    method: 'GET'
  }).then(result => compileQuestion(result, turns));
}

function compileQuestion(questions, turns) {
  inputRegion = null;
  questionList = questions;

  let template = Handlebars.compile($(`.question-list`).text());
  $(`.question-area`).append(template(questions[turns]));

  $('.detail').on('click', function(event) {
    let value = event.target.id;
    localStorage.setItem('name', value);
    window.location.href = '/pages/details.html';
  });
  console.log('turns', turns);
  markerAsia.addListener('click', asiaListener);
  markerAfrica.addListener('click', africaListener);
  markerAntartica.addListener('click', antarticaListener);
  markerAustralia.addListener('click', australiaListener);
  markerNorthAmerica.addListener('click', northAmericaListener);
  markerSouthAmerica.addListener('click', southAmericaListener);
  localStoragePersistence();
}


function localStorageGet() {
  lives = localStorage.getItem('lives');
  turns = localStorage.getItem('turns');
  totalScore = localStorage.getItem('score');
}

function localStoragePersistence() {
  localStorage.setItem('lives', lives);
  localStorage.setItem('turns', turns);
  localStorage.setItem('score', totalScore);
}

function removeQuestion() {
  console.log('here');
  $('.detail').hide();
}

function southAmericaListener() {
  inputRegion = 'South America';

  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerSouthAmerica, 'click');
    if (turns === 50) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerSouthAmerica, 'click');
    if (turns === 50 || lives === 0) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}

function northAmericaListener() {
  inputRegion = 'North America';
  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerNorthAmerica, 'click');
    if (turns === 50) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerNorthAmerica, 'click');
    if (turns === 50 || lives === 0) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}

function australiaListener() {
  inputRegion = 'Australia';
  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerAustralia, 'click');
    if (turns === 50) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAustralia, 'click');
    if (turns === 50 || lives === 0) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}

function antarticaListener() {
  inputRegion = 'Antartica';
  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerAntartica, 'click');
    if (turns === 50) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAntartica, 'click');
    if (turns === 50 || lives === 0) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}

function africaListener() {
  inputRegion = 'Africa';
  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerAfrica, 'click');
    if (turns === 50) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAfrica, 'click');
    if (turns === 50 || lives === 0) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}
function asiaListener() {
  inputRegion = 'Asia';
  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerAsia, 'click');
    if (turns === 50) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAsia, 'click');
    if (turns === 50 || lives === 0) {
      compileHighScore(totalScore);
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}
let highScoreInput = finalScore => {
  return `<form>
<h2 type="text" id="current-score">${finalScore}</h2>
<input type = "text" id = "enter-user" required></input>
<button type = "submit" id = "enter-button">Submit Score</button>
</form>`;
};
function compileHighScore(scores, finalScore) {
  console.log(scores);
  if (finalScore === undefined) {
    finalScore = 0;
  }
  if (scores > 0 || scores !== undefined) {

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
function displayDetailRequest() {
  let searchquery = localStorage.getItem('name');
  console.log(searchquery);

  $.ajax({
    url: '/details',
    method: 'GET',
    data: { data: searchquery }
  }).then(result => displayDetail(result));
}

function displayDetail(animal) {
  let template = Handlebars.compile($('#animal-template').text());
  console.log(template(animal));
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
  markerAsia = new google.maps.Marker({ position: asia, map: map });
  markerAustralia = new google.maps.Marker({
    position: australia,
    map: map
  });
  markerAustralia.addListener('click', function() {
    inputRegion = 'Australia';
  });
  markerAntartica = new google.maps.Marker({
    position: antartica,
    map: map
  });
  markerAntartica.addListener('click', function() {
    inputRegion = 'Antartica';
  });
  markerSouthAmerica = new google.maps.Marker({
    position: southAmerica,
    map: map
  });
  markerSouthAmerica.addListener('click', function() {
    inputRegion = 'South America';
  });
  markerNorthAmerica = new google.maps.Marker({
    position: northAmerica,
    map: map
  });
  markerNorthAmerica.addListener('click', function() {
    inputRegion = 'North America';
  });
  markerAfrica = new google.maps.Marker({
    position: africa,
    map: map
  });
  markerAfrica.addListener('click', function() {
    inputRegion = 'Africa';
  });
}

apiGrab();
