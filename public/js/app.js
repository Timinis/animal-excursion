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
let markerEurope;
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

function startGame() {
  event.preventDefault();
  let turnCount = localStorage.getItem('turns');
  let livesCount = localStorage.getItem('turns');
  console.log(turnCount);
  if (
    turnCount === 0 ||
    turnCount === undefined ||
    turnCount === null ||
    turnCount === 50 ||
    livesCount === 0
  ) {
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

function postScore(event) {
  console.log('Im clicked');
  let scoreToBeSent = { name: $(`#enter-user`).val(), score: totalScore };
  $.post('/score-post', scoreToBeSent);
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
  $('#game-state').html(
    `<h3>Lives: ${lives}</h3><h3>Score: ${totalScore}</h3>`
  );
  markerAsia.addListener('click', asiaListener);
  markerAfrica.addListener('click', africaListener);
  markerAntartica.addListener('click', antarticaListener);
  markerAustralia.addListener('click', australiaListener);
  markerNorthAmerica.addListener('click', northAmericaListener);
  markerSouthAmerica.addListener('click', southAmericaListener);
  markerEurope.addListener('click', europeListener);
  localStoragePersistence();
}

function localStorageGet() {
  lives = parseInt(localStorage.getItem('lives'));
  turns = parseInt(localStorage.getItem('turns'));
  totalScore = parseInt(localStorage.getItem('score'));
}

function localStoragePersistence() {
  localStorage.setItem('lives', lives);
  localStorage.setItem('turns', turns);
  localStorage.setItem('score', totalScore);
}

function removeQuestion() {
  $('.detail').css({ display: 'none' });
}

function southAmericaListener() {
  inputRegion = 'South America';

  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerSouthAmerica, 'click');
    if (turns === 50) {
      checkHighScore();
      removeQuestion();
      $('#game-state').html(`<h3>Game Over</h3>`);
      $('#start-game').hide();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerSouthAmerica, 'click');
    if (turns === 50 || lives === 0) {
      removeQuestion();
      checkHighScore();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
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
      removeQuestion();
      checkHighScore();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerNorthAmerica, 'click');
    if (turns === 50 || lives === 0) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
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
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAustralia, 'click');
    if (turns === 50 || lives === 0) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
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
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAntartica, 'click');
    if (turns === 50 || lives === 0) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
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
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAfrica, 'click');
    if (turns === 50 || lives === 0) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
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
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerAsia, 'click');
    if (turns === 50 || lives === 0) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}

function europeListener() {
  inputRegion = 'Europe';
  if (inputRegion && questionList[turns].region === inputRegion) {
    turns++;
    totalScore += 100;
    google.maps.event.clearListeners(markerEurope, 'click');
    if (turns === 50) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  } else if (inputRegion && questionList[turns].region !== inputRegion) {
    turns++;
    lives--;
    google.maps.event.clearListeners(markerEurope, 'click');
    if (turns === 50 || lives === 0) {
      checkHighScore();
      removeQuestion();
      $('#start-game').hide();
      $('#game-state').html(`<h3>Game Over</h3>`);
      localStorage.clear();
    } else {
      removeQuestion();
      return compileQuestion(questionList, turns);
    }
  }
}

let highScoreInput = finalScore => {
  return `<form id="submit-form">
<h2 type="text" id="current-score">${finalScore}</h2>
<input type = "text" id = "enter-user" required></input>
<button type = "submit" id = "enter-button">Submit Name</button>
</form>`;
};
function compileHighScore(scoresDB, finalScore) {
  if (finalScore === undefined) {
    finalScore = 0;
  }
  if (!scoresDB.length) {
    let template = Handlebars.compile($(`#no-score`).text());
    $('.score-area').append(
      template({ text: 'No Scores Yet, please submit your name' })
    );
    $('.score-area').append(highScoreInput(finalScore));
    $('#submit-form').on('submit', postScore);
  } else {
    let template = Handlebars.compile($(`.high-score`).text());
    // console.log(template());

    scoresDB.forEach(element => {
      $('.score-area').append(template(element));
    });

    if (finalScore > scoresDB[scoresDB.length - 1] || scoresDB.length < 6) {
      $('.score-area').append(highScoreInput(finalScore));
      $('#submit-form').on('submit', postScore);
    }
  }
}
function checkHighScore() {
  $.ajax({
    url: `/score`,
    method: 'GET'
  }).then(result => compileHighScore(result, totalScore));
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
  let europe = { lat: 54.526, lng: 15.2551 };
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

  markerAntartica = new google.maps.Marker({
    position: antartica,
    map: map
  });

  markerSouthAmerica = new google.maps.Marker({
    position: southAmerica,
    map: map
  });

  markerNorthAmerica = new google.maps.Marker({
    position: northAmerica,
    map: map
  });

  markerAfrica = new google.maps.Marker({
    position: africa,
    map: map
  });

  markerEurope = new google.maps.Marker({
    position: europe,
    map: map
  });
}

apiGrab();
